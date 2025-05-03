import axios from "axios";
import { DeleteIcon } from "../icons/DeleteIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { InstaIcon } from "../icons/InstaIcon";
import { BACKEND_URL } from "../config";
import { useState, useEffect } from "react";
import ShareButton from "./ShareButton";

// TypeScript typings for Instagram embed API
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

// Define content type
type ContentType = "twitter" | "youtube" | "instagram" | "unknown";

interface CardProps {
  title: string;
  link: string;
  contentId: string;
  onDelete?: (id: string) => void;
  type?: ContentType;
}

export function Card({ title, link, contentId, onDelete, type: providedType }: CardProps) {
  const [deleting, setDeleting] = useState<boolean>(false);
  const [contentType, setContentType] = useState<ContentType>(providedType || "unknown");
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Detect content type from the link
  useEffect(() => {
    if (providedType) {
      setContentType(providedType);
    } else {
      let detectedType: ContentType = "unknown";
      
      if (link.includes("youtube.com") || link.includes("youtu.be")) {
        detectedType = "youtube";
      }
      else if (link.includes("twitter.com") || link.includes("x.com")) {
        detectedType = "twitter";
      }
      else if (link.includes("instagram.com")) {
        detectedType = "instagram";
      }
      
      setContentType(detectedType);
    }
  }, [link, providedType]);

  // Process Instagram embeds after rendering
  useEffect(() => {
    if (contentType === "instagram" && window.instgrm) {
      setTimeout(() => {
        window.instgrm?.Embeds?.process?.();
      }, 100);
    }
  }, [contentType]);

  async function deleteHandler() {
    try {
      setDeleting(true);

      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
        data: { contentId },
      });

      if (onDelete) {
        onDelete(contentId);
      }
    } catch (error) {
      console.error("Error deleting content:", error);
    } finally {
      setDeleting(false);
    }
  }

  // Helper function to get the appropriate icon and color
  const getIconAndColor = () => {
    switch (contentType) {
      case "youtube":
        return { icon: <YoutubeIcon />, color: "bg-red-50", textColor: "text-red-600" };
      case "twitter":
        return { icon: <TwitterIcon />, color: "bg-blue-50", textColor: "text-blue-500" };
      case "instagram":
        return { icon: <InstaIcon />, color: "bg-purple-50", textColor: "text-purple-600" };
      default:
        return { icon: null, color: "bg-gray-50", textColor: "text-gray-600" };
    }
  };

  // Helper function to transform YouTube links to embed format
  const getYoutubeEmbedLink = (youtubeLink: string) => {
    if (youtubeLink.includes("youtu.be/")) {
      const videoId = youtubeLink.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (youtubeLink.includes("watch?v=")) {
      return youtubeLink.replace("watch?v=", "embed/");
    }
    return youtubeLink;
  };

  // Create appropriate share text based on content type
  const getShareText = () => {
    return `Check out this ${contentType} content: "${title}" - ${link}`;
  };

  const { icon, color, textColor } = getIconAndColor();

  return (
    <div className="w-full md:w-72">
      <div 
        className={`p-4 bg-white rounded-lg shadow-md border border-gray-100 w-full min-h-48 flex flex-col transition-all duration-200 ${isHovered ? "shadow-lg transform scale-102" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Header */}
        <div className="flex justify-between items-center mb-3">
          <div className={`px-2 py-1 rounded-md ${color} ${textColor} flex items-center text-sm font-medium`}>
            <div className="mr-1">
              {icon}
            </div>
            <span>{contentType.charAt(0).toUpperCase() + contentType.slice(1)}</span>
          </div>

          <div className="flex items-center space-x-1">
            <ShareButton text={getShareText()} />
            
            <button
              onClick={deleteHandler}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              disabled={deleting}
              aria-label="Delete content"
            >
              {deleting ? (
                <div className="text-red-500 font-bold text-sm animate-pulse">Deleting...</div>
              ) : (
                <DeleteIcon />
              )}
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-medium text-gray-800 mb-2 line-clamp-1" title={title}>
          {title}
        </h3>

        {/* Content Display */}
        <div className="flex-grow overflow-hidden rounded-md bg-gray-50">
          {contentType === "youtube" && (
            <div className="relative pb-4 h-40 md:h-48">
              <iframe
                className="w-full h-full rounded-md"
                src={getYoutubeEmbedLink(link)}
                title={`YouTube video: ${title}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {contentType === "twitter" && (
            <div className="overflow-hidden h-48 flex items-center justify-center">
              <blockquote className="twitter-tweet">
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            </div>
          )}

          {contentType === "instagram" && (
            <div className="overflow-hidden h-48 flex items-center justify-center">
              <blockquote
                className="instagram-media"
                data-instgrm-captioned
                data-instgrm-permalink={link}
                data-instgrm-version="14"
                style={{
                  background: "#FFF",
                  border: "0",
                  borderRadius: "3px",
                  boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                  margin: "1px",
                  maxWidth: "540px",
                  minWidth: "326px",
                  padding: "0",
                  width: "99.375%"
                }}
              >
                <a href={link}></a>
              </blockquote>
            </div>
          )}

          {contentType === "unknown" && (
            <div className="flex items-center justify-center h-40 p-4">
              <p className="text-gray-500 text-center text-sm">
                Unsupported content type. Please use a YouTube, Twitter, or Instagram link.
              </p>
            </div>
          )}
        </div>

        {/* Link Preview */}
        <div className="mt-3 text-xs text-gray-500 truncate" title={link}>
          <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors duration-200">
            {link}
          </a>
        </div>
      </div>
    </div>
  );
}
import axios from "axios";
import { DeleteIcon } from "../icons/DeleteIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { InstaIcon } from "../icons/InstaIcon";
import { BACKEND_URL } from "../config";
import { useState, useEffect } from "react";
import ShareButton from "./ShareButton";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

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

  const getIconAndColor = () => {
    switch (contentType) {
      case "youtube":
        return { 
          icon: <YoutubeIcon />, 
          bgColor: "rgba(191, 9, 47, 0.08)", 
          textColor: "#BF092F",
          borderColor: "rgba(191, 9, 47, 0.2)"
        };
      case "twitter":
        return { 
          icon: <TwitterIcon />, 
          bgColor: "rgba(22, 71, 106, 0.08)", 
          textColor: "#16476A",
          borderColor: "rgba(22, 71, 106, 0.2)"
        };
      case "instagram":
        return { 
          icon: <InstaIcon />, 
          bgColor: "rgba(59, 151, 151, 0.08)", 
          textColor: "#3B9797",
          borderColor: "rgba(59, 151, 151, 0.2)"
        };
      default:
        return { 
          icon: null, 
          bgColor: "rgba(19, 36, 64, 0.08)", 
          textColor: "#132440",
          borderColor: "rgba(19, 36, 64, 0.2)"
        };
    }
  };

  const getYoutubeEmbedLink = (youtubeLink: string) => {
    if (youtubeLink.includes("youtu.be/")) {
      const videoId = youtubeLink.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (youtubeLink.includes("watch?v=")) {
      return youtubeLink.replace("watch?v=", "embed/");
    }
    return youtubeLink;
  };

  const getShareText = () => {
    return `Check out this ${contentType} content: "${title}" - ${link}`;
  };

  const { icon, bgColor, textColor, borderColor } = getIconAndColor();

  return (
    <div className="w-full animate-subtle-fade-in">
      <div className="premium-card p-4 sm:p-5 w-full min-h-[280px] sm:min-h-[300px] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-4 gap-3">
          <div 
            className="px-3 py-1.5 rounded-lg flex items-center text-xs sm:text-sm font-medium flex-shrink-0"
            style={{
              backgroundColor: bgColor,
              color: textColor,
              border: `1px solid ${borderColor}`
            }}
          >
            {icon && <div className="mr-1.5 flex-shrink-0">{icon}</div>}
            <span className="capitalize">{contentType}</span>
          </div>

          <div className="flex items-center space-x-1 flex-shrink-0">
            <ShareButton text={getShareText()} />
            
            <button
              onClick={deleteHandler}
              className="p-2 rounded-lg transition-all duration-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-1"
              style={{
                color: '#BF092F'
              }}
              disabled={deleting}
              aria-label="Delete content"
            >
              {deleting ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <DeleteIcon />
              )}
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-base sm:text-lg mb-4 line-clamp-2 leading-tight text-gray-900" 
            title={title}>
          {title}
        </h3>

        {/* Content */}
        <div className="flex-grow overflow-hidden rounded-lg bg-gray-50 mb-4">
          {contentType === "youtube" && (
            <div className="relative h-40 sm:h-48">
              <iframe
                className="w-full h-full rounded-lg"
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
            <div className="overflow-hidden h-40 sm:h-48 flex items-center justify-center p-4">
              <blockquote className="twitter-tweet">
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            </div>
          )}

          {contentType === "instagram" && (
            <div className="overflow-hidden h-40 sm:h-48 flex items-center justify-center p-4">
              <blockquote
                className="instagram-media"
                data-instgrm-captioned
                data-instgrm-permalink={link}
                data-instgrm-version="14"
                style={{
                  background: "#FFF",
                  border: "0",
                  borderRadius: "12px",
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
            <div className="flex items-center justify-center h-40 sm:h-48 p-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 bg-gray-100">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.16 6.16a4 4 0 00-5.66 0L6.34 7.34a4 4 0 105.66 5.66l1.06-1.06a4 4 0 000-5.66z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Unsupported content type
                </p>
                <p className="text-xs text-gray-500">
                  Use YouTube, Twitter, or Instagram links
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-gray-100">
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs sm:text-sm text-gray-500 hover:text-teal-600 transition-colors duration-200 block truncate"
            title={link}
          >
            {link}
          </a>
        </div>
      </div>
    </div>
  );
}
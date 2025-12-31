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
  const [isHovered, setIsHovered] = useState<boolean>(false);

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
          bgColor: "rgba(191, 9, 47, 0.1)", 
          textColor: "#BF092F",
          borderColor: "#BF092F"
        };
      case "twitter":
        return { 
          icon: <TwitterIcon />, 
          bgColor: "rgba(22, 71, 106, 0.1)", 
          textColor: "#16476A",
          borderColor: "#16476A"
        };
      case "instagram":
        return { 
          icon: <InstaIcon />, 
          bgColor: "rgba(59, 151, 151, 0.1)", 
          textColor: "#3B9797",
          borderColor: "#3B9797"
        };
      default:
        return { 
          icon: null, 
          bgColor: "rgba(19, 36, 64, 0.1)", 
          textColor: "#132440",
          borderColor: "#132440"
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
    <div className="w-full">
      <div 
        className={`glass-effect rounded-2xl p-5 w-full min-h-[300px] flex flex-col transition-all duration-300 card-hover ${
          isHovered ? "shadow-2xl" : "shadow-lg"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          border: `1px solid ${isHovered ? borderColor : 'rgba(255, 255, 255, 0.2)'}`,
          borderWidth: isHovered ? '2px' : '1px'
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <div 
            className="px-3 py-2 rounded-xl flex items-center text-sm font-semibold"
            style={{
              backgroundColor: bgColor,
              color: textColor,
              border: `1px solid ${borderColor}20`
            }}
          >
            <div className="mr-2">
              {icon}
            </div>
            <span>{contentType.charAt(0).toUpperCase() + contentType.slice(1)}</span>
          </div>

          <div className="flex items-center space-x-2">
            <ShareButton text={getShareText()} />
            
            <button
              onClick={deleteHandler}
              className="p-2 rounded-xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-200"
              style={{
                backgroundColor: deleting ? 'rgba(191, 9, 47, 0.1)' : 'rgba(191, 9, 47, 0.05)',
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

        <h3 className="font-bold text-lg mb-4 line-clamp-2 leading-tight" 
            style={{color: '#132440'}} 
            title={title}>
          {title}
        </h3>

        <div className="flex-grow overflow-hidden rounded-xl" 
             style={{backgroundColor: 'rgba(248, 250, 252, 0.5)'}}>
          {contentType === "youtube" && (
            <div className="relative h-48 md:h-56">
              <iframe
                className="w-full h-full rounded-xl"
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
            <div className="overflow-hidden h-48 md:h-56 flex items-center justify-center p-4">
              <blockquote className="twitter-tweet">
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            </div>
          )}

          {contentType === "instagram" && (
            <div className="overflow-hidden h-48 md:h-56 flex items-center justify-center p-4">
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
            <div className="flex items-center justify-center h-48 md:h-56 p-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                     style={{backgroundColor: 'rgba(19, 36, 64, 0.1)'}}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#132440'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.16 6.16a4 4 0 00-5.66 0L6.34 7.34a4 4 0 105.66 5.66l1.06-1.06a4 4 0 000-5.66z" />
                  </svg>
                </div>
                <p className="text-sm font-medium" style={{color: '#16476A'}}>
                  Unsupported content type
                </p>
                <p className="text-xs mt-1" style={{color: '#132440', opacity: 0.7}}>
                  Please use YouTube, Twitter, or Instagram links
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t" style={{borderColor: 'rgba(19, 36, 64, 0.1)'}}>
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm truncate block transition-colors duration-200 hover:underline"
            style={{color: '#3B9797'}}
            title={link}
            onMouseEnter={(e) => e.currentTarget.style.color = '#2A7A7A'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#3B9797'}
          >
            {link}
          </a>
        </div>
      </div>
    </div>
  );
}
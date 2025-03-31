import axios from "axios";
import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { InstaIcon } from "../icons/InstaIcon";
import { useEffect } from "react";

// Add this to handle TypeScript typings for the Instagram embed API
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "instagram";
  contentId: string; 
  onDelete?: (id: string) => void; 
}

export function Card({ title, link, type, contentId, onDelete }: CardProps) {
  const [deleting, setDeleting] = useState<boolean>(false);

  // Add this effect to process Instagram embeds after rendering
  useEffect(() => {
    if (type === "instagram" && window.instgrm) {
      setTimeout(() => {
        window.instgrm?.Embeds?.process?.();
      }, 100);
    }
  }, [type]);

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

  return (
    <div className="w-full md:w-72">
      <div className="p-3 md:p-4 bg-white rounded-md shadow-sm border-gray-200 w-full border min-h-36 md:min-h-48 flex flex-col">
        <div className="flex justify-between">
          <div className="flex justify-center items-center text-sm md:text-md text-black font-bold truncate max-w-36 md:max-w-44">
            <div className="text-gray-500 pr-1 md:pr-2 flex-shrink-0">
              {type === "youtube" ? <YoutubeIcon />: type === "twitter" ? <TwitterIcon />: <InstaIcon/>}
            </div>
            <span className="truncate">{title}</span>
          </div>

          <div className="flex justify-center items-center">
            <a
              href={link.replace("x.com", "twitter.com")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="pr-1 md:pr-2 text-gray-500">
                <ShareIcon />
              </div>
            </a>
            <div
              onClick={deleteHandler}
              className="text-gray-500 cursor-pointer"
            >
              {deleting ? (
                <div className="text-red-400 font-bold">"wait!"</div>
              ) : (
                <DeleteIcon />
              )}
            </div>
          </div>
        </div>

        <div className="pt-2 md:pt-4 flex-grow overflow-hidden">
          {type === "youtube" && (
            <iframe
              className="w-full h-40 md:h-48"
              src={link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && (
            <div className="overflow-hidden max-h-64">
              <blockquote className="twitter-tweet">
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            </div>
          )}

          {type === "instagram" && (
            <div className="overflow-hidden max-h-64">
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
        </div>
      </div>
    </div>
  );
}
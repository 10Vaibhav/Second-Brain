import { CrossIcon } from "../icons/Crossicon";
import { Button } from "./Button";
import { useRef, useState, useEffect } from "react";
import useOutsideClick from "./Custom_useOutSideClickHook";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Instagram = "instagram",
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const detectContentType = (url: string): ContentType => {
    const lowerCaseUrl = url.toLowerCase();
    
    if (lowerCaseUrl.includes("youtube.com") || lowerCaseUrl.includes("youtu.be")) {
      return ContentType.Youtube;
    } else if (lowerCaseUrl.includes("twitter.com") || lowerCaseUrl.includes("x.com")) {
      return ContentType.Twitter;
    } else if (lowerCaseUrl.includes("instagram.com")) {
      return ContentType.Instagram;
    }
    
    return ContentType.Youtube;
  };

  useEffect(() => {
    if (open && linkRef.current) {
      linkRef.current.addEventListener('input', handleLinkChange);
      
      return () => {
        if (linkRef.current) {
          linkRef.current.removeEventListener('input', handleLinkChange);
        }
      };
    }
  }, [open]);

  useEffect(() => {
    if (link) {
      const detectedType = detectContentType(link);
      setType(detectedType);
    }
  }, [link]);

  const handleLinkChange = () => {
    if (linkRef.current) {
      const currentLink = linkRef.current.value || "";
      setLink(currentLink);
    }
  };

  const handleTypeChange = (selectedType: ContentType) => {
    setType(selectedType);
  };

  async function addContent() {
    const title = titleRef.current?.value;
    const currentLink = linkRef.current?.value;

    if (!title || !currentLink) {
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          link: currentLink,
          title,
          type,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      onClose();
      
      if (titleRef.current) titleRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";
      setLink("");
      setType(ContentType.Youtube);
    } catch (error) {
      console.error("Error adding content:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onClose);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative w-full max-w-md animate-subtle-fade-in">
        <div
          ref={ref}
          className="bg-white rounded-2xl p-6 sm:p-8 w-full shadow-xl border border-gray-200"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Add New Content
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-all duration-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200 text-red-600"
            >
              <CrossIcon />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <Input 
              reference={titleRef} 
              placeholder="Enter content title"
              label="Title"
              helperText="Give your content a descriptive title"
            />
            <Input 
              reference={linkRef} 
              placeholder="Paste your link here"
              label="Link"
              helperText="YouTube, Twitter, or Instagram URL"
            />
          </div>

          {/* Content Type Selection */}
          <div className="mt-6">
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-900">
              Content Type
            </h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <Button
                text="YouTube"
                variant={type === ContentType.Youtube ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleTypeChange(ContentType.Youtube)}
              />
              <Button
                text="Twitter"
                variant={type === ContentType.Twitter ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleTypeChange(ContentType.Twitter)}
              />
              <Button
                text="Instagram"
                variant={type === ContentType.Instagram ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleTypeChange(ContentType.Instagram)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button
              onClick={onClose}
              size="md"
              variant="secondary"
              text="Cancel"
              fullWidth={true}
            />
            <Button
              onClick={addContent}
              size="md"
              variant="primary"
              text={isLoading ? "Adding..." : "Add Content"}
              loading={isLoading}
              fullWidth={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
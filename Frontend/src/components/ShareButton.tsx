import { useState } from "react";
import {
  FaWhatsapp,
  FaFacebookMessenger,
  FaTwitter,
  FaLinkedin,
  FaShare,
} from "react-icons/fa";

interface ShareButtonProps {
  text: string;
}

const ShareButton = ({ text }: ShareButtonProps) => {
  const [shareNow, setShareNow] = useState(false);
  const message = encodeURIComponent(text);

  // Social media share handlers
  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const handleMessengerShare = () => {
    window.open(
      `fb-messenger://share/?link=${message}`,
      "_blank"
    );
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${message}`, "_blank");
  };

  const handleLinkedInShare = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${message}`,
      "_blank"
    );
  };

  return (
    <div className="relative">
      {/* Main Share Button */}
      <button
        className="px-3 py-2 cursor-pointer text-white rounded-md flex items-center gap-2 bg-purple-600 hover:bg-purple-700 transition-colors text-sm"
        onClick={() => setShareNow(!shareNow)}
      >
        <span className="whitespace-nowrap">
          Share{!shareNow && <span className="ml-1">Now</span>}
        </span>
        <FaShare className="w-4 h-4" />
      </button>

      {/* Share Options Section */}
      {shareNow && (
        <section className="absolute z-50 left-0 mt-2 w-40">
          <div className="flex flex-col items-center justify-center bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-2">
            <h1 className="text-md font-semibold text-gray-100 mb-2">Share this content</h1>
            <div className="flex flex-col space-y-2 py-1">
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center cursor-pointer justify-start gap-3 p-2.5 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors w-full"
                title="Share on WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span className="text-sm">WhatsApp</span>
              </button>
              <button
                onClick={handleMessengerShare}
                className="flex items-center cursor-pointer justify-start gap-3 p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors w-full"
                title="Share on Messenger"
              >
                <FaFacebookMessenger className="w-5 h-5" />
                <span className="text-sm">Messenger</span>
              </button>
              <button
                onClick={handleTwitterShare}
                className="flex items-center cursor-pointer justify-start gap-3 p-2.5 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors w-full"
                title="Share on Twitter"
              >
                <FaTwitter className="w-5 h-5" />
                <span className="text-sm">Twitter</span>
              </button>
              <button
                onClick={handleLinkedInShare}
                className="flex items-center cursor-pointer justify-start gap-3 p-2.5 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors w-full"
                title="Share on LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
                <span className="text-sm">LinkedIn</span>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ShareButton;
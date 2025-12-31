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

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${message}`, "_blank");
    setShareNow(false);
  };

  const handleMessengerShare = () => {
    window.open(
      `fb-messenger://share/?link=${message}`,
      "_blank"
    );
    setShareNow(false);
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${message}`, "_blank");
    setShareNow(false);
  };

  const handleLinkedInShare = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${message}`,
      "_blank"
    );
    setShareNow(false);
  };

  return (
    <div className="relative">
      <button
        className="p-2 rounded-lg transition-all duration-200 hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:ring-offset-1 text-teal-600"
        onClick={() => setShareNow(!shareNow)}
      >
        <FaShare className="w-4 h-4" />
      </button>

      {shareNow && (
        <div className="absolute z-50 right-0 mt-2 w-48 animate-subtle-fade-in">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
            <h3 className="text-sm font-semibold mb-3 text-center text-gray-900">
              Share Content
            </h3>
            <div className="space-y-2">
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center justify-start gap-3 p-2.5 rounded-lg hover:bg-green-50 transition-all duration-200 w-full text-green-600 font-medium border border-green-200"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span className="text-sm">WhatsApp</span>
              </button>
              <button
                onClick={handleMessengerShare}
                className="flex items-center justify-start gap-3 p-2.5 rounded-lg hover:bg-blue-50 transition-all duration-200 w-full text-blue-600 font-medium border border-blue-200"
              >
                <FaFacebookMessenger className="w-4 h-4" />
                <span className="text-sm">Messenger</span>
              </button>
              <button
                onClick={handleTwitterShare}
                className="flex items-center justify-start gap-3 p-2.5 rounded-lg hover:bg-blue-50 transition-all duration-200 w-full text-blue-600 font-medium border border-blue-200"
              >
                <FaTwitter className="w-4 h-4" />
                <span className="text-sm">Twitter</span>
              </button>
              <button
                onClick={handleLinkedInShare}
                className="flex items-center justify-start gap-3 p-2.5 rounded-lg hover:bg-blue-50 transition-all duration-200 w-full text-blue-600 font-medium border border-blue-200"
              >
                <FaLinkedin className="w-4 h-4" />
                <span className="text-sm">LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;

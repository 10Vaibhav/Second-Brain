import React, { useState } from "react";
import {
  FaWhatsapp,
  FaFacebookMessenger,
  FaTwitter,
  FaLinkedin,
  FaShare,
} from "react-icons/fa";

const ShareButton = ({ text}) => {
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
        className="px-3 py-2 text-white rounded-md flex items-center gap-2 bg-purple-600 hover:bg-purple-700 transition-colors text-sm"
        onClick={() => setShareNow(!shareNow)}
      >
        <span className="whitespace-nowrap">
          Share{!shareNow && <span className="ml-1">Now</span>}
        </span>
        <FaShare className="w-4 h-4" />
      </button>

      {/* Share Options Section */}
      {shareNow && (
        <section className="absolute z-50 left-0 mt-2 w-64 sm:w-72">
          <div className="flex flex-col items-center justify-center bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4">
            <h1 className="text-lg font-semibold text-gray-100 mb-4">Share this content</h1>
            <div className="flex space-x-4 py-2">
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center justify-center p-2.5 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                title="Share on WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </button>
              <button
                onClick={handleMessengerShare}
                className="flex items-center justify-center p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                title="Share on Messenger"
              >
                <FaFacebookMessenger className="w-5 h-5" />
              </button>
              <button
                onClick={handleTwitterShare}
                className="flex items-center justify-center p-2.5 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
                title="Share on Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </button>
              <button
                onClick={handleLinkedInShare}
                className="flex items-center justify-center p-2.5 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
                title="Share on LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ShareButton;
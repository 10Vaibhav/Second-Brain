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
        className="p-2 rounded-xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-teal-200"
        style={{
          backgroundColor: 'rgba(59, 151, 151, 0.1)',
          color: '#3B9797'
        }}
        onClick={() => setShareNow(!shareNow)}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(59, 151, 151, 0.15)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(59, 151, 151, 0.1)'}
      >
        <FaShare className="w-4 h-4" />
      </button>

      {shareNow && (
        <div className="absolute z-50 right-0 mt-2 w-48 animate-fade-in">
          <div className="glass-effect rounded-2xl p-4 shadow-2xl"
               style={{
                 background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                 backdropFilter: 'blur(20px)',
                 border: '1px solid rgba(255, 255, 255, 0.3)'
               }}>
            <h3 className="text-sm font-semibold mb-3 text-center" style={{color: '#132440'}}>
              Share Content
            </h3>
            <div className="space-y-2">
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center justify-start gap-3 p-2.5 rounded-xl hover:scale-[1.02] transition-all duration-200 w-full text-white font-medium"
                style={{backgroundColor: '#25D366'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1DA851'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#25D366'}
              >
                <FaWhatsapp className="w-4 h-4" />
                <span className="text-sm">WhatsApp</span>
              </button>
              <button
                onClick={handleMessengerShare}
                className="flex items-center justify-start gap-3 p-2.5 rounded-xl hover:scale-[1.02] transition-all duration-200 w-full text-white font-medium"
                style={{backgroundColor: '#0084FF'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0066CC'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0084FF'}
              >
                <FaFacebookMessenger className="w-4 h-4" />
                <span className="text-sm">Messenger</span>
              </button>
              <button
                onClick={handleTwitterShare}
                className="flex items-center justify-start gap-3 p-2.5 rounded-xl hover:scale-[1.02] transition-all duration-200 w-full text-white font-medium"
                style={{backgroundColor: '#1DA1F2'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A91DA'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1DA1F2'}
              >
                <FaTwitter className="w-4 h-4" />
                <span className="text-sm">Twitter</span>
              </button>
              <button
                onClick={handleLinkedInShare}
                className="flex items-center justify-start gap-3 p-2.5 rounded-xl hover:scale-[1.02] transition-all duration-200 w-full text-white font-medium"
                style={{backgroundColor: '#0A66C2'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#004182'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0A66C2'}
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

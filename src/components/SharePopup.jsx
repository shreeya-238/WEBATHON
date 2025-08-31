import React from 'react';

const SharePopup = ({ isOpen, onClose, shareUrl, shareTitle, shareText }) => {
  if (!isOpen) return null;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        onClose();
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      alert('Web Share API is not supported in this browser. Please use the options below.');
    }
  };

  const shareOptions = [
    { name: 'Gmail', icon: '📧', url: `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText + ' ' + shareUrl)}` },
    { name: 'WhatsApp', icon: '💬', url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}` },
    { name: 'Facebook', icon: '🔵', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { name: 'Twitter', icon: '🐦', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}` },
    { name: 'LinkedIn', icon: '👔', url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(shareText)}` },
    { name: 'Copy Link', icon: '📋', action: () => {
        navigator.clipboard.writeText(shareUrl)
          .then(() => alert('Link copied to clipboard!'))
          .catch(err => console.error('Failed to copy: ', err));
        onClose();
      }
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold">&times;</button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Share weabthon!</h2>

        <div className="flex flex-col space-y-3">
          {navigator.share && (
            <button
              onClick={handleNativeShare}
              className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>
              <span>Share via Device</span>
            </button>
          )}

          <p className="text-center text-gray-600 mt-4 mb-3">Or share via:</p>

          <div className="grid grid-cols-2 gap-3">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => {
                  if (option.action) {
                    option.action();
                  } else {
                    window.open(option.url, '_blank');
                    onClose();
                  }
                }}
                className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl">{option.icon}</span>
                <span className="text-sm font-medium text-gray-700">{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePopup;

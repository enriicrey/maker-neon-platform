
import { useState } from 'react';
import { Share2, BookmarkIcon, Printer, Copy, Check } from 'lucide-react';

interface ShareActionsProps {
  title: string;
  url: string;
  variant?: 'sidebar' | 'floating';
}

const ShareActions = ({ title, url, variant = 'sidebar' }: ShareActionsProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL');
    }
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
  };

  const printPage = () => {
    window.print();
  };

  if (variant === 'floating') {
    return (
      <div className="relative">
        <button
          onClick={() => setShowActions(!showActions)}
          className="w-12 h-12 bg-dark-surface border border-dark-border text-white rounded-full flex items-center justify-center shadow-lg hover:bg-dark-bg transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
        
        {showActions && (
          <div className="absolute bottom-full right-0 mb-2 bg-dark-surface border border-dark-border rounded-lg p-2 shadow-xl min-w-40">
            <button
              onClick={shareToTwitter}
              className="w-full text-left px-3 py-2 text-sm hover:bg-dark-bg rounded transition-colors"
            >
              Compartir en Twitter
            </button>
            <button
              onClick={shareToLinkedIn}
              className="w-full text-left px-3 py-2 text-sm hover:bg-dark-bg rounded transition-colors"
            >
              Compartir en LinkedIn
            </button>
            <button
              onClick={copyToClipboard}
              className="w-full text-left px-3 py-2 text-sm hover:bg-dark-bg rounded transition-colors flex items-center justify-between"
            >
              Copiar enlace
              {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Acciones</h3>
      <div className="space-y-3">
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded transition-colors ${
            isBookmarked 
              ? 'bg-primary/10 text-primary' 
              : 'hover:bg-dark-bg text-gray-400'
          }`}
        >
          <BookmarkIcon className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          <span className="text-sm">{isBookmarked ? 'Guardado' : 'Guardar'}</span>
        </button>
        
        <button
          onClick={shareToTwitter}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded hover:bg-dark-bg text-gray-400 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span className="text-sm">Compartir en Twitter</span>
        </button>
        
        <button
          onClick={shareToLinkedIn}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded hover:bg-dark-bg text-gray-400 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span className="text-sm">Compartir en LinkedIn</span>
        </button>
        
        <button
          onClick={copyToClipboard}
          className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-dark-bg text-gray-400 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Copy className="w-4 h-4" />
            <span className="text-sm">Copiar enlace</span>
          </div>
          {copied && <Check className="w-4 h-4 text-primary" />}
        </button>
        
        <button
          onClick={printPage}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded hover:bg-dark-bg text-gray-400 transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span className="text-sm">Imprimir</span>
        </button>
      </div>
    </div>
  );
};

export default ShareActions;

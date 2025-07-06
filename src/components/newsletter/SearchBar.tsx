
import { useState, useEffect } from 'react';
import { Search, Command } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  suggestions?: string[];
  isLoading?: boolean;
}

const SearchBar = ({ 
  value, 
  onChange, 
  onSearch, 
  placeholder = "Buscar newsletters...",
  suggestions = [],
  isLoading = false 
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (value.trim()) {
        onSearch(value);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('newsletter-search')?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className={`relative flex items-center bg-dark-surface border rounded-lg transition-all duration-200 ${
        isFocused ? 'border-primary shadow-lg shadow-primary/20' : 'border-dark-border'
      }`}>
        <Search className={`w-5 h-5 ml-4 transition-colors ${
          isFocused ? 'text-primary' : 'text-muted-foreground'
        }`} />
        
        <input
          id="newsletter-search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(suggestions.length > 0);
          }}
          onBlur={() => {
            setIsFocused(false);
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none py-4 px-4 text-white placeholder-muted-foreground"
        />

        <div className="flex items-center space-x-2 pr-4">
          {isLoading && (
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          )}
          <div className="hidden sm:flex items-center space-x-1 text-xs text-muted-foreground bg-dark-bg px-2 py-1 rounded">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-dark-surface border border-dark-border rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
              Búsquedas populares
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-dark-bg rounded transition-colors"
              >
                <Search className="w-4 h-4 inline mr-2 text-muted-foreground" />
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

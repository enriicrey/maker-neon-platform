// XSS Prevention utilities
export const sanitizeHTML = (dirty: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  const reg = /[&<>"'/]/ig;
  return dirty.replace(reg, (match) => map[match]);
};

// Content Security Policy helper
export const setCSPHeaders = (): void => {
  if (typeof document !== 'undefined') {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https:",
      "media-src 'self'",
      "object-src 'none'",
      "frame-src 'none'"
    ].join('; ');
    
    document.head.appendChild(meta);
  }
};

// Rate limiting for client-side requests
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  isAllowed(key: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Filter out old requests
    const validRequests = requests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }
  
  reset(key: string): void {
    this.requests.delete(key);
  }
}

export const rateLimiter = new RateLimiter();

// JWT token validation (client-side basic check)
export const isValidJWTFormat = (token: string): boolean => {
  if (!token) return false;
  
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  
  try {
    // Basic format validation - not security validation
    parts.forEach(part => {
      atob(part.replace(/-/g, '+').replace(/_/g, '/'));
    });
    return true;
  } catch {
    return false;
  }
};

// Secure token storage
export const secureStorage = {
  setItem: (key: string, value: string): void => {
    try {
      // In production, consider using secure flags
      sessionStorage.setItem(key, value);
    } catch (error) {
      console.warn('Failed to store item securely:', error);
    }
  },
  
  getItem: (key: string): string | null => {
    try {
      return sessionStorage.getItem(key);
    } catch (error) {
      console.warn('Failed to retrieve item securely:', error);
      return null;
    }
  },
  
  removeItem: (key: string): void => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove item securely:', error);
    }
  },
  
  clear: (): void => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.warn('Failed to clear storage securely:', error);
    }
  }
};

// CSRF token management
export const csrfToken = {
  generate: (): string => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  },
  
  store: (token: string): void => {
    secureStorage.setItem('csrf_token', token);
  },
  
  get: (): string | null => {
    return secureStorage.getItem('csrf_token');
  },
  
  validate: (token: string): boolean => {
    const storedToken = csrfToken.get();
    return storedToken === token;
  }
};

// Security headers for production
export const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};
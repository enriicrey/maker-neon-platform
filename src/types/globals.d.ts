// Global type declarations for third-party libraries

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    dataLayer: any[];
    trackNewsletterSignup: (email: string, source: string) => void;
    trackProductView: (productId: string, productName: string, category: string, price: number) => void;
    trackAddToCart: (productId: string, productName: string, category: string, price: number, quantity?: number) => void;
    trackPurchase: (transactionId: string, value: number, items: any[]) => void;
    trackNewsletterOpen: (newsletterId: string, subject: string) => void;
    trackNewsletterClick: (newsletterId: string, linkUrl: string) => void;
  }
  
  var gtag: (...args: any[]) => void;
  var fbq: (...args: any[]) => void;
}
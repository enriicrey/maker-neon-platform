import React from 'react';
import { Helmet } from 'react-helmet-async';

interface GoogleAnalyticsProps {
  measurementId: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ measurementId }) => {
  return (
    <Helmet>
      {/* Google Analytics 4 */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', '${measurementId}', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true,
            custom_map: {
              'custom_dimension_1': 'user_type',
              'custom_dimension_2': 'subscription_status',
              'custom_dimension_3': 'device_type'
            }
          });
          
          // Enhanced E-commerce setup
          gtag('config', '${measurementId}', {
            allow_enhanced_conversions: true,
            enhanced_conversions: {
              email: true,
              phone_number: true,
              address: true
            }
          });
          
          // Custom events for newsletter tracking
          window.trackNewsletterSignup = function(email, source) {
            gtag('event', 'sign_up', {
              method: 'email',
              event_category: 'newsletter',
              event_label: source,
              custom_parameters: {
                newsletter_source: source,
                user_email_hash: btoa(email).substring(0, 10)
              }
            });
          };
          
          // Product tracking events
          window.trackProductView = function(productId, productName, category, price) {
            gtag('event', 'view_item', {
              currency: 'EUR',
              value: price,
              items: [{
                item_id: productId,
                item_name: productName,
                category: category,
                price: price,
                quantity: 1
              }]
            });
          };
          
          window.trackAddToCart = function(productId, productName, category, price, quantity = 1) {
            gtag('event', 'add_to_cart', {
              currency: 'EUR',
              value: price * quantity,
              items: [{
                item_id: productId,
                item_name: productName,
                category: category,
                price: price,
                quantity: quantity
              }]
            });
          };
          
          window.trackPurchase = function(transactionId, value, items) {
            gtag('event', 'purchase', {
              transaction_id: transactionId,
              value: value,
              currency: 'EUR',
              items: items.map(item => ({
                item_id: item.id,
                item_name: item.name,
                category: item.category,
                quantity: item.quantity,
                price: item.price
              }))
            });
          };
          
          // Newsletter engagement tracking
          window.trackNewsletterOpen = function(newsletterId, subject) {
            gtag('event', 'newsletter_open', {
              event_category: 'engagement',
              event_label: newsletterId,
              custom_parameters: {
                newsletter_subject: subject
              }
            });
          };
          
          window.trackNewsletterClick = function(newsletterId, linkUrl) {
            gtag('event', 'newsletter_click', {
              event_category: 'engagement',
              event_label: newsletterId,
              custom_parameters: {
                link_url: linkUrl
              }
            });
          };
          
          // Scroll depth tracking
          let scrollDepthMarks = {};
          window.addEventListener('scroll', function() {
            const scrollPercent = Math.round(
              (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            );
            
            [25, 50, 75, 90, 100].forEach(mark => {
              if (scrollPercent >= mark && !scrollDepthMarks[mark]) {
                scrollDepthMarks[mark] = true;
                gtag('event', 'scroll_depth', {
                  event_category: 'engagement',
                  event_label: mark + '%',
                  value: mark,
                  non_interaction: true
                });
              }
            });
          });
          
          // Time on page tracking
          let startTime = Date.now();
          window.addEventListener('beforeunload', function() {
            const timeOnPage = Math.round((Date.now() - startTime) / 1000);
            if (timeOnPage > 10) { // Only track if more than 10 seconds
              gtag('event', 'time_on_page', {
                event_category: 'engagement',
                value: timeOnPage,
                non_interaction: true
              });
            }
          });
          
          // Error tracking
          window.addEventListener('error', function(e) {
            gtag('event', 'exception', {
              description: e.error ? e.error.stack : e.message,
              fatal: false,
              event_category: 'javascript_error'
            });
          });
          
          // Unhandled promise rejection tracking
          window.addEventListener('unhandledrejection', function(e) {
            gtag('event', 'exception', {
              description: 'Unhandled Promise Rejection: ' + e.reason,
              fatal: false,
              event_category: 'promise_rejection'
            });
          });
        `}
      </script>
    </Helmet>
  );
};

export default GoogleAnalytics;
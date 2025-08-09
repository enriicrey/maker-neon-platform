const CACHE_NAME = 'maker-neon-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';
const OFFLINE_CACHE = 'offline-v1.0.0';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/fonts/inter.woff2',
  '/offline.html'
];

// API endpoints to cache
const CACHE_API_PATTERNS = [
  /\/api\/newsletters/,
  /\/api\/products/,
  /\/api\/user/
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      
      // Cache offline page
      caches.open(OFFLINE_CACHE).then((cache) => {
        return cache.add('/offline.html');
      })
    ]).then(() => {
      console.log('Service Worker: Installation complete');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE && 
              cacheName !== OFFLINE_CACHE) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation complete');
      return self.clients.claim();
    })
  );
});

// Fetch event - network first strategy with offline fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Handle different types of requests
  if (request.destination === 'document') {
    // Pages - Network first, cache fallback
    event.respondWith(handlePageRequest(request));
  } else if (STATIC_ASSETS.some(asset => request.url.includes(asset))) {
    // Static assets - Cache first
    event.respondWith(handleStaticRequest(request));
  } else if (CACHE_API_PATTERNS.some(pattern => pattern.test(request.url))) {
    // API requests - Network first with cache fallback
    event.respondWith(handleAPIRequest(request));
  } else if (request.destination === 'image') {
    // Images - Cache first
    event.respondWith(handleImageRequest(request));
  } else {
    // Everything else - Network first
    event.respondWith(handleNetworkFirst(request));
  }
});

// Handle page requests
async function handlePageRequest(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    // Return offline page for navigation requests
    return caches.match('/offline.html');
  }
}

// Handle static asset requests
async function handleStaticRequest(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.log('Static asset not available:', request.url);
    throw error;
  }
}

// Handle API requests
async function handleAPIRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Only cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Handle image requests
async function handleImageRequest(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    // Return placeholder image for failed image requests
    return new Response(
      '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy="0.3em" fill="#9ca3af">Imagen no disponible</text></svg>',
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
}

// Network first strategy
async function handleNetworkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync:', event.tag);
  
  if (event.tag === 'wishlist-sync') {
    event.waitUntil(syncWishlist());
  } else if (event.tag === 'newsletter-sync') {
    event.waitUntil(syncNewsletterActions());
  } else if (event.tag === 'comment-sync') {
    event.waitUntil(syncComments());
  }
});

// Push notification handler
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    badge: '/icons/badge-72x72.png',
    icon: '/icons/icon-192x192.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver Detalles',
        icon: '/icons/action-explore.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/icons/action-close.png'
      }
    ]
  };

  if (event.data) {
    const data = event.data.json();
    options.title = data.title || 'Maker Neon Platform';
    options.body = data.body || 'Tienes una nueva notificación';
    options.image = data.image;
    options.tag = data.tag || 'general';
    options.data = { ...options.data, ...data };
  } else {
    options.title = 'Maker Neon Platform';
    options.body = 'Tienes una nueva notificación';
  }

  event.waitUntil(
    self.registration.showNotification(options.title, options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification click received');
  
  event.notification.close();
  
  const action = event.action;
  const data = event.notification.data;
  
  if (action === 'close') {
    return;
  }
  
  let url = '/';
  if (data && data.url) {
    url = data.url;
  } else if (action === 'explore' && data && data.productId) {
    url = `/products/${data.productId}`;
  }
  
  event.waitUntil(
    clients.matchAll().then((clientList) => {
      // Try to focus existing window
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      
      // Open new window
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Sync functions
async function syncWishlist() {
  try {
    const request = await fetch('/api/sync/wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('Wishlist synced successfully');
  } catch (error) {
    console.error('Failed to sync wishlist:', error);
    throw error;
  }
}

async function syncNewsletterActions() {
  try {
    const request = await fetch('/api/sync/newsletters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('Newsletter actions synced successfully');
  } catch (error) {
    console.error('Failed to sync newsletter actions:', error);
    throw error;
  }
}

async function syncComments() {
  try {
    const request = await fetch('/api/sync/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('Comments synced successfully');
  } catch (error) {
    console.error('Failed to sync comments:', error);
    throw error;
  }
}
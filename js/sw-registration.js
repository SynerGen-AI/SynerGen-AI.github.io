// Service Worker Registration for SynerGen-AI
(function() {
  'use strict';

  // Check if service workers are supported
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
          
          // Check for updates
          registration.addEventListener('updatefound', function() {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', function() {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available
                if (confirm('New content is available. Refresh to update?')) {
                  window.location.reload();
                }
              }
            });
          });
        })
        .catch(function(err) {
          console.log('ServiceWorker registration failed: ', err);
        });
    });
  } else {
    console.log('Service workers are not supported in this browser.');
  }

  // Handle offline/online status
  function updateOnlineStatus() {
    const status = navigator.onLine ? 'online' : 'offline';
    document.body.classList.toggle('offline', !navigator.onLine);
    
    if (!navigator.onLine) {
      showOfflineNotification();
    }
  }

  function showOfflineNotification() {
    const notification = document.createElement('div');
    notification.className = 'offline-notification';
    notification.innerHTML = `
      <div class="offline-message">
        <span>You are currently offline. Some features may be limited.</span>
        <button onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;
    
    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #ff6b6b;
      color: white;
      padding: 10px;
      text-align: center;
      z-index: 9999;
      font-family: Arial, sans-serif;
    `;
    
    document.body.insertBefore(notification, document.body.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);
  }

  // Listen for online/offline events
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  // Initial status check
  updateOnlineStatus();

  // Background sync registration
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    navigator.serviceWorker.ready.then(function(registration) {
      return registration.sync.register('background-sync');
    }).catch(function(err) {
      console.log('Background sync registration failed:', err);
    });
  }

  // Push notification setup
  function initializePushNotifications() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        }
      });
    }
  }

  // Initialize push notifications after page load
  window.addEventListener('load', initializePushNotifications);

})();
// Snackbar notification system for SynerGen-AI
(function() {
  'use strict';

  // Snackbar class
  class Snackbar {
    constructor() {
      this.container = null;
      this.init();
    }

    init() {
      // Create snackbar container
      this.container = document.createElement('div');
      this.container.className = 'snackbar-container';
      this.container.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10000;
        pointer-events: none;
      `;
      document.body.appendChild(this.container);
    }

    show(message, type = 'info', duration = 3000) {
      const snackbar = document.createElement('div');
      snackbar.className = `snackbar snackbar-${type}`;
      snackbar.textContent = message;
      
      // Styles
      const colors = {
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336'
      };
      
      snackbar.style.cssText = `
        background-color: ${colors[type] || colors.info};
        color: white;
        padding: 16px 24px;
        border-radius: 4px;
        margin-bottom: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        font-family: Arial, sans-serif;
        font-size: 14px;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        pointer-events: auto;
        max-width: 400px;
        word-wrap: break-word;
      `;
      
      this.container.appendChild(snackbar);
      
      // Animate in
      setTimeout(() => {
        snackbar.style.opacity = '1';
        snackbar.style.transform = 'translateY(0)';
      }, 10);
      
      // Auto remove
      setTimeout(() => {
        this.hide(snackbar);
      }, duration);
      
      // Click to dismiss
      snackbar.addEventListener('click', () => {
        this.hide(snackbar);
      });
      
      return snackbar;
    }

    hide(snackbar) {
      snackbar.style.opacity = '0';
      snackbar.style.transform = 'translateY(-20px)';
      
      setTimeout(() => {
        if (snackbar.parentElement) {
          snackbar.parentElement.removeChild(snackbar);
        }
      }, 300);
    }

    info(message, duration) {
      return this.show(message, 'info', duration);
    }

    success(message, duration) {
      return this.show(message, 'success', duration);
    }

    warning(message, duration) {
      return this.show(message, 'warning', duration);
    }

    error(message, duration) {
      return this.show(message, 'error', duration);
    }
  }

  // Create global instance
  window.Snackbar = new Snackbar();

  // Utility functions
  window.showSnackbar = function(message, type, duration) {
    return window.Snackbar.show(message, type, duration);
  };

  window.showInfo = function(message, duration) {
    return window.Snackbar.info(message, duration);
  };

  window.showSuccess = function(message, duration) {
    return window.Snackbar.success(message, duration);
  };

  window.showWarning = function(message, duration) {
    return window.Snackbar.warning(message, duration);
  };

  window.showError = function(message, duration) {
    return window.Snackbar.error(message, duration);
  };

  // Auto-show notifications for form submissions
  document.addEventListener('DOMContentLoaded', function() {
    // Handle contact form submissions
    const contactForms = document.querySelectorAll('form[data-snackbar]');
    contactForms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        showInfo('Sending message...', 1000);
        
        setTimeout(() => {
          showSuccess('Message sent successfully! We\'ll get back to you soon.', 4000);
          form.reset();
        }, 1000);
      });
    });
    
    // Handle newsletter subscriptions
    const newsletterForms = document.querySelectorAll('form[data-newsletter]');
    newsletterForms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]');
        if (email && email.value) {
          showSuccess('Successfully subscribed to our newsletter!', 3000);
          form.reset();
        } else {
          showError('Please enter a valid email address.', 3000);
        }
      });
    });
  });

  // Handle copy-to-clipboard notifications
  document.addEventListener('click', function(e) {
    if (e.target.matches('[data-copy]')) {
      const textToCopy = e.target.getAttribute('data-copy') || e.target.textContent;
      
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showSuccess('Copied to clipboard!', 2000);
        }).catch(() => {
          showError('Failed to copy to clipboard.', 2000);
        });
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
          document.execCommand('copy');
          showSuccess('Copied to clipboard!', 2000);
        } catch (err) {
          showError('Failed to copy to clipboard.', 2000);
        }
        
        document.body.removeChild(textArea);
      }
    }
  });

})();
// Futuristic Event Platform - Main Application Logic

document.addEventListener('DOMContentLoaded', () => {
  // --- Page Transitions ---
  const links = document.querySelectorAll('a[href]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      
      // Ignore anchors or external links
      if (target.startsWith('#') || target.startsWith('http') || target === '') return;
      
      e.preventDefault();
      
      // Animate out current page
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.4s ease';
      
      setTimeout(() => {
        window.location.href = target;
      }, 400);
    });
  });

  // --- Initial Page Load Animation ---
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.6s ease';
  }, 100);

  // --- Mobile Navigation ---
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  
  const navItems = document.querySelectorAll('.mobile-nav-item');
  navItems.forEach(item => {
    if (item.getAttribute('href') === page) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // --- Header Scroll Effect ---
  const header = document.querySelector('.navbar');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.boxShadow = 'var(--shadow-glass)';
        header.style.background = 'var(--bg-glass-hover)';
      } else {
        header.style.boxShadow = 'none';
        header.style.background = 'var(--bg-surface)';
      }
    });
  }

  // --- Lazy Loading Images Simulation ---
  const lazyImages = document.querySelectorAll('img');
  lazyImages.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    
    img.onload = () => {
      img.style.opacity = '1';
    };
    
    // Fallback if already loaded
    if(img.complete) img.style.opacity = '1';
  });

  // --- Initialize Toast Container ---
  const toastContainer = document.createElement('div');
  toastContainer.id = 'toast-container';
  document.body.appendChild(toastContainer);
});

// --- Global Toast Function ---
window.showToast = function(title, message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let iconClass = 'fa-solid fa-check-circle';
  let accentColor = 'var(--accent-primary)';
  
  if (type === 'error') {
    iconClass = 'fa-solid fa-circle-exclamation';
    accentColor = 'var(--accent-tertiary)';
  } else if (type === 'info') {
    iconClass = 'fa-solid fa-info-circle';
    accentColor = 'var(--accent-secondary)';
  }
  
  toast.style.borderLeftColor = accentColor;

  toast.innerHTML = `
    <i class="${iconClass} toast-icon" style="color: ${accentColor}"></i>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

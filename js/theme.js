// Futuristic Event Platform - Theme Management

class ThemeManager {
  constructor() {
    this.themeToggleBtn = document.getElementById('themeToggle');
    this.currentTheme = localStorage.getItem('theme') || 'dark'; // Default to dark mode for futuristic feel
    
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
      this.updateToggleButton();
    }
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light-mode-active');
    } else {
      document.body.classList.remove('light-mode-active');
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', this.currentTheme);
    this.applyTheme(this.currentTheme);
    this.updateToggleButton();
    
    // Dispatch event for other components if needed
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: this.currentTheme } }));
  }

  updateToggleButton() {
    if (!this.themeToggleBtn) return;
    
    const icon = this.themeToggleBtn.querySelector('i') || this.themeToggleBtn;
    if (this.currentTheme === 'light') {
      icon.className = 'fas fa-moon'; // Assuming FontAwesome usage
    } else {
      icon.className = 'fas fa-sun';
    }
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  window.themeManager = new ThemeManager();
});

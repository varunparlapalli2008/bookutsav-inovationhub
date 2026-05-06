// Futuristic Event Platform - Authentication Logic

document.addEventListener('DOMContentLoaded', () => {
  
  // --- Splash Screen Logic ---
  const splash = document.getElementById('splashScreen');
  const authContainer = document.getElementById('authContainer');
  
  if (splash && authContainer) {
    // Hide auth container initially
    authContainer.style.display = 'none';
    
    // Simulate loading
    setTimeout(() => {
      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.style.display = 'none';
        authContainer.style.display = 'flex';
        // Trigger enter animation
        authContainer.classList.add('page-transition-enter');
      }, 800);
    }, 2500); // 2.5s splash screen
  }

  // --- Form Toggling ---
  const showSignupBtn = document.getElementById('showSignup');
  const showLoginBtn = document.getElementById('showLogin');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  
  if (showSignupBtn && showLoginBtn && loginForm && signupForm) {
    showSignupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';
      signupForm.classList.add('page-transition-enter');
    });
    
    showLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      signupForm.style.display = 'none';
      loginForm.style.display = 'block';
      loginForm.classList.add('page-transition-enter');
    });
  }

  // --- Fake Authentication Validation ---
  const doLoginBtn = document.getElementById('doLogin');
  const doSignupBtn = document.getElementById('doSignup');
  
  if (doLoginBtn) {
    doLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const pass = document.getElementById('loginPass').value;
      
      if (!email || !pass) {
        showError(loginForm, 'Please fill in all fields with neon precision.');
        return;
      }
      
      // Simulate loading state
      const originalText = doLoginBtn.innerHTML;
      doLoginBtn.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:2px;margin:auto;"></div>';
      
      setTimeout(() => {
        localStorage.setItem('currentUser', JSON.stringify({ email: email, name: email.split('@')[0] }));
        window.location.href = 'role-selection.html';
      }, 1500);
    });
  }

  if (doSignupBtn) {
    doSignupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('signupName').value;
      const email = document.getElementById('signupEmail').value;
      const pass = document.getElementById('signupPass').value;
      
      if (!name || !email || !pass) {
        showError(signupForm, 'All fields are required to join the bookutsav.');
        return;
      }
      
      // Simulate loading state
      const originalText = doSignupBtn.innerHTML;
      doSignupBtn.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:2px;margin:auto;"></div>';
      
      setTimeout(() => {
        localStorage.setItem('currentUser', JSON.stringify({ email: email, name: name }));
        window.location.href = 'role-selection.html';
      }, 1500);
    });
  }

  // --- Forgot Password Logic ---
  const forgotPassBtn = document.getElementById('forgotPassBtn');
  if (forgotPassBtn) {
    forgotPassBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      if (!email) {
        showError(loginForm, 'Please enter your email to reset password.');
        return;
      }
      if (window.showToast) {
        window.showToast('Reset Link Sent', `A recovery link has been sent to ${email}`, 'info');
      }
    });
  }

  // --- Social Login Logic ---
  const socialBtns = document.querySelectorAll('.social-btn');
  socialBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const provider = btn.getAttribute('data-provider');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
      
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        if (window.showToast) {
          window.showToast('Authentication Successful', `Logged in securely via ${provider}`, 'success');
        }
        setTimeout(() => {
          localStorage.setItem('currentUser', JSON.stringify({ email: `user@${provider.toLowerCase()}.com`, name: `${provider} User` }));
          window.location.href = 'role-selection.html';
        }, 1000);
      }, 1500);
    });
  });

  function showError(form, msg) {
    let errDiv = form.querySelector('.auth-error');
    if (!errDiv) {
      errDiv = document.createElement('div');
      errDiv.className = 'auth-error';
      errDiv.style.color = 'var(--accent-tertiary)';
      errDiv.style.marginBottom = 'var(--space-md)';
      errDiv.style.fontSize = '0.875rem';
      errDiv.style.textAlign = 'center';
      form.insertBefore(errDiv, form.querySelector('.btn-primary'));
    }
    errDiv.textContent = msg;
    
    // Shake animation
    form.style.transform = 'translateX(-10px)';
    setTimeout(() => form.style.transform = 'translateX(10px)', 100);
    setTimeout(() => form.style.transform = 'translateX(-10px)', 200);
    setTimeout(() => form.style.transform = 'translateX(0)', 300);
  }

});

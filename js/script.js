/* ==========================================
   GLOBALX - INTERACTIVE FUNCTIONALITY
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  // Smooth Scroll for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Navbar Background on Scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 14, 39, 0.95)';
      navbar.style.borderBottom = '1px solid rgba(0, 217, 255, 0.2)';
    } else {
      navbar.style.background = 'rgba(10, 14, 39, 0.8)';
      navbar.style.borderBottom = '1px solid rgba(0, 217, 255, 0.1)';
    }
  });

  // Animate Stats on Scroll
  const statsCards = document.querySelectorAll('.stat-card');
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideUp 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  statsCards.forEach(card => {
    observer.observe(card);
  });

  // Form Handling
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your message! We\'ll get back to you soon.');
      contactForm.reset();
    });
  }

  // Button Click Effects
  document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(btn => {
    btn.addEventListener('click', function(event) {
      createRipple(event, this);
    });
  });

  function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    const rippleEl = element.querySelector('.ripple');
    if (rippleEl) {
      rippleEl.remove();
    }

    element.appendChild(ripple);
  }

  // Lazy Loading for Images
  const images = document.querySelectorAll('img');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          observer.unobserve(entry.target);
        }
      });
    });

    images.forEach(img => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease';
      imageObserver.observe(img);
    });
  }

  // Hover Effects on Cards
  document.querySelectorAll('.feature-card, .product-card, .tournament-card, .stat-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
  button {
    position: relative;
    overflow: hidden;
  }

  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 217, 255, 0.3);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 217, 255, 0.5);
  }
`;
document.head.appendChild(style);

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
  // Page loader
  const loader = document.querySelector('.loader');
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => {
        document.body.removeChild(loader);
        
        // Start animations after loader is gone
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(element => {
          element.classList.add('aos-animate');
        });
      }, 600);
    }, 1000);
  });

  // Mobile menu toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
  
  // Close mobile menu when clicking on a link
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
  
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });

  // Header scroll effect
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Application carousel
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselItems = document.querySelectorAll('.application-card');
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');
  const dots = document.querySelectorAll('.dot');
  
  let currentIndex = 0;
  let itemWidth;
  let itemsPerView;
  
  function updateCarouselLayout() {
    const carouselWidth = carouselTrack.parentElement.offsetWidth;
    
    if (window.innerWidth >= 992) {
      itemsPerView = 4;
    } else if (window.innerWidth >= 768) {
      itemsPerView = 3;
    } else if (window.innerWidth >= 576) {
      itemsPerView = 2;
    } else {
      itemsPerView = 1;
    }
    
    itemWidth = (carouselWidth - ((itemsPerView - 1) * 32)) / itemsPerView;
    
    carouselItems.forEach(item => {
      item.style.minWidth = `${itemWidth}px`;
    });
    
    updateCarousel();
  }
  
  function updateCarousel() {
    const offset = -currentIndex * (itemWidth + 32);
    carouselTrack.style.transform = `translateX(${offset}px)`;
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
    
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= carouselItems.length - itemsPerView;
  }
  
  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });
  
  nextButton.addEventListener('click', () => {
    if (currentIndex < carouselItems.length - itemsPerView) {
      currentIndex++;
      updateCarousel();
    }
  });
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });
  
  window.addEventListener('resize', updateCarouselLayout);
  updateCarouselLayout();

  // Form submission
  const demoForm = document.getElementById('demoForm');
  const formSuccess = document.getElementById('formSuccess');
  
  if (demoForm) {
    demoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulate form submission
      const submitButton = demoForm.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      
      submitButton.disabled = true;
      submitButton.innerHTML = '<span>Processing...</span>';
      
      setTimeout(() => {
        demoForm.reset();
        formSuccess.classList.add('active');
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        setTimeout(() => {
          formSuccess.classList.remove('active');
        }, 5000);
      }, 1500);
    });
  }

  // Lazy load images
  const lazyImages = document.querySelectorAll('.lazy-load');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src; // This triggers the actual load
          
          img.onload = () => {
            img.classList.add('loaded');
          };
          
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.src;
      img.classList.add('loaded');
    });
  }

  // Add simple animation to elements as they scroll into view
  function revealOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .tech-spec, .application-card');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        element.classList.add('aos-animate');
      }
    });
  }
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Run once on load
});

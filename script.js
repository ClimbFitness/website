// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

  const fadeInElements = document.querySelectorAll('.fade-in-element');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { 
    threshold: 0.2, // When 20% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Adjust the trigger point
  });

  if (fadeInElements.length) {
    fadeInElements.forEach(element => {
      fadeObserver.observe(element);
    });
  }
      // Mobile menu functionality
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      menu.classList.toggle('active');
    });
  }
  
  // Pricing card toggle functionality
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  if (toggleBtns.length) {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all toggles
        toggleBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // Update price if needed
        const priceElement = this.closest('.pricing-card-large').querySelector('.price-tag h2');
        if (priceElement) {
          if (this.textContent.trim() === 'Annually') {
            priceElement.innerHTML = '€20<span>/mo</span>';
            // Update billing info
            const billingInfo = this.closest('.pricing-card-large').querySelector('.billing-info');
            if (billingInfo) {
              billingInfo.textContent = '€240 BILLED ANNUALLY';
            }
          } else {
            priceElement.innerHTML = '€25<span>/mo</span>';
            // Update billing info
            const billingInfo = this.closest('.pricing-card-large').querySelector('.billing-info');
            if (billingInfo) {
              billingInfo.textContent = '€75 BILLED QUARTERLY';
            }
          }
        }
      });
    });
  }
  
  // Simple smooth scrolling without velocity capping (better performance)
  const menuItems = document.querySelectorAll('.menu p[data-target]');
  menuItems.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (hamburger && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
      }
      
      const targetId = this.getAttribute('data-target');
      if (targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          // Standard smooth scroll - simpler and more reliable
          targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // Handle button links too
  const buttonLinks = document.querySelectorAll('a[href^="#"]');
  buttonLinks.forEach(button => {
    button.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      if (targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          e.preventDefault();
          targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // Navbar transparency change on scroll
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(7, 6, 6, 0.9)';
      nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
      nav.style.background = 'rgba(7, 6, 6, 0.7)';
      nav.style.boxShadow = 'none';
    }
  });
  
  // Animate pricing cards on scroll
  const pricingCards = document.querySelectorAll('.pricing-card-large, .pricing-card-long');
  const contactForm = document.querySelector('.contact-form');
  
  // Intersection Observer for animation on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1 });
  
  // Observe pricing cards
  pricingCards.forEach(card => {
    // Set initial state
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    
    observer.observe(card);
    // Add random delay to stagger animation
    const delay = Math.random() * 0.5;
    card.style.transitionDelay = `${delay}s`;
  });
  
  // Observe contact form
  if (contactForm) {
    observer.observe(contactForm);
  }
  
  // Add parallax effect to blobs
  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const yellowBlob = document.querySelector('.yellow');
    const redBlob = document.querySelector('.red');
    const greenBlob = document.querySelector('.green');
    
    if (yellowBlob && redBlob && greenBlob) {
      yellowBlob.style.transform = `translate(${mouseX * 50}px, ${mouseY * 50}px) scale(1)`;
      redBlob.style.transform = `translate(${-mouseX * 50}px, ${-mouseY * 50}px) scale(1)`;
      greenBlob.style.transform = `translate(${-mouseX * 30}px, ${mouseY * 30}px) scale(1.2)`;
    }
  });
  
  // Form validation
  const contactFormElement = document.getElementById('contactForm');
  
  if (contactFormElement) {
    contactFormElement.addEventListener('submit', function(e) {
      // We don't need to prevent default anymore as we want the form to submit to FormSubmit.co
      // e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      let isValid = true;
      
      // Simple validation
      if (nameInput.value.trim() === '') {
        highlightError(nameInput);
        isValid = false;
      } else {
        removeError(nameInput);
      }
      
      if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
        highlightError(emailInput);
        isValid = false;
      } else {
        removeError(emailInput);
      }
      
      if (messageInput.value.trim() === '') {
        highlightError(messageInput);
        isValid = false;
      } else {
        removeError(messageInput);
      }
      
      // If validation fails, prevent form submission
      if (!isValid) {
        e.preventDefault();
      }
      
      // The rest of the functionality is handled by FormSubmit.co
    });
  }
  
  function highlightError(element) {
    element.style.borderColor = 'rgba(255, 69, 0, 0.7)';
    element.style.boxShadow = '0 0 0 2px rgba(255, 69, 0, 0.2)';
  }
  
  function removeError(element) {
    element.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    element.style.boxShadow = 'none';
  }
  
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  // Add glassmorphism animations to pricing cards
  const addGlassmorphismEffects = () => {
    const cards = document.querySelectorAll('.pricing-card-large, .pricing-card-long');
    
    cards.forEach(card => {
      // Create shine effect
      const shine = document.createElement('div');
      shine.classList.add('card-shine');
      shine.style.position = 'absolute';
      shine.style.top = '0';
      shine.style.left = '0';
      shine.style.width = '100%';
      shine.style.height = '100%';
      shine.style.opacity = '0';
      shine.style.background = 'radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)';
      shine.style.transition = 'opacity 0.2s ease';
      shine.style.pointerEvents = 'none';
      
      card.appendChild(shine);
      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      
      // Add mouse move listener for shine effect
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Set CSS variables for gradient position
        shine.style.setProperty('--x', `${x}px`);
        shine.style.setProperty('--y', `${y}px`);
        
        // Show the shine
        shine.style.opacity = '1';
      });
      
      // Hide shine when mouse leaves
      card.addEventListener('mouseleave', () => {
        shine.style.opacity = '0';
      });
    });
  };
  
  // Initialize glassmorphism effects
  addGlassmorphismEffects();

  // Initialize Tab System
  gsap.registerPlugin(CustomEase, Flip);

  CustomEase.create("osmo-ease", "0.625, 0.05, 0, 1");

  gsap.defaults({
    ease: "osmo-ease",
    duration: 0.8,
  });

  function initFlipButtons() {
    let wrappers = document.querySelectorAll('[data-flip-button="wrap"]');
    
    wrappers.forEach((wrapper) => {
      let buttons = wrapper.querySelectorAll('[data-flip-button="button"]');
      let bg = wrapper.querySelector('[data-flip-button="bg"]');
      
      // If bg doesn't exist, create it
      if (!bg && buttons.length > 0) {
        bg = document.createElement('div');
        bg.setAttribute('data-flip-button', 'bg');
        bg.classList.add('tab-button__bg');
        buttons[0].appendChild(bg);
      }
      
      buttons.forEach(function (button) {
        // Handle click for standard button functionality
        button.addEventListener("click", function() {
          buttons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          
          if (bg) {
            const state = Flip.getState(bg);
            this.appendChild(bg);
            Flip.from(state, {
              duration: 0.4,
            });
          }
        });
        
        // Handle mouse enter
        button.addEventListener("mouseenter", function () {
          if (bg) {
            const state = Flip.getState(bg);
            this.appendChild(bg);
            Flip.from(state, {
              duration: 0.4,
            });
          }
        });

        // Handle focus for keyboard navigation
        button.addEventListener("focus", function () {
          if (bg) {
            const state = Flip.getState(bg);
            this.appendChild(bg);
            Flip.from(state, {
              duration: 0.4,
            });
          }
        });

        // Handle mouse leave
        button.addEventListener("mouseleave", function () {
          if (bg) {
            const state = Flip.getState(bg);
            const activeLink = wrapper.querySelector(".active") || buttons[0];
            activeLink.appendChild(bg);
            Flip.from(state, {
              duration: 0.4,
            });
          }
        });

        // Handle blur to reset background for keyboard navigation
        button.addEventListener("blur", function () {
          if (bg) {
            const state = Flip.getState(bg);
            const activeLink = wrapper.querySelector(".active") || buttons[0];
            activeLink.appendChild(bg);
            Flip.from(state, {
              duration: 0.4,
            });
          }
        });
      });
    });
  }

  function initTabSystem(){
    let wrappers = document.querySelectorAll('[data-tabs="wrapper"]')
    
    wrappers.forEach((wrapper) => {
      let nav = wrapper.querySelector('[data-tabs="nav"]');
      if (!nav) return;
      
      let buttons = nav.querySelectorAll('[data-tabs="button"]');
      let contentWrap = wrapper.querySelector('[data-tabs="content-wrap"]');
      if (!contentWrap) return;
      
      let contentItems = contentWrap.querySelectorAll('[data-tabs="content-item"]');
      let visualWrap = wrapper.querySelector('[data-tabs="visual-wrap"]');
      if (!visualWrap) return;
      
      let visualItems = visualWrap.querySelectorAll('[data-tabs="visual-item"]');

      // Ensure we have all necessary elements
      if (buttons.length === 0 || contentItems.length === 0 || visualItems.length === 0) return;

      let activeButton = buttons[0];
      let activeContent = contentItems[0];
      let activeVisual = visualItems[0];
      let isAnimating = false;

      function switchTab(index, initial = false) {
        if (!initial && (isAnimating || buttons[index] === activeButton)) return; // ignore click if the clicked button is already active 
        if (index >= contentItems.length || index >= visualItems.length) return; // safety check
        
        isAnimating = true; // keep track of whether or not one is moving, to prevent overlap

        const outgoingContent = activeContent;
        const incomingContent = contentItems[index];
        const outgoingVisual = activeVisual;
        const incomingVisual = visualItems[index];

        let outgoingLines = outgoingContent.querySelectorAll("[data-tabs-fade]") || [];
        let incomingLines = incomingContent.querySelectorAll("[data-tabs-fade]");

        const timeline = gsap.timeline({
          defaults:{
            ease:"power3.inOut"
          },
          onComplete: () => {
            if(!initial){
              outgoingContent && outgoingContent.classList.remove("active");
              outgoingVisual && outgoingVisual.classList.remove("active");            
            }
            activeContent = incomingContent;
            activeVisual = incomingVisual;
            isAnimating = false;
          },
        });

        incomingContent.classList.add("active");
        incomingVisual.classList.add("active");

        timeline
          .to(outgoingLines, { y: "-2em", autoAlpha:0 }, 0)
          .to(outgoingVisual, { autoAlpha: 0, xPercent: 3 }, 0)
          .fromTo(incomingLines, { y: "2em", autoAlpha:0 }, { y: "0em", autoAlpha:1, stagger: 0.075 }, 0.4)
          .fromTo(incomingVisual, { autoAlpha: 0, xPercent: 3 }, { autoAlpha: 1, xPercent: 0 }, "<");

        activeButton && activeButton.classList.remove("active");
        buttons[index].classList.add("active");
        activeButton = buttons[index];
      }

      switchTab(0, true); // on page load
   
      buttons.forEach((button, i) => {
        button.addEventListener("click", () => switchTab(i)); 
      });

      // Ensure first tabs are active
      contentItems[0].classList.add("active");
      visualItems[0].classList.add("active");
      buttons[0].classList.add("active");    
    });
  }

  // Make the tab section's "Become a member" button functional
  const formButton = document.getElementById('form-button');
  if (formButton) {
    formButton.addEventListener('click', function(e) {
      e.preventDefault();
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  // Initialize Tab System and Flip Buttons
  initTabSystem();
  initFlipButtons();

  // Animate stats items when they come into view
  const statsItems = document.querySelectorAll('.stat-item');
  
  if (statsItems.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // If we have GSAP, use it for better animation
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(statsItems, 
              { y: 20, opacity: 0 }, 
              { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: "power1.out" }
            );
          } else {
            // Fallback to CSS transitions
            statsItems.forEach((item, index) => {
              setTimeout(() => {
                item.style.transform = 'translateY(0)';
                item.style.opacity = '1';
              }, index * 150);
            });
          }
          
          // Stop observing after animation
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    // Set initial state
    statsItems.forEach(item => {
      item.style.transform = 'translateY(20px)';
      item.style.opacity = '0';
      item.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
    });
    
    // Observe the stats section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  }
  
  // Partner Integration
  const partnerCards = document.querySelectorAll('.partner-card');
  
  if (partnerCards.length > 0) {
    // Add hover effects for partner cards using GSAP
    partnerCards.forEach(card => {
      if (typeof gsap !== 'undefined') {
        card.addEventListener('mouseenter', function() {
          gsap.to(this, {
            y: -8,
            boxShadow: '0 20px 30px rgba(0,0,0,0.25)',
            backgroundColor: 'rgba(15, 15, 15, 0.9)',
            duration: 0.3
          });
        });
        
        card.addEventListener('mouseleave', function() {
          gsap.to(this, {
            y: 0,
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
            backgroundColor: 'rgba(12, 12, 12, 0.85)',
            duration: 0.4
          });
        });
      }
    });
  }
  
  // Update navigation to include testimonials and partners
  const testimonialsLink = document.querySelector('a[href="#testimonials"]');
  const partnersLink = document.querySelector('a[href="#partners"]');
  
  if (testimonialsLink) {
    testimonialsLink.addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('testimonials').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
  
  if (partnersLink) {
    partnersLink.addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('partners').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
});

// Add typing animation to hero text
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }
  
  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];
    
    // Check if deleting
    if(this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    
    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    
    // Initial Type Speed
    let typeSpeed = 100;
    
    if(this.isDeleting) {
      typeSpeed /= 2;
    }
    
    // If word is complete
    if(!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }
    
    setTimeout(() => this.type(), typeSpeed);
  }
}

// Initialize typing animation when page loads
window.addEventListener('DOMContentLoaded', init);

function init() {
  const txtElement = document.querySelector('.type-text');
  if (txtElement) {
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
  }
}

// Fix for mobile viewport height issues
function setMobileHeight() {
  // First we get the viewport height and multiply it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set the height initially
setMobileHeight();

// Reset on resize or orientation change
window.addEventListener('resize', () => {
  // Prevent excessive calculations by using a timeout
  clearTimeout(window.resizedFinished);
  window.resizedFinished = setTimeout(() => {
    setMobileHeight();
  }, 250);
});

window.addEventListener('orientationchange', setMobileHeight);












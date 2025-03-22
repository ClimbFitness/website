// Tab Component JavaScript - All function names are namespaced to avoid conflicts
document.addEventListener("DOMContentLoaded", function() {
    // Initialize Tab Component
    initTabComponentSystem();
  });
  
  function initTabComponentSystem() {
    // Only initialize if GSAP libraries are loaded
    if (typeof gsap === 'undefined' || typeof Flip === 'undefined' || typeof CustomEase === 'undefined') {
      console.error('Required GSAP libraries not loaded. Tab component initialization skipped.');
      return;
    }
    
    // Register GSAP plugins
    gsap.registerPlugin(CustomEase, Flip);
    
    // Create custom ease
    if (!CustomEase.get("osmo-ease")) {
      CustomEase.create("osmo-ease", "0.625, 0.05, 0, 1");
    }
    
    // Initialize component parts
    initTabComponentFlipButtons();
    initTabComponentTabs();
    initTabComponentFormButton();
  }
  
  function initTabComponentFlipButtons() {
    // Find all wrappers within our tab component
    let wrappers = document.querySelectorAll('.tab-component [data-flip-button="wrap"]');
    
    wrappers.forEach((wrapper) => {
      let buttons = wrapper.querySelectorAll('[data-flip-button="button"]');
      let bg = wrapper.querySelector('[data-flip-button="bg"]');
      
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
              ease: "osmo-ease"
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
              ease: "osmo-ease"
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
              ease: "osmo-ease"
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
              ease: "osmo-ease"
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
              ease: "osmo-ease"
            });
          }
        });
      });
    });
  }
  
  function initTabComponentTabs() {
    let wrappers = document.querySelectorAll('.tab-component [data-tabs="wrapper"]');
    
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
        if (!initial && (isAnimating || buttons[index] === activeButton)) return;
        if (index >= contentItems.length || index >= visualItems.length) return;
        
        isAnimating = true;
  
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
  
  function initTabComponentFormButton() {
    // Make the button functional - using your existing smooth scroll
    const formButton = document.querySelector('.tab-component #form-button');
    if (formButton) {
      formButton.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        if (targetId) {
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
            targetSection.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    }
  }
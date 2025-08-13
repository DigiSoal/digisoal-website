// Ensure GSAP and its plugins are loaded
gsap.registerPlugin(ScrollTrigger, Flip);

// Touch-first navigation using ScrollTrigger for mobile
if (window.innerWidth <= 768) {
  gsap.utils.toArray(".panel").forEach((panel, i) => {
    ScrollTrigger.create({
      trigger: panel,
      start: "top top",
      pin: true,
      pinSpacing: false,
      onEnter: () => {
        // Handle active navigation state on scroll
        document.querySelectorAll('.main-nav a').forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.main-nav a[href="#${panel.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  });
}

// Hamburger menu morphing transition
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu-panel');

navToggle.addEventListener('click', () => {
  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
  navToggle.setAttribute('aria-expanded', !isExpanded);
  navMenu.classList.toggle('active');

  // GSAP timeline for morphing the hamburger icon
  // This is a conceptual implementation. A real morph would require SVG path animation.
  if (!isExpanded) {
    gsap.timeline({defaults: {duration: 0.2, ease: 'power2.inOut'}})
      .to('.hamburger', {scaleX: 0})
      .to('.hamburger', {
        scaleX: 1,
        rotation: 45,
        y: 6
      }, '<')
      .to('.hamburger::before', {
        y: -6,
        rotation: -90,
      }, '<');
  } else {
    gsap.timeline({defaults: {duration: 0.2, ease: 'power2.inOut'}})
      .to('.hamburger', {
        rotation: 0,
        y: 0
      })
      .to('.hamburger::before', {
        y: 0,
        rotation: 0
      }, '<');
  }
});

// Shapeshifting transition example: Hero CTA to About Panel
document.querySelector('#hero .cta-button').addEventListener('click', () => {
  // Use GSAP's Flip plugin for smooth transitions
  const state = Flip.getState('#hero .cta-button');

  // Morph the button's class and content
  const ctaButton = document.querySelector('#hero .cta-button');
  ctaButton.classList.add('morphing-to-about');
  ctaButton.innerHTML = '<h2>About Us</h2>';

  // Apply the Flip animation
  Flip.from(state, {
    duration: 1.5,
    ease: "power1.inOut",
    scale: true,
    onComplete: () => {
      // After morphing, navigate to the about section and hide the button
      window.location.hash = '#about';
      ctaButton.style.display = 'none';
      
      // Animate in the 'about' content
      gsap.from('#about h2, #about p, .about-card', {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        ease: 'power2.out',
        duration: 0.8
      });
    }
  });
});

// Service card to detail panel morph (conceptual)
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', (e) => {
    // This would trigger a morphing animation to a full-screen modal
    // A full implementation would involve:
    // 1. Getting the state of the clicked card (position, size) with Flip.getState()
    // 2. Creating a new, full-screen element (modal)
    // 3. Applying the Flip animation from the card's state to the new modal's state
    // 4. Populating the modal with service details
    console.log('Morphing service card into detail modal...');
  });
});
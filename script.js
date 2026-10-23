/**
 * ROSE MAE RAMA — PORTFOLIO SCRIPT
 * Interactive functionality: Project Modals, Filtering, Mobile Drawer,
 * Copy-to-Clipboard & Cute Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================
  // 1. PROJECTS DATA
  // ==========================================
  const projectsData = {
    rowsiroutes: {
      title: 'Rowsi Routes — Cebu City Travel Planner',
      subtitle: 'Interactive Itinerary & Route Exploration Web App',
      category: '🌸 Web App & Routing',
      image: 'assets/images/rowsiroutes.png',
      overview: 'Rowsi Routes is an interactive Cebu travel planning web application. It empowers travelers to explore scenic tourist destinations, plan customized daily itineraries, calculate distances and travel times via real-time routing APIs, and navigate with an intuitive visual roadmap.',
      contributions: 'Spearheaded the overall front-end engineering, custom UI styling with modern responsive CSS, Leaflet.js interactive map and OSRM routing API integration, itinerary reordering, and travel summary cards.',
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'Leaflet.js', 'OSRM Routing API', 'Responsive UI Design'],
      liveLink: 'https://rouwi.github.io/Rowsi-Routes/'
    },
    digitalgamestore: {
      title: "Rowi's Shop — Digital Game Storefront",
      subtitle: 'Kawaii Gaming Storefront & Top-Up Catalog',
      category: '🎀 Kawaii E-Commerce',
      image: 'assets/images/digitalgamestore.png',
      overview: "Rowi's Shop is a vibrant, kawaii-themed gaming storefront and discounted top-up catalog designed specifically for student gamers. The platform features accessible item pricing, promo banners, step-by-step order guidelines, and direct customer communication channels.",
      contributions: 'Designed the complete kawaii visual identity, created responsive storefront components, product price cards with interactive copy/order flows, GCash/Maya payment instructions, and cross-device optimization.',
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'E-Commerce UI', 'CSS Grid & Flexbox', 'Mobile-First Layout'],
      liveLink: 'https://rouwi.github.io/digital-game-store/'
    },
    gamio: {
      title: 'Gamio — AI-Powered Learning Platform',
      subtitle: 'High-Fidelity Figma Prototype & Wireframe System',
      category: '✨ Figma UI/UX Prototype',
      image: 'assets/images/figma.png',
      overview: 'Gamio is an AI-powered game-based classroom learning platform crafted to help educators convert traditional quizzes into engaging, interactive games featuring live leaderboards, student badges, and playful competition.',
      contributions: 'Conducted user journey mapping, created comprehensive wireframe flows, built the design system and reusable component library in Figma, designed teacher quiz management portals and real-time student leaderboard screens.',
      techStack: ['Figma', 'UI/UX Design', 'Wireframing', 'Interactive Prototyping', 'Design Systems', 'Gamification UI'],
      isCaseStudy: true
    },
    fuelops: {
      title: 'FuelOps — Fuel & Gasoline Management System',
      subtitle: 'Enterprise Fuel Station Management & Dispenser Auditing',
      category: '⛽ UI/UX & Gasoline Ops',
      image: 'assets/images/fuelops.png',
      overview: 'The Fuel & Gasoline Management System is a full-featured web application designed to track, streamline, and audit daily fuel inventory, dispenser transactions, and sales operations for fuel stations. It automates critical back-office functions—such as recording meter readings, managing fuel deliveries and price updates, tracking cashier shifts, and generating financial and inventory reports in both PDF and Excel formats—replacing manual pen-and-paper recordkeeping with an accurate, centralized digital platform.',
      contributions: 'Spearheaded the planning of the UI/UX architecture, wireframing, and interactive prototyping. Designed user journey workflows for station cashiers, pump attendants, and administrative auditors, translating dense fuel metrics and reconciliation data into accessible, intuitive dashboard layouts.',
      techStack: ['Figma', 'UI/UX Design', 'Wireframing', 'Interactive Prototyping', 'User Flow Planning', 'Enterprise Dashboard UX'],
      liveLink: 'https://fuelops-zeta.vercel.app',
      githubLink: 'https://github.com/Jordibot-art/FUELOPS'
    },
    brewhaven: {
      title: 'Brew Haven — Secure E-Commerce Web Application',
      subtitle: 'Coffee Shop Storefront & Administrative Management System',
      category: '☕ UI/UX & Coffee E-Commerce',
      image: 'assets/images/brewhaven.png',
      overview: 'Brew Haven is a full-stack, coffee shop e-commerce platform designed to deliver an intuitive customer ordering experience while emphasizing robust application security. The application features user authentication, a dynamic product catalog, interactive cart management, order placement transactions, and an administrative oversight dashboard. Built with a security-first architecture, the platform integrates defensive programming principles to protect against common web vulnerabilities.',
      contributions: 'Spearheaded the UI/UX design, visual design system, wireframing, and interactive prototyping. Crafted an inviting coffeehouse aesthetic, planned intuitive customer ordering journeys with real-time cart interactions, and structured clear administrative interfaces for menu management and order monitoring.',
      techStack: ['Figma', 'UI/UX Design', 'Wireframing', 'Interactive Prototyping', 'E-Commerce UX', 'Design Systems'],
      liveLink: 'https://brewhaven.infinityfree.io',
      githubLink: 'https://github.com/Jordibot-art/Brew-Haven'
    },
    barangaypoblacion: {
      title: 'Barangay Poblacion — Livelihood Mobile App',
      subtitle: 'Mobile UI/UX Wireframing & Interactive Figma Prototype',
      category: '📱 Mobile UI/UX & Prototype',
      image: 'assets/images/barangaypoblacion.png',
      mediaType: 'mobile',
      overview: 'A mobile app design that helps residents of Barangay Poblacion discover livelihood programs and training offers, starting from a simple home screen with a clear Get Started button.',
      contributions: 'Spearheaded the mobile UI/UX wireframing and interactive prototyping in Figma. Designed user journeys and intuitive screen architectures to make community-based livelihood programs, skills seminars, and opportunities readily accessible for local barangay residents.',
      techStack: ['Figma', 'Mobile UI/UX', 'Wireframing', 'Interactive Prototyping', 'User Flow Design', 'Community App UX'],
      liveLink: 'https://www.figma.com/proto/OAbcZdHqqJlUPNticv2kjY/Mobile-UI-Design?node-id=1-9&starting-point-node-id=1%3A9',
      isFigmaPrototype: true
    }
  };

  // ==========================================
  // 2. PROJECT FILTER TABS
  // ==========================================
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-aesthetic-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterValue = pill.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const categories = category.split(/\s+/);
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 3. PROJECT DETAIL MODAL
  // ==========================================
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalOverview = document.getElementById('modalOverview');
  const modalContribution = document.getElementById('modalContribution');
  const modalTechStack = document.getElementById('modalTechStack');
  const modalActionContainer = document.getElementById('modalActionContainer');

  function openModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalCategory.textContent = data.category;

    const modalImgContainer = modalImg.parentElement;
    if (data.mediaType === 'mobile') {
      modalImgContainer.classList.add('modal-mobile-preview');
    } else {
      modalImgContainer.classList.remove('modal-mobile-preview');
    }
    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalOverview.textContent = data.overview;
    modalContribution.textContent = data.contributions;

    // Tech chips
    modalTechStack.innerHTML = '';
    data.techStack.forEach(tech => {
      const chip = document.createElement('span');
      chip.className = 'tag-chip';
      chip.textContent = tech;
      modalTechStack.appendChild(chip);
    });

    // Action button
    modalActionContainer.innerHTML = '';
    if (data.liveLink) {
      const liveBtn = document.createElement('a');
      liveBtn.href = data.liveLink;
      liveBtn.target = '_blank';
      liveBtn.rel = 'noopener noreferrer';
      liveBtn.className = 'cute-btn cute-btn-primary';
      const btnLabel = data.isFigmaPrototype ? 'Open Figma Prototype' : 'Open Live Demo';
      liveBtn.innerHTML = `<span>${btnLabel}</span><span class="btn-icon">↗</span>`;
      modalActionContainer.appendChild(liveBtn);
    }
    if (data.githubLink) {
      const gitBtn = document.createElement('a');
      gitBtn.href = data.githubLink;
      gitBtn.target = '_blank';
      gitBtn.rel = 'noopener noreferrer';
      gitBtn.className = 'cute-btn cute-btn-outline';
      gitBtn.innerHTML = '<span>GitHub Repo</span><span class="btn-icon">🐙</span>';
      modalActionContainer.appendChild(gitBtn);
    }
    if (!data.liveLink && !data.githubLink) {
      const caseBadge = document.createElement('span');
      caseBadge.className = 'private-badge-pill';
      caseBadge.textContent = '🔒 High-Fidelity Prototype (Case Study)';
      modalActionContainer.appendChild(caseBadge);
    }

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = btn.getAttribute('data-target');
      openModal(targetId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  // ==========================================
  // 4. MOBILE NAVIGATION DRAWER
  // ==========================================
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerOverlay = document.getElementById('mobileDrawerOverlay');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    mobileDrawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    mobileDrawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // ==========================================
  // 5. TOAST NOTIFICATION & COPY-TO-CLIPBOARD
  // ==========================================
  const toast = document.getElementById('aestheticToast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('active');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('active');
    }, 3200);
  }

  function copyTextContent(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied ${text} to clipboard! 🌸`);
      }).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const tempEl = document.createElement('textarea');
    tempEl.value = text;
    tempEl.style.position = 'fixed';
    tempEl.style.left = '-9999px';
    document.body.appendChild(tempEl);
    tempEl.focus();
    tempEl.select();
    try {
      document.execCommand('copy');
      showToast(`Copied ${text} to clipboard! 🌸`);
    } catch (err) {
      showToast(`Selected: ${text}`);
    }
    document.body.removeChild(tempEl);
  }

  document.querySelectorAll('.cute-copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        copyTextContent(textToCopy);
      }
    });
  });

  // ==========================================
  // 6. CONTACT FORM SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderName = document.getElementById('senderName').value.trim();
      const senderEmail = document.getElementById('senderEmail').value.trim();
      const senderMessage = document.getElementById('senderMessage').value.trim();

      if (!senderName || !senderEmail || !senderMessage) {
        showToast('Please fill in all required fields! ✨');
        return;
      }

      showToast(`Thank you, ${senderName}! Message sent successfully. Rose will reply soon! 💌`);
      contactForm.reset();
    });
  }

  // ==========================================
  // 7. ACTIVE NAVIGATION HIGHLIGHT ON SCROLL
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.aesthetic-link');

  function highlightNavOnScroll() {
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // ==========================================
  // 8. BACK TO TOP BUTTON
  // ==========================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Set current year in footer
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});

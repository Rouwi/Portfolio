/**
 * Portfolio Interactive Logic & Content Management
 * Alex Morgan Design & Student Portfolio Activity
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Projects Data (Meets Student Criteria)
  // ==========================================
  const projectsData = {
    rose: {
      title: 'Rowsi Routes',
      subtitle: 'Branding & Route Exploration Website',
      category: 'Branding',
      image: 'assets/images/rowsiroutes.png',
      overview: 'Rowsi Routes is an interactive travel and route discovery project designed with seamless navigation, responsive roadmaps, and modern visual branding.',
      explanation: 'Designed and built an intuitive navigation platform featuring clear visual hierarchy, custom map interfaces, and vibrant route showcases.',
      contribution: 'Brand design, UI layout, frontend styling, and responsive web development.',
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Brand Identity'],
      liveLink: 'https://rouwi.github.io/Rowsi-Routes/'
    },
    helix: {
      title: 'Digital Game Store',
      subtitle: 'Interactive Gaming Storefront & Catalog',
      category: 'Web Design',
      image: 'assets/images/digitalgamestore.png',
      overview: 'Digital Game Store is an immersive web platform for gamers to browse, discover, and purchase trending video games with seamless catalog browsing.',
      explanation: 'Developed a dynamic, dark-themed storefront featuring featured banners, game categories, responsive product cards, and detailed game overviews.',
      contribution: 'Web design, responsive layout, interactive product cards, and catalog showcase.',
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'Web Design', 'UI Layout'],
      liveLink: 'https://rouwi.github.io/digital-game-store/'
    },
    momentum: {
      title: 'Figma Design',
      subtitle: 'Gamio AI-Powered Learning Prototype',
      category: 'UI/UX',
      image: 'assets/images/figma.png',
      overview: 'Gamio is an AI-powered game-based learning platform crafted to help teachers turn any lesson into an engaging classroom game with live leaderboards, badges, and quizzes.',
      explanation: 'Designed comprehensive high-fidelity Figma prototypes and user flows, complete with playful typography, teacher portals, class leaderboards, and accessible components.',
      contribution: 'User research, wireframing, high-fidelity UI design in Figma, design systems, and interactive prototyping.',
      techStack: ['UI/UX Design', 'Figma Prototyping', 'Design Systems', 'Gamification UI', 'Wireframing'],
      isPrivate: true,
      privateNotice: 'Private Prototype (Internal Project)'
    }
  };

  // ==========================================
  // 2. Testimonials Data & Carousel
  // ==========================================
  const testimonials = [
    {
      quote: "Rose is an exceptional designer who delivers clean, strategic work that elevates our brand every time.",
      name: "John Ariel Ramos",
      role: "Frontend, Backend, App developer",
      avatar: "assets/images/james_carter.jpg"
    },
    {
      quote: "One of the most dedicated and detail-oriented developers in our cohort. Her design eye and code quality are outstanding.",
      name: "Mariane Vertudes",
      role: "UI/UX designer",
      avatar: "assets/images/hero_avatar.jpg"
    },
    {
      quote: "Working with Rose was seamless. Her frontend engineering and design intuition brought our collaborative visions to life with speed and precision.",
      name: "Kit Lebosada",
      role: "Frontend developer",
      avatar: "assets/images/kit.jpg"
    }
  ];

  let currentTestimonialIndex = 0;
  const testimonialText = document.getElementById('testimonialText');
  const testimonialName = document.getElementById('testimonialName');
  const testimonialRole = document.getElementById('testimonialRole');
  const testimonialAvatar = document.getElementById('testimonialAvatar');
  const testimonialDots = document.querySelectorAll('.carousel-dots .dot-btn');

  function updateTestimonial(index) {
    currentTestimonialIndex = index;
    const t = testimonials[index];
    
    // Smooth fade effect
    testimonialText.style.opacity = '0';
    setTimeout(() => {
      testimonialText.textContent = t.quote;
      testimonialName.textContent = t.name;
      testimonialRole.textContent = t.role;
      testimonialAvatar.src = t.avatar;
      testimonialText.style.opacity = '1';
    }, 180);

    testimonialDots.forEach((dot, i) => {
      const isActive = i === index;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  testimonialDots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
      updateTestimonial(idx);
    });
  });

  // Auto advance testimonial every 8 seconds
  setInterval(() => {
    const nextIdx = (currentTestimonialIndex + 1) % testimonials.length;
    updateTestimonial(nextIdx);
  }, 8000);

  // ==========================================
  // 3. Navigation & Scroll Handling
  // ==========================================
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinksContainer = document.getElementById('navLinks');

  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = navLinksContainer.classList.toggle('active');
      mobileMenuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Active section observer
  const sections = document.querySelectorAll('section[id], footer[id]');
  const observerOptions = {
    threshold: 0.3
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.classList.toggle('active', href === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => navObserver.observe(sec));

  // ==========================================
  // 4. Project Modal Details
  // ==========================================
  const projectModal = document.getElementById('projectModal');
  const modalProjectContent = document.getElementById('modalProjectContent');
  const closeProjectModalBtn = document.getElementById('closeProjectModal');

  function openProjectModal(key) {
    const data = projectsData[key];
    if (!data) return;

    // Action button: Only live link for available projects, or note for private project
    const actionBtnHtml = data.liveLink ? `
      <div class="modal-actions-row">
        <a href="${data.liveLink}" target="_blank" rel="noopener noreferrer" class="pill-btn pill-btn-primary">
          Open Working Live Link ↗
        </a>
      </div>
    ` : `
      <div class="modal-actions-row">
        <span class="pill-btn pill-btn-outline" style="cursor: default; opacity: 0.85;">
          🔒 Private Project — Figma Link Restricted
        </span>
      </div>
    `;

    modalProjectContent.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="modal-project-img">
      <div class="modal-project-header">
        <div>
          <span class="badge-pill">${data.category}</span>
          <h2 class="modal-project-title" id="modalProjectTitle">${data.title}</h2>
          <p class="modal-subtitle">${data.subtitle}</p>
        </div>
      </div>

      <div class="modal-meta-grid">
        <div class="modal-meta-item">
          <strong>Project Role</strong>
          <span>${data.contribution.split(',')[0]}</span>
        </div>
        <div class="modal-meta-item">
          <strong>Category</strong>
          <span>${data.category}</span>
        </div>
        <div class="modal-meta-item">
          <strong>Context</strong>
          <span>Class Project &amp; Practice</span>
        </div>
      </div>

      <h4 class="modal-section-title">Overview &amp; Purpose</h4>
      <p>${data.overview}</p>

      <h4 class="modal-section-title">Short Explanation &amp; Process</h4>
      <p>${data.explanation}</p>

      <h4 class="modal-section-title">My Personal Contribution</h4>
      <p>${data.contribution}</p>

      <h4 class="modal-section-title">Technologies &amp; Tools Used</h4>
      <div class="skill-tags" style="margin-top: 8px;">
        ${data.techStack.map(t => `<span class="skill-tag">${t}</span>`).join('')}
      </div>

      ${actionBtnHtml}
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Attach click listeners to cards and buttons
  document.querySelectorAll('.project-card, [data-open-modal]').forEach(el => {
    el.addEventListener('click', (e) => {
      // Find project key
      const key = el.getAttribute('data-project') || el.getAttribute('data-open-modal');
      if (key) {
        openProjectModal(key);
      }
    });
  });

  if (closeProjectModalBtn) {
    closeProjectModalBtn.addEventListener('click', () => {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // ==========================================
  // 5. Resume Modal
  // ==========================================
  const resumeModal = document.getElementById('resumeModal');
  const heroResumeBtn = document.getElementById('heroResumeBtn');
  const closeResumeModalBtn = document.getElementById('closeResumeModal');
  const printResumeBtn = document.getElementById('printResumeBtn');

  if (heroResumeBtn) {
    heroResumeBtn.addEventListener('click', () => {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeResumeModalBtn) {
    closeResumeModalBtn.addEventListener('click', () => {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // ==========================================
  // 6. Beginner Hosting Guide Modal
  // ==========================================
  const hostingGuideModal = document.getElementById('hostingGuideModal');
  const openHostingGuideBtn = document.getElementById('openHostingGuideBtn');
  const footerHostingBtn = document.getElementById('footerHostingBtn');
  const closeHostingGuideBtn = document.getElementById('closeHostingGuide');
  const guideTabBtns = document.querySelectorAll('.guide-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  function openHostingGuide() {
    hostingGuideModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  if (openHostingGuideBtn) openHostingGuideBtn.addEventListener('click', openHostingGuide);
  if (footerHostingBtn) footerHostingBtn.addEventListener('click', openHostingGuide);

  if (closeHostingGuideBtn) {
    closeHostingGuideBtn.addEventListener('click', () => {
      hostingGuideModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  guideTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      guideTabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // ==========================================
  // 7. Quick Contact Modal & Mailto Form
  // ==========================================
  const contactFormModal = document.getElementById('contactFormModal');
  const openContactFormBtn = document.getElementById('openContactFormBtn');
  const closeContactModalBtn = document.getElementById('closeContactModal');
  const quickContactForm = document.getElementById('quickContactForm');

  if (openContactFormBtn) {
    openContactFormBtn.addEventListener('click', () => {
      contactFormModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeContactModalBtn) {
    closeContactModalBtn.addEventListener('click', () => {
      contactFormModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (quickContactForm) {
    quickContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value;
      const email = document.getElementById('senderEmail').value;
      const message = document.getElementById('senderMessage').value;

      // Construct mailto
      const emailRecipient = document.getElementById('footerEmailLink').textContent;
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`);

      window.location.href = `mailto:${emailRecipient}?subject=${subject}&body=${body}`;
      showToast('Opening your email client to send message!');
      contactFormModal.classList.remove('active');
      document.body.style.overflow = '';
      quickContactForm.reset();
    });
  }

  // ==========================================
  // 8. Copy Email & Toast Notifications
  // ==========================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toastNotification = document.getElementById('toastNotification');
  let toastTimeout;

  function showToast(message) {
    clearTimeout(toastTimeout);
    toastNotification.textContent = message;
    toastNotification.classList.add('active');
    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove('active');
    }, 3200);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = document.getElementById('footerEmailLink').textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard!`);
      }).catch(() => {
        showToast('Email address copied!');
      });
    });
  }

  // Global modal backdrop close & Escape key
  [projectModal, resumeModal, hostingGuideModal, contactFormModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [projectModal, resumeModal, hostingGuideModal, contactFormModal].forEach(m => {
        if (m) m.classList.remove('active');
      });
      if (personalizerDrawer) personalizerDrawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ==========================================
  // 9. Personalizer Drawer & State Management
  // ==========================================
  const personalizerDrawer = document.getElementById('personalizerDrawer');
  const toggleCustomizeBtn = document.getElementById('toggleCustomizeBtn');
  const closePersonalizerBtn = document.getElementById('closePersonalizerBtn');
  const personalizerForm = document.getElementById('personalizerForm');
  const loadReferencePresetBtn = document.getElementById('loadReferencePresetBtn');
  const loadStudentPresetBtn = document.getElementById('loadStudentPresetBtn');
  const resetDefaultBtn = document.getElementById('resetDefaultBtn');
  const closeAnnouncementBtn = document.getElementById('closeAnnouncementBtn');
  const announcementBar = document.getElementById('announcementBar');

  if (closeAnnouncementBtn && announcementBar) {
    closeAnnouncementBtn.addEventListener('click', () => {
      announcementBar.style.display = 'none';
    });
  }

  if (toggleCustomizeBtn && personalizerDrawer) {
    toggleCustomizeBtn.addEventListener('click', () => {
      personalizerDrawer.classList.toggle('active');
    });
  }

  if (closePersonalizerBtn && personalizerDrawer) {
    closePersonalizerBtn.addEventListener('click', () => {
      personalizerDrawer.classList.remove('active');
    });
  }

  const defaultProfile = {
    name: 'Rose Mae Rama',
    role: 'Brand & Web Designer',
    location: 'based in Toronto, Canada.',
    bio: 'I help startups and creative brands build thoughtful identities and digital experiences that connect.',
    email: 'rosemaerama@gmail.com',
    availability: "I'm currently accepting new projects for May 2026."
  };

  const studentSampleProfile = {
    name: 'Jordan Smith',
    role: 'Frontend Developer & UI Designer',
    location: 'based in New York, USA.',
    bio: 'I craft responsive web applications and interactive interfaces, focusing on clean code, accessible design, and delightful user experiences.',
    email: 'jordan.smith@student.edu',
    availability: "Actively seeking junior developer & design internships."
  };

  function applyProfile(profile) {
    // Hero & Headers
    document.getElementById('heroName').innerHTML = `${profile.name}<span class="name-dot">.</span>`;
    document.getElementById('heroRole').textContent = profile.role;
    document.getElementById('heroLocation').textContent = profile.location;
    document.getElementById('heroBio').textContent = profile.bio;
    document.getElementById('availabilityDesc').textContent = profile.availability;

    // Logo Monogram
    const logoName = (profile.name.toLowerCase().includes('rose') || profile.name.toLowerCase().includes('rama')) 
      ? 'ROWSI' 
      : (profile.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'ROWSI');
    document.getElementById('brandLogoText').innerHTML = `${logoName}<span class="dot">.</span>`;

    // Footer & Contact
    const footerEmail = document.getElementById('footerEmailLink');
    footerEmail.textContent = profile.email;
    footerEmail.href = `mailto:${profile.email}`;
    document.getElementById('footerCopyrightName').textContent = profile.name;

    // Resume modal sync
    document.getElementById('modalResumeTitle').textContent = profile.name;
    document.getElementById('modalResumeRole').textContent = `${profile.role} | Frontend Enthusiast`;

    // Update Form Inputs
    document.getElementById('inputName').value = profile.name;
    document.getElementById('inputRole').value = profile.role;
    document.getElementById('inputLocation').value = profile.location;
    document.getElementById('inputBio').value = profile.bio;
    document.getElementById('inputEmail').value = profile.email;
    document.getElementById('inputAvailability').value = profile.availability;
  }

  // Load from localStorage if present
  try {
    const saved = localStorage.getItem('portfolio_custom_profile');
    if (saved) {
      const parsed = JSON.parse(saved);
      applyProfile(parsed);
    }
  } catch (err) {
    console.warn('Could not read saved profile:', err);
  }

  if (personalizerForm) {
    personalizerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const updated = {
        name: document.getElementById('inputName').value.trim() || defaultProfile.name,
        role: document.getElementById('inputRole').value.trim() || defaultProfile.role,
        location: document.getElementById('inputLocation').value.trim() || defaultProfile.location,
        bio: document.getElementById('inputBio').value.trim() || defaultProfile.bio,
        email: document.getElementById('inputEmail').value.trim() || defaultProfile.email,
        availability: document.getElementById('inputAvailability').value.trim() || defaultProfile.availability
      };

      localStorage.setItem('portfolio_custom_profile', JSON.stringify(updated));
      applyProfile(updated);
      personalizerDrawer.classList.remove('active');
      showToast('Profile updated successfully!');
    });
  }

  if (loadReferencePresetBtn) {
    loadReferencePresetBtn.addEventListener('click', () => {
      applyProfile(defaultProfile);
      localStorage.setItem('portfolio_custom_profile', JSON.stringify(defaultProfile));
      showToast('Loaded Rose Mae Rama profile');
    });
  }

  if (loadStudentPresetBtn) {
    loadStudentPresetBtn.addEventListener('click', () => {
      applyProfile(studentSampleProfile);
      localStorage.setItem('portfolio_custom_profile', JSON.stringify(studentSampleProfile));
      showToast('Loaded Student Sample profile');
    });
  }

  if (resetDefaultBtn) {
    resetDefaultBtn.addEventListener('click', () => {
      localStorage.removeItem('portfolio_custom_profile');
      applyProfile(defaultProfile);
      showToast('Reset to default reference profile');
    });
  }

  // Set current year in footer
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

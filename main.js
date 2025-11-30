document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      const isOpen = mainNav.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  // Notification Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active class to clicked button
      btn.classList.add('active');

      // Show corresponding content
      const targetId = btn.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
        }

        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Notification Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const notificationItems = document.querySelectorAll('.notification-list li');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      notificationItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === category) {
          item.style.display = 'block'; // Or 'flex' if that's the default
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Search Functionality
  const searchInput = document.querySelector('.search-bar input');
  const searchBtn = document.querySelector('.search-bar button');

  const mockData = [
    { title: 'SSC CGL 2025 Notification', url: '/job-details.html', type: 'Job' },
    { title: 'IBPS PO Mains', url: '#', type: 'Job' },
    { title: 'UP Police Constable', url: '#', type: 'Job' },
    { title: 'Indian Polity Notes', url: '/study-material.html', type: 'Material' },
    { title: 'Current Affairs Nov 2025', url: '/study-material.html', type: 'Material' },
    { title: 'UPSC Syllabus', url: '#', type: 'Material' }
  ];

  if (searchInput && searchBtn) {
    const performSearch = () => {
      const query = searchInput.value.toLowerCase();
      if (query.length < 2) return;

      const results = mockData.filter(item => item.title.toLowerCase().includes(query));

      if (results.length > 0) {
        // For demo, just alert or log. In real app, show dropdown or redirect.
        // Simple implementation: redirect to first result or show alert
        alert(`Found ${results.length} results:\n` + results.map(r => `- ${r.title} (${r.type})`).join('\n'));
        if (results[0].url !== '#') {
          window.location.href = results[0].url;
        }
      } else {
        alert('No results found.');
      }
    };

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') performSearch();
    });
  }
});


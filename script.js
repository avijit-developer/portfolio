const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

navAnchors.forEach((a) => {
  a.addEventListener('click', () => navLinks.classList.remove('show'));
});

const bars = document.querySelectorAll('.bar i');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.style.getPropertyValue('--w');
      }
    });
  },
  { threshold: 0.3 }
);

bars.forEach((bar) => observer.observe(bar));

const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const oldText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      throw new Error('Form submit failed');
    }

    contactForm.reset();
    alert('Message sent successfully.');
  } catch (error) {
    alert('Message could not be sent. Please try again.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = oldText;
  }
});


const projects = [
  {
    title: 'Ecommerce Admin Dashboard',
    description: 'Admin dashboard for products, orders, customers and analytics.',
    image: 'assets/respitely_screenshot.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Ecommerce'],
    live: '#',
    github: '#'
  },
  {
    title: 'Multi Vendor Ecommerce App',
    description: 'Full-featured multi vendor ecommerce platform with vendor dashboard.',
    image: 'assets/Acenda-Booking-05-09-2026_01_58_PM.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Ecommerce'],
    live: '#',
    github: '#'
  },
  {
    title: 'Inventory Management System',
    description: 'Inventory and stock management system for businesses with reporting.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80',
    tags: ['React', 'Node.js', 'MongoDB'],
    live: '#',
    github: '#'
  },
  {
    title: 'WordPress Business Website',
    description: 'Fast and SEO-ready business site built with custom WordPress theme.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1000&q=80',
    tags: ['WordPress', 'PHP', 'SEO'],
    live: '#',
    github: '#'
  },
  {
    title: 'Restaurant Booking Platform',
    description: 'Online booking system with admin controls and customer notifications.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    tags: ['React', 'Node.js', 'Ecommerce'],
    live: '#',
    github: '#'
  },
  {
    title: 'Learning Management Portal',
    description: 'Course delivery platform with progress tracking and quiz modules.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1000&q=80',
    tags: ['React', 'TypeScript', 'Node.js'],
    live: '#',
    github: '#'
  },
  {
    title: 'Healthcare Appointment App',
    description: 'Appointment booking portal with doctor schedules and patient dashboard.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80',
    tags: ['React', 'Node.js', 'MongoDB'],
    live: '#',
    github: '#'
  },
  {
    title: 'React Native Delivery App',
    description: 'Cross-platform delivery app with live tracking, push notifications and wallet payments.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1000&q=80',
    tags: ['React Native', 'Node.js', 'MongoDB'],
    live: '#',
    github: '#'
  },
  {
    title: 'Travel Blog CMS',
    description: 'Content-rich travel blogging platform built on WordPress and custom plugins.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80',
    tags: ['WordPress', 'PHP', 'MySQL'],
    live: '#',
    github: '#'
  }
];

const projectGrid = document.getElementById('projectGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const projectEmpty = document.getElementById('projectEmpty');
const projectSearch = document.getElementById('projectSearch');
const filterButtons = document.querySelectorAll('.chip[data-filter]');

let activeFilter = 'All';
let searchText = '';
let visibleCount = 6;
const PAGE_SIZE = 6;

const matchesProject = (project) => {
  const byFilter =
    activeFilter === 'All' || project.tags.includes(activeFilter);
  const haystack = `${project.title} ${project.description} ${project.tags.join(' ')}`.toLowerCase();
  const bySearch = haystack.includes(searchText.toLowerCase().trim());
  return byFilter && bySearch;
};

const renderProjects = () => {
  const filtered = projects.filter(matchesProject);
  const visibleProjects = filtered.slice(0, visibleCount);

  projectGrid.innerHTML = visibleProjects
    .map(
      (project) => `
      <article class="project">
        <img src="${project.image}" alt="${project.title}" />
        <h5>${project.title}</h5>
        <p>${project.description}</p>
        <div class="project-meta">
          ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${project.live}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>
          <a href="${project.github}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> GitHub</a>
        </div>
      </article>
    `
    )
    .join('');

  projectEmpty.style.display = filtered.length === 0 ? 'block' : 'none';
  loadMoreBtn.style.display = visibleCount < filtered.length ? 'inline-block' : 'none';
};

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    activeFilter = btn.dataset.filter;
    visibleCount = PAGE_SIZE;
    filterButtons.forEach((chip) => chip.classList.remove('active'));
    btn.classList.add('active');
    renderProjects();
  });
});

projectSearch.addEventListener('input', (e) => {
  searchText = e.target.value;
  visibleCount = PAGE_SIZE;
  renderProjects();
});

loadMoreBtn.addEventListener('click', () => {
  visibleCount += PAGE_SIZE;
  renderProjects();
});

renderProjects();

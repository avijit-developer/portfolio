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
    title: 'HomeServe Pro Home Services Website',
    description: 'A modern home-services booking website with service categories, trust signals, reviews and a fast enquiry flow.',
    image: 'assets/homeserve-pro-preview.png',
    imagePosition: 'top center',
    tags: ['React', 'JavaScript', 'Home Services'],
    live: 'https://homeservice-zeta.vercel.app/'
  },
  {
    title: 'Booking Two',
    description: 'A booking-focused web experience with appointment flow and a conversion-first layout.',
    image: 'assets/project-previews/booking-two.png',
    imagePosition: 'top center',
    tags: ['React', 'Node.js'],
    live: 'https://booking-two-bice.vercel.app/'
  },
  {
    title: 'Dress House',
    description: 'Fashion storefront with polished product presentation and retail-friendly browsing.',
    image: 'assets/project-previews/dresshouse.png',
    imagePosition: 'top center',
    tags: ['React', 'Ecommerce'],
    live: 'https://dresshouse.vercel.app/'
  },
  {
    title: 'Dress Store',
    description: 'Online dress store landing page designed for product discovery and sales.',
    image: 'assets/project-previews/dress-store.png',
    imagePosition: 'top center',
    tags: ['React', 'Ecommerce'],
    live: 'https://dress-store-nine.vercel.app/'
  },
  {
    title: 'UrbanCare Service',
    description: 'Home and local service booking website with trust-first service sections.',
    image: 'assets/project-previews/urbancare.png',
    imagePosition: 'top center',
    tags: ['React', 'Node.js'],
    live: 'https://service-urbancare.vercel.app/'
  },
  {
    title: 'Restu Booking',
    description: 'Reservation and booking website built around fast scheduling and service selection.',
    image: 'assets/project-previews/restu-booking.png',
    imagePosition: 'top center',
    tags: ['React', 'Node.js'],
    live: 'https://restu-booking.vercel.app/'
  },
  {
    title: 'Wolmart',
    description: 'Marketplace-style ecommerce storefront with product showcase and cart-ready UX.',
    image: 'assets/project-previews/wolmart.png',
    imagePosition: 'top center',
    tags: ['React', 'Ecommerce'],
    live: 'https://wolmart-pi.vercel.app/'
  },
  {
    title: 'MNS Inventory',
    description: 'Inventory management system for stock tracking, reporting and business operations.',
    image: 'assets/project-previews/mns-inventory.png',
    imagePosition: 'top center',
    tags: ['Node.js', 'MongoDB'],
    live: 'https://mns-inventory.vercel.app/'
  },
  {
    title: 'POS Billing',
    description: 'Point of sale and billing interface for checkout, invoices and daily operations.',
    image: 'assets/project-previews/posbilling.png',
    imagePosition: 'top center',
    tags: ['Node.js', 'MongoDB'],
    live: 'https://posbilling-one.vercel.app/'
  },
  {
    title: 'Cus Portal',
    description: 'Customer portal with account access, support interactions and dashboard layout.',
    image: 'assets/project-previews/cusportal.png',
    imagePosition: 'top center',
    tags: ['React', 'Node.js'],
    live: 'https://cusportal.vercel.app/'
  },
  {
    title: 'Atlet',
    description: 'Sport or fitness-focused landing page with a bold hero and action-driven sections.',
    image: 'assets/project-previews/atlet.png',
    imagePosition: 'top center',
    tags: ['React', 'React Native'],
    live: 'https://atlet-amber.vercel.app/'
  },
  {
    title: 'Blogger',
    description: 'Blogging platform focused on content discovery and clean reading experience.',
    image: 'assets/project-previews/blogger.png',
    imagePosition: 'top center',
    tags: ['WordPress', 'Content'],
    live: 'https://blogger-72.vercel.app/'
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
        <img src="${project.image}" alt="${project.title}" ${project.imagePosition ? `style="object-position:${project.imagePosition};"` : ''} />
        <h5>${project.title}</h5>
        <p>${project.description}</p>
        <div class="project-meta">
          ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${project.live}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Link</a>
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

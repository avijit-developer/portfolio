const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');
const VISITOR_LOG_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxkvr0r2-3gkOq4WfNCa9QbHrwaKLaZyziBtq_3hfnXIiYPNICirfI9en0AiUmiyeZpnA/exec';

const logVisitor = async () => {
  if (!VISITOR_LOG_ENDPOINT) return;

  try {
    await fetch(VISITOR_LOG_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        page: window.location.href,
        title: document.title
      })
    });
  } catch (error) {
    // Analytics must never interrupt the portfolio experience.
  }
};

logVisitor();

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
    title: 'Acenda Booking',
    description: 'A luxury travel booking platform with live availability search, account center and confirmed trip management.',
    image: 'assets/project-previews/booking-two.png',
    imagePosition: 'top center',
    tags: ['React', 'Node.js'],
    live: 'https://booking-two-bice.vercel.app/'
  },
  {
    title: 'Vogue Fashion Store',
    description: 'Premium fashion storefront with curated collections, polished product presentation and retail-friendly browsing.',
    image: 'assets/project-previews/dresshouse.png',
    imagePosition: 'top center',
    tags: ['React', 'Ecommerce'],
    live: 'https://dresshouse.vercel.app/'
  },
  {
    title: 'Dressify',
    description: 'Elegant dress collection storefront designed for product discovery, category browsing and sales.',
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
  },
  {
    title: 'Khasnobish Real Estate',
    description: 'Premium real estate developer website with featured projects, site visit booking and client testimonials.',
    image: 'assets/project-previews/client-sites/khasnobishgroup.png',
    imagePosition: 'top center',
    tags: ['WordPress', 'JavaScript'],
    live: 'https://khasnobishgroup.in/'
  },
  {
    title: 'LeadBridge Marketing',
    description: 'Healthcare marketing platform with lead generation services, conversion tracking and ROI-focused campaigns.',
    image: 'assets/project-previews/client-sites/leadbridgemarketing.png',
    imagePosition: 'top center',
    tags: ['WordPress', 'JavaScript'],
    live: 'https://leadbridgemarketing.com/'
  },
  {
    title: 'The Cadenza',
    description: 'Luxury residential project website with amenities, floor plans, gallery and site visit enquiry flow.',
    image: 'assets/project-previews/client-sites/thecadenza.png',
    imagePosition: 'top center',
    tags: ['WordPress', 'JavaScript'],
    live: 'https://thecadenza.in/dev/'
  },
  {
    title: 'eInvestmart',
    description: 'Financial services website with investment planning, SIP calculator, services and client enquiry forms.',
    image: 'assets/project-previews/client-sites/einvestmart.png',
    imagePosition: 'top center',
    tags: ['WordPress', 'JavaScript'],
    live: 'https://einvestmart.in/'
  },
  {
    title: 'Sampurna Kolkata',
    description: 'Residential project website with location highlights, amenities, gallery, floor plans and walkthrough.',
    image: 'assets/project-previews/client-sites/sampurnakolkata.png',
    imagePosition: 'top center',
    tags: ['WordPress', 'JavaScript'],
    live: 'https://sampurnakolkata.com/'
  },
  {
    title: 'CodeflixPro',
    description: 'Digital agency website showcasing web development, portfolio, services and technology expertise.',
    image: 'assets/project-previews/client-sites/coodeflixpro.png',
    imagePosition: 'top center',
    tags: ['WordPress', 'JavaScript'],
    live: 'https://coodeflixpro.com/'
  },
  {
    title: 'Atreyaa Kolkata',
    description: 'Luxury high-rise residential website with gallery, floor plans, amenities and virtual walkthrough.',
    image: 'assets/project-previews/client-sites/atreyaa.png',
    imagePosition: 'top center',
    tags: ['WordPress', 'JavaScript'],
    live: 'https://atreyaa.in/'
  },
  {
    title: 'Bathtub Refinishing Cincinnati',
    description: 'Local home services website for bathtub refinishing, tile reglazing and bathroom restoration.',
    image: 'assets/project-previews/client-sites/bathtubreglazingcincinnati.png',
    imagePosition: 'top center',
    tags: ['WordPress', 'Home Services'],
    live: 'https://bathtubreglazingcincinnati.com/'
  },
  {
    title: 'Web Spider Analysis',
    description: 'Digital marketing agency website with SEO, social media, PPC services and case studies.',
    image: 'assets/project-previews/client-sites/webspideranalysis.png',
    imagePosition: 'top center',
    tags: ['WordPress', 'JavaScript'],
    live: 'https://webspideranalysis.com/'
  },
  {
    title: 'Chelsea Technologies',
    description: 'Corporate technology website for managed IT, cloud services, compliance and business transformation.',
    image: 'assets/project-previews/client-sites/chelsea-tech.png',
    imagePosition: 'top center',
    tags: ['WordPress', 'JavaScript'],
    live: 'https://www.chelsea-tech.com/'
  },
  {
    title: 'Dr Mandi Cosmetic Skin Clinic',
    description: 'Cosmetic skin clinic website with treatments, products, appointments and client reviews.',
    image: 'assets/project-previews/client-sites/drmandicosmeticsc.png',
    imagePosition: 'top center',
    tags: ['WordPress', 'Ecommerce'],
    live: 'https://mandi.performancepalace.com.au/'
  },
  {
    title: 'Dr Whitegoods',
    description: 'UK appliance repair website with online booking, service categories and same-day appointments.',
    image: 'assets/project-previews/client-sites/drwhitegoods.png',
    imagePosition: 'top center',
    tags: ['WordPress', 'Home Services'],
    live: 'https://www.drwhitegoods.co.uk/'
  },
  {
    title: 'TrahiMart Admin Dashboard',
    description: 'Multi-vendor ecommerce admin dashboard with sales analytics, order management, vendor approvals and inventory tracking.',
    image: 'assets/project-previews/client-sites/trahimart-admin.png',
    imagePosition: 'top center',
    tags: ['React', 'Node.js', 'MongoDB', 'Ecommerce'],
    live: 'https://trahimart.com/admin/dashboard'
  },
  {
    title: 'Bianco Evento',
    description: 'B2B bridal fashion mobile app for retailers with collection browsing, real-time stock, order management and push notifications.',
    image: 'assets/project-previews/mobile-apps/bianco-evento-screen.png',
    imagePosition: 'top center',
    tags: ['React Native', 'Node.js', 'Ecommerce'],
    live: 'https://play.google.com/store/apps/details?id=com.biancoeventoapp&hl=en_IN'
  },
  {
    title: 'TrahiMart',
    description: 'Multi-category shopping app with smart search, wishlist, secure checkout, order tracking and real-time delivery updates.',
    image: 'assets/project-previews/mobile-apps/trahimart.png',
    imagePosition: 'top center',
    tags: ['React Native', 'Node.js', 'Ecommerce'],
    live: 'https://play.google.com/store/apps/details?id=com.trahimart&hl=en_IN'
  },
  {
    title: 'Ordering Customer App',
    description: 'White-label customer ordering app with product browsing, checkout, order tracking, push notifications and multi-business support.',
    image: 'assets/project-previews/mobile-apps/ordering-customer.png',
    imagePosition: 'top center',
    tags: ['React Native', 'Node.js', 'Ecommerce'],
    live: 'https://play.google.com/store/apps/details?id=com.ordering.onlineorderingappv5&hl=en_IN'
  },
  {
    title: 'Ordering Store App',
    description: 'Merchant order manager app for restaurants and businesses with real-time notifications, accept/reject flow and delivery scheduling.',
    image: 'assets/project-previews/mobile-apps/ordering-store.png',
    imagePosition: 'top center',
    tags: ['React Native', 'Node.js', 'Ecommerce'],
    live: 'https://play.google.com/store/apps/details?id=com.ordering.storeappv5&hl=en_IN'
  },
  {
    title: 'Ordering Driver App',
    description: 'Delivery driver app with order assignment, route maps, status updates, in-app messaging and multi-delivery management.',
    image: 'assets/project-previews/mobile-apps/ordering-driver.png',
    imagePosition: 'top center',
    tags: ['React Native', 'Node.js'],
    live: 'https://play.google.com/store/apps/details?id=com.ordering.deliveryv5&hl=en_IN'
  },
  {
    title: 'WMS Bianco',
    description: 'Warehouse management app with real-time inventory tracking, barcode scanning, pick lists and order processing.',
    image: 'assets/project-previews/mobile-apps/wms-bianco.png',
    imagePosition: 'top center',
    tags: ['React Native', 'Node.js'],
    live: 'https://play.google.com/store/apps/details?id=com.wmsbianco&hl=en_IN'
  },
  {
    title: 'B2C Template',
    description: 'Ready-to-use B2C ecommerce mobile app with product browsing, cart, order history, multi-store and multi-language support.',
    image: 'assets/project-previews/mobile-apps/b2c-template.png',
    imagePosition: 'top center',
    tags: ['React Native', 'Node.js', 'Ecommerce'],
    live: 'https://play.google.com/store/apps/details?id=com.b2ctemplate.app&hl=en_IN'
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

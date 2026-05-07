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

document.querySelector('.contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Message sent (prototype).');
});


/* =========================
   Sticky Navbar on Scroll
========================= */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* =========================
   Smooth Scroll
========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

/* =========================
   Menu Tabs
========================= */
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".menu-grid").forEach(g => g.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

/* =========================
   Lounge Reservation Logic
========================= */
const reserveButtons = document.querySelectorAll('.lounge-card .btn-gold');
const datePicker = document.querySelector('.date-picker');

reserveButtons.forEach(button => {
  button.addEventListener('click', () => {
    const loungeName = button.closest('.lounge-card')
      .querySelector('h4').innerText;

    const selectedDate = datePicker.value;

    if (!selectedDate) {
      alert('📅 Please select a date before reserving.');
      return;
    }

    alert(
      `🎬 Reservation Confirmed!\n\n` +
      `Lounge: ${loungeName}\n` +
      `Date: ${selectedDate}\n\n` +
      `We can’t wait to host you at BingeBites ☕🍿`
    );
  });
});

/* =========================
   Active Nav Link Highlight
========================= */
const sections = document.querySelectorAll('section, footer');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

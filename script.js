
   //Sticky Navbar on Scroll

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

   //Logo and Reserve Button Navigation

const logo = document.querySelector('.logo');
const reserveBtn = document.querySelector('.navbar .btn-primary');

if (logo) {
  logo.addEventListener('click', () => {
    window.location.href = 'index2.html';
  });
}

if (reserveBtn) {
  reserveBtn.addEventListener('click', () => {
    window.location.href = 'lounges.html';
  });
}


   //Menu Tabs

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".menu-grid").forEach(g => g.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});


   //Lounge Reservation Logic

const reserveButtons = document.querySelectorAll('.lounge-card .btn-gold');
const datePicker = document.querySelector('.date-picker');
const timePicker = document.querySelector('.time-picker');

if (datePicker) {
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  datePicker.min = minDate;
}


reserveButtons.forEach(button => {
  button.addEventListener('click', () => {
    const loungeCard = button.closest('.lounge-card');
    const loungeName = loungeCard.querySelector('h4').innerText;
    const price = loungeCard.dataset.price;

    const selectedDate = datePicker.value;
    const selectedTime = timePicker.value;

    if (!selectedDate) {
      alert('📅 Please select a date before reserving.');
      return;
    }

    if (!selectedTime) {
      alert('⏰ Please select a time before reserving.');
      return;
    }

    if (selectedTime < "10:00" || selectedTime > "23:00") {
      alert("⏰ Please select a time between 10:00 AM and 11:00 PM.");
      return;
    }

    alert(
      `🎬 Reservation Confirmed!\n\n` +
      `Lounge: ${loungeName}\n` +
      `Date: ${selectedDate}\n` +
      `Time: ${selectedTime}\n` +
      `Cost: ₹${price}/hour\n\n` +
      `We can’t wait to host you at BingeBites ☕🍿`
    );
    datePicker.value = '';
    timePicker.value = '';  });
});


   //FOOD SELECTION & BOOKING

const checkboxes = document.querySelectorAll(".item-check");
const totalPriceEl = document.getElementById("total-price");
const bookFoodBtn = document.getElementById("bookFoodBtn");

let total = 0;

checkboxes.forEach(check => {
  check.addEventListener("change", () => {
    const price = Number(check.dataset.price);
    total += check.checked ? price : -price;
    totalPriceEl.textContent = `₹${total}`;
  });
});

if (bookFoodBtn) {
  bookFoodBtn.addEventListener("click", () => {
    if (total === 0) {
      alert("🍽️ Your order is empty!\nSelect some delicious items to continue.");
      return;
    }

    alert(
      `🍿✨ Food Order Confirmed!\n\n` +
      `Your snacks are being freshly prepared ☕🍰\n` +
      `Total Amount: ₹${total}\n\n` +
      `Sit back, relax & enjoy the show 🎬`
    );

    checkboxes.forEach(c => c.checked = false);
    total = 0;
    totalPriceEl.textContent = "₹0";
  });
}


   //MOVIE SELECTION & BOOKING

document.addEventListener("DOMContentLoaded", () => {
  const bookMovieBtn = document.getElementById("bookMovieBtn");
  
  if (bookMovieBtn) {
    bookMovieBtn.addEventListener("click", () => {
      const selectedMovie = document.querySelector('input[name="movie"]:checked');
      
      if (!selectedMovie) {
        alert("🎥 Please select a movie to book.");
        return;
      }

      alert(
        `🎬 Movie Booking Confirmed!\n\n` +
        `Movie: ${selectedMovie.dataset.movie}\n\n` +
        `Get ready for an amazing screening at BingeBites! 🍿☕`
      );

      selectedMovie.checked = false;
    });
  }
});


  // Active Nav Highlight

const sections = document.querySelectorAll('section, footer');
const navLinks = document.querySelectorAll('nav a');

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
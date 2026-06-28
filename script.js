// --- Hero Slide Management ---
const slides = document.querySelectorAll('.hero-slideshow .slide');
let currentHeroSlide = 0;

function nextHeroSlide() {
    slides[currentHeroSlide].classList.remove('active');
    currentHeroSlide = (currentHeroSlide + 1) % slides.length;
    slides[currentHeroSlide].classList.add('active');
}
setInterval(nextHeroSlide, 5000); // Transitions background view every 5 seconds


// --- Testimonial Carousel Setup ---
let activeTestimonialIndex = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.slider-dots .dot');

function currentSlide(index) {
    testimonialSlides[activeTestimonialIndex].classList.remove('active');
    dots[activeTestimonialIndex].classList.remove('active');
    
    activeTestimonialIndex = index;
    
    testimonialSlides[activeTestimonialIndex].classList.add('active');
    dots[activeTestimonialIndex].classList.add('active');
}


// --- Dark & Light Mode Controller ---
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Access local configurations to remember user selections
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateToggleIcon(savedTheme);

themeToggleBtn.addEventListener('click', () => {
    let currentTheme = htmlElement.getAttribute('data-theme');
    let newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcon(newTheme);
});

function updateToggleIcon(theme) {
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
}

// --- Mobile Menu Toggle Handler ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('mobile-active');
            
            // Optional: Toggle between bars icon and an 'X' close mark icon
            const toggleIcon = menuToggle.querySelector('i');
            if(toggleIcon) {
                toggleIcon.classList.toggle('fa-bars');
                toggleIcon.classList.toggle('fa-xmark');
            }
        });
    }

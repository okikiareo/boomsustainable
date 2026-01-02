// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');


// Sticky Navigation on Scroll
const nav = document.querySelector('nav');


// Add scrolled class to nav when scrolling
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenu.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
const navLinksItems = document.querySelectorAll('.nav-links a');
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 968) {
            navLinks.classList.remove('active');
            const spans = mobileMenu.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Dropdown functionality for mobile
const dropdown = document.querySelector('.dropdown');
const dropdownLink = dropdown.querySelector('a');

if (window.innerWidth <= 968) {
    dropdownLink.addEventListener('click', (e) => {
        e.preventDefault();
        const menu = dropdown.querySelector('.dropdown-menu');
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
}

// Update dropdown behavior on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 968) {
        navLinks.classList.remove('active');
        const spans = mobileMenu.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});



// GOOOOOOOOOOOD
mobileMenu.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    
    if (navLinks.style.display === 'flex') {
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'var(--green)';
        navLinks.style.flexDirection = 'column';
        navLinks.style.padding = '2rem';
        navLinks.style.gap = '1.5rem';
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        // nav.style.background = 'rgba(75, 163, 195, 0.95)';
        nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        // nav.style.background = 'transparent';
        nav.style.boxShadow = 'none';
    }
});


// Gallery Carousel JavaScript
// Gallery Carousel JavaScript
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.gallery-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.carousel-dots');

let currentIndex = 0;
let itemsPerView = 3;

// Get items per view based on screen width
function getItemsPerView() {
    if (window.innerWidth <= 968) {
        return 1;
    }
    return 3;
}

// Calculate total pages
function getTotalPages() {
    return Math.ceil(items.length / itemsPerView);
}

// Create dots
function createDots() {
    dotsContainer.innerHTML = '';
    const totalPages = getTotalPages();
    
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToPage(i));
        dotsContainer.appendChild(dot);
    }
}

// Update carousel position
function updateCarousel() {
    const itemWidth = items[0].offsetWidth;
    const gap = 32; // 2rem
    const offset = -(currentIndex * itemsPerView * (itemWidth + gap));
    
    track.style.transform = `translateX(${offset}px)`;
    updateDots();
}

// Update active dot
function updateDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Go to specific page
function goToPage(pageIndex) {
    const totalPages = getTotalPages();
    if (pageIndex >= 0 && pageIndex < totalPages) {
        currentIndex = pageIndex;
        updateCarousel();
    }
}

// Next page
function nextPage() {
    const totalPages = getTotalPages();
    if (currentIndex < totalPages - 1) {
        currentIndex++;
        updateCarousel();
    }
}

// Previous page
function prevPage() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
}

// Event listeners
prevBtn.addEventListener('click', prevPage);
nextBtn.addEventListener('click', nextPage);

// Touch support
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
        nextPage();
    }
    if (touchEndX - touchStartX > 50) {
        prevPage();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevPage();
    if (e.key === 'ArrowRight') nextPage();
});

// Initialize
function init() {
    itemsPerView = getItemsPerView();
    currentIndex = 0;
    createDots();
    updateCarousel();
}

// Reinitialize on resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        init();
    }, 250);
});

// Initialize on load
window.addEventListener('load', init);


// Contact Form JavaScript
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Here you would typically send the data to your server
    // For now, we'll just show a success message
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    alert('Thank you! Your message has been sent. We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
    
    // You can replace this with your actual form submission logic
    // Example with fetch:
    /*
    fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.json())
    .then(data => {
        alert('Thank you! Your message has been sent.');
        contactForm.reset();
    })
    .catch(error => {
        alert('Sorry, there was an error. Please try again.');
        console.error('Error:', error);
    });
    */
});

// Add input animation on focus
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});
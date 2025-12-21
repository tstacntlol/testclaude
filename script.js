// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Focus on the target section for accessibility
            target.setAttribute('tabindex', '-1');
            target.focus();
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        // In a real application, you would send this data to a server
        console.log('Form submitted:', formData);

        // Show success message
        alert('Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.');

        // Reset form
        contactForm.reset();
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe activity cards
document.querySelectorAll('.activity-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Keyboard navigation improvements
document.addEventListener('keydown', function(e) {
    // Skip to main content with 'S' key
    if (e.key === 's' || e.key === 'S') {
        const aboutSection = document.getElementById('about');
        if (aboutSection && !e.target.matches('input, textarea')) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
            aboutSection.setAttribute('tabindex', '-1');
            aboutSection.focus();
        }
    }
});

// Add focus indicator for better keyboard navigation
document.addEventListener('DOMContentLoaded', function() {
    // Add skip to content link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Spring naar hoofdinhoud';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 100;
    `;
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
});

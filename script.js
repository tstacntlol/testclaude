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

// Parse YAML frontmatter from markdown
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);

    if (!match) return null;

    const frontmatter = {};
    const lines = match[1].split('\n');

    lines.forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > -1) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();

            // Remove quotes
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }

            // Convert boolean strings
            if (value === 'true') value = true;
            if (value === 'false') value = false;

            frontmatter[key] = value;
        }
    });

    return frontmatter;
}

// Load events from CMS
async function loadEvents() {
    const eventsContainer = document.getElementById('events-container');
    const noEventsMessage = document.getElementById('no-events-message');

    try {
        // Load events from the generated manifest file
        const response = await fetch('events.json');

        if (!response.ok) {
            console.error('Could not load events.json');
            eventsContainer.innerHTML = '<p>Kon evenementen niet laden.</p>';
            return;
        }

        const allEvents = await response.json();

        // Convert date strings to Date objects and filter active events
        const events = allEvents
            .filter(event => event.active !== false)
            .map(event => ({
                ...event,
                date: new Date(event.date)
            }));

        // Sort events by date
        events.sort((a, b) => a.date - b.date);

        // Filter future events
        const now = new Date();
        const futureEvents = events.filter(event => event.date >= now);

        // Display events
        if (futureEvents.length > 0) {
            eventsContainer.innerHTML = futureEvents.map(event => {
                const dateStr = event.date.toLocaleDateString('nl-BE', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                const timeStr = event.date.toLocaleTimeString('nl-BE', {
                    hour: '2-digit',
                    minute: '2-digit'
                });

                return `
                    <div class="event-card">
                        <div class="event-date">
                            <div class="event-day">${event.date.getDate()}</div>
                            <div class="event-month">${event.date.toLocaleDateString('nl-BE', { month: 'short' })}</div>
                        </div>
                        <div class="event-content">
                            <h3>${event.title}</h3>
                            <p class="event-meta">
                                <strong>📅 ${dateStr}</strong><br>
                                <strong>🕐 ${timeStr}</strong><br>
                                <strong>📍 ${event.location}</strong>
                            </p>
                            <p class="event-description">${event.description}</p>
                            ${event.category ? `<span class="event-category">${event.category}</span>` : ''}
                            ${event.ageGroup ? `<span class="event-age">${event.ageGroup}</span>` : ''}
                            ${event.maxParticipants ? `<p class="event-participants">Max ${event.maxParticipants} deelnemers</p>` : ''}
                        </div>
                    </div>
                `;
            }).join('');

            noEventsMessage.style.display = 'none';
        } else {
            eventsContainer.innerHTML = '';
            noEventsMessage.style.display = 'block';
        }

    } catch (error) {
        console.error('Error loading events:', error);
        eventsContainer.innerHTML = '<p>Er is een fout opgetreden bij het laden van evenementen.</p>';
    }
}

// Load activities from CMS
async function loadActivities() {
    const activitiesContainer = document.querySelector('.activities-grid');

    if (!activitiesContainer) {
        console.error('Activities container not found');
        return;
    }

    try {
        // Load activities from the generated manifest file
        const response = await fetch('activities.json');

        if (!response.ok) {
            console.error('Could not load activities.json');
            return;
        }

        const allActivities = await response.json();

        // Filter active activities
        const activities = allActivities.filter(activity => activity.active !== false);

        // Sort by order (already sorted in build script, but just to be safe)
        activities.sort((a, b) => (a.order || 999) - (b.order || 999));

        // Display activities
        if (activities.length > 0) {
            activitiesContainer.innerHTML = activities.map(activity => {
                return `
                    <div class="activity-card">
                        <div class="activity-icon">${activity.icon || '❓'}</div>
                        <h3>${activity.title}</h3>
                        <p>${activity.description}</p>
                    </div>
                `;
            }).join('');
        } else {
            activitiesContainer.innerHTML = '<p>Geen activiteiten beschikbaar.</p>';
        }

    } catch (error) {
        console.error('Error loading activities:', error);
    }
}

// Add focus indicator for better keyboard navigation
document.addEventListener('DOMContentLoaded', function() {
    // Load activities and events
    loadActivities();
    loadEvents();

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

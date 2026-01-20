// PDF.js worker configuration
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// PDF Viewer class to handle individual PDF sections
class PDFViewer {
    constructor(sectionId) {
        this.sectionId = sectionId;
        this.canvas = document.getElementById(`${sectionId}-canvas`);
        this.loadingDiv = document.querySelector(`#${sectionId}-viewer .pdf-loading`);
        this.controls = document.querySelector(`#${sectionId}-viewer .pdf-controls`);
        this.pageNumSpan = document.getElementById(`${sectionId}-page-num`);
        this.pageCountSpan = document.getElementById(`${sectionId}-page-count`);
        this.prevBtn = document.getElementById(`${sectionId}-prev`);
        this.nextBtn = document.getElementById(`${sectionId}-next`);

        this.pdfDoc = null;
        this.pageNum = 1;
        this.pageRendering = false;
        this.pageNumPending = null;
        this.scale = 1.5;

        // Bind event listeners
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.addEventListener('click', () => this.onPrevPage());
            this.nextBtn.addEventListener('click', () => this.onNextPage());
        }
    }

    async loadPDF(url) {
        if (!url) {
            this.showMessage('Geen PDF beschikbaar');
            return;
        }

        try {
            const loadingTask = pdfjsLib.getDocument(url);
            this.pdfDoc = await loadingTask.promise;

            this.pageCountSpan.textContent = this.pdfDoc.numPages;

            // Hide loading, show controls
            this.loadingDiv.style.display = 'none';
            this.controls.style.display = 'flex';
            this.canvas.style.display = 'block';

            // Render first page
            this.renderPage(this.pageNum);
        } catch (error) {
            console.error(`Error loading PDF for ${this.sectionId}:`, error);
            this.showMessage('Fout bij het laden van PDF');
        }
    }

    renderPage(num) {
        this.pageRendering = true;

        this.pdfDoc.getPage(num).then(page => {
            const viewport = page.getViewport({ scale: this.scale });
            const context = this.canvas.getContext('2d');

            this.canvas.height = viewport.height;
            this.canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            const renderTask = page.render(renderContext);

            renderTask.promise.then(() => {
                this.pageRendering = false;
                if (this.pageNumPending !== null) {
                    this.renderPage(this.pageNumPending);
                    this.pageNumPending = null;
                }
            });
        });

        this.pageNumSpan.textContent = num;
        this.updateButtons();
    }

    queueRenderPage(num) {
        if (this.pageRendering) {
            this.pageNumPending = num;
        } else {
            this.renderPage(num);
        }
    }

    onPrevPage() {
        if (this.pageNum <= 1) {
            return;
        }
        this.pageNum--;
        this.queueRenderPage(this.pageNum);
    }

    onNextPage() {
        if (this.pageNum >= this.pdfDoc.numPages) {
            return;
        }
        this.pageNum++;
        this.queueRenderPage(this.pageNum);
    }

    updateButtons() {
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.disabled = (this.pageNum <= 1);
            this.nextBtn.disabled = (this.pageNum >= this.pdfDoc.numPages);
        }
    }

    showMessage(message) {
        this.loadingDiv.innerHTML = `<p>${message}</p>`;
        this.controls.style.display = 'none';
        this.canvas.style.display = 'none';
    }
}

// Initialize PDF viewers
const viewers = {
    programma: new PDFViewer('programma'),
    traject: new PDFViewer('traject'),
    'over-ons': new PDFViewer('over-ons')
};

// Load PDF configurations and initialize viewers
async function initializePDFs() {
    const sections = ['programma', 'traject', 'over-ons'];

    for (const section of sections) {
        try {
            const response = await fetch(`content/pdfs/${section}.json`);
            const data = await response.json();

            if (data.active && data.pdf) {
                viewers[section].loadPDF(data.pdf);
            } else {
                viewers[section].showMessage('Nog geen PDF geüpload');
            }
        } catch (error) {
            console.error(`Error loading config for ${section}:`, error);
            viewers[section].showMessage('Nog geen PDF geüpload');
        }
    }
}

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
        }
    });
});

// Load contact information dynamically
async function loadContactInfo() {
    try {
        const response = await fetch('content/settings/contact.json');
        const data = await response.json();

        // Update address
        const addressEl = document.getElementById('contact-address');
        if (addressEl && data.organizationName) {
            addressEl.innerHTML = `
                ${data.organizationName}<br>
                ${data.street}<br>
                ${data.postalCode} ${data.city}<br>
                ${data.country}
            `;
        }

        // Update hours
        const hoursEl = document.getElementById('contact-hours');
        if (hoursEl && data.hours) {
            hoursEl.innerHTML = `
                ${data.hours.weekdays}<br>
                ${data.hours.weekend}
            `;
        }
    } catch (error) {
        console.error('Error loading contact info:', error);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePDFs();
    loadContactInfo();

    // Accessibility: Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.tabIndex = -1;
                mainContent.focus();
                mainContent.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Handle contact form submission (if not using external service)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Form will be handled by Formspree or similar service
        // You can add custom handling here if needed
    });
}

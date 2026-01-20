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

        // Maximum height for PDF (to fit within viewport)
        this.maxHeight = window.innerHeight - 300; // Leave room for header, controls, etc.

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
            // Get initial viewport to calculate proper scale
            const initialViewport = page.getViewport({ scale: 1.0 });

            // Calculate scale to fit within maxHeight while maintaining aspect ratio
            let scale = this.maxHeight / initialViewport.height;

            // Also check if width needs to be constrained
            const maxWidth = Math.min(window.innerWidth - 100, 1000); // Max 1000px or window width
            const widthScale = maxWidth / initialViewport.width;

            // Use the smaller scale to ensure it fits in both dimensions
            scale = Math.min(scale, widthScale);

            // Get final viewport with calculated scale
            const viewport = page.getViewport({ scale: scale });
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

// Modal PDF Viewer class for enlarged view
class ModalPDFViewer {
    constructor() {
        this.modal = document.getElementById('pdf-modal');
        this.canvas = document.getElementById('modal-canvas');
        this.pageNumSpan = document.getElementById('modal-page-num');
        this.pageCountSpan = document.getElementById('modal-page-count');
        this.prevBtn = document.getElementById('modal-prev');
        this.nextBtn = document.getElementById('modal-next');
        this.closeBtn = document.querySelector('.pdf-modal-close');
        this.overlay = document.querySelector('.pdf-modal-overlay');
        this.titleEl = document.getElementById('pdf-modal-title');

        this.pdfDoc = null;
        this.pageNum = 1;
        this.pageRendering = false;
        this.pageNumPending = null;

        // Bind event listeners
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.addEventListener('click', () => this.onPrevPage());
            this.nextBtn.addEventListener('click', () => this.onNextPage());
        }

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.close());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal.style.display === 'flex') {
                if (e.key === 'Escape') {
                    this.close();
                } else if (e.key === 'ArrowLeft') {
                    this.onPrevPage();
                } else if (e.key === 'ArrowRight') {
                    this.onNextPage();
                }
            }
        });
    }

    open(pdfDoc, title) {
        this.pdfDoc = pdfDoc;
        this.pageNum = 1;
        this.titleEl.textContent = title;
        this.pageCountSpan.textContent = pdfDoc.numPages;
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        this.renderPage(this.pageNum);
    }

    close() {
        this.modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    renderPage(num) {
        this.pageRendering = true;

        this.pdfDoc.getPage(num).then(page => {
            // Get initial viewport to calculate proper scale
            const initialViewport = page.getViewport({ scale: 1.0 });

            // Calculate scale to fit within modal while maintaining aspect ratio
            const maxHeight = window.innerHeight * 0.7;
            const maxWidth = window.innerWidth * 0.8;

            let scale = Math.min(maxHeight / initialViewport.height, maxWidth / initialViewport.width);

            // Get final viewport with calculated scale
            const viewport = page.getViewport({ scale: scale });
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
}

// Initialize PDF viewers
const viewers = {
    programma: new PDFViewer('programma'),
    traject: new PDFViewer('traject'),
    'over-ons': new PDFViewer('over-ons')
};

// Initialize modal viewer
const modalViewer = new ModalPDFViewer();

// Load PDF configurations and initialize viewers
async function initializePDFs() {
    const sections = ['programma', 'traject', 'over-ons'];
    const sectionTitles = {
        'programma': 'Programma',
        'traject': 'Vrijetijds Traject Begeleiding',
        'over-ons': 'Over Ons'
    };

    for (const section of sections) {
        try {
            const response = await fetch(`content/pdfs/${section}.json`);
            const data = await response.json();

            if (data.active && data.pdf) {
                await viewers[section].loadPDF(data.pdf);

                // Add click handler to open modal
                const canvas = document.getElementById(`${section}-canvas`);
                if (canvas) {
                    canvas.addEventListener('click', () => {
                        const viewer = viewers[section];
                        if (viewer.pdfDoc) {
                            modalViewer.open(viewer.pdfDoc, sectionTitles[section]);
                        }
                    });
                }
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

    // Handle contact form submission with Netlify Forms
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);

            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Verzenden...';
            submitBtn.disabled = true;

            try {
                // Submit to Netlify
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                });

                if (response.ok) {
                    // Success
                    formStatus.textContent = 'Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.';
                    formStatus.className = 'form-status success';
                    formStatus.style.display = 'block';
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Error
                formStatus.textContent = 'Er is een fout opgetreden. Probeer het opnieuw of neem direct contact met ons op via email of telefoon.';
                formStatus.className = 'form-status error';
                formStatus.style.display = 'block';
                console.error('Form submission error:', error);
            } finally {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Hide status message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }
        });
    }
});

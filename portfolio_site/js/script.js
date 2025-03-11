// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

let menuOpen = false;

menuBtn.addEventListener('click', () => {
    if(!menuOpen) {
        menuBtn.classList.add('open');
        navLinks.classList.add('active');
        document.body.style.overflow = 'hidden';
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
        menuOpen = false;
    }
});

// Close menu when clicking nav links
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
        menuOpen = false;
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active') && !e.target.closest('.nav-links') && !e.target.closest('.menu-btn')) {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('open');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('open');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Animate elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-showcase, .timeline-item, .education-item, .certification-item, .project-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

// Animate skill bars on scroll
const animateSkills = () => {
    const skillSection = document.querySelector('.skills');
    if (!skillSection) return;
    
    const skillBars = document.querySelectorAll('.skill-progress');
    const sectionPosition = skillSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (sectionPosition < screenPosition) {
        skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth;
        });
    }
};

// Active navigation based on scroll position
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const header = document.querySelector('header');
    
    // Add scrolled class to header when scrolled
    if (scrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Highlight active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Animate elements on scroll
    animateSkills();
    animateOnScroll();
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});

// Gallery thumbnail click handler
document.querySelectorAll('.thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        const mainImage = this.closest('.project-showcase-gallery').querySelector('.gallery-main img');
        const thumbnailSrc = this.getAttribute('src');
        const thumbnailAlt = this.getAttribute('alt');
        
        // Animate the image change
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.setAttribute('src', thumbnailSrc);
            mainImage.setAttribute('alt', thumbnailAlt);
            mainImage.style.opacity = '1';
        }, 300);
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add data-width attribute to skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width || bar.offsetWidth + 'px';
        bar.setAttribute('data-width', width);
        bar.style.width = '0';
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .project-showcase, .timeline-item, .education-item, .certification-item, .project-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .project-showcase.animate, .timeline-item.animate, .education-item.animate, 
        .certification-item.animate, .project-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .timeline-item:nth-child(odd).animate {
            transform: translateX(0);
        }
        
        .timeline-item:nth-child(even).animate {
            transform: translateX(0);
        }
        
        .gallery-main img {
            transition: opacity 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .menu-btn.open .menu-btn__burger {
            background: transparent;
        }
        
        .menu-btn.open .menu-btn__burger::before {
            transform: rotate(45deg) translate(0, 0);
        }
        
        .menu-btn.open .menu-btn__burger::after {
            transform: rotate(-45deg) translate(0, 0);
        }
        
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Trigger initial animations
    setTimeout(() => {
        animateSkills();
        animateOnScroll();
    }, 500);
});

// Add touch event listeners for mobile
if ('ontouchstart' in window) {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.98)';
        });
        card.addEventListener('touchend', () => {
            card.style.transform = 'scale(1)';
        });
    });
}

// Prevent zoom on double tap for iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Certificate flip functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing certificate flip functionality');
    
    // Wait for everything to be fully loaded
    window.addEventListener('load', function() {
        initializeCertificateFlip();
    });
    
    function initializeCertificateFlip() {
        // Select all certification items except the skills showcase
        const certificationItems = document.querySelectorAll('.certification-item:not(.skills-showcase)');
        console.log('Found ' + certificationItems.length + ' certification items');
        
        if (certificationItems.length === 0) {
            console.log('No certification items found');
            return;
        }
        
        certificationItems.forEach((item, index) => {
            // Get the front and back elements
            const front = item.querySelector('.certificate-front');
            const back = item.querySelector('.certificate-back');
            const closeBtn = item.querySelector('.certificate-close');
            
            if (!front || !back) {
                console.log('Certificate item ' + index + ' is missing front or back element');
                return;
            }
            
            // Add click event to the front of the certificate
            front.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Certificate ' + index + ' clicked');
                item.classList.add('flipped');
            });
            
            // Add click event to the overlay
            const overlay = front.querySelector('.certificate-overlay');
            if (overlay) {
                overlay.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Certificate ' + index + ' overlay clicked');
                    item.classList.add('flipped');
                });
            }
            
            // Add close button functionality
            if (closeBtn) {
                closeBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Certificate ' + index + ' close button clicked');
                    item.classList.remove('flipped');
                });
            }
            
            // Prevent clicks on the back from propagating
            if (back) {
                back.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            }
        });
        
        console.log('Certificate flip functionality initialized');
    }
});

// Certificate modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const certificateItems = document.querySelectorAll('.certification-item.simple');
    const certificateModal = document.querySelector('.certificate-modal');
    const certificateModalImg = document.querySelector('.certificate-modal-img');
    const certificateModalClose = document.querySelector('.certificate-modal-close');
    
    // Open modal when certificate is clicked
    certificateItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('.certificate-img').src;
            certificateModalImg.src = imgSrc;
            certificateModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });
    
    // Close modal when close button is clicked
    certificateModalClose.addEventListener('click', function() {
        certificateModal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close modal when clicking outside the image
    certificateModal.addEventListener('click', function(e) {
        if (e.target === certificateModal) {
            certificateModal.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && certificateModal.classList.contains('active')) {
            certificateModal.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
});

// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    // Add focus and blur event listeners to form inputs for animation
    formInputs.forEach(input => {
        // Check if input already has value on page load
        if (input.value.trim() !== '') {
            input.parentElement.classList.add('active');
        }
        
        // Focus event
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('active');
        });
        
        // Blur event
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.parentElement.classList.remove('active');
            }
        });
    });
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
                showFormStatus('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                showFormStatus('Please enter a valid email address', 'error');
                return;
            }
            
            // Disable submit button and show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Send form data using Formspree
            const formData = new FormData(contactForm);
            
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok');
            })
            .then(data => {
                // Success
                showFormStatus('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                
                // Remove active class from all form groups
                document.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('active');
                });
            })
            .catch(error => {
                // Error
                console.error('Error:', error);
                showFormStatus('Oops! There was a problem sending your message. Please try again.', 'error');
            })
            .finally(() => {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            });
        });
    }
    
    // Function to show form status message
    function showFormStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = 'form-status ' + type;
            
            // Scroll to form status message
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide message after 5 seconds for success messages
            if (type === 'success') {
                setTimeout(() => {
                    formStatus.style.opacity = '0';
                    setTimeout(() => {
                        formStatus.className = 'form-status';
                        formStatus.style.opacity = '1';
                    }, 500);
                }, 5000);
            }
        }
    }
}); 
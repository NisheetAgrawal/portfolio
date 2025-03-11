// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('open');
    });
}

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
// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate toggle button
        navToggle.classList.toggle('active');
    });
}

// Mobile Dropdown Toggle
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
            e.preventDefault();
            const dropdown = toggle.parentElement;
            dropdown.classList.toggle('active');
        }
    });
});

// Close mobile menu when clicking on links
const navLinks = document.querySelectorAll('.nav-menu a:not(.dropdown-toggle)');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.boxShadow = 'var(--shadow-sm)';
    }
    
    lastScroll = currentScroll;
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Отправка...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Here you would normally send data to your server
            // Example:
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });
            
            console.log('Form submitted:', data);
            
            // Show success message
            contactForm.style.display = 'none';
            formSuccess.classList.add('show');
            
            // Optional: Send to email (you would need a backend service for this)
            // For now, we'll just log the data
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'flex';
                formSuccess.classList.remove('show');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 5000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
const animateOnScroll = document.querySelectorAll('.service-card, .feature-item, .testimonial-card, .stat-item');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active Navigation Highlighting
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-menu a');

function highlightNavigation() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Phone Number Formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value[0] === '8') {
                value = '7' + value.slice(1);
            }
            
            let formatted = '+7';
            if (value.length > 1) {
                formatted += ' (' + value.substring(1, 4);
            }
            if (value.length >= 5) {
                formatted += ') ' + value.substring(4, 7);
            }
            if (value.length >= 8) {
                formatted += '-' + value.substring(7, 9);
            }
            if (value.length >= 10) {
                formatted += '-' + value.substring(9, 11);
            }
            
            e.target.value = formatted;
        }
    });
}

// Hero Scroll Button
const heroScroll = document.querySelector('.hero-scroll');
if (heroScroll) {
    heroScroll.addEventListener('click', () => {
        const aboutSection = document.querySelector('.about-preview');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Add to all external links - open in new tab
document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.hostname.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// Performance: Lazy Loading Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console welcome message
console.log('%c👋 Добро пожаловать на сайт Натальи Калининой!', 'font-size: 20px; color: #2C5F8D; font-weight: bold;');
console.log('%cПсихолог, психотерапевт, коуч', 'font-size: 14px; color: #5D8AB5;');
console.log('%cЕсли у вас есть вопросы по сайту, свяжитесь с нами!', 'font-size: 12px; color: #666;');
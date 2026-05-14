// Vector Services
// Carousels, mobile menu, animations, form handling

document.addEventListener('DOMContentLoaded', () => {
    console.log('BlueSky Services - Professional Housekeeping & Landscaping');
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Hero Carousel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (slides.length > 0) {
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        function goToSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (dotsContainer && dotsContainer.children[i]) {
                    dotsContainer.children[i].classList.remove('active');
                }
            });
            slides[index].classList.add('active');
            if (dotsContainer && dotsContainer.children[index]) {
                dotsContainer.children[index].classList.add('active');
            }
            currentSlide = index;
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(currentSlide);
        }
        
        document.querySelector('.prev-btn')?.addEventListener('click', prevSlide);
        document.querySelector('.next-btn')?.addEventListener('click', nextSlide);
        
        // Auto-advance every 5 seconds
        setInterval(nextSlide, 5000);
    }
    
    // Services Carousel (scrollable)
    const servicesTrack = document.querySelector('.services-track');
    const servicePrev = document.querySelector('.service-prev');
    const serviceNext = document.querySelector('.service-next');
    
    if (servicesTrack) {
        if (servicePrev) {
            servicePrev.addEventListener('click', () => {
                servicesTrack.scrollBy({ left: -320, behavior: 'smooth' });
            });
        }
        
        if (serviceNext) {
            serviceNext.addEventListener('click', () => {
                servicesTrack.scrollBy({ left: 320, behavior: 'smooth' });
            });
        }
    }
    
    // Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.innerText = Math.ceil(current);
                    setTimeout(updateCounter, 30);
                } else {
                    stat.innerText = target;
                }
            };
            updateCounter();
        });
    }
    
    // Trigger stats when in viewport
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }
    
    // Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Lightbox for Gallery
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    if (lightbox && galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
            });
        });
        
        document.querySelector('.close-lightbox')?.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('fullname')?.value;
            if (name && name.trim() !== '') {
                alert(`Thank you ${name}! We'll contact you within 24 hours about your service request.`);
                contactForm.reset();
            } else {
                alert('Please enter your name.');
            }
        });
    }
    
    // Newsletter Subscription
    const newsletterBtn = document.querySelector('.sidebar-widget button');
    const newsletterInput = document.querySelector('.sidebar-widget input');
    
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', () => {
            const email = newsletterInput.value;
            if (email && email.includes('@')) {
                alert('Thanks for subscribing! You\'ll receive our monthly newsletter.');
                newsletterInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Add current year to footer
    const footerYear = document.querySelector('.footer-bottom');
    if (footerYear) {
        const yearSpan = document.createElement('span');
        yearSpan.textContent = new Date().getFullYear();
    }
});
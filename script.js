// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger-menu');
const navbar = document.querySelector('.navbar');

hamburger?.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});

// Smooth scroll for navigation
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

// Active section highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Remove loading screen when page is ready
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Scroll Animation Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Remove loading class from body
    document.body.classList.remove('loading');

    // Animate sections
    document.querySelectorAll('.about, .education').forEach(section => {
        observer.observe(section);
    });

    // Animate education items
    document.querySelectorAll('.edu-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // Animate about paragraphs
    document.querySelectorAll('.about p').forEach((p, index) => {
        p.style.animationDelay = `${index * 0.3}s`;
        observer.observe(p);
    });

    // Typing animation for the main heading
    const text = "Hi, I'm Edith,";
    const typingDelay = 100;
    const heading = document.querySelector('.typing-animation');
    
    if (heading) {
        heading.textContent = '';
        let charIndex = 0;

        function type() {
            if (charIndex < text.length) {
                heading.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            }
        }

        type();
    }

    // Parallax effect for profile image
    const profileImg = document.querySelector('.home-img');
    if (profileImg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            profileImg.style.transform = `translateY(${scrolled * 0.1}px)`;
        });
    }

    // Social icons hover effect
    document.querySelectorAll('.h-icons a').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Project Cards Animation on Scroll
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
        card.classList.add('fade-in');
    });
};

// Download CV Button Animation
const initDownloadButton = () => {
    const downloadBtn = document.querySelector('.download-cv');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            // Add loading state
            const icon = downloadBtn.querySelector('i');
            icon.classList.remove('fa-download');
            icon.classList.add('fa-spinner', 'fa-spin');
            
            // Simulate download delay (remove in production)
            setTimeout(() => {
                icon.classList.remove('fa-spinner', 'fa-spin');
                icon.classList.add('fa-check');
                
                // Reset after 2 seconds
                setTimeout(() => {
                    icon.classList.remove('fa-check');
                    icon.classList.add('fa-download');
                }, 2000);
            }, 1000);
        });
    }
};

// Project Filter System (if needed)
const initProjectFilter = () => {
    const projects = document.querySelectorAll('.project-card');
    const tags = new Set();
    
    // Collect all unique tags
    projects.forEach(project => {
        const projectTags = project.querySelectorAll('.project-tag');
        projectTags.forEach(tag => tags.add(tag.textContent));
    });
    
    // Create filter buttons (uncomment if you want to add filtering)
    /*
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.innerHTML = `
        <button class="filter-btn active" data-filter="all">All</button>
        ${Array.from(tags).map(tag => `
            <button class="filter-btn" data-filter="${tag}">${tag}</button>
        `).join('')}
    `;
    
    document.querySelector('.projects h1').after(filterContainer);
    
    // Add filter functionality
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            document.querySelectorAll('.filter-btn').forEach(b => 
                b.classList.remove('active'));
            btn.classList.add('active');
            
            projects.forEach(project => {
                const projectTags = Array.from(project.querySelectorAll('.project-tag'))
                    .map(tag => tag.textContent);
                
                if (filter === 'all' || projectTags.includes(filter)) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
    */
};

// Contact Form Handling
const initContactForm = () => {
    const form = document.getElementById('contact-form');
    const sendButton = form.querySelector('.send-message-btn');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Add loading state
        sendButton.classList.add('loading');
        sendButton.disabled = true;
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success state
            sendButton.classList.remove('loading');
            sendButton.classList.add('success');
            
            // Reset form
            form.reset();
            
            // Reset button state after 2 seconds
            setTimeout(() => {
                sendButton.classList.remove('success');
                sendButton.disabled = false;
            }, 2000);
            
        } catch (error) {
            console.error('Error sending message:', error);
            sendButton.classList.remove('loading');
            sendButton.disabled = false;
            alert('Failed to send message. Please try again.');
        }
    });
    
    // Add floating label animation
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        // Check initial value
        if (input.value) {
            label.classList.add('active');
        }
        
        // Handle input events
        input.addEventListener('focus', () => {
            label.classList.add('active');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.classList.remove('active');
            }
        });
    });
};

// Footer Functionality
const initFooter = () => {
    // Update current year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Scroll to top functionality
    const scrollToTop = document.getElementById('scroll-to-top');
    if (scrollToTop) {
        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTop.classList.add('visible');
            } else {
                scrollToTop.classList.remove('visible');
            }
        });

        // Smooth scroll to top
        scrollToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    initDownloadButton();
    initProjectFilter();
    initContactForm();
    initFooter();
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 
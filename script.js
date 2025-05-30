// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loader
    const loader = document.querySelector('.loader');
    if (loader) {
        window.addEventListener('load', function() {
            loader.classList.add('hidden');
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        });
    }

    // Create navigation bar
    createNavigation();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize project cards
    initProjectCards();
    
    // Initialize skill bars animation
    initSkillBars();
    
    // Initialize form validation
    initFormValidation();
});

// Create navigation bar
function createNavigation() {
    const body = document.body;
    const header = document.querySelector('header');
    
    // Create nav container
    const navContainer = document.createElement('div');
    navContainer.className = 'nav-container';
    
    // Create navbar
    const navbar = document.createElement('div');
    navbar.className = 'navbar';
    
    // Create logo
    const logo = document.createElement('a');
    logo.className = 'nav-logo';
    logo.href = '#';
    logo.textContent = 'NI';
    
    // Create nav links
    const navLinks = document.createElement('div');
    navLinks.className = 'nav-links';
    
    // Add links
    const sections = ['About', 'Projects', 'Leadership', 'Competitions', 'Volunteer', 'Contact'];
    sections.forEach(section => {
        const link = document.createElement('a');
        link.href = `#${section.toLowerCase()}`;
        link.textContent = section;
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector(`.${section.toLowerCase()}`);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
        navLinks.appendChild(link);
    });
    
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '☀️';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Append elements
    navbar.appendChild(logo);
    navbar.appendChild(navLinks);
    navbar.appendChild(themeToggle);
    navbar.appendChild(mobileMenuBtn);
    navContainer.appendChild(navbar);
    
    // Insert after header
    body.insertBefore(navContainer, header.nextSibling);
    
    // Add IDs to sections for navigation
    const sectionElements = document.querySelectorAll('section');
    sectionElements.forEach(section => {
        if (section.classList.length > 0) {
            section.id = section.classList[0];
        }
    });
}

// Initialize theme toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '🌙';
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                themeToggle.innerHTML = '🌙';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.innerHTML = '☀️';
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

// Initialize scroll animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // For timeline items if they exist
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    // For skill bars if they exist
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize back to top button
function initBackToTop() {
    // Create back to top button
    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize project cards
function initProjectCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Add view details button
        const viewDetails = document.createElement('button');
        viewDetails.className = 'view-details';
        viewDetails.textContent = 'View Details';
        card.appendChild(viewDetails);
        
        // Create modal for each card
        const modal = createModal(card);
        document.body.appendChild(modal);
        
        // Open modal on click
        viewDetails.addEventListener('click', function(e) {
            e.stopPropagation();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Also open modal when clicking the card
        card.addEventListener('click', function() {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
}

// Create modal for project details
function createModal(card) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'Close modal');
    
    // Get content from card
    const img = card.querySelector('.project-img');
    const title = card.querySelector('h3');
    const desc = card.querySelector('p');
    
    // Create modal elements
    const modalImg = document.createElement('img');
    modalImg.className = 'modal-img';
    modalImg.src = img ? img.src : '';
    modalImg.alt = img ? img.alt : '';
    
    const modalTitle = document.createElement('h2');
    modalTitle.className = 'modal-title';
    modalTitle.textContent = title ? title.textContent : '';
    
    const modalDesc = document.createElement('p');
    modalDesc.textContent = desc ? desc.textContent : '';
    
    // Additional content (can be customized per project)
    const additionalContent = document.createElement('div');
    additionalContent.innerHTML = `
        <h3>Project Details</h3>
        <p>This is an expanded description of the project with more details about the technologies used, challenges faced, and outcomes achieved.</p>
        <ul>
            <li>Feature 1: Description of feature</li>
            <li>Feature 2: Description of feature</li>
            <li>Feature 3: Description of feature</li>
        </ul>
    `;
    
    // Append elements to modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalImg);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalDesc);
    modalContent.appendChild(additionalContent);
    modal.appendChild(modalContent);
    
    // Close modal when clicking close button
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    return modal;
}

// Initialize skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize form validation
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    valid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (valid) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.style.color = '#4CAF50';
                successMsg.style.marginTop = '10px';
                successMsg.textContent = 'Message sent successfully!';
                
                // Remove any existing message
                const existingMsg = contactForm.querySelector('div[style*="color: #4CAF50"]');
                if (existingMsg) {
                    existingMsg.remove();
                }
                
                contactForm.appendChild(successMsg);
                
                // Reset form
                contactForm.reset();
            }
        });
    }
}

// Add loading animation
function createLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    
    const spinner = document.createElement('div');
    spinner.className = 'loader-spinner';
    
    loader.appendChild(spinner);
    document.body.appendChild(loader);
}

// Call this function immediately
createLoader();

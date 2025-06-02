// Updated script.js with dark mode as default and other requested changes

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
    
    // Initialize fixed theme toggle (replacing back-to-top)
    initFixedThemeToggle();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize project cards
    initProjectCards();
    
    // Initialize skill bars animation
    initSkillBars();
    
    // Initialize form validation
    initFormValidation();
    
    // Add skill level fractions
    addSkillFractions();
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

// Initialize fixed theme toggle (replacing back-to-top)
function initFixedThemeToggle() {
    // Create fixed theme toggle button
    const fixedThemeToggle = document.createElement('button');
    fixedThemeToggle.className = 'fixed-theme-toggle';
    fixedThemeToggle.setAttribute('aria-label', 'Toggle dark mode');
    document.body.appendChild(fixedThemeToggle);
    
    // Check for saved theme preference or use dark mode as default
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        // User explicitly chose light mode before
        fixedThemeToggle.innerHTML = '☀️';
    } else {
        // Either no preference saved or dark mode was saved
        // Set dark mode as default
        document.body.classList.add('dark-mode');
        fixedThemeToggle.innerHTML = '🌙';
        localStorage.setItem('theme', 'dark');
    }
    
    // Toggle theme when clicked
    fixedThemeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            fixedThemeToggle.innerHTML = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            fixedThemeToggle.innerHTML = '☀️';
            localStorage.setItem('theme', 'light');
        }
    });
}

// Add skill fractions to display skill levels
function addSkillFractions() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const skillName = item.querySelector('.skill-info span');
        const dots = item.querySelectorAll('.dot');
        const filledDots = item.querySelectorAll('.dot.filled');
        
        if (skillName && dots.length > 0) {
            // Create fraction display
            const fraction = document.createElement('span');
            fraction.className = 'skill-fraction';
            fraction.textContent = `${filledDots.length}/${dots.length}`;
            
            // Insert after skill name
            skillName.textContent = `${skillName.textContent} `;
            skillName.appendChild(fraction);
        }
    });
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

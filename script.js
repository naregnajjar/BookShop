/**
 * Custom JavaScript for Bookstore Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all book sliders
    initBookSliders();
    
    // Initialize responsive navigation
    initResponsiveNav();
    
    // Initialize add to cart buttons
    initAddToCartButtons();
});

/**
 * Initialize book sliders for all book collection sections
 */
function initBookSliders() {
    const sliders = document.querySelectorAll('.book-slider');
    
    sliders.forEach((slider, index) => {
        const carousel = slider.querySelector('.book-carousel');
        const prevBtn = slider.querySelector('.carousel-prev');
        const nextBtn = slider.querySelector('.carousel-next');
        const cards = slider.querySelectorAll('.book-card');
        
        if (!carousel || !prevBtn || !nextBtn || cards.length === 0) return;
        
        // Set initial state
        let currentPosition = 0;
        let cardWidth = cards[0].offsetWidth;
        let cardsPerView = getCardsPerView();
        let maxPosition = Math.max(0, cards.length - cardsPerView);
        
        // Update values on window resize
        window.addEventListener('resize', () => {
            cardWidth = cards[0].offsetWidth;
            cardsPerView = getCardsPerView();
            maxPosition = Math.max(0, cards.length - cardsPerView);
            
            // Reset position if needed
            if (currentPosition > maxPosition) {
                currentPosition = maxPosition;
                updateCarouselPosition();
            }
        });
        
        // Previous button click handler
        prevBtn.addEventListener('click', () => {
            if (currentPosition > 0) {
                currentPosition--;
                updateCarouselPosition();
            }
        });
        
        // Next button click handler
        nextBtn.addEventListener('click', () => {
            if (currentPosition < maxPosition) {
                currentPosition++;
                updateCarouselPosition();
            }
        });
        
        // Update carousel position
        function updateCarouselPosition() {
            const translateX = currentPosition * cardWidth;
            carousel.style.transform = `translateX(${translateX * -1}px)`;
            
            // Update button states
            prevBtn.disabled = currentPosition === 0;
            nextBtn.disabled = currentPosition >= maxPosition;
            
            // Update visual state
            prevBtn.style.opacity = currentPosition === 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentPosition >= maxPosition ? '0.5' : '1';
        }
        
        // Get number of cards per view based on screen size
        function getCardsPerView() {
            if (window.innerWidth < 576) {
                return 1; // Mobile: 1 card
            } else if (window.innerWidth < 768) {
                return 2; // Small tablets: 2 cards
            } else if (window.innerWidth < 992) {
                return 3; // Tablets: 3 cards
            } else {
                return 4; // Desktop: 4 cards
            }
        }
        
        // Initialize position
        updateCarouselPosition();
        
        // Add touch swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50; // Minimum swipe distance
            
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe left (next)
                if (currentPosition < maxPosition) {
                    currentPosition++;
                    updateCarouselPosition();
                }
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Swipe right (previous)
                if (currentPosition > 0) {
                    currentPosition--;
                    updateCarouselPosition();
                }
            }
        }
    });
}

/**
 * Initialize responsive navigation
 */
function initResponsiveNav() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', () => {
            navbarCollapse.classList.toggle('show');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target) && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    }
    
    // Handle dropdown menus
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = toggle.parentElement;
            const dropdown = parent.querySelector('.dropdown-menu');
            
            if (dropdown) {
                dropdown.classList.toggle('show');
            }
            
            // Close other dropdowns
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    const otherParent = otherToggle.parentElement;
                    const otherDropdown = otherParent.querySelector('.dropdown-menu');
                    
                    if (otherDropdown && otherDropdown.classList.contains('show')) {
                        otherDropdown.classList.remove('show');
                    }
                }
            });
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        dropdownToggles.forEach(toggle => {
            const parent = toggle.parentElement;
            const dropdown = parent.querySelector('.dropdown-menu');
            
            if (dropdown && dropdown.classList.contains('show') && !parent.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    });
}

/**
 * Initialize add to cart buttons
 */
function initAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add animation class
            this.classList.add('btn-success');
            
            // Change text temporarily
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check me-2"></i>تمت الإضافة';
            
            // Reset after animation
            setTimeout(() => {
                this.classList.remove('btn-success');
                this.innerHTML = originalText;
            }, 2000);
            
            // Here you would typically add the product to the cart
            // For demonstration purposes, we're just showing the animation
        });
    });
}

/**
 * Handle responsive layout adjustments
 */
window.addEventListener('resize', function() {
    adjustLayoutForScreenSize();
});

function adjustLayoutForScreenSize() {
    const width = window.innerWidth;
    
    // Mobile layout adjustments
    if (width < 768) {
        // Adjust header elements for mobile
        const headerIcons = document.querySelector('.header-icons');
        if (headerIcons) {
            headerIcons.classList.add('d-flex', 'justify-content-center');
        }
    } else {
        // Reset for larger screens
        const headerIcons = document.querySelector('.header-icons');
        if (headerIcons) {
            headerIcons.classList.remove('d-flex', 'justify-content-center');
        }
    }
}

// Run initial layout adjustment
adjustLayoutForScreenSize();

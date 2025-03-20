// Calculate and display statistics
function updateStatistics() {
    const totalSeries = animeData.length;
    const totalLikes = animeData.reduce((sum, anime) => sum + (anime.likes || 0), 0);
    const avgRating = (animeData.reduce((sum, anime) => sum + parseFloat(anime.rating), 0) / totalSeries).toFixed(1);
    const genres = new Set(animeData.flatMap(anime => anime.genre.split(', ')));

    // Animate counting up
    animateNumber('totalSeries', 0, totalSeries);
    animateNumber('totalLikes', 0, totalLikes);
    animateNumber('avgRating', 0, parseFloat(avgRating));
    animateNumber('totalGenres', 0, genres.size);

    // Create genre tags
    const genreTagsContainer = document.getElementById('genreTags');
    genreTagsContainer.innerHTML = '';
    genres.forEach(genre => {
        const tag = document.createElement('div');
        tag.className = 'genre-tag';
        tag.textContent = genre;
        tag.addEventListener('click', () => filterByGenre(genre));
        genreTagsContainer.appendChild(tag);
    });
}

// Animate number counting up
function animateNumber(elementId, start, end) {
    const element = document.getElementById(elementId);
    const duration = 2000;
    const steps = 60;
    const increment = (end - start) / steps;
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            clearInterval(timer);
            current = end;
        }
        element.textContent = elementId === 'avgRating' ? current.toFixed(1) : Math.round(current);
    }, duration / steps);
}

// Featured anime carousel
let currentSlide = 0;
const slidesToShow = window.innerWidth < 768 ? 1 : 3;

function initializeCarousel() {
    const carousel = document.getElementById('featuredCarousel');
    const sortedAnime = [...animeData].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    const featuredAnime = sortedAnime.slice(0, 6); // Show top 6 rated anime

    carousel.innerHTML = '';
    featuredAnime.forEach(anime => {
        const card = document.createElement('div');
        card.className = 'featured-card';
        card.innerHTML = `
            <img src="${anime.image}" alt="${anime.title}">
            <div class="featured-info">
                <h3>${anime.title}</h3>
                <p class="rating">⭐ ${anime.rating}</p>
                <p class="genre">${anime.genre}</p>
            </div>
        `;
        carousel.appendChild(card);
    });

    updateCarousel();
}

function updateCarousel() {
    const carousel = document.getElementById('featuredCarousel');
    const cards = carousel.children;
    const offset = -currentSlide * (100 / slidesToShow);
    
    Array.from(cards).forEach(card => {
        card.style.transform = `translateX(${offset}%)`;
    });
}

// Carousel controls
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    const carousel = document.getElementById('featuredCarousel');
    const maxSlide = carousel.children.length - slidesToShow;
    if (currentSlide < maxSlide) {
        currentSlide++;
        updateCarousel();
    }
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');
        
        // Close other answers
        document.querySelectorAll('.faq-answer').forEach(item => {
            if (item !== answer) {
                item.style.maxHeight = null;
                item.previousElementSibling.querySelector('i').className = 'fas fa-plus';
            }
        });

        // Toggle current answer
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            icon.className = 'fas fa-plus';
        } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            icon.className = 'fas fa-minus';
        }
    });
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitBtn = e.target.querySelector('.submit-btn');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        e.target.reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
    }, 1500);
});

// Filter anime by genre
function filterByGenre(genre) {
    const filteredAnime = animeData.filter(anime => 
        anime.genre.split(', ').includes(genre)
    );
    
    // Update featured section with filtered anime
    const carousel = document.getElementById('featuredCarousel');
    carousel.innerHTML = '';
    
    filteredAnime.forEach(anime => {
        const card = document.createElement('div');
        card.className = 'featured-card';
        card.innerHTML = `
            <img src="${anime.image}" alt="${anime.title}">
            <div class="featured-info">
                <h3>${anime.title}</h3>
                <p class="rating">⭐ ${anime.rating}</p>
                <p class="genre">${anime.genre}</p>
            </div>
        `;
        carousel.appendChild(card);
    });
    
    currentSlide = 0;
    updateCarousel();
    
    // Highlight selected genre tag
    document.querySelectorAll('.genre-tag').forEach(tag => {
        tag.classList.toggle('active', tag.textContent === genre);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    updateStatistics();
    initializeCarousel();
    
    // Add scroll animations
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => observer.observe(section));
});

// Initialize 3D Gallery
function initGallery() {
    console.log("Initializing gallery...");
    const galleryWrapper = document.querySelector('.gallery-wrapper');
    const prevBtn = document.querySelector('.gallery-btn.prev-btn');
    const nextBtn = document.querySelector('.gallery-btn.next-btn');
    const items = document.querySelectorAll('.gallery-item');
    
    console.log("Gallery elements:", {
        wrapper: galleryWrapper,
        prevBtn: prevBtn,
        nextBtn: nextBtn,
        items: items.length
    });
    
    if (!galleryWrapper || !prevBtn || !nextBtn || !items.length) {
        console.error("Gallery elements not found");
        return;
    }
    
    let currentIndex = 0;
    const itemWidth = items[0].offsetWidth + 32; // Width + gap
    const totalItems = items.length;
    
    // Initialize tilt effect
    items.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = item.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            item.style.transform = `
                perspective(1000px)
                rotateY(${x * 10}deg)
                rotateX(${-y * 10}deg)
                translateZ(10px)
            `;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });
    
    // Navigation functions
    function updateGallery() {
        galleryWrapper.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        
        // Update active state
        items.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
    }
    
    function nextSlide() {
        console.log("Next slide clicked");
        currentIndex = (currentIndex + 1) % totalItems;
        updateGallery();
    }
    
    function prevSlide() {
        console.log("Previous slide clicked");
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateGallery();
    }
    
    // Event listeners
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        prevSlide();
    });
    
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        nextSlide();
    });
    
    // Auto-play
    let autoplayInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    galleryWrapper.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    galleryWrapper.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(nextSlide, 5000);
    });
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    galleryWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    
    galleryWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Initialize the gallery position
    updateGallery();
}

// Make sure the gallery initializes when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing gallery");
    
    // Initialize the gallery with a slight delay to ensure all elements are loaded
    setTimeout(initGallery, 500);
    
    // Add direct click handlers as a fallback
    const prevBtn = document.querySelector('.gallery-btn.prev-btn');
    const nextBtn = document.querySelector('.gallery-btn.next-btn');
    
    if (prevBtn && nextBtn) {
        prevBtn.onclick = function(e) {
            e.preventDefault();
            console.log("Direct prev button click");
            const galleryWrapper = document.querySelector('.gallery-wrapper');
            const items = document.querySelectorAll('.gallery-item');
            
            if (galleryWrapper && items.length) {
                const currentItem = document.querySelector('.gallery-item.active') || items[0];
                const currentIndex = Array.from(items).indexOf(currentItem);
                const newIndex = (currentIndex - 1 + items.length) % items.length;
                const itemWidth = items[0].offsetWidth + 32;
                
                galleryWrapper.style.transform = `translateX(-${newIndex * itemWidth}px)`;
                
                items.forEach((item, index) => {
                    item.classList.toggle('active', index === newIndex);
                });
            }
        };
        
        nextBtn.onclick = function(e) {
            e.preventDefault();
            console.log("Direct next button click");
            const galleryWrapper = document.querySelector('.gallery-wrapper');
            const items = document.querySelectorAll('.gallery-item');
            
            if (galleryWrapper && items.length) {
                const currentItem = document.querySelector('.gallery-item.active') || items[0];
                const currentIndex = Array.from(items).indexOf(currentItem);
                const newIndex = (currentIndex + 1) % items.length;
                const itemWidth = items[0].offsetWidth + 32;
                
                galleryWrapper.style.transform = `translateX(-${newIndex * itemWidth}px)`;
                
                items.forEach((item, index) => {
                    item.classList.toggle('active', index === newIndex);
                });
            }
        };
    }
}); 
// Sample anime data with likes
const animeData = [
    {
        id: 1,
        title: "Attack on Titan",
        image: "https://i.pinimg.com/564x/4c/9c/49/4c9c49b94e4204085e23da2241c4194d.jpg",
        description: "Humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason.",
        rating: "9.0",
        genre: "Action, Drama, Fantasy",
        likes: 0
    },
    {
        id: 2,
        title: "Demon Slayer",
        image: "https://m.media-amazon.com/images/M/MV5BMWU1OGEwNmQtNGM3MS00YTYyLThmYmMtN2FjYzQzNzNmNTE0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        description: "A young man's journey to cure his sister's demon curse and avenge his family.",
        rating: "8.9",
        genre: "Action, Supernatural"
    },
    {
        id: 3,
        title: "My Hero Academia",
        image: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p12793542_b_v13_ak.jpg",
        description: "A superhero-loving boy without any powers is determined to enroll in a prestigious hero academy and learn what it really means to be a hero.",
        rating: "8.4",
        genre: "Action, Comedy"
    },
    {
        id: 4,
        title: "One Punch Man",
        image: "https://m.media-amazon.com/images/M/MV5BNzMwOGQ5MWItNzE3My00ZDYyLTk4NzAtZWIyYWI0NTZhYzY0XkEyXkFqcGc@._V1_.jpg",
        description: "The story of Saitama, a hero who can defeat any opponent with a single punch but seeks to find a worthy opponent after growing bored by a lack of challenge.",
        rating: "8.7",
        genre: "Action, Comedy"
    },
    {
        id: 5,
        title: "Death Note",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTJCp1AIyMA0ykJNEgaou1TA5lNcCIE3YzqFCd8l9yY5W4L1MrRVK2fWWasbjkx-mRwrlqv",
        description: "A high school student discovers a supernatural notebook that allows him to kill anyone by writing the victim's name while picturing their face.",
        rating: "8.8",
        genre: "Psychological Thriller",
        likes: 200000,
    },
    {
        id: 6,
        title: "Fullmetal Alchemist: Brotherhood",
        image: "https://m.media-amazon.com/images/M/MV5BMzNiODA5NjYtYWExZS00OTc4LTg3N2ItYWYwYTUyYmM5MWViXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        description: "Two brothers search for the Philosopher's Stone to restore their bodies after a failed alchemical ritual.",
        rating: "9.8",
        genre: "Action, Adventure, Fantasy",
        likes: 10000
    },
    {
        id: 7,
        title: "Zom 100: Bucket List of the Dead",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgiYMWHCmH6wwd9IIQoHU4XlDnmUUdUl-9nsY8AksFEWQ0_-ki",
        description: "An overworked young man creates a bucket list, then a zombie outbreak erupts to make him feel like he's finally living",
        rating: "9.8",
        genre: "action, comedy, drama, and horror",
        likes: 100000
    },
    {
        id: 8,
        title: "Dragon Ball Z",
        image: "https://m.media-amazon.com/images/S/pv-target-images/334f00b53cf3ef848ea7048b25711bc98e8236ce1685a096990c80d0965835ea.png",
        description: "Following the adventures of Goku into adulthood as he and his companions defend the Earth against an assortment of villains ranging from intergalactic space fighters and conquerors, unnaturally powerful androids and near indestructible magical creatures.",
        rating: "8.7", 
        genre: "Action, Adventure, Fantasy, Martial Arts",
        likes: 20000000
    },
    {
        id: 9,
        title: "Solo Leveling",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrE8T7VeZ1CS5xO3zz5rRUir4tGcppFZSWBNWes2Rx5jrd69SUl5hx8PWv6vhRlfNslvQK-LzgqP6VvUhMjvf7VI-5z7B26d2XdF6pxA",
        description: "In a world where hunters must battle deadly monsters to protect humanity, Sung Jin-Woo is known as the weakest of all hunters. After a near-death experience in a mysterious double dungeon, he gains an extraordinary power that allows him to level up infinitely, changing his life forever.",
        rating: "8.9",
        genre: "Action, Adventure, Fantasy",
        likes: 10000
    },
    {
        id: 10,
        title: "I Got Married to the Girl I Hate Most in Class",
        image: "https://external-preview.redd.it/im-getting-married-to-a-girl-i-hate-in-my-class-new-key-v0-UYcfIp1-H7iGlTNxCx7BUtD18mNcdZwbopdZgyPSZ3U.jpg?width=640&crop=smart&auto=webp&s=0cca4aff394d44b8868d13fd08f042dcf5b89019",
        description: "A romantic comedy about two high school students who can't stand each other but end up in an unexpected marriage arrangement. As they navigate their new life together, they slowly begin to discover there may be more to their relationship than just animosity.",
        rating: "7.8",
        genre: "Romance, Comedy, School Life",
        likes: 400
    },
    {
        id: 11,
        title: "Jujutsu Kaisen",
        image: "https://m.media-amazon.com/images/M/MV5BMTMwMDM4N2EtOTJiYy00OTQ0LThlZDYtYWUwOWFlY2IxZGVjXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
        description: "Yuji Itadori, a high school student with extraordinary physical abilities, gets involved in the world of Jujutsu Sorcery when he swallows a cursed object to save his friends. Now enrolled in Tokyo Jujutsu High, he must learn to harness cursed energy while battling dangerous curses alongside his classmates.",
        rating: "8.7",
        genre: "Action, Supernatural, Dark Fantasy",
        likes: 1000
    },
    {
        id: 12,
        title: "Crazy Over His Fingers",
        image: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fseries%2F379925%2Fposters%2F5e9077e14daff.jpg&w=640&q=75",
        description: "Hoshiya Fumi, an assistant at a renowned city salon, trains under the strict yet skilled Sousuke, whose unexpected romantic interest in her sparks after an accidental splash of water.",
        rating: "4.8",
        genre: "shoujo, Romance, Drama",
        likes: 500
    }
];

// Initialize variables for scrolling
let scrollSpeed = 1;
let scrollAnimation;

// Sort anime by rating
const sortedAnime = animeData.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

// Create anime card HTML for horizontal leaderboard
function createLeaderboardCard(anime) {
    return `
        <div class="leaderboard-card">
            <img src="${anime.image}" alt="${anime.title}" loading="lazy">
            <div class="anime-info">
                <h3>${anime.title}</h3>
                <p>${anime.genre}</p>
                <div class="anime-stats">
                    <span>⭐ ${anime.rating}</span>
                    <span>❤️ ${anime.likes ? anime.likes.toLocaleString() : '0'}</span>
                </div>
            </div>
        </div>
    `;
}

// Create anime card with like button for main grid
function createAnimeCardWithLikes(anime, index) {
    return `
        <div class="anime-card" data-id="${anime.id}">
            <div class="glitter-container">
                <img src="${anime.image}" alt="${anime.title}" loading="lazy">
                <span class="like-count">${anime.likes || 0} likes</span>
                <button class="like-button ${anime.likes > 0 ? 'liked' : ''}" data-id="${anime.id}">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="anime-info">
                <h3>${anime.title}</h3>
                <p class="rolling-text">${anime.genre}</p>
            </div>
        </div>
    `;
}

// Populate both grids with anime cards for horizontal scrolling
function populateGrids() {
    const grid1 = document.getElementById('grid1');
    const grid2 = document.getElementById('grid2');
    
    if (!grid1 || !grid2) return;
    
    const cardsHTML = sortedAnime.map(createLeaderboardCard).join('');
    grid1.innerHTML = cardsHTML;
    grid2.innerHTML = cardsHTML;
    
    // Add click event to show popup for leaderboard cards
    document.querySelectorAll('.leaderboard-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const title = card.querySelector('h3').textContent;
            const anime = animeData.find(a => a.title === title);
            if (anime) {
                showPopup(anime);
            }
        });
    });
}

// Populate main anime grid
function populateAnimeGrid() {
    const animeGrid = document.getElementById('animeGrid');
    
    if (!animeGrid) return;
    
    animeGrid.innerHTML = animeData.map((anime, index) => createAnimeCardWithLikes(anime, index)).join('');
    
    // Add event listeners for like buttons
    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const animeId = parseInt(button.getAttribute('data-id'));
            toggleLike(animeId);
        });
    });
    
    // Add click event to show popup
    document.querySelectorAll('.anime-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.like-button')) {
                const animeId = parseInt(card.getAttribute('data-id'));
                const anime = animeData.find(a => a.id === animeId);
                if (anime) {
                    showPopup(anime);
                }
            }
        });
        
        // Enhanced mouse move effect for parallax with glow
        card.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            // Calculate distance from center for glow intensity
            const distance = Math.sqrt(x * x + y * y);
            const glowIntensity = Math.max(0.5, 1 - distance);
            
            // Apply 3D transform
            card.style.transform = `
                perspective(1000px)
                rotateY(${x * 10}deg)
                rotateX(${-y * 10}deg)
                translateZ(10px)
            `;
            
            // Add dynamic glow based on cursor position
            const glitterContainer = card.querySelector('.glitter-container');
            if (glitterContainer) {
                glitterContainer.style.boxShadow = `
                    0 5px 15px rgba(106, 90, 205, ${glowIntensity * 0.8}),
                    0 0 30px rgba(106, 90, 205, ${glowIntensity * 0.4})
                `;
                
                // Create spotlight effect following cursor
                glitterContainer.style.background = `
                    radial-gradient(
                        circle at ${e.clientX - left}px ${e.clientY - top}px, 
                        rgba(255, 255, 255, 0.2) 0%, 
                        rgba(255, 255, 255, 0) 60%
                    )
                `;
            }
        });
        
        // Reset card position and effects on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            
            const glitterContainer = card.querySelector('.glitter-container');
            if (glitterContainer) {
                glitterContainer.style.boxShadow = '';
                glitterContainer.style.background = '';
            }
        });
    });
}

// Initialize horizontal scroll animation
function initScroll() {
    const wrapper = document.querySelector('.leaderboard-wrapper');
    const grid1 = document.getElementById('grid1');
    
    if (!wrapper || !grid1) return;
    
    // Kill any existing animations
    if (scrollAnimation) {
        scrollAnimation.kill();
    }
    
    // Reset position
    gsap.set(wrapper, { x: 0 });
    
    // Calculate the width of grid1 for scrolling
    const gridWidth = grid1.offsetWidth;
    
    // Create new animation for horizontal scrolling
    scrollAnimation = gsap.to(wrapper, {
        x: -gridWidth,
        duration: 30 / scrollSpeed,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
            gsap.set(wrapper, { x: 0 });
        }
    });
}

// Toggle like function
function toggleLike(animeId) {
    const anime = animeData.find(a => a.id === animeId);
    if (anime) {
        anime.likes = anime.likes > 0 ? 0 : 1;
        saveLikes();
        updateLikeUI(animeId);
    }
}

// Update like UI
function updateLikeUI(animeId) {
    const anime = animeData.find(a => a.id === animeId);
    if (!anime) return;
    
    const likeButtons = document.querySelectorAll(`.like-button[data-id="${animeId}"]`);
    const likeCounts = document.querySelectorAll(`.anime-card[data-id="${animeId}"] .like-count`);
    
    likeButtons.forEach(button => {
        if (anime.likes > 0) {
            button.classList.add('liked');
        } else {
            button.classList.remove('liked');
        }
    });
    
    likeCounts.forEach(count => {
        count.textContent = `${anime.likes || 0} likes`;
    });
    
    // Update leaderboard
    populateGrids();
}

// Save likes to localStorage
function saveLikes() {
    const likesData = {};
    animeData.forEach(anime => {
        likesData[anime.id] = anime.likes;
    });
    localStorage.setItem('animeLikes', JSON.stringify(likesData));
}

// Load likes from localStorage
function loadLikes() {
    const savedLikes = localStorage.getItem('animeLikes');
    if (savedLikes) {
        const likesData = JSON.parse(savedLikes);
        animeData.forEach(anime => {
            if (likesData[anime.id]) {
                anime.likes = likesData[anime.id];
            }
        });
    }
}

// Create and append popup container to body
function createPopupContainer() {
    const existingPopup = document.querySelector('.popup-container');
    if (existingPopup) return;
    
    const popupContainer = document.createElement('div');
    popupContainer.className = 'popup-container';
    popupContainer.innerHTML = `
        <div class="popup">
            <button class="close-popup">&times;</button>
            <div class="popup-content">
                <img src="" alt="" class="popup-image">
                <div class="popup-info">
                    <h2></h2>
                    <p class="genre"></p>
                    <p class="rating"></p>
                    <p class="description"></p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(popupContainer);
    
    // Add event listeners for popup
    document.querySelector('.close-popup').addEventListener('click', closePopup);
    popupContainer.addEventListener('click', (e) => {
        if (e.target === popupContainer) {
            closePopup();
        }
    });
}

// Show popup with anime details
function showPopup(anime) {
    createPopupContainer();
    
    const popup = document.querySelector('.popup-container');
    const popupImage = popup.querySelector('.popup-image');
    const popupTitle = popup.querySelector('h2');
    const popupGenre = popup.querySelector('.genre');
    const popupRating = popup.querySelector('.rating');
    const popupDescription = popup.querySelector('.description');
    
    // Reset animations
    [popupTitle, popupGenre, popupRating, popupDescription].forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
    });
    
    // Set content
    popupImage.src = anime.image;
    popupImage.alt = anime.title;
    popupTitle.textContent = anime.title;
    popupGenre.textContent = `Genre: ${anime.genre}`;
    popupRating.textContent = `Rating: ${createStarRating(anime.rating)}`;
    popupDescription.textContent = anime.description;
    
    // Show popup
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animate content with delays
    setTimeout(() => {
        [popupTitle, popupGenre, popupRating, popupDescription].forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.transition = 'all 0.5s ease-out';
            }, index * 100);
        });
    }, 300);
}

// Close popup
function closePopup() {
    const popup = document.querySelector('.popup-container');
    if (!popup) return;
    
    const popupContent = popup.querySelector('.popup-content');
    
    popupContent.style.transform = 'scale(0.9)';
    popupContent.style.opacity = '0';
    
    setTimeout(() => {
        popup.classList.remove('active');
        document.body.style.overflow = '';
        popupContent.style.transform = '';
        popupContent.style.opacity = '';
    }, 300);
}

// Create star rating
function createStarRating(rating) {
    const numStars = Math.round(parseFloat(rating));
    const stars = '⭐'.repeat(numStars);
    return `${stars} (${rating})`;
}

// Initialize theme toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', () => {
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? '' : 'dark';
        icon.className = document.body.dataset.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', document.body.dataset.theme);
        
        // Animate icon
        icon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            icon.style.transform = '';
        }, 500);
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.dataset.theme = savedTheme;
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Make sections visible
function makeSectionsVisible() {
    // Make all sections visible
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('visible');
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
        section.style.visibility = 'visible';
    });
    
    // Make sure anime grid is visible
    const animeGrid = document.getElementById('animeGrid');
    if (animeGrid) {
        animeGrid.style.opacity = '1';
        animeGrid.style.transform = 'translateY(0)';
        animeGrid.style.visibility = 'visible';
    }
    
    // Make sure leaderboard is visible
    const leaderboard = document.querySelector('.leaderboard-section');
    if (leaderboard) {
        leaderboard.style.opacity = '1';
        leaderboard.style.transform = 'translateY(0)';
        leaderboard.style.visibility = 'visible';
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // Make sections visible
    makeSectionsVisible();
    
    // Load likes from localStorage
    loadLikes();
    
    // Create popup container
    createPopupContainer();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Populate grids
    populateGrids();
    populateAnimeGrid();
    
    // Initialize search functionality
    initSearch();
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initScroll();
        }, 100);
    });
    
    // Initialize scroll animation after images are loaded
    const leaderboardImages = document.querySelectorAll('.leaderboard-card img');
    let loadedImages = 0;
    const totalImages = leaderboardImages.length;
    
    if (totalImages > 0) {
        leaderboardImages.forEach(img => {
            if (img.complete) {
                loadedImages++;
                if (loadedImages === totalImages) {
                    initScroll();
                }
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        initScroll();
                    }
                });
                img.addEventListener('error', () => {
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        initScroll();
                    }
                });
            }
        });
    } else {
        // If no images found in the leaderboard, initialize scroll anyway
        setTimeout(initScroll, 500);
    }
});

// Initialize search functionality
function initSearch() {
    const searchInput = document.getElementById('animeSearch');
    const searchButton = document.querySelector('.search-button');
    
    if (!searchInput || !searchButton) return;
    
    // Search function
    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const animeCards = document.querySelectorAll('.anime-card');
        const animeSection = document.querySelector('.anime-section');
        
        // If search is empty, show all cards
        if (searchTerm === '') {
            animeCards.forEach(card => {
                card.style.display = 'flex';
            });
            
            // Smooth scroll to anime section
            animeSection.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        
        // Filter cards based on search term
        let hasResults = false;
        animeCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const genre = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || genre.includes(searchTerm)) {
                card.style.display = 'flex';
                card.classList.add('search-highlight');
                setTimeout(() => card.classList.remove('search-highlight'), 2000);
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Smooth scroll to anime section
        animeSection.scrollIntoView({ behavior: 'smooth' });
        
        // Show no results message if needed
        const existingNoResults = document.querySelector('.no-results');
        if (!hasResults) {
            if (!existingNoResults) {
                const noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.textContent = `No anime found matching "${searchTerm}"`;
                document.getElementById('animeGrid').appendChild(noResults);
            }
        } else if (existingNoResults) {
            existingNoResults.remove();
        }
    };
    
    // Event listeners
    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Add animation to search input
    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.classList.add('focused');
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.parentElement.classList.remove('focused');
    });
} 
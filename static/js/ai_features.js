// AI Features Integration

// Get personalized recommendations
async function getRecommendations() {
    try {
        const response = await fetch('/api/recommend', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        
        if (!response.ok) {
            throw new Error('Failed to get recommendations');
        }

        const recommendations = await response.json();
        displayRecommendations(recommendations);
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error getting recommendations', 'error');
    }
}

// Display recommendations in the UI
function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendationsContainer');
    if (!container) return;

    container.innerHTML = '';
    
    recommendations.forEach(rec => {
        const anime = rec.anime;
        const card = document.createElement('div');
        card.className = 'anime-card recommendation';
        card.innerHTML = `
            <img src="${anime.location}" alt="${anime.title}">
            <div class="anime-info">
                <h3>${anime.title}</h3>
                <p class="price">$${anime.price.toFixed(2)}</p>
                <p class="description">${anime.description}</p>
                <div class="recommendation-score">
                    Match Score: ${(rec.score * 100).toFixed(1)}%
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Enhance anime description using AI
async function enhanceDescription(imageId) {
    try {
        const response = await fetch(`/api/enhance-description/${imageId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to enhance description');
        }

        const data = await response.json();
        updateAnimeDescription(imageId, data.description);
        showNotification('Description enhanced successfully', 'success');
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error enhancing description', 'error');
    }
}

// Update anime description in the UI
function updateAnimeDescription(imageId, newDescription) {
    const descriptionElement = document.querySelector(`#anime-${imageId} .description`);
    if (descriptionElement) {
        descriptionElement.textContent = newDescription;
        descriptionElement.classList.add('enhanced');
    }
}

// Analyze sentiment of user comments
async function analyzeSentiment(text) {
    try {
        const response = await fetch('/api/analyze-sentiment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ text })
        });

        if (!response.ok) {
            throw new Error('Failed to analyze sentiment');
        }

        const sentiment = await response.json();
        return sentiment;
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error analyzing sentiment', 'error');
        return null;
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Load recommendations when page loads
    getRecommendations();

    // Add enhance description buttons to anime cards
    document.querySelectorAll('.anime-card').forEach(card => {
        const imageId = card.getAttribute('data-image-id');
        if (imageId) {
            const enhanceBtn = document.createElement('button');
            enhanceBtn.className = 'enhance-btn';
            enhanceBtn.textContent = 'Enhance Description';
            enhanceBtn.onclick = () => enhanceDescription(imageId);
            card.querySelector('.anime-info').appendChild(enhanceBtn);
        }
    });

    // Add sentiment analysis to comment form
    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        const commentInput = commentForm.querySelector('textarea');
        const submitBtn = commentForm.querySelector('button[type="submit"]');
        
        let typingTimer;
        commentInput.addEventListener('keyup', () => {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(async () => {
                const sentiment = await analyzeSentiment(commentInput.value);
                if (sentiment) {
                    const sentimentIndicator = document.getElementById('sentimentIndicator');
                    if (sentimentIndicator) {
                        sentimentIndicator.textContent = `Sentiment: ${sentiment.label}`;
                        sentimentIndicator.className = `sentiment ${sentiment.label.toLowerCase()}`;
                    }
                }
            }, 1000);
        });
    }
}); 
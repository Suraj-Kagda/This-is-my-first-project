from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user
from flask_cors import CORS
import os
from dotenv import load_dotenv
import openai
from transformers import pipeline
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import json

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure Flask app
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key')
app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"mysql+mysqlconnector://{os.getenv('DB_USER', 'root')}:"
    f"{os.getenv('DB_PASS', '')}@{os.getenv('DB_HOST', 'localhost')}/"
    f"{os.getenv('DB_NAME', 'anime_paradise')}"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

# Initialize AI models
try:
    sentiment_analyzer = pipeline('sentiment-analysis')
    text_generator = pipeline('text-generation', model='gpt2')
except Exception as e:
    print(f"Warning: Could not load AI models: {e}")
    sentiment_analyzer = None
    text_generator = None

# Set up OpenAI (if API key is available)
openai.api_key = os.getenv('AIzaSyBNThbMxYI172JYr8CJwDuHkBObzX6nm0g')

# User model
class User(UserMixin, db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def get_id(self):
        return str(self.user_id)

# Anime model
class AnimeImage(db.Model):
    __tablename__ = 'anime_images'
    image_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# AI-powered description generation
def generate_anime_description(title, existing_description=""):
    """Generate an enhanced anime description using AI."""
    try:
        if openai.api_key:
            response = openai.Completion.create(
                engine="text-davinci-003",
                prompt=f"Write an engaging description for the anime '{title}'. Current description: {existing_description}",
                max_tokens=150,
                temperature=0.7
            )
            return response.choices[0].text.strip()
        elif text_generator:
            generated_text = text_generator(
                f"Anime description for {title}:",
                max_length=100,
                num_return_sequences=1
            )[0]['generated_text']
            return generated_text
        return existing_description
    except Exception as e:
        print(f"Error generating description: {e}")
        return existing_description

# User preference analysis
def analyze_user_preferences(user_id):
    """Analyze user preferences based on their interactions."""
    try:
        # Get user's liked anime and ratings
        liked_anime = db.session.execute("""
            SELECT ai.* FROM anime_images ai
            JOIN user_likes ul ON ai.image_id = ul.image_id
            WHERE ul.user_id = :user_id
        """, {'user_id': user_id}).fetchall()

        rated_anime = db.session.execute("""
            SELECT ai.*, ir.rating FROM anime_images ai
            JOIN image_ratings ir ON ai.image_id = ir.image_id
            WHERE ir.user_id = :user_id
        """, {'user_id': user_id}).fetchall()

        # Create user preference vector
        preferences = {
            'genres': [],
            'rating_patterns': [],
            'price_range': []
        }

        for anime in liked_anime:
            if anime.description:
                # Analyze sentiment of descriptions of liked anime
                if sentiment_analyzer:
                    sentiment = sentiment_analyzer(anime.description)[0]
                    preferences['genres'].append(sentiment['label'])

        return preferences
    except Exception as e:
        print(f"Error analyzing preferences: {e}")
        return None

# Routes
@app.route('/api/recommend', methods=['GET'])
@login_required
def get_recommendations():
    """Get personalized anime recommendations for the user."""
    try:
        user_preferences = analyze_user_preferences(current_user.user_id)
        if not user_preferences:
            return jsonify({'error': 'Could not analyze preferences'}), 400

        # Get all anime
        all_anime = AnimeImage.query.all()
        recommendations = []

        for anime in all_anime:
            # Generate similarity score based on preferences
            score = 0
            if anime.description and sentiment_analyzer:
                sentiment = sentiment_analyzer(anime.description)[0]
                if sentiment['label'] in user_preferences['genres']:
                    score += sentiment['score']

            recommendations.append({
                'anime': {
                    'id': anime.image_id,
                    'title': anime.title,
                    'price': anime.price,
                    'description': anime.description
                },
                'score': score
            })

        # Sort by score and return top 5
        recommendations.sort(key=lambda x: x['score'], reverse=True)
        return jsonify(recommendations[:5])

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/enhance-description/<int:image_id>', methods=['POST'])
@login_required
def enhance_description(image_id):
    """Enhance an anime description using AI."""
    try:
        anime = AnimeImage.query.get_or_404(image_id)
        enhanced_description = generate_anime_description(anime.title, anime.description)
        
        if enhanced_description:
            anime.description = enhanced_description
            db.session.commit()
            return jsonify({'description': enhanced_description})
        
        return jsonify({'error': 'Could not enhance description'}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analyze-sentiment', methods=['POST'])
@login_required
def analyze_sentiment():
    """Analyze sentiment of user comments or reviews."""
    try:
        data = request.get_json()
        text = data.get('text')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400

        if sentiment_analyzer:
            sentiment = sentiment_analyzer(text)[0]
            return jsonify(sentiment)
        
        return jsonify({'error': 'Sentiment analyzer not available'}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True) 
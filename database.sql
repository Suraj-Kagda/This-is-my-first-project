-- Create the database
CREATE DATABASE IF NOT EXISTS anime_paradise;
USE anime_paradise;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_email CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create anime_images table
CREATE TABLE IF NOT EXISTS anime_images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_price CHECK (price >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create additional tables for enhanced functionality

-- Table for storing likes
CREATE TABLE IF NOT EXISTS user_likes (
    user_id INT,
    image_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, image_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (image_id) REFERENCES anime_images(image_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for storing ratings
CREATE TABLE IF NOT EXISTS image_ratings (
    user_id INT,
    image_id INT,
    rating INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, image_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (image_id) REFERENCES anime_images(image_id) ON DELETE CASCADE,
    CONSTRAINT chk_rating CHECK (rating BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create indexes for better performance
CREATE INDEX idx_anime_title ON anime_images(title);
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_user_username ON users(username);

-- Create views for commonly accessed data
CREATE OR REPLACE VIEW vw_anime_stats AS
SELECT 
    ai.image_id,
    ai.title,
    ai.price,
    COUNT(DISTINCT ul.user_id) as like_count,
    COALESCE(AVG(ir.rating), 0) as avg_rating,
    COUNT(DISTINCT ir.user_id) as rating_count
FROM anime_images ai
LEFT JOIN user_likes ul ON ai.image_id = ul.image_id
LEFT JOIN image_ratings ir ON ai.image_id = ir.image_id
GROUP BY ai.image_id, ai.title, ai.price;

-- Add sample data for testing
INSERT INTO users (username, email, password) VALUES
('admin', 'admin@animestore.com', '$2y$10$example_hashed_password'),
('test_user', 'test@example.com', '$2y$10$example_hashed_password');

INSERT INTO anime_images (title, price, location, description) VALUES
('Naruto Collection', 29.99, '/images/naruto.jpg', 'Complete Naruto manga collection'),
('One Piece Set', 39.99, '/images/onepiece.jpg', 'Limited edition One Piece artwork'); 
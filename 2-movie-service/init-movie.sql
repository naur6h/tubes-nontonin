-- init.sql untuk movie-service
-- Database ini otomatis dibuat oleh environment MYSQL_DATABASE di docker-compose.yml
-- Jadi di sini tidak perlu CREATE DATABASE lagi, langsung buat tabel saja

CREATE TABLE IF NOT EXISTS movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  genre VARCHAR(100),
  release_year INT,
  director VARCHAR(255),
  poster_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: data dummy biar pas demo query langsung ada isinya
INSERT INTO movies (title, description, genre, release_year, director, poster_url) VALUES
('Inception', 'A thief who steals corporate secrets through dream-sharing technology.', 'Sci-Fi', 2010, 'Christopher Nolan', NULL),
('Ratatouille', 'A rat who dreams of becoming a chef in Paris.', 'Animation', 2007, 'Brad Bird', NULL);
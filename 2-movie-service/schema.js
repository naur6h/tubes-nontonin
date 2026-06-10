const { buildSchema } = require('graphql');
const db = require('./db');

const schema = buildSchema(`
  type Movie {
    id: ID!
    title: String!
    description: String
    genre: String
    release_year: Int
    director: String
    poster_url: String
    created_at: String
  }

  type Query {
    movies: [Movie]
    movie(id: ID!): Movie
  }

  type Mutation {
    addMovie(
      title: String!
      description: String
      genre: String
      release_year: Int
      director: String
      poster_url: String
    ): Movie

    updateMovie(
      id: ID!
      title: String
      description: String
      genre: String
      release_year: Int
      director: String
      poster_url: String
    ): Movie

    deleteMovie(id: ID!): String
  }
`);

const root = {
  movies: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM movies', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  movie: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM movies WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        resolve(results[0] || null);
      });
    });
  },

  addMovie: ({ title, description, genre, release_year, director, poster_url }) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO movies (title, description, genre, release_year, director, poster_url) VALUES (?, ?, ?, ?, ?, ?)';
      db.query(sql, [title, description, genre, release_year, director, poster_url], (err, result) => {
        if (err) reject(err);
        resolve({ id: result.insertId, title, description, genre, release_year, director, poster_url });
      });
    });
  },

  updateMovie: ({ id, title, description, genre, release_year, director, poster_url }) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE movies SET title=?, description=?, genre=?, release_year=?, director=?, poster_url=? WHERE id=?';
      db.query(sql, [title, description, genre, release_year, director, poster_url, id], (err) => {
        if (err) reject(err);
        db.query('SELECT * FROM movies WHERE id = ?', [id], (err2, results) => {
          if (err2) reject(err2);
          resolve(results[0] || null);
        });
      });
    });
  },

  deleteMovie: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM movies WHERE id = ?', [id], (err, result) => {
        if (err) reject(err);
        if (result.affectedRows === 0) resolve('Movie not found');
        resolve('Movie deleted successfully');
      });
    });
  },
};

module.exports = { schema, root };
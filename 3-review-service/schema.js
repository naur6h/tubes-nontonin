const { buildSchema } = require('graphql');
const db = require('./db');

const schema = buildSchema(`
  type Review {
    id: ID!
    userId: Int!
    movieId: Int!
    rating: Int!
    reviewText: String!
  }

  type Query {
    getReview: [Review]
    getReviewById(id: Int!): Review
  }

  type Mutation {
    addReview(userId: Int!, movieId: Int!, rating: Int!, reviewText: String!): Review
    updateReview(id: Int!, rating: Int, reviewText: String): Review
    deleteReview(id: Int!): String
  }
`);

const mapReview = (row) => ({
  id: row.id,
  userId: row.user_id,
  movieId: row.movie_id,
  rating: row.rating,
  reviewText: row.review_text
});

const root = {
  getReview: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM review', (err, results) => {
        if (err) return reject(err);
        resolve(results.map(mapReview));
      });
    });
  },

  getReviewById: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM review WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0] ? mapReview(results[0]) : null);
      });
    });
  },

  addReview: ({ userId, movieId, rating, reviewText }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO review (user_id, movie_id, rating, review_text) VALUES (?, ?, ?, ?)',
        [userId, movieId, rating, reviewText],
        (err, result) => {
          if (err) return reject(err);

          resolve({
            id: result.insertId,
            userId,
            movieId,
            rating,
            reviewText
          });
        }
      );
    });
  },

  updateReview: ({ id, rating, reviewText }) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM review WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);

        if (results.length === 0) {
          return reject(new Error('Review tidak ditemukan'));
        }

        const oldReview = mapReview(results[0]);

        const newRating = rating !== undefined ? rating : oldReview.rating;
        const newReviewText = reviewText !== undefined ? reviewText : oldReview.reviewText;

        db.query(
          'UPDATE review SET rating = ?, review_text = ? WHERE id = ?',
          [newRating, newReviewText, id],
          (err) => {
            if (err) return reject(err);

            resolve({
              id,
              userId: oldReview.userId,
              movieId: oldReview.movieId,
              rating: newRating,
              reviewText: newReviewText
            });
          }
        );
      });
    });
  },

  deleteReview: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM review WHERE id = ?', [id], (err, result) => {
        if (err) return reject(err);

        if (result.affectedRows === 0) {
          return reject(new Error('Review tidak ditemukan'));
        }

        resolve('Review berhasil dihapus');
      });
    });
  }
};

module.exports = { schema, root };
require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

// TODO: import schema GraphQL user (schema.js)
// const schema = require('./schema');

// TODO: import koneksi database (db.js)
// const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  // TODO: ganti dengan schema asli
  schema: null,
  graphiql: true,
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ service: 'user-service', status: 'ok' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
  console.log(`GraphQL: http://localhost:${PORT}/graphql`);
});
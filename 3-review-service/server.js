require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

// TODO: import schema GraphQL review (schema.js)
// const schema = require('./schema');

// TODO: import koneksi database (db.js)
// const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/graphql', graphqlHTTP({
  // TODO: ganti dengan schema asli
  schema: null,
  graphiql: true,
}));

app.get('/health', (req, res) => {
  res.json({ service: 'review-service', status: 'ok' });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Review Service running on port ${PORT}`);
  console.log(`GraphQL: http://localhost:${PORT}/graphql`);
});
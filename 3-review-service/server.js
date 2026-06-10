require('dotenv').config();

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

const { schema, root } = require('./schema');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.get('/health', (req, res) => {
  res.json({ service: 'review-service', status: 'ok' });
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Review Service running on port ${PORT}`);
  console.log(`GraphQL: http://localhost:${PORT}/graphql`);
});
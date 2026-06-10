require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

const schema = require('./schema');

require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.get('/health', (req, res) => {
  res.json({
    service: 'user-service',
    status: 'ok'
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
  console.log(`GraphQL: http://localhost:${PORT}/graphql`);
});
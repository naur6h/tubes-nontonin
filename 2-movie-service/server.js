const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const { schema, root } = require('./schema');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log(`Movie service running at http://localhost:${PORT}/graphql`);
});
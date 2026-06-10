const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const db = require('./db');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  })
});


// QUERY
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return new Promise((resolve, reject) => {
          db.query(
            'SELECT * FROM users',
            (err, results) => {
              if (err) reject(err);
              else resolve(results);
            }
          );
        });
      }
    }
  }
});


// MUTATION
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {

    // Tambah User
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {

        return new Promise((resolve, reject) => {

          db.query(
            `INSERT INTO users(username,email,password)
             VALUES(?,?,?)`,
            [
              args.username,
              args.email,
              args.password
            ],
            (err, result) => {

              if (err) reject(err);

              resolve({
                id: result.insertId,
                username: args.username,
                email: args.email,
                password: args.password
              });

            }
          );

        });

      }
    },


    // Update User
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
        username: { type: GraphQLString },
        email: { type: GraphQLString }
      },

      resolve(parent, args) {

        return new Promise((resolve, reject) => {

          db.query(
            `UPDATE users
             SET username=?, email=?
             WHERE id=?`,
            [
              args.username,
              args.email,
              args.id
            ],
            (err) => {

              if (err) reject(err);

              db.query(
                'SELECT * FROM users WHERE id=?',
                [args.id],
                (err, result) => {

                  if (err) reject(err);

                  resolve(result[0]);

                }
              );

            }
          );

        });

      }
    }

  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
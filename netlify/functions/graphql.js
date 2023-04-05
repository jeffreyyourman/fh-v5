const { ApolloServer, gql } = require("apollo-server-lambda");
// import { createHttpLink } from "apollo-link-http";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import fetch from "node-fetch";
const { createHttpLink } = require("apollo-link-http");
const fetch = require("node-fetch");

// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;

// const resolvers = {
//   Query: {
//     hello: () => "Hello from Netlify Functions!",
//   },
// };
// // , "http-proxy-middleware", "apollo-server-lambda", "apollo-link-http", "apollo-cache-inmemory", "node-fetch", "pollo-link","apollo-link"

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: () => ({
//     headers: {
//       authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
//     },
//   }),
//   playground: true,
//   introspection: true,
// });

// exports.handler = server.createHandler({
//   cors: {
//     origin: "*",
//     credentials: true,
//   },
// });

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello from Netlify Functions!",
  },
};

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   debug: true,
// });

// ApolloServer({
//   typeDefs,
//   resolvers,
//   context: () => ({
//     headers: {
//       authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
//     },
//   }),
//   playground: true,
//   introspection: true,
// });

const link = createHttpLink({
  uri: "https://thepgw.netlify.app/testthisbs",
  fetch,
});

const getHandler = (event, context) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    debug: true,
    link,
  });
  const graphqlHandler = server.createHandler();
  if (!event.requestContext) {
    event.requestContext = context;
  }
  return graphqlHandler(event, context);
};
module.exports.handler = getHandler;

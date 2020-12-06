import { MongoClient } from 'mongodb';
import Redis from 'ioredis';
import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server'
import { typeDefs as movieTypeDef, resolvers as movieResolver } from './schemas/movieSchema'
import { typeDefs as seriesTypeDef, resolvers as seriesResolver } from './schemas/seriesSchema'

//db
const databaseURL = "mongodb://localhost:27017";
const client = new MongoClient(databaseURL, { useUnifiedTopology: true });
client.connect();

export const redis = new Redis();

const typeDefs = gql`
    type Query
    type Mutation
`

const schema = makeExecutableSchema({
    typeDefs: [
        typeDefs,
        movieTypeDef,
        seriesTypeDef
    ],
    resolvers: [
        movieResolver,
        seriesResolver
    ]
})

const server = new ApolloServer({ schema });


server.listen(5000).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });

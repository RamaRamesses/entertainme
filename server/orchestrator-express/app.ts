import express from 'express';
import { MongoClient } from 'mongodb';
import axios from 'axios';
import Redis from 'ioredis';
import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-express'
import { typeDefs as movieTypeDef, resolvers as movieResolver } from './schemas/movieSchema'
import { typeDefs as seriesTypeDef, resolvers as seriesResolver } from './schemas/seriesSchema'
import { router } from './routes'

//db
const databaseURL = "mongodb://localhost:27017";
const client = new MongoClient(databaseURL, { useUnifiedTopology: true });
client.connect();
// const db = client.db('entertain-me');

//redis
export const redis = new Redis();

//gql & apollo

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


const app = express();
server.applyMiddleware({app})
app.use(express.json());
app.use(express.urlencoded({extended: true}))
const PORT = 5000;

app.use(router)


app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
});

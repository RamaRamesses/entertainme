import { ApolloServer, gql } from 'apollo-server-express'
import {redis} from '../app';
import axios from 'axios';

const typeDefs = gql`
    extend type Query {
        movies: [Movie]
        helloWorld: String,
        movie(id: String): Movie
    }
    
    type Movie {
        _id: String,
        title: String,
        overview: String,
        poster_path: String,
        popularity: Int,
        tags: [String]
    }
    
    type deletedMovie {
        _id: String
    }

    input movieInput {
        title: String,
        overview: String,
        poster_path: String,
        popularity: Int
    }

    input updateMovie {
        id: String,
        title: String,
        overview: String,
        poster_path: String,
        popularity: Int
    }

    input addTag {
        id: String,
        tag: String
    }
    
    extend type Mutation {
        addMovie(movie: movieInput) : Movie
        updateMovie(movie: updateMovie) : Movie
        deleteMovie(id: String): deletedMovie
        addMovieTag(movie: addTag) : Movie
    }
`
const resolvers = {
    Query: {
        movies: async () => {
            console.log('movies')
            try {
                console.log('a')
                const moviesUrl = `http://localhost:5001/`;
                const movies = await redis.get('movies');
                if(movies) {
                    return (JSON.parse(movies))
                } else {
                    const response = await axios({
                        method: 'GET',
                        url: moviesUrl,
                    })
                    console.log('delete')
                    await redis.set('movies', JSON.stringify(response.data));
                    return(response.data);
                }
                // console.log(response);
            } catch (err) {
                console.log(err)
            }
        },
        movie: async (parent: any, args: any, context: any, info: any) => {
            try {
                function hasTheSameId(element: any, index: any, array: any) { 
                    return (element["_id"] == args.id); 
                 } 
                const moviesUrl = `http://localhost:5001/`;
                let movieRedis = await redis.get('movies');
                if(movieRedis) {
                    let movies = JSON.parse(movieRedis)
                    let movie = movies.filter(hasTheSameId)
                    return movie[0]
                } else {
                    const response = await axios({
                        method: 'GET',
                        url: moviesUrl,
                    })
                    await redis.set('movies', JSON.stringify(response.data));
                    movieRedis = await redis.get('movies');
                    let movies = movieRedis !== null ? JSON.parse(movieRedis) : []
                    let movie = movies.filter(hasTheSameId)
                    return movie[0]
                }
            } catch (err) {
                return err
            }
        }
    },
    Mutation : {
        addMovie: async (parent: any, args: any, context: any, info: any) => {
            try {
                console.log(args.movie)
                const { title, overview, poster_path, popularity } = args.movie;
                const moviesUrl = `http://localhost:5001/`;
                const response = await axios({
                    method: 'POST',
                    url: moviesUrl,
                    data: { title, overview, poster_path, popularity, tags: [] }
                })
                redis.del('movies')
                return response.data.ops[0];
            } catch (err) {
                console.log(err);
                return err;
            }
        },
        deleteMovie: async (parent: any, args: any, context: any, info: any) => {
            try {
                const moviesUrl = `http://localhost:5001/`;
                const response = await axios({
                    method: "DELETE",
                    url: moviesUrl + args.id
                })
                console.log(response)
                redis.del('movies')
                return {['_id']: args.id}
            } catch (err) {
                console.log(err);
                return err
            }
        },
        updateMovie: async (parent: any, args: any, context: any, info: any) => {
            try {
                const {title, overview, poster_path, popularity} = args.movie;
                redis.del('movies')
                const moviesUrl = `http://localhost:5001/`;
                const response = await axios({
                    method: 'PUT',
                    url: moviesUrl + args.movie.id,
                    data: { title, overview, poster_path, popularity }
                })
                return response.data.value
            } catch (err) {
                console.log(err);
                return err;
            }
        },
        addMovieTag: async (parent: any, args: any, context: any, info: any) => {
            try {
                redis.del('movies');
                const { tag } = args.movie
                const moviesUrl = `http://localhost:5001/`;
                const response = await axios({
                    method: 'PATCH',
                    url: moviesUrl + args.movie.id,
                    data: { tag }
                }) 
                console.log(response.data.value)
                return response.data.value
            } catch (err) {
                console.log(err);
                return err;
            }
        }
    }
}

export { typeDefs, resolvers };
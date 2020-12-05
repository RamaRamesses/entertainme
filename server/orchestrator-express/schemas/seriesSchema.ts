import {ApolloServer, gql} from 'apollo-server';
import {redis} from '../app';
import axios from 'axios';

const typeDefs = gql`
    extend type Query {
        allSeries: [Series],
        series(id: String) : Series
    }

    type Series {
        _id: String,
        title: String,
        overview: String,
        poster_path: String,
        popularity: Int,
        tags: [String]
    }
`

/*
input seriesInput {
        title: String,
        overview: String,
        poster_path: String,
        popularity: Int
    }

    extend type Mutation {
        addSeries(series: seriesInput) : Series
    }
*/

const resolvers = {
    Query: {
        allSeries: async () => {
            try {
                const seriesUrl = `http://localhost:5001/`;
                const series = await redis.get('series');
                if(series) {
                    return (JSON.parse(series))
                } else {
                    const response = await axios({
                        method: 'GET',
                        url: seriesUrl,
                    })
                    console.log('delete')
                    await redis.set('series', JSON.stringify(response.data));
                    return(response.data);
                }
                // console.log(response);
            } catch (err) {
                console.log(err)
            }
        },
        series: async (parent: any, args: any, context: any, info: any) => {
            try {
                function hasTheSameId(element: any, index: any, array: any) { 
                    return (element["_id"] == args.id); 
                 } 
                const seriesUrl = `http://localhost:5001/`;
                let seriesRedis = await redis.get('series');
                if(seriesRedis) {
                    let allSeries = JSON.parse(seriesRedis)
                    let series = allSeries.filter(hasTheSameId)
                    return series[0]
                } else {
                    const response = await axios({
                        method: 'GET',
                        url: seriesUrl,
                    })
                    await redis.set('series', JSON.stringify(response.data));
                    seriesRedis = await redis.get('series');
                    let allSeries = seriesRedis !== null ? JSON.parse(seriesRedis) : []
                    let series = allSeries.filter(hasTheSameId)
                    return series[0]
                }
            } catch (err) {
                return err
            }
        }
    },
    Mutation: {
        addSeries: async (parent: any, args: any, context: any, info: any) => {
            try {
                const { title, overview, poster_path, popularity } = args.series;
                const seriesUrl = `http://localhost:5002/`;
                const response = await axios({
                    method: 'POST',
                    url: seriesUrl,
                    data: { title, overview, poster_path, popularity, tags: [] }
                })
                redis.del('series')
                return response.data.ops[0];
            } catch (err) {
                console.log(err);
                return err;
            }
        }
    }
}

export { typeDefs, resolvers }
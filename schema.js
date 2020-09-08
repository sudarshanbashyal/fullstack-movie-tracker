const {GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema,
    GraphQLID,
    GraphQLFloat,
    // GraphQLInputObjectType
}=require('graphql')

const dotenv=require('dotenv')
dotenv.config();

const fetch=require('node-fetch')
const tmdbKey=process.env.TMDB_KEY


// movie lists: popular, upcoming and top rated
// FORMAT:
// {
// 	movies(listName:"top_rated"){
//     id,
//     title,
//     release_date,
//     poster_path
//   }
// }

const MovieListType=new GraphQLObjectType({
    name:"MovieList",
    fields:()=>({
        id:{
            type:GraphQLInt
        },
        title:{
            type:GraphQLString
        },
        release_date:{
            type:GraphQLString
        },
        poster_path:{
            type:GraphQLString
        }
    })
})

// movie details: detail about a single movie

const MovieType=new GraphQLObjectType({
    name:'Movie',
    fields:()=>({
        id:{
            type:GraphQLInt
        },
        title:{
            type:GraphQLString
        },
        backdrop_path:{
            type:GraphQLString
        },
        poster_path:{
            type:GraphQLString
        },
        overview:{
            type:GraphQLString
        },
        release_date:{
            type:GraphQLString
        },
        revenue:{
            type:GraphQLInt
        },
        runtime:{
            type:GraphQLInt
        },
        vote_average:{
            type:GraphQLFloat
        },
        genres:{
            type:new GraphQLList(GenreType)
        }
    })
})

const GenreType=new GraphQLObjectType({
    name:'Genre',
    fields:()=>({
        id:{
            type:GraphQLInt
        },
        name:{
            type:GraphQLString
        }
    })
})

const VideoType=new GraphQLObjectType({
    name:'Video',
    fields:()=>({
        results:{
            type: new GraphQLList(VideoResultType)
        }
    })
})

const VideoResultType=new GraphQLObjectType({
    name:'VideoResult',
    fields:()=>({
        key:{
            type:GraphQLString
        }
    })
})


const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        movies:{
            type: new GraphQLList(MovieListType),
            args:{
                listName:{type:GraphQLString}
            },
            resolve(parent,args){
                return fetch(`https://api.themoviedb.org/3/movie/${args.listName}?api_key=${tmdbKey}&language=en-US&page=1`)
                .then(res=>res.json())
                .then(data=>data.results)
            }
        },
        similarMovies:{
            type: new GraphQLList(MovieListType),
            args:{
                id:{type:GraphQLInt}
            },
            resolve(parent,args){
                return fetch(`https://api.themoviedb.org/3/movie/${args.id}/similar?api_key=${tmdbKey}&language=en-US&page=1`)
                .then(res=>res.json())
                .then(data=>data.results)
            }
        },
        movie:{
            type:MovieType,
            args:{
                id:{type:GraphQLInt}
            },
            resolve(parent,args){
                return fetch(`https://api.themoviedb.org/3/movie/${args.id}?api_key=${tmdbKey}&language=en-US`)
                .then(res=>res.json())
                .then(data=>data)
            }
        },
        genres:{
            type:new GraphQLList(GenreType),
            resolve(parent,args){
                return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdbKey}&language=en-US`)
                .then(res=>res.json())
                .then(data=>data.genres)
            }
        },
        moviesFromGenre:{
            type:new GraphQLList(MovieListType),
            args:{
                id:{type:GraphQLInt}
            },
            resolve(parent,args){
                return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${tmdbKey}&with_genres=${args.id}`)
                .then(res=>res.json())
                .then(data=>data.results)
            }
        },
        video:{
            type: VideoType,
            args:{
                id:{type:GraphQLInt}
            },
            resolve(parent,args){
                return fetch(`http://api.themoviedb.org/3/movie/${args.id}/videos?api_key=${tmdbKey}`)
                .then(res=>res.json())
                .then(data=>data)
            }
        }
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery
})
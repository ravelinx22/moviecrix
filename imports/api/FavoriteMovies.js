import { Mongo } from "meteor/mongo";
import { HTTP } from "meteor/http";

export const FavoriteMovies = new Mongo.Collection('favoriteMovies');

Meteor.methods({
    "favoriteMovies.addFavorite"(movieId) {
        FavoriteMovies.insert({
            movieId: movieId,
            userId: Meteor.userId(),
        });
    },
    "favoriteMovies.deleteFromFavorites"(movieId) {
        FavoriteMovies.remove({
            movieId: movieId,
            userId: Meteor.userId(),
        });
    },
    "favoriteMovies.getFavorites"(movieId) {
        if (Meteor.isServer) {
            var favIds = FavoriteMovies.find({ userId: Meteor.userId() }, { movieId: 1, _id: 0 }).fetch();

            var favMovies = [];
            favMovies = favIds.map((f) => {
                var movies = HTTP.call("GET", "https://api.themoviedb.org/3/movie/" + f.movieId + "?api_key=" + Meteor.settings.TMDBAPIKEY);
                var res = JSON.parse(movies.content);
                return res;
            });
            return favMovies;
        }
        else
            return
    }
});

if (Meteor.isServer)
    Meteor.publish('favoriteMovies', function FavoriteMoviesPublication() {
        return FavoriteMovies.find({});
    });
import { Mongo } from "meteor/mongo";

export const FavoriteMovies = new Mongo.Collection('favoriteMovies');

Meteor.methods({
    "favoriteMovies.addFavorite"(movieId) {
        FavoriteMovies.insert({
            movieId: movieId,
            userId: Meteor.userId(),
        });
    }
});

if (Meteor.isServer)
    Meteor.publish('favoriteMovies', function FavoriteMoviesPublication() {
        return FavoriteMovies.find({});
    });
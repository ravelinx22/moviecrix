import { Mongo } from "meteor/mongo";

export const Reviews = new Mongo.Collection('reviews');

Meteor.methods({ 
    "reviews.reviewMovie"(movieId, comment) { 
         Reviews.insert({
            movieId: movieId,
            comment: comment
         });
    } 
});

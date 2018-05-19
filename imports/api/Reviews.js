import { Mongo } from "meteor/mongo";

export const Reviews = new Mongo.Collection('reviews');

Meteor.methods({
    "reviews.reviewMovie"(movieId, comment) {
        Reviews.insert({
            movieId: movieId,
            comment: comment,
            owner: Meteor.users.findOne({_id: Meteor.userId()}).username
        });
    }
});

if (Meteor.isServer)
    Meteor.publish('reviews', function reviewsPublication() {
        return Reviews.find({});
    });

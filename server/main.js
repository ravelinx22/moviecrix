import "../imports/api/Movies";
import "../imports/api/Reviews";
import "../imports/api/Tweets";
import "../imports/api/FavoriteMovies";
import { WebApp } from 'meteor/webapp';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';


WebApp.addHtmlAttributeHook(() => ({ lang: 'en' }));

// Deny all client-side updates to user documents
Meteor.users.deny({
    update() { return true; }
});

const methods = [
    "favoriteMovies.addFavorite",
    "favoriteMovies.deleteFromFavorites",
    "favoriteMovies.getFavorites",
    "movies.getPopular",
    "movies.getTopRated",
    "movies.getUpcoming",
    "movies.nowPlaying",
    "movies.randomNowPlaying",
    "movies.getGenres",
    "movies.getByGenre",
    "movies.getByName",
    "movies.getSpecificMovie",
    "movies.recommendedByMovie",
    "reviews.reviewMovie"
]

// Only allow 10 list operations per connection per second
if (Meteor.isServer) {
    var requestLimit = 10;
    var requestTimeout = 1000;

    methods.map((met)=>{
        DDPRateLimiter.addRule({
            type: "method",
            name: met,
        }, requestLimit, requestTimeout);
    })
    
}




import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";

Meteor.methods({
    "movies.getPopular"(){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/movie/popular?api_key="+Meteor.settings.TMDBAPIKEY);
		var res = JSON.parse(movies.content);
		return res.results;
	},

	"movies.getTopRated"(){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/movie/top_rated?api_key="+Meteor.settings.TMDBAPIKEY);
		var res = JSON.parse(movies.content);
		return res.results;
	},

	"movies.getUpcoming"(){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/movie/upcoming?api_key="+Meteor.settings.TMDBAPIKEY);
		var res = JSON.parse(movies.content);
		return res.results;
	},

	"movies.nowPlaying"(){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key="+Meteor.settings.TMDBAPIKEY);
		var res = JSON.parse(movies.content);
		return res.results;
	},

	"movies.getGenres"(genre){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/genre/movie/list?api_key="+Meteor.settings.TMDBAPIKEY);
		var res = JSON.parse(movies.content);
		return res.genres;
	},

	"movies.getByGenre"(genre){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/discover/movie?with_genres="+genre+"&api_key="+Meteor.settings.TMDBAPIKEY);
		var res = JSON.parse(movies.content);
		return res.results;
	},

	"movies.getByName"(name){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/search/movie?api_key="+Meteor.settings.TMDBAPIKEY+"&query="+name);
		var res = JSON.parse(movies.content);
		return res.results;
	},

	"movies.getSpecificMovie"(movieId){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/movie/"+movieId+"?api_key="+Meteor.settings.TMDBAPIKEY);
		var res = JSON.parse(movies.content);
		return res;
	},

	"movies.reviewMovie"(movieId){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/movie/"+movieId+"?api_key="+Meteor.settings.TMDBAPIKEY);
		var res = JSON.parse(movies.content);
		return res;
	},
	
});

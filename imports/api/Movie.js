import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { HTTP } from "meteor/http";
import { METHODS } from "http";


export const Movies = new Mongo.Collection("movies");

Meteor.methods({
    "movie.getPopular"(){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/movie/popular?api_key="+Meteor.settings.TMDBAPIKEY);
		var res = JSON.parse(movies.content);
		return res.results;
	},

	"movie.getTopRated"(){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/movie/top_rated?api_key="+Meteor.settings.TMDBAPIKEY);
		var res = JSON.parse(movies.content);
		return res.results;
	},

	"movie.getUpcoming"(){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/movie/upcoming?api_key="+Meteor.settings.TMDBAPIKEY);
		var res = JSON.parse(movies.content);
		return res.results;
	},

	"movie.nowPlaying"(){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key="+Meteor.settings.TMDBAPIKEY);
		var res = JSON.parse(movies.content);
		return res.results;
	},

	"movie.getGenres"(genre){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/genre/movie/list?api_key="+Meteor.settings.TMDBAPIKEY);
		var res = JSON.parse(movies.content);
		return res.genres;
	},

	"movie.getByGenre"(genre){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/discover/movie?with_genres="+genre+"&api_key="+Meteor.settings.TMDBAPIKEY);
		var res = JSON.parse(movies.content);
		return res.results;
	},

	"movie.getByName"(name){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/search/movie?api_key="+Meteor.settings.TMDBAPIKEY+"&query="+name);
		var res = JSON.parse(movies.content);
		return res.results;
	},

	"movie.getSpecificMovie"(movieId){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/movie/"+movieId+"?api_key="+Meteor.settings.TMDBAPIKEY);
		var res = JSON.parse(movies.content);
		return res;
	},
	
});
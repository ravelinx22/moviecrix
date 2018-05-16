import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";

Meteor.methods({
    "movies.getPopular"(page){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/movie/popular?api_key="+Meteor.settings.TMDBAPIKEY+"&page="+page);
		var res = JSON.parse(movies.content);
		return res.results;
	},

	"movies.getTopRated"(page){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/movie/top_rated?api_key="+Meteor.settings.TMDBAPIKEY+"&page="+page);
		var res = JSON.parse(movies.content);
		return res.results;
	},

	"movies.getUpcoming"(page){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/movie/upcoming?api_key="+Meteor.settings.TMDBAPIKEY+"&page="+page);
		var res = JSON.parse(movies.content);
		return res.results;
	},

	"movies.nowPlaying"(page){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key="+Meteor.settings.TMDBAPIKEY+"&page="+page);
		var res = JSON.parse(movies.content);
		return res.results;
	},

	"movies.randomNowPlaying"(){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key="+Meteor.settings.TMDBAPIKEY);
		var res = JSON.parse(movies.content);
		
		return res.results[Math.floor(Math.random() * res.results.length)];
	},

	"movies.getGenres"(genre){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/genre/movie/list?api_key="+Meteor.settings.TMDBAPIKEY);
		var res = JSON.parse(movies.content);
		return res.genres;
	},

	"movies.getByGenre"(genre, page){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/discover/movie?with_genres="+genre+"&api_key="+Meteor.settings.TMDBAPIKEY+"&page="+page);
		var res = JSON.parse(movies.content);
		return res.results;
	},

	"movies.getByName"(name, page){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/search/movie?api_key="+Meteor.settings.TMDBAPIKEY+"&query="+name+"&page="+page);
		var res = JSON.parse(movies.content);
		return res.results;
	},

	"movies.getSpecificMovie"(movieId){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/movie/"+movieId+"?api_key="+Meteor.settings.TMDBAPIKEY);
		var res = JSON.parse(movies.content);
		return res;
	},

	"movies.recommendedByMovie"(movieId, page){
		var movies = HTTP.call("GET", "https://api.themoviedb.org/3/movie/"+movieId+"/recommendations?api_key="+Meteor.settings.TMDBAPIKEY+"&page="+page);
		var res = JSON.parse(movies.content);
		return res.results;
	},
});

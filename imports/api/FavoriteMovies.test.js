import {Meteor} from 'meteor/meteor';
import { assert    } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { FavoriteMovies } from "./FavoriteMovies.js";
import { resetDatabase     } from "meteor/xolvio:cleaner";
import { Factory     } from "meteor/dburles:factory";
import { sinon     } from 'meteor/practicalmeteor:sinon';

if(Meteor.isServer) {
	describe("FavoriteMovies", function() {
		let currentUser;
		let savedMovieId = faker.random.number();
		let savedUserId = faker.random.number();

		beforeEach(function() {
			resetDatabase();
			Factory.define("user", Meteor.users, {
			});

			currentUser = Factory.create("user");
			sinon.stub(Meteor, "userId");
			Meteor.userId.returns(currentUser._id);

			FavoriteMovies.insert({
				movieId: savedMovieId,
				userId: savedUserId,
			});
		});

		afterEach(() => {
			Meteor.userId.restore();
			resetDatabase();
		});	

		describe("favoriteMovies.addFavorite", function() {
			it("Add movie to favorites", function() {
				let newId = faker.random.number();
				Meteor.call("favoriteMovies.addFavorite", newId);
				var newFavorite = FavoriteMovies.findOne({movieId: newId});
				assert(newFavorite);
			});
		});

		describe("favoriteMovies.deleteFromFavorites", function() {
			it("Delete movie from favorites", function() {
				let newId = faker.random.number();
				Meteor.call("favoriteMovies.addFavorite", newId);
				var newFavorite = FavoriteMovies.findOne({movieId: newId});
				assert(newFavorite);
	
				Meteor.call("favoriteMovies.deleteFromFavorites", newId);

				var deletedFavorite = FavoriteMovies.findOne({movieId: newId});
				assert.equal(deletedFavorite, null);
			});
		});

		describe("favoriteMovies.getFavorites", function() {
			it("Get favorites", function() {
				var favorite = FavoriteMovies.findOne({
					movieId: savedMovieId,
					userId: savedUserId
				});
				assert(favorite);
			});
		});

	});
}

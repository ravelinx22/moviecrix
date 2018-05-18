import {Meteor} from 'meteor/meteor';
import { assert   } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { Reviews  } from "./Reviews.js";
import { resetDatabase    } from "meteor/xolvio:cleaner";
import { Factory    } from "meteor/dburles:factory";
import { sinon    } from 'meteor/practicalmeteor:sinon';

if(Meteor.isServer) {
	describe("reviews", function() {
		let currentUser;

		beforeEach(function() {
			resetDatabase();
			Factory.define("user", Meteor.users, {

			});

			currentUser = Factory.create("user");
			sinon.stub(Meteor, "userId");
			Meteor.userId.returns(currentUser._id);
		});

		afterEach(() => {
			Meteor.userId.restore();
			resetDatabase();
		});	

		describe("reviews.reviewMovie.", function() {
			it("should create a review", function() {
				const movieId = faker.random.number();
				const comment = faker.lorem.sentence();
				Meteor.call("reviews.reviewMovie", movieId, comment);
				newReview = Reviews.findOne({ movieId: movieId, comment: comment });
				assert(newReview);
			});
		});
	});
}


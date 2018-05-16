import Twitter from "twitter";
import {Meteor} from "meteor/meteor";
import { Mongo  } from "meteor/mongo";
let stream = null;

export const Tweets = new Mongo.Collection("tweets");

if (Meteor.isServer) {
	Meteor.publish("tweets", function tweetsPublication() {
		return Tweets.find({}, {sort: {created_at: -1}});
	});

	Meteor.methods({
		"twitter.stream"(query) {
			console.log("Twitter search" + query);

			if(query.trim() === "") {
				return;
			}

			let client = new Twitter({
				consumer_key: Meteor.settings.TWITTER_CONSUMER_KEY,
				consumer_secret: Meteor.settings.TWITTER_CONSUMER_SECRET,
				access_token_key: Meteor.settings.TWITTER_ACCESS_TOKEN_KEY,
				access_token_secret: Meteor.settings.TWITTER_ACCESS_TOKEN_SECRET
			});

			if (stream) {
				stream.destroy();
			}

			stream = client.stream("statuses/filter", {track: query});
			stream.on("data", Meteor.bindEnvironment(function(tweet) {
				console.log(tweet);
				tweet["query"] = query;
				Tweets.insert(tweet);
			}));

			stream.on("error", function(error) {
				console.log(error);
			});
		},
		"twitter.stop"() {
			if(stream) {
				stream.destroy();
			}
		}
	}); 
}

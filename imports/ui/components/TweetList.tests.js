import {Meteor} from "meteor/meteor";
import { assert, chai    } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase     } from "meteor/xolvio:cleaner";
import { Factory     } from "meteor/dburles:factory";
import { sinon     } from 'meteor/practicalmeteor:sinon';
import { shallow, mount    } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import TweetList  from "./TweetList.jsx";

	describe("TweetList", function() {
		it("should render TweetList", function() {
			let item = shallow(<TweetList/>);
			assert(item.find("div"));
			assert(item.find(".row"));
			assert(item.find(".latest_tweets"));
			assert(item.find(".justify-content-center"));
			assert(item.find(".tweet-scroller"));
		});
	});
}

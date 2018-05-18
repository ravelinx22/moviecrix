import {Meteor} from "meteor/meteor";
import { assert, chai    } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase     } from "meteor/xolvio:cleaner";
import { Factory     } from "meteor/dburles:factory";
import { sinon     } from 'meteor/practicalmeteor:sinon';
import { shallow, mount    } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import TweetDetail  from "./TweetDetail.jsx";

	describe("TweetDetail", function() {
		it("should render TweetDetail", function() {
			let item = shallow(<TweetDetail/>);
			assert(item.find(".row"));
			assert(item.find(".tweet_detail"));
			assert(item.find(".col-md-12"));
			assert(item.find(".tweet_name"));
			assert(item.find(".tweet_body"));
			assert(item.find(".tweet_date"));
			assert(item.find("span"));
		});
	});
}

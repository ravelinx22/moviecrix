import {Meteor} from "meteor/meteor";
import { assert, chai    } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase     } from "meteor/xolvio:cleaner";
import { Factory     } from "meteor/dburles:factory";
import { sinon     } from 'meteor/practicalmeteor:sinon';
import { shallow, mount    } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import CommentList  from "./CommentList.jsx";

	describe("CommentList", function() {
		it("should render CommentList", function() {
			let item = shallow(<CommentList/>);
			assert(item.find(".container"));
			assert(item.find("h1"));
			assert(item.find(".comment-content"));
		});
	});
}

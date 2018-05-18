import {Meteor} from "meteor/meteor";
import { assert, chai    } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase     } from "meteor/xolvio:cleaner";
import { Factory     } from "meteor/dburles:factory";
import { sinon     } from 'meteor/practicalmeteor:sinon';
import { shallow, mount    } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import CommentDetail  from "./CommentDetail.jsx";

	describe("CommentDetail", function() {
		it("should render CommentDetail", function() {
			let item = shallow(<CommentDetail/>);
			assert(item.find(".container"));
			assert(item.find(".row"));
			assert(item.find("img"));
			assert(item.find("h3"));
			assert(item.find(".comment"));
		});
	});
}

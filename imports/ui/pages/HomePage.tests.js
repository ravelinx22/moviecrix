import {Meteor} from "meteor/meteor";
import { assert, chai    } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase     } from "meteor/xolvio:cleaner";
import { Factory     } from "meteor/dburles:factory";
import { sinon     } from 'meteor/practicalmeteor:sinon';
import { shallow, mount    } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import HomePage  from "./HomePage.jsx";

	describe("HomePage", function() {
		it("should render HomePage", function() {
			let item = shallow(<HomePage/>);
			assert(item.find(".home-content"));
			assert(item.find(".banner-img"));
			assert(item.find(".movie_title"));
			assert(item.find(".movie_genre"));
			assert(item.find(".see_btn"));
			assert(item.find(".sub_title"));
			assert(item.find(".movie_date"));
		});
	});
}

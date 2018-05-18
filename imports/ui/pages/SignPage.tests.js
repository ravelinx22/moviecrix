import {Meteor} from "meteor/meteor";
import { assert, chai    } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase     } from "meteor/xolvio:cleaner";
import { Factory     } from "meteor/dburles:factory";
import { sinon     } from 'meteor/practicalmeteor:sinon';
import { shallow, mount    } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import SignPage  from "./SignPage.jsx";

	describe("SignPage", function() {
		it("should render SignPage", function() {
			let item = shallow(<SignPage/>);
			assert(item.find("form"));
			assert(item.find("div"));
			assert(item.find("input"));
			assert(item.find("button"));
			assert(item.find(".change_log"));
			assert(item.find(".change_log_login"));
			assert(item.find(".change_log_sign"));
			assert(item.find(".change_active"));
			assert(item.find(".privacy_terms_title"));
		});
	});
}

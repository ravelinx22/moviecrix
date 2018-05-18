import {Meteor} from "meteor/meteor";
import { assert, chai    } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase     } from "meteor/xolvio:cleaner";
import { Factory     } from "meteor/dburles:factory";
import { sinon     } from 'meteor/practicalmeteor:sinon';
import { shallow, mount    } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import AskLogin  from "./AskLogin.jsx";

	describe("AskLogin", function() {
		it("should render AskLogin", function() {
			let item = shallow(<AskLogin/>);
			assert(item.find(".container"));
			assert(item.find(".row"));
			assert(item.find("a"));
			assert(item.find(".justify-content-center"));
			assert(item.find(".ask_login"));
		});
	});
}

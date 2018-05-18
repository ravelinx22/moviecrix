import {Meteor} from "meteor/meteor";
import { assert, chai    } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase     } from "meteor/xolvio:cleaner";
import { Factory     } from "meteor/dburles:factory";
import { sinon     } from 'meteor/practicalmeteor:sinon';
import { shallow, mount    } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import SoonPage  from "./SoonPage.jsx";

	describe("SoonPage", function() {
		it("should render SoonPage", function() {
			let item = shallow(<SoonPage/>);
			assert(item.find(".container"));
			assert(item.find(".row"));
			assert(item.find("h1"));
			assert(item.find(".col-md-12"));
			assert(item.find("#timeline1"));
			assert(item.find("h3"));
			assert(item.find(".timeline_row"));
		});
	});
}

import {Meteor} from "meteor/meteor";
import { assert, chai    } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase     } from "meteor/xolvio:cleaner";
import { Factory     } from "meteor/dburles:factory";
import { sinon     } from 'meteor/practicalmeteor:sinon';
import { shallow, mount    } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import PopularPage  from "./PopularPage.jsx";

	describe("PopularPage", function() {
		it("should render PopularPage", function() {
			let item = shallow(<PopularPage/>);
			assert(item.find(".container"));
			assert(item.find(".row"));
			assert(item.find(".graph_container"));
			assert(item.find(".bar_chart"));
			assert(item.find(".col-md-8"));
			assert(item.find("#chart"));
			assert(item.find("movieChart"));
			assert(item.find(".graph"));
			assert(item.find("linearGradient"));
			assert(item.find("svg"));
			assert(item.find("h1"));
		});
	});
}

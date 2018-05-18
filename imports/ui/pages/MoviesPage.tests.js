import {Meteor} from "meteor/meteor";
import { assert, chai    } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase     } from "meteor/xolvio:cleaner";
import { Factory     } from "meteor/dburles:factory";
import { sinon     } from 'meteor/practicalmeteor:sinon';
import { shallow, mount    } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import MoviesPage  from "./MoviesPage.jsx";

	describe("MoviesPage", function() {
		it("should render MoviesPage", function() {
			let item = shallow(<MoviesPage/>);
			assert(item.find(".container"));
			assert(item.find(".theaters_title"));
			assert(item.find(".graph_container"));
			assert(item.find(".bar_chart"));
			assert(item.find(".row"));
			assert(item.find(".movieChart"));
			assert(item.find("#chart"));
		});
	});
}

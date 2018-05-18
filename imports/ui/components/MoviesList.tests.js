import {Meteor} from "meteor/meteor";
import { assert, chai    } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase     } from "meteor/xolvio:cleaner";
import { Factory     } from "meteor/dburles:factory";
import { sinon     } from 'meteor/practicalmeteor:sinon';
import { shallow, mount    } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import MoviesList  from "./MoviesList.jsx";

	describe("MoviesList", function() {
		it("should render MoviesList", function() {
			let item = shallow(<MoviesList/>);
			assert(item.find(".row"));
		});
	});
}

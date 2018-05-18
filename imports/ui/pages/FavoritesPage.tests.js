import {Meteor} from "meteor/meteor";
import { assert, chai    } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase     } from "meteor/xolvio:cleaner";
import { Factory     } from "meteor/dburles:factory";
import { sinon     } from 'meteor/practicalmeteor:sinon';
import { shallow, mount    } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import FavoritesPage from "./FavoritesPage.jsx";

	describe("FavoritesPage", function() {
		it("should render favorites page", function() {
			let item = shallow(<FavoritesPage/>);
			assert(item.find(".theaters_title"));
			assert(item.find(".container"));
		});
	});
}

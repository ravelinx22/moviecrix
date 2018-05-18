import {Meteor} from "meteor/meteor";
import { assert, chai    } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase     } from "meteor/xolvio:cleaner";
import { Factory     } from "meteor/dburles:factory";
import { sinon     } from 'meteor/practicalmeteor:sinon';
import { shallow, mount    } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import MoviePage  from "./MoviePage.jsx";

	describe("MoviePage", function() {
		it("should render MoviePage", function() {
			const match = {
				params: {
					name: "afasf"
				}
			}
			let item = shallow(<MoviePage match={match}/>);
			assert(item.find(".container"));
			assert(item.find(".row"));
			assert(item.find(".col-md-8"));
			assert(item.find(".col-md-7"));
			assert(item.find(".col-md-5"));
			assert(item.find(".col-md-4"));
		});
	});
}

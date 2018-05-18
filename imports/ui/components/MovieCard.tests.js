import {Meteor} from "meteor/meteor";
import { assert, chai    } from "meteor/practicalmeteor:chai";
import faker from "faker";
import { resetDatabase     } from "meteor/xolvio:cleaner";
import { Factory     } from "meteor/dburles:factory";
import { sinon     } from 'meteor/practicalmeteor:sinon';
import { shallow, mount    } from "enzyme";
import React from "react";

if(Meteor.isClient) {
	import MovieCard  from "./MovieCard.jsx";

	describe("MovieCard", function() {
		it("should render MovieCard", function() {
			let item = shallow(<MovieCard/>);
			assert(item.find("a"));
			assert(item.find(".movie_card"));
			assert(item.find("img"));
			assert(item.find(".container"));
			assert(item.find(".row"));
			assert(item.find(".card_desc"));
			assert(item.find(".card_title"));
			assert(item.find(".card_genre"));
			assert(item.find(".card_rating"));
			assert(item.find(".fa-heart"));
			assert(item.find("i"));
		});
	});
}

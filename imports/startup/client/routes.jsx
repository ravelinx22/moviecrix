import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from "../../ui/containers/App.jsx";
import HomePage from "../../ui/pages/HomePage.jsx";
import MoviesPage from "../../ui/pages/MoviesPage.jsx";
import MoviePage from "../../ui/pages/MoviePage.jsx";
import SoonPage from "../../ui/pages/SoonPage.jsx";
import PopularPage from "../../ui/pages/PopularPage.jsx";
import FavoritesPage from "../../ui/pages/FavoritesPage.jsx";
import SignPage from "../../ui/pages/SignPage.jsx";
import NotFoundPage from "../../ui/pages/NotFoundPage.jsx";

export const renderRoutes = () => (
	<Router>
		<App>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/popular" component={PopularPage} />
				<Route path="/theaters" component={MoviesPage} />
				<Route path="/detail/:id/:name" component={MoviePage} />
				<Route path="/soon" component={SoonPage} />
				<Route path="/favorites" component={FavoritesPage} />
				<Route path="/sign" component={SignPage} />
				<Route path="*" component={NotFoundPage} />
			</Switch>
		</App>
	</Router>
);

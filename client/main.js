import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from "../imports/startup/client/routes.jsx";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { HTTP } from "meteor/http";


Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
  Meteor.subscribe('favoriteMovies');
  Meteor.call('favoriteMovies.addFavorite', "299536");
});

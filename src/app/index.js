import React 											from "react";
import {render} 										from "react-dom";
import {Router, Route, browserHistory, IndexRoute} 		from "react-router";

import {Root} 											from "./components/Root";
import {Results} 										from "./components/Results";
import {Details} 										from "./components/Details";
import { Header } 										from "./components/Header";

import './sass/app.scss';

class App extends React.Component {
    render() {
        return (
			<Router history={browserHistory}>
				<Route path={"/"} component={Root}>
					<Route path={"items:query"} component={Results} />
					<Route path={"items/:id"} component={Details} />
				</Route>
				{this.props.children}
			</Router>
        );
    }
}

render (
	<App />,
	window.document.getElementById("app")
);
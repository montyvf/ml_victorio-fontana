import React 					from "react";
import {Link, browserHistory} 	from "react-router";

import { Header } 				from "./Header";

export class Root extends React.Component {
	render () {
		console.log(this.props.params.query)
		return (
			<div className="container">
				{typeof this.props.params.query === undefined ? (
					<Header 
						initialValue=""
					/>
				) : (
					<Header 
						initialValue={this.props.params.query}
					/>
				)}
				{this.props.children}
			</div>
		);
	}
}
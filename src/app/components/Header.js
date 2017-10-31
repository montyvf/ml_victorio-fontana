import React 						from "react";
import Request 						from "superagent";
import {Link, browserHistory} 		from "react-router";


export class Header extends React.Component {
	constructor(props){
		super(props);
		if(this.props.initialValue == undefined) {
			var initialValue = "";
		} else {
			var initialValue = this.props.initialValue;			
		}
		this.state = {
			value: initialValue
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		var initialValue = this.props.initialValue;
		browserHistory.push("/items" + this.state.value);
	}

	handleChange(event) {
		this.setState({
			value: event.target.value
		});
	}

	goHome(props) {
		this.setState({
			value: ""
		});
		browserHistory.push("/");
	}

	render() {
		return (
			<header>
				<div className="wrapper">
					<button className="header-logo" onClick={this.goHome.bind(this)}>Home</button>
					<form onSubmit={this.handleSubmit} className="header-search">
						<input 
							placeholder="Nunca dejes de buscar" 
							type="text" 
							value={this.state.value} 
							onChange={this.handleChange} 
							className="search-input"
						/>
						<input 
							type="submit"
							value="Buscar!"
							className="search-input-submit"
						/>
					</form>
				</div>
			</header>
		);
	}
}
import React 						from "react";
import Request 						from "superagent";
import {Link, browserHistory} 		from "react-router";
import _ 							from "lodash";

export class Results extends React.Component {

	constructor(){
		super();
		this.state = {
			results: "",
			breadcrum: ""
		};
	}

	componentWillMount(){
		// Called the first time the component is loaded right before the component is added to the page
		var url = "https://api.mercadolibre.com/sites/MLA/search?limit=4&q=:" + this.props.params.query;
		Request.get(url).then((response) => {
			this.setState({
				results: response.body.results,
			});
			if (response.body.filters.length > 0) {
				this.setState({
					breadcrum: response.body.filters[0].values[0].path_from_root
				});
			}
		});
	}

	render (){
		var breadcrum = _.map(this.state.breadcrum, (result) => {
			return (
				<li key={result.id} className="">
					{ result.name }
					<span> > </span>
				</li>
			);
			// Debería unificar ambos breadcrums en un comp.
		});
		var results = _.map(this.state.results, (result) => {
			if (result.shipping.free_shipping == true) {
				var free_shipping = "free_shipping";
			} else {
				var free_shipping = "";
			}

			return (
				<li key={result.id} className="item">
					<Link to={"items/" + result.id} className="item-anchor">
						<div className="item-thumbnail-wrapper">
							<img src={result.thumbnail} className="item-thumbnail"/>
						</div>		
						<div className="item-details-wrapper">
							<div className="item-price">
								<p>$ {result.price.toLocaleString('es')}</p>
								<div className={free_shipping}></div>
							</div>
							<div className="item-city">
								<p>{result.address.state_name}</p>
							</div>
							<div className="item-title">
								<p>{result.title}</p>
							</div>							
						</div>						
					</Link>
				</li>
			);
		});
		return (
			<main>
				<div className="result-breadcrum"> 
					<ul className="result-breadcrum-list"> { breadcrum } </ul>
				</div>
				<div className="wrapper">
					<ul className="result-items"> { results } </ul>
				</div>
			</main>
		);
	}
}
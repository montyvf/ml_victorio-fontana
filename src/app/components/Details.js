import React 						from "react";
import Request 						from "superagent";
import {Link, browserHistory} 		from "react-router";
import _ 							from "lodash";

export class Details extends React.Component {

	constructor(){
		super();
		this.state = {
			result: "",
			picture: "",
			breadcrum: "",
			description: ""
		};
	}

	componentWillMount(){
		var url = "https://api.mercadolibre.com/items/" + this.props.params.id;
		Request.get(url).then((response) => {
			this.setState({
				result: response.body,
				price: response.body.price.toLocaleString('es'),
				picture: response.body.pictures[0].url
			});
			var urlBreadcrum = "https://api.mercadolibre.com/categories/" + response.body.category_id;
			Request.get(urlBreadcrum).then((response) => {
				this.setState({
					breadcrum: response.body.path_from_root
				});
			});

		});
		var urlDescription = "https://api.mercadolibre.com/items/" + this.props.params.id + "/description";
		Request.get(urlDescription).then((response) => {
			console.log(response);
			this.setState({
				description: response.body.plain_text
			});
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
		return (
			<main>
				<div className="result-breadcrum"> 
					<ul className="result-breadcrum-list"> { breadcrum } </ul>
				</div>
				<div className="wrapper">
					<div className="item-picture-wrapper">
						<div className="picture"> <img src={ this.state.picture } /> </div>
					</div>
					<div className="item-details-wrapper">
						<div className="condition">
							<span>
								{ this.state.result.condition == "new" && "Nuevo " }
								{ this.state.result.condition == "used" && "Usado " }
								{ this.state.result.sold_quantity > 1 && this.state.result.sold_quantity} 
								{ this.state.result.sold_quantity == 1 && " - vendido"}
								{ this.state.result.sold_quantity > 1 && " - vendidos"}
							</span>
						</div>
						<div className="title"> { this.state.result.title } </div>
						<p className="price">$ { this.state.price } </p>
						<button className="btn buy-btn">Comprar</button>
					</div>
					<div className="item-description-wrapper">
						<h2>Descripción del producto</h2>
						<p>{ this.state.description } </p>
					</div>
				</div>
			</main>
		);
	}
}
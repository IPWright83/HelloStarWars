import React, { Component } from "react";

class HelloStarWars extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {
		const id = this.props.id;

		try {
			const response = await fetch(`https://swapi.co/api/people/${id}`);
			const { name } = await response.json();
			this.setState({ name });
		} catch (e) {
			this.setState({ name: "!dlroW... Oh dear, something went wrong" });
		}
	}

	render() {
		const name = this.state.name || "...";
		return(
			<h1>Hello {name}!</h1>
		);
	}
}

export default HelloStarWars;
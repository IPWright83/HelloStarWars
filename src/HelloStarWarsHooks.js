import React, { useState } from "react";
import useFetch from "./useFetch";

export default function HelloStarWarsHooks(props) {
	let name = "...";

	try {
		const data = useFetch(`https://swapi.co/api/people/${props.id}`);
		console.log(data);
		name = data.name;
	} catch(e) {
		console.log(e.message);
		name = "!dlroW... Oh dear, something went wrong";
	}

	return (
		<h1>{`Hello ${name}!`}</h1>
	);
}
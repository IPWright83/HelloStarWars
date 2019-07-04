import React, { useState } from "react";
import useFetch from "./useFetch";

export default function HelloStarWarsHooks(props) {
  const { name } = useFetch(`https://swapi.co/api/people/${props.id}`);

  return <h1>{`Hello ${name || "..."}!`}</h1>;
}

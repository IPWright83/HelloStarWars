import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData] = useState({});

  async function getData() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (err) {
      setData({ name: "!dlroW... Oh dear, something went wrong" });
    }
  }

  useEffect(
    () => {
      getData();
    },
    [url]
  );

  return data;
}

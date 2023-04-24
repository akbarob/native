import axios from "axios";
import { useState, useEffect } from "react";

// import { RAPID_API_KEY } from "@env";
import { isLoaded } from "expo-font";
const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  //   const rapidApiKey = RAPID_API_KEY;

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": "a8d08ced81msh824179f52ba47c7p13a273jsn957c5a63cfc2",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: {
      ...query,
    },
  };

  const fetchData = async () => {
    setIsloading(true);

    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsloading(false);
    } catch (error) {
      setError(error);
      alert("There is an error");
      // console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reFetch = () => {
    isLoaded(true);
    fetchData();
  };

  return { data, isLoading, error, reFetch };
};
export default useFetch;

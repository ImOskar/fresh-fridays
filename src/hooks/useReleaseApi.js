import { useState, useEffect } from "react";
import { getFridayNumber } from "../utils/functions";
import axios from "axios";

const useReleaseApi = () => {
  const [releases, setReleases] = useState([]);
  const [url] = useState(process.env.REACT_APP_API_URL);
  const [query, setQuery] = useState(getFridayNumber());
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchReleases = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url + `fri${query}2021`);
        const releaseData = result.data.releases;
        setReleases(releaseData);
      } catch (error) {
        console.log("Error: " + error);
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchReleases();
  }, [url, query]);

  return [{ releases, isLoading, isError }, setQuery];
};

export default useReleaseApi;

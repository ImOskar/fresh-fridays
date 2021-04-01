import { useState, useEffect, useRef } from "react";
import { getFridayNumber } from "../utils/functions";
import axios from "axios";

const useReleaseApi = () => {
  const [releases, setReleases] = useState([]);
  const [query, setQuery] = useState(`fri${getFridayNumber()}2021`);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const cache = useRef({});

  useEffect(() => {
    const fetchReleases = async () => {
      setIsError(false);
      setIsLoading(true);
      if (cache.current[query]) {
        const data = cache.current[query];
        setReleases(data);
      } else {
        try {
          const result = await axios(process.env.REACT_APP_API_URL + query);
          const releaseData = result.data.releases;
          cache.current[query] = releaseData;
          setReleases(releaseData);
        } catch (error) {
          console.log("Error: " + error);
          setIsError(true);
        }
      }
      setIsLoading(false);
    };
    fetchReleases();
  }, [query]);

  return [{ releases, isLoading, isError }, setQuery];
};

export default useReleaseApi;

import { useState, useEffect } from "react";

const useToken = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (checkToken()) return;
    let searchParams = new URLSearchParams(window.location.hash);
    if (searchParams.has("#access_token")) {
      let userToken = searchParams.get("#access_token");
      addToken(userToken);
    }
    window.location.hash = "";
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    let tokenExpires = parseInt(localStorage.getItem("expires"));
    let timeNow = new Date().getTime();
    const timeout = setTimeout(() => {
      checkToken();
    }, tokenExpires - timeNow);
    return () => clearTimeout(timeout);
  }, [isLoggedIn]);

  const addToken = (token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("expires", new Date().getTime() + 3600000);
    setIsLoggedIn(true);
  };

  const checkToken = () => {
    if (localStorage.getItem("token") !== null) {
      let tokenExpires = parseInt(localStorage.getItem("expires"));
      let timeNow = new Date().getTime();
      if (tokenExpires > timeNow) {
        setIsLoggedIn(true);
        return true;
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("expires");
        setIsLoggedIn(false);
        return false;
      }
    }
    return false;
  };

  return { isLoggedIn };
};
export default useToken;

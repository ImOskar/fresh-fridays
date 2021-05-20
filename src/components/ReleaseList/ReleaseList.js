import React, { useRef, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Release from "../Release/Release";
import Loader from "../Loader/Loader";
import "./ReleaseList.styles.css";

const Releaselist = () => {
  const [releaseArray, setReleaseArray] = useState([]);
  const [rlsList, setRlsList] = useState([]);
  const [batch, setBatch] = useState(10);
  const [loading, setLoading] = useState(false);

  const releaseList = useSelector((state) => state.releaseList);
  const { releaseType, releases } = releaseList;

  useEffect(() => {
    if (releaseType === "album") {
      setRlsList(releases[0].releases);
    } else {
      setRlsList(releases[1].releases);
    }
    setBatch(10);
    setLoading(false);
  }, [releaseType, releases]);

  useEffect(() => {
    if (batch > rlsList.length + 10) {
      setLoading(false);
      return;
    }
    setReleaseArray(rlsList.slice(0, batch));
    setLoading(false);
  }, [batch, rlsList]);

  let bottomRef = useRef(null);

  const handleObserver = useCallback(
    (entities) => {
      const target = entities[0];
      if (target.isIntersecting && batch < rlsList.length) {
        setLoading(true);
        setBatch((batch) => batch + 10);
      }
    },
    [batch, rlsList.length]
  );

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [releases, batch, handleObserver]);

  return (
    <>
      <section className="release-container">
        {releaseArray.map((release) => {
          return (
            <Release
              key={release.uri}
              album={releaseType === "album"}
              {...release}
            />
          );
        })}
      </section>
      <div id="page-bottom-boundary" ref={bottomRef}>
        {loading && <Loader />}
      </div>
    </>
  );
};

export default Releaselist;

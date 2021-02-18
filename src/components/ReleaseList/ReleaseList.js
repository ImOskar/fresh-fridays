import React, { useRef, useCallback, useEffect, useState } from "react";
import Release from "../Release/Release";
import Loader from "../Loader/Loader";
import "./ReleaseList.styles.css";

const Releaselist = ({
  releases,
  clickHandler,
  albumClick,
  previewClick,
  playing,
  releaseType,
}) => {
  const [releaseArray, setReleaseArray] = useState([]);
  const [rlsList, setRlsList] = useState([]);
  const [batch, setBatch] = useState(10);
  const [loading, setLoading] = useState(false);

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
    console.log("useffectLoad: batch: " + batch);
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
      console.log("Obsobsobs");
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
              addClick={clickHandler}
              {...release}
              albumClick={albumClick}
              previewClick={previewClick}
              playing={playing}
              album={releaseType}
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

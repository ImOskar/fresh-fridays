import React from "react";
import DateSlider from "../DateSlider/DateSlider";
import "./ContentHeader.styles.css";

const ContentHeader = ({ getReleases, selectorButton }) => {
  return (
    <section className="content-header">
      <DateSlider releaseClick={getReleases} />
      <div className="switch-button">
        <span className="active"></span>
        <button
          value="albums"
          className="switch-button-case left active-case"
          onClick={selectorButton()}
        >
          Albums
        </button>
        <button
          value="singles"
          className="switch-button-case right"
          onClick={selectorButton()}
        >
          Singles
        </button>
      </div>
    </section>
  );
};

export default ContentHeader;

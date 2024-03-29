import React from "react";
import { useDispatch } from "react-redux";
import { selectReleaseType } from "../../redux/releases/release.actions";
import DateDropdown from "../DateDropdown/DateDropdown";
import { getFridayList } from "../../utils/functions";
import "./ContentHeader.styles.css";

const ContentHeader = () => {
  const dispatch = useDispatch();

  const handleSelectorButton = (e) => {
    let albumButton = document.querySelector(".left");
    let singleButton = document.querySelector(".right");
    let switchSpan = document.querySelector(".active");
    switch (e.target.value) {
      case "albums":
        dispatch(selectReleaseType("album"));
        singleButton.classList.remove("active-case");
        albumButton.classList.add("active-case");
        switchSpan.style.left = "0%";
        break;
      case "singles":
        dispatch(selectReleaseType("singles"));
        albumButton.classList.remove("active-case");
        singleButton.classList.add("active-case");
        switchSpan.style.left = "50%";
        break;
      default:
        break;
    }
  };

  return (
    <section className="content-header">
      <DateDropdown items={getFridayList().reverse()} />
      <div className="switch-button">
        <span className="active"></span>
        <button
          value="albums"
          className="switch-button-case left active-case"
          onClick={handleSelectorButton}
        >
          Albums
        </button>
        <button
          value="singles"
          className="switch-button-case right"
          onClick={handleSelectorButton}
        >
          Singles
        </button>
      </div>
    </section>
  );
};

export default ContentHeader;

import React, { useEffect, useState } from "react";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFridayNumber } from "../../utils/functions";
import "./DateSlider.styles.css";

const DateSlider = ({ getReleases }) => {
  const [current, setCurrent] = useState(0);
  const [x, setX] = useState(0);
  const length = getFridayNumber();
  const fridayNumbers = Array(length)
    .fill()
    .map((_, i) => i + 1);

  useEffect(() => {
    setCurrent(length - 1);
    setX((length - 1) * -100);
  }, [length]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
    setX(current === length - 1 ? 0 : x - 100);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    setX(current === 0 ? (length - 1) * -100 : x + 100);
  };

  return (
    <div className="slider">
      <FontAwesomeIcon
        className="slider-arrow arrow-left"
        icon={faChevronLeft}
        onClick={prevSlide}
      />
      <FontAwesomeIcon
        className="slider-arrow arrow-right"
        icon={faChevronRight}
        onClick={nextSlide}
      />
      <div className="slider-box">
        {fridayNumbers.map((friday, i) => {
          return (
            <div
              onClick={() => getReleases(friday)}
              key={`fri${i}`}
              style={{ transform: `translateX(${x}%)` }}
              className="slider-item"
            >
              <p className="slider-text">Friday#{friday}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DateSlider;

import React, { useEffect, useState } from "react";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DateDropdown.styles.css";

const DateDropdown = ({ getReleases, items }) => {
  const [showItems, setShowItems] = useState(false);
  const [selected, setSelected] = useState(items[items.length - 1].title);

  useEffect(() => {
    const closeDropdown = () => {
      window.removeEventListener("click", closeDropdown);
      setShowItems(false);
    };
    showItems && window.addEventListener("click", closeDropdown);
  }, [showItems]);

  const handleShowItems = () => {
    setShowItems(!showItems);
  };

  const handleSelectItem = (item) => {
    setSelected(item.title);
    getReleases(item.query);
    setShowItems(false);
  };

  return (
    <div className="dropdown-box">
      <button
        type="button"
        className="dropdown-item dropdown-btn"
        onClick={handleShowItems}
      >
        <p className="dropdown-text">{selected}</p>
        <FontAwesomeIcon
          className="angle-position"
          icon={showItems ? faAngleUp : faAngleDown}
          size="2x"
        />
      </button>
      <div
        className="dropdown-item-container"
        style={{ display: !showItems && "none" }}
      >
        {items.map((item) => (
          <div
            onClick={() => handleSelectItem(item)}
            key={item.query}
            className="dropdown-item"
          >
            <p className="dropdown-text">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateDropdown;

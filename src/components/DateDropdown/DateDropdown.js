import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchReleases } from "../../redux/releases/release.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DateDropdown.styles.css";

const DateDropdown = ({ items }) => {
  const [showItems, setShowItems] = useState(false);
  const [selected, setSelected] = useState(items[0].title);

  const dispatch = useDispatch();

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
    dispatch(fetchReleases(item.query));
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
          icon={showItems ? "angle-up" : "angle-down"}
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

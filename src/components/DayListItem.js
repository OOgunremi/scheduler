import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

// returns each days view for DayList to use
const DayListItem = (props) => {
  // Function tracks the number of available booking slots
  const formatSpots = (spots) => {
    if (spots === 0) {
      return "no spots remaining";
    } else if (spots === 1) {
      return "1 spot remaining";
    } else {
      return `${spots} spots remaining`;
    }
  };

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      selected={props.selected}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)} </h3>
    </li>
  );
};
export default DayListItem;

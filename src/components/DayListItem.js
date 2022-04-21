import React from "react";
import "components/DayListItem.scss" ;
import classNames from "classnames";





export default function DayListItem(props) {
  // console.log(props);
  const formatSpots = (spots) => {
    if (spots === 0) { return 'no spots remaining' }
    if (spots === 1) { return '1 spot remaining' }
    if (spots === 2) { return '2 spots remaining' }
  };

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });
  
  return (
 
    <li className={dayClass} onClick={() => props.onChange(props.name)} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)} </h3>
    </li>
  );
}
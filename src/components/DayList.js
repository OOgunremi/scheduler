import DayListItem from "./DayListItem";
import React from "react";

const DayList = (props) => {

  const listdays = props.days.map((day) => { return <DayListItem 
  key={day.id}
  name={day.name}
  spots={day.spots}
  selected={day.name === props.value}
  setDay={props.onChange}
  />});
  

  return ( 
    <ul>{listdays}</ul>
   );
}
 
export default DayList;
import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

//returns view for each interviewer
const InterviewerListItem = (props) => {
  const interviewerClass = classNames("interviewers", {
    "interviewers__item--selected": props.selected,
    interviewers__item: !props.selected,
  });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};
export default InterviewerListItem;

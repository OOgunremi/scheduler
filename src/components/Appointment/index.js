import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Status from "components/Status";
import Confirm from "./Confirm";
import Form from "components/Form";
import { getInterviewerForDay } from "helpers/selectors";

const Appointment = (props) => {
   const EMPTY = "EMPTY";
   const SHOW = "SHOW";
   const CREATE = "CREATE"
   const SAVING = "SAVING"
   const EDIT = "EDIT";
   const CONFIRM = "CONFIRM";
   const DELETING = "DELETING";

   const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );

  return ( 
      <article className="appointment">
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={ () => {transition(CREATE)}}/>}
        {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer}/>}
        {mode === SAVING && <Status message="Saving"/>}
        {mode === DELETING && <Status message="Deleting"/>}
    {/* {mode === CONFIRM && <Confirm/>} */}
        {mode === CREATE && <Form interviewers={[]} onCancel={() => {transition(EMPTY)}}/>}
    {/* {mode === EDIT && <Form/>} */}
      </article>
   );
}
export default Appointment;
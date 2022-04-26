import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Status from "components/Status";
import Confirm from "./Confirm";
import Form from "components/Form";
import { getInterviewersForDay } from "helpers/selectors";
import Error from "./Error";


const Appointment = (props) => {
   const EMPTY = "EMPTY";
   const ERROR_SAVE = "ERROR_SAVE";
   const ERROR_DELETE = "ERROR_DELETE";
   const SHOW = "SHOW";
   const CREATE = "CREATE"
   const SAVING = "SAVING"
   const EDIT = "EDIT";
   const CONFIRM = "CONFIRM";
   const DELETING = "DELETING";

   

   const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );

    const save = (name, interviewer) => {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING);
      props.bookInterview(props.id, interview)
      .catch(() =>{ transition(ERROR_SAVE)})
      .then(() => {
         transition(SHOW)
      })
   };

   const handleDelete = () => {
      transition(DELETING);
      props.cancelInterview(props.id)
      .catch(() =>{ transition(ERROR_DELETE)})
      .then(() => {
         transition(EMPTY);
      })
   };

  return ( 
      <article className="appointment">
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={ () => {transition(CREATE)}}/>}
        {mode === ERROR_SAVE && <Error message="Save operation unsuccessful"/>}
        {mode === ERROR_DELETE && <Error message="Save operation unsuccessful"/>}
        {mode === SHOW && <Show 
            student={props.interview.student} 
            interviewer={props.interview.interviewer}
            onDelete={() => {transition(CONFIRM)}}
            onEdit={() => {transition(EDIT)}}
            />}
        {mode === SAVING && <Status message="Saving"/>}
        {mode === SAVING && <Status message="Saving"/>}
        {mode === DELETING && <Status message="Deleting"/>}
        {mode === CONFIRM && <Confirm onCancel={() => {transition(SHOW)}} onConfirm={handleDelete} message="Are you sure you would like to delete?"/>}
        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => {transition(EMPTY)}} onSave={save}/>}
        {mode === EDIT && <Form 
            onCancel={() => {transition(SHOW)}} 
            onSave={save}
            student={props.interview.student} 
            interviewer={props.interview.interviewer.id}    
            interviewers={props.interviewers}/>}
      </article>
   );
}
export default Appointment;
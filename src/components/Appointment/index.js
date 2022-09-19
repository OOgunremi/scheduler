import React from "react";
import "components/Appointment/styles.scss";
import Confirm from "./Confirm";
import Empty from "./Empty";
import Error from "./Error";
import Header from "./Header";
import Show from "./Show";
import Status from "components/Status";
import Form from "components/Form";
import useVisualMode from "hooks/useVisualMode";

const Appointment = (props) => {
  //List of all App modes
  const EMPTY = "EMPTY";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const EDIT = "EDIT";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";

  //App modes destructured objects
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Function for saving new interview appointments and handling any potential errors resulting
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  };

  // Function for deleting interview appointments and handling any potential errors resulting
  const handleDelete = (e) => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className="appointment">
      <Header time={props.time} />

      {/* Different App modes and their rendering conditions and props */}
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {
            transition(CONFIRM);
          }}
          onEdit={() => {
            transition(EDIT);
          }}
        />
      )}

      {mode === SAVING && <Status message="Saving" />}

      {mode === DELETING && <Status message="Deleting" />}

      {mode === CONFIRM && (
        <Confirm
          onCancel={() => {
            transition(SHOW);
          }}
          onConfirm={handleDelete}
          message="Are you sure you would like to delete?"
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => {
            transition(EMPTY);
          }}
          onSave={save}
        />
      )}

      {mode === EDIT && (
        <Form
          onCancel={() => {
            transition(SHOW);
          }}
          onSave={save}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error onCancel={back} message="Save operation unsuccessful" />
      )}

      {mode === ERROR_DELETE && (
        <Error onCancel={back} message="Delete operation unsuccessful" />
      )}
    </article>
  );
};
export default Appointment;

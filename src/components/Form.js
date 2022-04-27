
import React, { useState } from "react";
import Button from "./Button";
import InterviewerList from "./InterviewerList";
const Form = (props) => {
  const [student, setStudent] = useState(props.student || "");
  const [error, setError] = useState("");
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const reset = () => {setStudent('');   
  setInterviewer(null)};
  const cancel = () => {reset(); props.onCancel()};
  const handleSave = () => {
    props.onSave(student, interviewer)
  };
  
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }

  return ( 
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e)=> e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            data-testid="student-name-input"

          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
            value={interviewer}
            interviewers={props.interviewers}
            onChange={(value) => setInterviewer(value)}/>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm  onClick={(e) => validate()}>Save</Button>
        </section>
      </section>
    </main>
   );
}
 
export default Form;

import React, { useState } from "react";
import Button from "./Button";
import InterviewerList from "./InterviewerList";
const Form = (props) => {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const reset = () => {setStudent('');   
  setInterviewer(null)};
  const cancel = () => {reset(); props.onCancel()};
  
  const handleSave = () => {
    props.onSave(student, interviewer)
  };
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
        <InterviewerList 
            value={interviewer}
            interviewers={props.interviewers}
            onChange={(value) => setInterviewer(value)}/>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm  onClick={handleSave}>Save</Button>
        </section>
      </section>
    </main>
   );
}
 
export default Form;
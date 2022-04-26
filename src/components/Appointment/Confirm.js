import React from "react";
import  Button from "components/Button.js"

const Confirm = (props) => {
  return ( 
    
    <main className="appointment__card appointment__card--confirm">
      <h2 className="text--semi-bold">{props.message}</h2>
        <section className="appointment__actions">
          <Button onClick={props.onCancel} danger>Cancel</Button>
          <Button onClick={props.onConfirm} danger>Confirm</Button>
        </section>
    </main>
   );
}
 
export default Confirm;
import React from "react";
import Input from "../../../../FormElements/Input/Input";

const addTeacherInputs = (props) => (
    <React.Fragment>
        <Input type="email" name="newEmail" label="email address"
               placeholder="Enter Email"
               value={props.person.newEmail || ''}
               onChange={props.change}
               invalid={(props.emptyForm && props.person.newEmail === '') || props.wrongEmail}/>

        <Input type="password" name="newPassword" label='Password'
               placeholder="Enter Password (min 5)" minLength="5"
               value={props.person.newPassword || ''}
               onChange={props.change}
               invalid={(props.emptyForm && props.person.newPassword === '') ||
               (props.person.newPassword.length >0 && props.person.newPassword.length < 5)}/>
    </React.Fragment>
);

export default addTeacherInputs;
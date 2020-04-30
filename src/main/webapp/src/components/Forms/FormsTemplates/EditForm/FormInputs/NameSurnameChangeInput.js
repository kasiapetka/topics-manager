import React from "react";
import TextInput from "../../../Inputs/TextInput/TextInput";


const nameSurnameChangeInput =(props)=>(
    <div className="form-row p-1">
        <TextInput label='New Name' type="text" name="newName"
                   placeholder="Enter New Name"
                   pattern="[A-Za-z]{2,}"
                   groupclasses="col-md-6 ml-auto mr-auto"
                   value={props.newName || ''}
                   onChange={props.change}
                   invalid={props.emptyForm}/>

        <TextInput label='New Name' type="text" name="newSurname"
                   id="exampleSurname" placeholder="Enter New Surname"
                   pattern="[A-Za-z]{2,}"
                   groupclasses="col-md-6 ml-auto mr-auto"
                   value={props.newSurname || ''}
                   onChange={props.change}
                   invalid={props.emptyForm}/>
    </div>
);

export default nameSurnameChangeInput;
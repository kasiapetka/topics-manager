import React from "react";
import {FormGroup, Input, Label} from "reactstrap";
import TextInput from "../../Inputs/TextInput/TextInput";

const confirmPasswordInput = (props) => {

    let loggin;
    if (props.loggin) {
        loggin = (
            <p className="text-center pt-3 pb-2">Changing Your email will automatically log You out.</p>
        )
    }

    return (props.credsChanged
            ?
            <React.Fragment>
                {loggin}
                <TextInput type="password" name="password"
                           label='Confirm Changes With Password' minLength="5"
                           placeholder="Your Password"
                           value={props.password || ''}
                           onChange={props.change}
                           invalid={props.wrongPassword}/>
            </React.Fragment>
            :
            null
    );
};

export default confirmPasswordInput;
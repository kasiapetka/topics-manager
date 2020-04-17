import React from "react";
import {FormGroup, Input, Label} from "reactstrap";

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
                <FormGroup className="mb-2 mr-4 ml-4 mt-3">
                    <Label for="examplePassword" className="mr-2 pl-1">
                        Confirm Changes With Password
                    </Label>
                    <Input type="password" name="password"
                           id="examplePassword" minLength="5"
                           placeholder="Your Password"
                           value={props.password || ''}
                           onChange={props.change}
                           invalid={props.wrongPassword}/>
                </FormGroup>
            </React.Fragment>
            :
            null
    );
};

export default confirmPasswordInput;
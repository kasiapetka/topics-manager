import React from "react";
import Input from "../../FormElements/Input/Input";

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
                <Input type="password" name="password"
                       label='Confirm Changes With Password' minLength="5"
                       placeholder="Your Password"
                       value={props.password || ''}
                       onChange={props.change}
                       invalid={props.wrongPassword ||
                       (props.password.length >0 && props.password.length < 5)}/>
            </React.Fragment>
            :
            null
    );
};

export default confirmPasswordInput;
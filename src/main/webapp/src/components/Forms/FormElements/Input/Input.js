import React from "react";
import {Label, Input, FormGroup} from "reactstrap";

const input = (props) => {

    let formGroupClasses ="p-2 mb-2 mt-2 ", invalid=false;
    if(props.groupclasses)
    formGroupClasses = formGroupClasses.concat(props.groupclasses);

    if(props.isinvalid)
        invalid=props.isinvalid.touched && !props.isinvalid.valid && props.isinvalid.required;
    else if(props.invalid)
        invalid=props.invalid;

    return (
        <FormGroup className={formGroupClasses}>
            {props.label ? <Label className="mr-2 pl-1 text-capitalize">{props.label}</Label> : null}
            <Input {...props} autoComplete="on"
                   invalid={invalid}>
                {props.children}
            </Input>
        </FormGroup>
    );
};

export default input;
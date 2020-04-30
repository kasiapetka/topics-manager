import React from "react";
import {Label, Input, FormGroup} from "reactstrap";

const input = (props) => {

    let formGroupClasses ="p-2 mb-2 mt-2 ";
    if(props.groupclasses)
    formGroupClasses = formGroupClasses.concat(props.groupclasses);

    return (
        <FormGroup className={formGroupClasses}>
            <Label className="mr-2 pl-1 text-capitalize">{props.label}</Label>
            <Input {...props} autoComplete="on">
                {props.children}
            </Input>
        </FormGroup>
    );
};

export default input;
import React from "react";
import {FormGroup, Label} from "reactstrap";

const label = (props) => {

    let formGroupClasses ="p-2 mb-2 mt-2 ";
    if(props.groupclasses)
        formGroupClasses = formGroupClasses.concat(props.groupclasses);

     return (
            <FormGroup className={formGroupClasses}>
                <Label className="mr-2 pl-1 text-capitalize">
                    {props.label}
                </Label>
                <div color="light"
                     className="pt-2 pb-2 pl-2 border rounded text-left">
                    {props.content}
                </div>
            </FormGroup>
    );
}

export default label;
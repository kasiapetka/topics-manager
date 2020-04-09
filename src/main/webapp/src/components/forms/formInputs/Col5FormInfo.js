import React from "react";
import {Label} from "reactstrap";


const Col5FormInfo =(props)=>(
    <div className="mb-2 ml-sm-4 mr-auto mt-3 col-md-5">
        <Label for="actualName" className="mr-sm-2 pl-1">
            {props.label}
        </Label>
        <div color="light" id="actualName"
             className="pt-2 pb-2 pl-2 border rounded text-left">
            {props.content}
        </div>
    </div>
);

export default Col5FormInfo;
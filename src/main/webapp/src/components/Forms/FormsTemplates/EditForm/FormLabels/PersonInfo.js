import React from "react";
import {Label} from "reactstrap";


const personInfo =(props)=>(
    <div className="mb-2 mt-3 col-md-6">
        <Label for="actualName" className="mr-2 pl-1">
            {props.label}
        </Label>
        <div color="light" id="actualName"
             className="pt-2 pb-2 pl-2 border rounded text-left">
            {props.content}
        </div>
    </div>
);

export default personInfo;
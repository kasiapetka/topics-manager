import React from "react";
import {Button} from "reactstrap";

const button = (props) => (
    <div className="form-row text-center pt-3">
        <div className="col-md-12">
            <Button type="submit" className="btn btn-primary mt-2 text-capitalize" {...props}>
                {props.label}</Button>
        </div>
    </div>
);

export default button;
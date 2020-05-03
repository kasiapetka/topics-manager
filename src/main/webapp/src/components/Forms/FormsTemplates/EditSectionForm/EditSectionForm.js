import React from "react";
import Input from "../../Input/Input";
import {Form} from "reactstrap";
import Button from "../../Button/Button";
import classes from "../Forms.module.css";


const editSectionForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 mb-4 pr-3 pl-3 mb-3 " + classes.Form;

    return (

        <Form className={classNames} onSubmit={props.submit}>
            <h3 className="text-center">Section Options: </h3>

            <Input label='Name' type="text" name="name"
                   placeholder="Enter Section Name"
                   onChange={props.onChange} value={props.section.name}
                   isinvalid={props.section.name}/>


            <Button label='save changes'/>
        </Form>
    );
};

export default editSectionForm;
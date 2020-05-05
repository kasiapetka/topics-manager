import React from "react";
import Input from "../../../FormElements/Input/Input";
import {Form} from "reactstrap";
import Button from "../../../FormElements/Button/Button";
import classes from "../../Forms.module.css";
import Label from "../../../FormElements/Label/Label";

const editSectionForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 mb-4 pr-3 pl-3 mb-3 " + classes.Form;

    return (

        <Form className={classNames} onSubmit={props.onSubmit}>
            <h3 className="text-center">Section Options: </h3>

            <Label label='subject' content ={props.section.topic.subject.name}/>
            <Label label='topic' content ={props.section.topic.name}/>

            <div className="form-row p-1">

                <Input type="number" name="size" label="size"
                       groupclasses='col-md-3'
                       min='1' onChange={props.onChange} value={props.section.size}
                       />

                <Label label="semester"
                       groupclasses='col-md-3 mr-auto ml-auto'
                       content={props.section.semester.semester}/>

                <Input type='select' label="state" name='state'
                       groupclasses='col-md-3'
                       onChange={props.onChange}
                       value={props.section.state}>
                    <option value={'O'}>Opened</option>
                    <option value={'C'}>Closed</option>
                    <option value={'F'}>Finished</option>
                </Input>
            </div>

            <Input label='Name' type="text" name="name"
                   placeholder="Enter Section Name"
                   onChange={props.onChange} value={props.section.name}/>

            <Button label='save changes' disabled={!props.touched}/>
        </Form>
    );
};

export default editSectionForm;
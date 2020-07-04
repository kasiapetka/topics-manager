import React from 'react';
import { Form} from "reactstrap";
import classes from "../../Forms.module.css";
import Input from '../../../FormElements/Input/Input'
import Button from "../../../FormElements/Button/Button";

const addSubjectForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 mb-4 pr-3 pl-3 " + classes.Form;

    return (
        <Form className={classNames} onSubmit={props.submit}>
            <h3 className="text-center">Fill in subject's form</h3>

            <Input type="text" name="name"
                   label='name' placeholder="Enter Name"
                   value={props.subject.name.value}
                   onChange={props.change}
                   isinvalid={props.subject.name.validation}/>

            <Input type="textarea" rows={4} name="summary"
                   label='subject summary'
                   value={props.subject.summary.value || ''}
                   onChange={props.change}
                   isinvalid={props.subject.summary.validation}/>

            <Button label='add subject' disabled={!props.formValid}/>
        </Form>
    )
};

export default addSubjectForm;
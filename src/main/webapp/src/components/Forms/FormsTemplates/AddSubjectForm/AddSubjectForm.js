import React from 'react';
import { Form} from "reactstrap";
import classes from "../Forms.module.css";
import Input from '../../Input/Input'
import Button from "../../Button/Button";

const addSubjectForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 mb-4 pr-3 pl-3 " + classes.Form;

    return (
        <Form className={classNames} onSubmit={props.submit}>
            <h3 className="text-center">Fill in subject's form</h3>

            <Input type="text" name="name"
                   label='name' placeholder="Enter Name"
                   value={props.subject.name || ''}
                   onChange={props.change}
                   invalid={props.wrongName || (props.emptyForm && props.subject.name === "")}/>

            <Input type="textarea" rows={4} name="summary"
                   label='subject summary'
                   value={props.subject.summary || ''}
                   onChange={props.change}/>

            <Button label='add subject'/>
        </Form>
    )
};

export default addSubjectForm;
import React from 'react';
import {Form} from "reactstrap";
import classes from "../Forms.module.css";
import Input from "../../Input/Input";
import Button from "../../Button/Button";

const addTopicForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mb-4 mt-5 pr-3 pl-3 " + classes.Form;

    const subjectOptions = props.subjects.map(subject => {
        return <option
            value={subject.id}
            key={subject.id}>
            {subject.name}
        </option>
    });

    return (
        <Form className={classNames} onSubmit={props.onSubmit}>
            <h3 className="text-center mt-2">Add New Topic</h3>
            {/*--------------------Subject Topic and Name---------------------------------- */}

            <Input type="select" name="subject" label='subject'
                   defaultValue='default' onChange={props.onChange}
                   invalid={props.emptyForm && props.topic.subject === null}>
                <option disabled={true} value='default'>Choose Subject</option>
                {subjectOptions}
            </Input>

            <Input label='Name' type="text" name="name"
                   minLength="5" placeholder="Enter Section Name"
                   onChange={props.onChange} value={props.topic.name || ''}
                   invalid={props.wrongName || (props.emptyForm && props.topic.name === '')}/>

            <Input type="textarea" rows={4} name="summary"
                   label='topic summary'
                   value={props.topic.summary || ''}
                   onChange={props.onChange}/>

            <Button label='create topic'/>

        </Form>
    )
};

export default addTopicForm;
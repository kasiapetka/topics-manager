import React from 'react';
import {Form} from "reactstrap";
import classes from "../../Forms.module.css";
import Input from "../../../FormElements/Input/Input";
import Button from "../../../FormElements/Button/Button";

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
                   isinvalid={props.topic.subject.validation}>

                <option disabled={true} value='default'>Choose Subject</option>
                {subjectOptions}
            </Input>

            <Input label='Name' type="text" name="name"
                   placeholder="Enter Section Name"
                   onChange={props.onChange} value={props.topic.name.value}
                   isinvalid={props.topic.name.validation}/>

            <Input type="textarea" rows={4} name="summary"
                   label='topic summary'
                   value={props.topic.summary.value}
                   onChange={props.onChange}
                   isinvalid={props.topic.summary.validation}/>

            <Button label='create topic' disabled={!props.formValid}/>

        </Form>
    )
};

export default addTopicForm;
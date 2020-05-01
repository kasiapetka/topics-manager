import React from 'react';
import {Badge, Form} from "reactstrap";
import classes from "../Forms.module.css";
import SizeSemStateInputs from "./FormInputs/SizeSemStateInputs";
import Input from "../../Input/Input";
import Button from "../../Button/Button";

const addSectionForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 mb-4 pr-3 pl-3 " + classes.Form;

    const subjectOptions = props.subjects.map(subject => {
        return <option
            value={subject.id}
            key={subject.id}>
            {subject.name}
        </option>
    });

    let topicOptions, wrongName;

    if (props.wrongName) {
        wrongName = <div className="form-row p-2">
            <Badge color="danger" className="col-md-6 p-2 ml-auto mr-auto">
                Name occupied</Badge>
        </div>
    }

    if (props.topics) {
        if (props.topics.length !== 0) {
            topicOptions = props.topics.map(topic => {
                return <option
                    value={topic.id}
                    key={topic.id}>
                    {topic.name}
                </option>
            })

        } else {
            topicOptions = <option disabled={true} value=''>No Topics in this Subject</option>;
        }
    }

    return (
        <Form className={classNames} onSubmit={props.onSubmit}>
            <h3 className="text-center mt-2">Add New Section</h3>
            {/*--------------------Subject Topic and Name---------------------------------- */}

            <Input type="select" name="subject" label="subject"
                   defaultValue='default'
                   onChange={props.onSubjectChange}
                   isinvalid={props.section.subject.validation}>
                <option disabled={true} value='default'>Choose Subject</option>
                {subjectOptions}
            </Input>

            {
                props.topics
                    ?
                    <Input type="select" name="topic" label="topic"
                           defaultValue='default'
                           onChange={props.onChange}
                           isinvalid={props.section.topic.validation}>
                        <option disabled={true} value='default'>Choose Topic</option>
                        {topicOptions}
                    </Input>
                    :
                    null
            }

            <Input type="text" name="name" label="name"
                   placeholder="Enter Section Name"
                   onChange={props.onChange}
                   value={props.section.name.value}
                   isinvalid={props.section.name.validation}/>

            {wrongName}
            {/*-------------------------------------------------------------------------------------- */}
            <SizeSemStateInputs
                onChange={props.onChange}
                section={props.section}/>

            <Button label='add section' disabled={!props.formValid}/>
        </Form>
    )
};

export default addSectionForm;
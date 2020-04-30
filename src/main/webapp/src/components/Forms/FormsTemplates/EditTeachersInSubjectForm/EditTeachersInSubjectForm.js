import React from "react";
import classes from "../Forms.module.css";
import {Form, Input} from "reactstrap";
import ListTeachers from "../../../../containers/Lists/ListTeachers";
import Button from "../../Button/Button";

const editTeachersInSubjectForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 mb-4 pr-3 pl-3 " + classes.ListForm;

    const subjectOptions = props.subjects.map(subject => {
        return <option
            value={subject.id}
            key={subject.id}>
            {subject.name}
        </option>
    });

    let teachers;
    let teachersInSubject = <p>No teachers</p>;

    if (props.teachersInSubject.length !== 0) {
        teachersInSubject = props.teachersInSubject.map(teacher => {
            return <li key={teacher.id}>{teacher.name + ' ' + teacher.surname}</li>
        })
    }

    if (props.subject) {
        teachers = <ListTeachers
            teachersInSubject={props.teachersInSubject}
            addingToSubjectTopic={true}
            addToSubject={props.addToSubject}
            removeFromSubject={props.removeFromSubject}/>
    }

    return (
        <Form className={classNames} onSubmit={props.onSubmit}>
            <h3 className="text-center mt-2">Edit Teachers In Subject</h3>
            <p>Teachers in Subject</p>
            <ul>
                {teachersInSubject}
            </ul>

            <Input type="select" name="subject" label='subject'
                   defaultValue='default' onChange={props.onSubjectChange}>
                <option disabled={true} value='default'>Choose Subject</option>
                {subjectOptions}
            </Input>

            {teachers}

            <Button label='edit teachers in subject'/>
        </Form>
    );
};

export default editTeachersInSubjectForm;
import React from "react";
import {Card, CardBody, CardHeader, CardSubtitle, CardTitle} from "reactstrap";
import classes from '../EditCards.module.css'

const editTeachersInSubjectCard=(props)=>{
    let teachers;
    if (props.teachers) {
        teachers = props.teachers.map((teacher, index) => {
            return <li key={teacher.id}>
                Name: <strong>{teacher.name}</strong>, Surname: <strong>{teacher.surname}</strong>,
                </li>
        });
    } else {
        teachers = <li>No students in this subject yet.</li>
    }

    const classNames = "pt-2 pr-2 pb-2 pl-2 " + classes.CardStyle;
    return (
        <Card className={classNames}>
            <CardHeader>
                <CardTitle>Teachers in Subject Edited: </CardTitle>
            </CardHeader>
            <CardBody className="border-bottom">
                <CardSubtitle className="pb-2">Subject: <em>{props.subject}</em></CardSubtitle>
            </CardBody>
            <CardBody>
                <CardTitle className="mt-2">Teachers:</CardTitle>
                <ul>
                    {teachers}
                </ul>
            </CardBody>
        </Card>
    )
};

export default editTeachersInSubjectCard;
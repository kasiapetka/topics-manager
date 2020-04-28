import React from 'react';
import {
    Card,
    CardTitle, CardHeader, CardBody, CardSubtitle
} from "reactstrap";
import classes from '../../Card.module.css'

const addedSectionCard = (props) => {
    let students;
    if (props.students) {
        students = props.students.map((student, index) => {
            return <li key={student.album}>
                Name: <strong>{student.name}</strong>, Surname: <strong>{student.surname}</strong>,
                Album: <strong>{student.album}</strong></li>
        });
    } else {
        students = <li>No students added to section yet.</li>
    }

    const classNames = "pt-2 pr-2 pb-2 pl-2 " + classes.CardStyle;
    return (
        <Card className={classNames}>
            <CardHeader>
                <CardTitle>Section Added: </CardTitle>
            </CardHeader>
            <CardBody className="border-bottom">
                <CardTitle>Name: <em>{props.section.name}</em></CardTitle>
                <CardSubtitle className="pb-2">Subject: <em>{props.section.subject}</em></CardSubtitle>
                <CardSubtitle className="pb-2">Topic: <em>{props.section.topic}</em></CardSubtitle>
            </CardBody>
            <CardBody>
                <CardTitle className="mt-2">Students:</CardTitle>
                <ul>
                    {students}
                </ul>
            </CardBody>
        </Card>
    )
};

export default addedSectionCard;
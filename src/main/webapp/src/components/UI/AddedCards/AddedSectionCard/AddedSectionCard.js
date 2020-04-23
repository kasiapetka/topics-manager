import React from 'react';
import {
    Card, CardBody,
    CardTitle, CardSubtitle, CardHeader
} from "reactstrap";
import classes from './AddedSectionCard.module.css'

const addedSectionCard = (props) => {

    const students = props.students.map((student, index) => {
        return <li key={student.album}>
            Name: {student.name}, Surname: {student.surname},
            Album: {student.album}</li>
    });

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
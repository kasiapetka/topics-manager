import React from 'react';
import {
    Card, CardBody,
    CardTitle, CardHeader
} from "reactstrap";
import classes from './AddedPersonCard.module.css'
import {withRouter} from "react-router-dom";
import AddedStudentCard from "./AddedStudentCard/AddedStudentCard";
import AddedTeacherCard from "./AddedTeacherCard/AddedTeacherCard";

const addedPersonCard = (props) => {

    const role = props.match.params.role;
    let label,content;
    if(role === 'T') {
        label="Teacher";
        content=<AddedTeacherCard
            teacher={props.person}/>
    }
    if(role === 'S') {
        label="Student";
        content=<AddedStudentCard
        student={props.person}/>
    }

    const classNames = "pt-2 pr-2 pb-2 pl-2 " + classes.CardStyle;
    return (
        <Card className={classNames}>
            <CardHeader>
                <CardTitle>{label} Added: </CardTitle>
            </CardHeader>
            <CardBody>
                <CardTitle>Name: <em>{props.person.newName}</em></CardTitle>
                <CardTitle className="border-bottom">Surname: <em>{props.person.newSurname}</em></CardTitle>
            </CardBody>
            {content}
        </Card>
    )
};

export default withRouter(addedPersonCard);
import React from 'react';
import {
    Card, CardBody,
    CardTitle, CardSubtitle, CardHeader, CardText
} from "reactstrap";
import classes from './AddedSubjectCard.module.css'

const addedSubjectCard = (props) => {

    const classNames = "pt-2 pr-2 pb-2 pl-2 " + classes.CardStyle;
    return (
        <Card className={classNames}>
            <CardHeader>
                <CardTitle>Subject Added: </CardTitle>
            </CardHeader>
            <CardBody>
                <CardTitle className="border-bottom">Name: <em>{props.subject.name}</em></CardTitle>
                <CardSubtitle className="pb-2">Summary: </CardSubtitle>
                <CardText>{props.subject.summary}</CardText>
            </CardBody>
        </Card>
    )
};

export default addedSubjectCard;
import React from 'react';
import {
    Card, CardBody,
    CardTitle, CardSubtitle, CardHeader, CardText
} from "reactstrap";
import classes from '../AddedCards.module.css'

const addedTopicCard = (props) => {

    const classNames = "pt-2 pr-2 pb-2 pl-2 " + classes.CardStyle;
    return (
        <Card className={classNames}>
            <CardHeader>
                <CardTitle>Topic Added: </CardTitle>
            </CardHeader>
            <CardBody>
                <CardTitle>Name: <em>{props.topic.name}</em></CardTitle>
                <CardSubtitle className="pb-2 border-bottom">Subject: <em>{props.topic.subject}</em></CardSubtitle>
                <CardSubtitle className="pb-2 mt-3">Summary: </CardSubtitle>
                <CardText>{props.topic.summary}</CardText>
            </CardBody>
        </Card>
    )
};

export default addedTopicCard;
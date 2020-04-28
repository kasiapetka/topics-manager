import React from 'react';
import {
    Card, CardText, CardBody,
    Button, CardTitle, CardSubtitle
} from "reactstrap";
import classes from '../../Card.module.css'
import {Link} from "react-router-dom";

const deleteSectionCard = (props) => {
    const classNames = "pt-2 pr-2 pb-2 pl-2 " + classes.CardStyle;
    return (
        <Card className={classNames}>
            <CardBody className="border-bottom">
                <CardTitle>Name: <em>{props.section.name}</em></CardTitle>
                <CardSubtitle className="pb-2">Subject: <em>{props.section.topic.subject.name}</em></CardSubtitle>
                <CardSubtitle className="pb-2">Topic: <em>{props.section.topic.name}</em></CardSubtitle>
            </CardBody>
            {
                props.deleted
                    ?
                    null
                    :
                    <CardBody>
                        <CardText>Are You sure You want to delete this section?</CardText>
                        <Button outline onClick={props.cancel} color="secondary">Cancel</Button>
                        <Button onClick={props.delete} className='ml-4'
                                                          color="danger">Delete</Button>
                    </CardBody>
            }
        </Card>
    )
};

export default deleteSectionCard;
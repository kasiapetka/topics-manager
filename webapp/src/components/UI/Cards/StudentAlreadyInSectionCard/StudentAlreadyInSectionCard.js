import React from 'react';
import {
    Card, CardBody,
    CardTitle, Button, CardHeader,
} from "reactstrap";
import classes from '../Card.module.css'

const studentAlreadyInSectionCard = (props) => {
    const classNames= "pt-2 pr-2 pb-2 pl-2 "+classes.CardStyle;
    return (
        <Card className={classNames}>
            <CardHeader>
                <CardTitle>
                    Student can only be a member of one section in a specific subject.
                </CardTitle>
            </CardHeader>
            <CardBody>
                Do You want to send this person a message You wanted to add them to this section?
            </CardBody>
            <CardBody>
                <div style={{margin: '0'}} className='row'>
                    <div className='col-md-1'></div>
                    <Button className='col-md-4 mb-2' color="success" onClick={props.sendMessage}>Send Message</Button>
                    <div className='col-md-2'></div>
                    <Button className='col-md-4 mb-2' outline color="secondary" onClick={props.cancel}>Cancel</Button>
                    <div className='col-md-1'></div>
                </div>
            </CardBody>
        </Card>
    )
};

export default studentAlreadyInSectionCard;
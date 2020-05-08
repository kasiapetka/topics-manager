import React from 'react';
import {
    Card, CardText, CardBody,
    Button, CardTitle, CardSubtitle
} from "reactstrap";
import classes from '../../Card.module.css'
import {Redirect, withRouter} from "react-router-dom";
import auth from "../../../../../Auth";

const deleteSectionCard = (props) => {

    let controls, deletedSectionLabel,path;
    if(auth.getRole() === 'A') path='/admin';
    if(auth.getRole() === 'T') path='/teacher';

    if(!props.deleted){
        controls= <CardBody>
            <CardText>Are You sure You want to finish this section?</CardText>
            <Button outline onClick={props.cancel} color="secondary">Cancel</Button>
            <Button onClick={props.delete} className='ml-4' color="danger">Finish Section</Button>
        </CardBody>
    }else{
        deletedSectionLabel = <CardBody>
            <CardTitle>Section Finished: </CardTitle>
        </CardBody>
    }
    if(!props.section){
        return <Redirect to={path+'/sections'}/>
    }

    const classNames = "pt-2 pr-2 pb-2 pl-2 " + classes.CardStyle;
    return (
        <Card className={classNames}>
            {deletedSectionLabel}
            <CardBody className="border-bottom">
                <CardTitle>Name: <em>{props.section.name}</em></CardTitle>
                <CardSubtitle className="pb-2">Subject: <em>{props.section.topic.subject.name}</em></CardSubtitle>
                <CardSubtitle className="pb-2">Topic: <em>{props.section.topic.name}</em></CardSubtitle>
            </CardBody>

            <CardBody>
                <CardSubtitle className="pb-2">
                    Semester: <em>{props.section.semester.semester}</em>
                </CardSubtitle>
                <CardSubtitle className="pb-2">
                    Size: <em>{props.section.sizeOfSection}</em>
                </CardSubtitle>

            </CardBody>
            {controls}
        </Card>
    )
};

export default withRouter(deleteSectionCard);
import React from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from "reactstrap";
import classes from "./AccountDetailsCard.module.css"
import auth from '../../../Auth'
import {Link} from "react-router-dom";

const accountDetailsCard =(props)=> {

    let role, modifyPath;
    if(auth.getRole()==='A'){
        role='Administrator';
        modifyPath = '/admin/modifyAccount';
    }
    if(auth.getRole()==='T'){
        role='Teacher';
        modifyPath = '/teacher/modifyAccount';
    }
    if(auth.getRole()==='S') {
        role = 'Student';
        modifyPath = '/student/modifyAccount';
    }

    const classNames = "pt-2 pr-2 pb-2 pl-2 "+classes.CardStyle;
    return (
            <Card className={classNames}>
                <CardBody>
                    <CardTitle>Name: <em>{props.person.name}</em></CardTitle>
                    <CardTitle className="pb-2 border-bottom">Surname: <em>{props.person.surname}</em></CardTitle>
                    {
                        props.person.album
                            ?
                            <CardSubtitle className="mt-2">Album: <em>{props.person.album}</em></CardSubtitle>
                            :
                            null
                    }
                    <CardSubtitle className="mt-2">Email: <em>{auth.parseJwt(auth.getToken()).sub}</em></CardSubtitle>
                </CardBody>
                <CardBody>
                    <CardText>Hello there {role}! What You wish to do?</CardText>
                    <Button outline color="secondary" tag={Link} to={modifyPath}>Edit My Account</Button>
                </CardBody>
            </Card>
    )
};

export default accountDetailsCard;
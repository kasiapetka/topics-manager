import React from 'react';
import { FaUserAlt } from "react-icons/fa";
import {Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle} from "reactstrap";
import classes from "../css/components.module.css"

const AccountDetailsCard =(props)=> {

    return (
        <div className={classes.cardStyle}>
            <Card>
                <CardBody>
                    {/*<CardTitle>{props.person.name+" "+props.person.surname}</CardTitle>*/}
                    <CardSubtitle>Card subtitle</CardSubtitle>
                </CardBody>
                <CardBody>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <CardLink href="#">Card Link</CardLink>
                    <CardLink href="#">Another Link</CardLink>
                </CardBody>
            </Card>
        </div>
    )
}

export default AccountDetailsCard
import React from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from "reactstrap";
import classes from './DeletePersonCard.module.css'
import {Link} from "react-router-dom";

const deletePersonCard = (props) => {
    const classNames= "pt-2 pr-2 pb-2 pl-2 "+classes.CardStyle;
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
                <CardSubtitle
                    className="mt-2">Email: <em>{props.person.user ? props.person.user.email : 'No Account'}</em></CardSubtitle>
            </CardBody>

            {
                props.deleted
                ?
                null
                :
                <CardBody>
                    <CardText>Are You sure You want to delete that person?</CardText>
                    <Button outline onClick={props.cancel} color="secondary">Cancel</Button>
                    <Link to="/admin/deleted"><Button onClick={props.delete} className='ml-4' color="danger">Delete</Button></Link>
                </CardBody>
            }

        </Card>
    )
};

export default deletePersonCard;
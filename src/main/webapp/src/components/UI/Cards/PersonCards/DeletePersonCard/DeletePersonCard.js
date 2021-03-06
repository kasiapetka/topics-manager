import React from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
} from "reactstrap";
import classes from '../../Card.module.css'
import {Redirect} from "react-router-dom";

const deletePersonCard = (props) => {

    let controls,deletedPersonLabel;
    if(!props.deleted){
        controls =  <CardBody>
            <CardText>Are You sure You want to delete that person?</CardText>
            <div style={{margin: '0'}} className='row'>
                <div className='col-md-1'></div>
                <Button className='col-md-4 mb-2' outline onClick={props.cancel} color="secondary">Cancel</Button>
                <div className='col-md-2'></div>
                <Button className='col-md-4 mb-2' onClick={props.delete} color="danger">Delete</Button>
                <div className='col-md-1'></div>
            </div>

        </CardBody>
    } else{
        deletedPersonLabel = <CardBody>
            <CardTitle>Person deleted: </CardTitle>
        </CardBody>
    }

    if(!props.person){
        return <Redirect to='/admin'/>
    }

    const classNames= "pt-2 pr-2 pb-2 pl-2 "+classes.CardStyle;
    return (
        <Card className={classNames}>
            {deletedPersonLabel}
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
            {controls}
        </Card>
    )
};

export default deletePersonCard;
import React from 'react';
import {
    Card, CardBody,
    CardTitle, Button, CardHeader,
} from "reactstrap";
import classes from '../Card.module.css'

const showPresenceCard = (props) => {

    let dates = <li>You have no presence in this section yet.</li>;
    if(props.dates){
        if(props.dates.length  !== 0 ){
            dates = props.dates.map(date=>{
                return <li key={date.date}>Date: {date.date} -->
                {date.isPresent ? ' Present' : " Absent"}</li>
            })
        }
    }

    const classNames= "pt-2 pr-2 pb-2 pl-2 "+classes.CardStyle;
    return (
        <Card className={classNames}>
            <CardHeader>
                <CardTitle>
                    Presence:
                </CardTitle>
            </CardHeader>
            <CardBody>
                <ul>
                    {dates}
                </ul>
            </CardBody>
            <CardBody>
                <div style={{margin: '0'}} className='row'>
                    <div className='col-md-4'></div>
                    <Button className='col-md-4 mb-2' outline onClick={props.cancel} color="secondary">Cancel</Button>
                    <div className='col-md-4'></div>
                </div>
            </CardBody>
        </Card>
    )
};

export default showPresenceCard;
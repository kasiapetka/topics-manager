import React from 'react'
import classes from '../Lists.module.css'
import {Col, Row} from "reactstrap";

const code = (props) => {
    return (
        <div className={classes.Element}>
            <Row className="pt-2 pb-2 mr-0 ml-0">
                <Col><span className={"float-left ml-3 "+classes.StringStyle}><strong>Name:</strong> <em>{props.name}</em></span></Col>
                <Col><span className={"float-left ml-3 "+classes.StringStyle}><strong>Surname:</strong> <em>{props.surname}</em></span></Col>
            </Row>
            <Row className="pt-2 pb-2 mr-0 ml-0">
                <Col><span className={"float-left ml-3 "+classes.StringStyle}><strong>Code:</strong> <em>{props.code}</em></span></Col>
                <Col><span className={"float-left ml-3 "+classes.StringStyle}><strong>Album:</strong> <em>{props.album}</em></span></Col>
            </Row>
        </div>
    )
};

export default code;

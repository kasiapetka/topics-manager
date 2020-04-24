import React from 'react'
import classes from '../Lists.module.css'
import {Button, Row, Col} from "reactstrap";
import auth from '../../../Auth'

const section = (props) => {

    let controls;

    if(auth.getRole()==='T' || auth.getRole()==='A')
    {
        controls=    <Row className="pt-2 pb-3 mr-0 ml-0">
            <Col><Button className="d-inline-block" onClick={props.edit}>Edit</Button></Col>
            <Col><Button className="d-inline-block" onClick={props.delete} outline color="danger">Delete</Button></Col>
        </Row>
    }

    return (
        <div className={classes.Element}>
            <Row className="pt-2 pb-2 mr-0 ml-0">
                <Col><span className="float-left ml-3"><strong>Name:</strong> <em>{props.name}</em></span></Col>
                <Col><span className="float-left ml-3"><strong>Size:</strong> <em>{props.size}</em></span></Col>
            </Row>
            <Row className="pt-2 pb-3 mr-0 ml-0">
                <Col><span className="float-left ml-3"><strong>Topic:</strong> <em>{props.topic}</em></span></Col>
                <Col><span className="float-left ml-3"><strong>Semester:</strong> <em>{props.semester}</em></span></Col>
            </Row>
            {controls}
        </div>
    )
};

export default section;
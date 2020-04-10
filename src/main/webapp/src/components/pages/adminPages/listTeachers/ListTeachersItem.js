import React from 'react'
import classes from './listTeachers.module.css'
import {Button, Col, Row} from "reactstrap";

const Teacher = (props) => {
    return (
        <div className={classes.Teacher}>
            <Row className="pt-2 pb-2 mr-0 ml-0">
                <Col><span className="float-left ml-3"><strong>Name:</strong> <em>{props.name}</em></span></Col>
                <Col><span className="float-left ml-3"><strong>Surname:</strong> <em>{props.surname}</em></span></Col>
            </Row>
            <Row className="pt-2 pb-3 mr-0 ml-0">
              <Col><span className="float-left ml-3"><strong>Email:</strong> <em>{props.email}</em></span></Col>

            </Row>
            <Row className="pt-2 pb-2 mr-0 ml-0">
                <Col><Button className="d-inline-block" onClick={props.edit}>Edit</Button></Col>
                <Col><Button className="d-inline-block" outline color="danger">Delete</Button></Col>
            </Row>
        </div>
    )
};

export default Teacher
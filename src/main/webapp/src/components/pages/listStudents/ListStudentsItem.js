import React from 'react'
import classes from './listStudents.module.css'
import {Button, Row, Col} from "reactstrap";

const Student =(props)=> {
    return (
        <div className={classes.Student}>
            <Row className="pt-2 pb-2 mr-0 ml-0">
                <Col><span className="float-left"><strong>Name:</strong> <em>{props.name}</em></span></Col>
                <Col><span className="float-left"><strong>Surname:</strong> <em>{props.surname}</em></span></Col>
            </Row>
            <Row className="pt-2 pb-3 mr-0 ml-0">
                <Col><span className="float-left"><strong>Email:</strong> <em>{props.email}</em></span></Col>
                <Col><span className="float-left"><strong>Album:</strong> <em>{props.album}</em></span></Col>
            </Row>

            <Button className="d-inline-block mr-3" onClick={props.edit}>Edit</Button>
            <Button className="d-inline-block ml-3" outline color="danger">Delete</Button>
        </div>
    )
};

export default Student;
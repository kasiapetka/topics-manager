import React from 'react'
import classes from '../Lists.module.css'
import {Button, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";

const Teacher = (props) => {

    let addButton, removeButton,adminControls;

    if (!props.isInSubject && props.addingToSubjectTopic) {
        addButton = <Row className="pt-2 pb-3 mr-0 ml-0">
            <Col><Button className="d-inline-block" onClick={() => {
                props.addToSubject()
            }}>Add</Button></Col>
        </Row>
    }
    if (props.isInSubject && props.addingToSubjectTopic) {
        removeButton = <Row className="pt-2 pb-3 mr-0 ml-0">
            <Col><Button className="d-inline-block" color="danger" onClick={() => {
                props.removeFromSubject()
            }}>Remove</Button></Col>
        </Row>
    }

    if(!props.addingToSubjectTopic){
        adminControls = <Row className="pt-2 pb-2 mr-0 ml-0">
            <Col><Link to={"/admin/edit"}><Button className="d-inline-block" onClick={props.edit}>Edit</Button></Link></Col>
            <Col><Button className="d-inline-block" onClick={props.delete} outline color="danger">Delete</Button></Col>
        </Row>
    }

    return (
        <div className={classes.Element}>
            <Row className="pt-2 pb-2 mr-0 ml-0">
                <Col><span className="float-left ml-3"><strong>Name:</strong> <em>{props.name}</em></span></Col>
                <Col><span className="float-left ml-3"><strong>Surname:</strong> <em>{props.surname}</em></span></Col>
            </Row>
            <Row className="pt-2 pb-3 mr-0 ml-0">
              <Col><span className="float-left ml-3"><strong>Email:</strong> <em>{props.email}</em></span></Col>

            </Row>
            {adminControls}
            {addButton}
            {removeButton}
        </div>
    )
};

export default Teacher;
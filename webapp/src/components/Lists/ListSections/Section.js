import React from 'react'
import classes from '../Lists.module.css'
import {Button, Row, Col} from "reactstrap";
import auth from '../../../Auth'

const section = (props) => {
    let controls, state;
    let finishControl = <Row className="pt-2 pb-3 mr-0 ml-0">
        <Col><Button className="d-inline-block" onClick={props.delete} outline
                     color="danger">Finish</Button></Col></Row>

    if (props.state === 'O') {
        state = "Opened";
    } else if (props.state === 'C') {
        state = "Closed";
    } else if (props.state === 'F') {
        state = "Finished";
        finishControl = null;
    }

    if (auth.getRole() === 'T' || auth.getRole() === 'A') {
        controls = <React.Fragment>
            <Row className="pt-2 pb-3 mr-0 ml-0">
                <Col><Button className="d-inline-block" onClick={props.edit}>Edit</Button></Col>
                <Col><Button className="d-inline-block" onClick={props.modify}>Manage Students</Button></Col>
            </Row>
            {finishControl}
        </React.Fragment>
    }
    if (auth.getRole() === 'S') {
        controls = <Row className="pt-2 pb-3 mr-0 ml-0">
                <Col><Button className="d-inline-block"
                             onClick={props.view} outline>View Section Details</Button></Col></Row>
    }

    return (
        <div className={classes.Element}>
            <Row className="pt-2 pb-2 mr-0 ml-0">
                <Col><span className={"float-left ml-3 "+classes.StringStyle}><strong>Name:</strong> <em>{props.name}</em></span></Col>
                <Col><span className={"float-left ml-3 "+classes.StringStyle}><strong>Semester:</strong> <em>{props.semester}</em></span></Col>
            </Row>
            <Row className="pt-2 pb-2 mr-0 ml-0">
                <Col><span className={"float-left ml-3 "+classes.StringStyle}><strong>Topic:</strong> <em>{props.topic}</em></span></Col>
                <Col><span className={"float-left ml-3 "+classes.StringStyle}><strong>Subject:</strong> <em>{props.subject}</em></span></Col>
            </Row>
            <Row className="pt-2 pb-3 mr-0 ml-0">
                <Col><span className={"float-left ml-3 "+classes.StringStyle}><strong>State:</strong> <em>{state}</em></span></Col>
                <Col><span className={"float-left ml-3 "+classes.StringStyle}><strong>Size:</strong> <em>{props.size}</em></span></Col>
            </Row>
            {controls}
        </div>
    )
};

export default section;

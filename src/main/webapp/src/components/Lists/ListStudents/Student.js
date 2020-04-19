import React,{useState} from 'react'
import classes from './ListStudents.module.css'
import {Button, Row, Col} from "reactstrap";
import auth from '../../../Auth'

const Student = (props) => {
    const [removeStudentFromSection, setRemoveStudentFromSection] = useState(false);

    return (
        <div className={classes.Student}>
            <Row className="pt-2 pb-2 mr-0 ml-0">
                <Col><span className="float-left ml-3"><strong>Name:</strong> <em>{props.name}</em></span></Col>
                <Col><span className="float-left ml-3"><strong>Surname:</strong> <em>{props.surname}</em></span></Col>
            </Row>
            <Row className="pt-2 pb-3 mr-0 ml-0">
                <Col><span className="float-left ml-3"><strong>Email:</strong> <em>{props.email}</em></span></Col>
                <Col><span className="float-left ml-3"><strong>Album:</strong> <em>{props.album}</em></span></Col>
            </Row>
            {
                auth.getRole() === 'A'
                    ?
                    <Row className="pt-2 pb-3 mr-0 ml-0">
                        <Col><Button className="d-inline-block" onClick={props.edit}>Edit</Button></Col>
                        <Col><Button className="d-inline-block" onClick={props.delete} outline
                                     color="danger">Delete</Button></Col>
                    </Row>
                    :
                    null
            }
            {
                props.addStudentToSection && !removeStudentFromSection
                    ?
                    <Row className="pt-2 pb-3 mr-0 ml-0">
                        <Col><Button className="d-inline-block" onClick={()=>{
                            setRemoveStudentFromSection(true);
                            props.addToSection()}}>Add</Button></Col>
                    </Row>
                    :
                    null
            }
            {
                removeStudentFromSection
                    ?
                    <Row className="pt-2 pb-3 mr-0 ml-0">
                        <Col><Button className="d-inline-block" color="danger" onClick={()=> {
                            setRemoveStudentFromSection(false);
                            props.removeFromSection()}}>
                            Remove</Button></Col>
                    </Row>
                    :
                    null
            }
        </div>
    )
};

export default Student;
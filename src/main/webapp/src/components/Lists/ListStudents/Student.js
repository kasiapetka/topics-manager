import React, {useState} from 'react'
import classes from '../Lists.module.css'
import {Button, Row, Col} from "reactstrap";
import auth from '../../../Auth'
import {Link} from "react-router-dom";

const Student = (props) => {
    const [removeStudentFromSection, setRemoveStudentFromSection] = useState(false);
    const [addStudentToSection, setAddStudentToSection] = useState(true);

    let adminControls, addButton, removeButton,studentOnOtherSem;
    if (auth.getRole() === 'A' && (!props.sectionCreation)) {
        adminControls = <Row className="pt-2 pb-3 mr-0 ml-0">
            <Col><Link to={"/admin/edit"}><Button className="d-inline-block"
                                                onClick={props.edit}>Edit</Button></Link></Col>
            <Col><Button className="d-inline-block" onClick={props.delete} outline
                         color="danger">Delete</Button></Col>
        </Row>
    }
    if (!props.oversize && props.sectionCreation && addStudentToSection && !props.isInSection) {
        addButton = <Row className="pt-2 pb-3 mr-0 ml-0">
            <Col><Button className="d-inline-block" onClick={() => {
                if(props.addToSection()===true){
                    setRemoveStudentFromSection(true);
                    setAddStudentToSection(false);
                }
            }}>Add</Button></Col>
        </Row>
    }
    if (props.sectionCreation && (removeStudentFromSection || props.isInSection)) {
        removeButton = <Row className="pt-2 pb-3 mr-0 ml-0">
            <Col><Button className="d-inline-block" color="danger" onClick={() => {
                setRemoveStudentFromSection(false);
                setAddStudentToSection(true);
                props.removeFromSection()
            }}>Remove</Button></Col>
        </Row>
    }
    if(props.editSectionMembers){
        if(!props.isOnSem){
            studentOnOtherSem =  <Row className="pt-2 pb-3 mr-0 ml-0">
                <Col><p>Student is on other semester.</p></Col>
            </Row>;
        }
    }

    return (
        <div className={classes.Element}>
            <Row className="pt-2 pb-2 mr-0 ml-0">
                <Col><span className="float-left ml-3"><strong>Name:</strong> <em>{props.name}</em></span></Col>
                <Col><span className="float-left ml-3"><strong>Surname:</strong> <em>{props.surname}</em></span></Col>
            </Row>
            <Row className="pt-2 pb-3 mr-0 ml-0">
                <Col><span className="float-left ml-3"><strong>Email:</strong> <em>{props.email}</em></span></Col>
                <Col><span className="float-left ml-3"><strong>Album:</strong> <em>{props.album}</em></span></Col>
            </Row>
            {studentOnOtherSem}
            {adminControls}
            {addButton}
            {removeButton}
        </div>
    )
};

export default Student;
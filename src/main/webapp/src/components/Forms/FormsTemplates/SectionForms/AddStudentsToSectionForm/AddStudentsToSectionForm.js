import React from 'react';
import {Form} from "reactstrap";
import classes from "../../Forms.module.css";
import ListStudents from "../../../../../containers/Lists/ListStudents";
import Button from "../../../FormElements/Button/Button";

const addStudentToSectionForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 mb-4 pr-3 pl-3 " + classes.ListForm;
    let students = <p>No students</p>;

    if (props.students) {
        students = props.students.map(student => {
            return <li key={student.album}>{student.name + ' ' + student.surname}</li>
        })
    }

    return (
        <Form className={classNames} onSubmit={props.onSubmit}>
            <h3 className="text-center mt-2">Add max.{props.section.size} Students to Section</h3>

            <p>Students in Section: </p>
            <ul>
                {students}
            </ul>

            <ListStudents
                studentsInSection = {props.students}
                addStudentToSection={true}
                addToSection={props.addToSection}
                removeFromSection={props.removeFromSection}
                sectionSize={props.section.size}
                sectionSemester={props.section.semester.semester}/>
            <Button label='add students'/>
        </Form>
    )
};

export default addStudentToSectionForm;
import React from 'react';
import {Form,Button} from "reactstrap";
import classes from "../../Forms.module.css";
import ListStudents from "../../../../../containers/Lists/ListStudents";
import SubmitButton from "../../../FormElements/Button/Button";

const addStudentToSectionForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 mb-4 pr-3 pl-3 " + classes.ListForm;
    let students = <p>No students</p>,cancelOption;

    if (props.students) {
        students = props.students.map(student => {
            return <li key={student.album}>{student.name + ' ' + student.surname}</li>
        })
    }

    if(props.cancelOption){
        cancelOption = <Button onClick={props.cancelOptionHandler}
                               outline color="info">Back</Button>
    }

    return (
        <Form className={classNames} onSubmit={props.onSubmit}>
            {cancelOption}

            <h3 className="text-center mt-2">Add max.{props.section.size} Students to Section</h3>

            <p>Students in Section: </p>
            <ul>
                {students}
            </ul>

            <ListStudents
                studentsInSection = {props.students}
                addStudentToSection={true}
                sectionId={props.section.id}
                addToSection={props.addToSection}
                removeFromSection={props.removeFromSection}
                sectionSize={props.section.size}
                sectionSemester={props.section.semester.semester}/>
            <SubmitButton label='add students'/>
        </Form>
    )
};

export default addStudentToSectionForm;
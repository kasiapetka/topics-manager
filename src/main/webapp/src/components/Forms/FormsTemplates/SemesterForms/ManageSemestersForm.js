import React from 'react';
import classes from '../Forms.module.css';
import {Button, Form, FormGroup, FormText} from "reactstrap";
import SubmitButton from "../../FormElements/Button/Button";
import Input from "../../FormElements/Input/Input";
import ListPersons from "../../../../containers/Lists/ListPersons";
import Label from "../../FormElements/Label/Label";

const manageSemestersForm = (props) => {
        const classNames = "border rounded pt-4 pb-5 mb-4 pr-3 pl-3 " + classes.Form;
        let semPicker, receiverPicker, receivers;
        const semesters = [2, 3, 4, 5, 6, 7];
        let semOptions = semesters.map(sem => {
            return <option key={sem}
                           value={sem}>{sem}</option>
        });

        if (props.students) {
            if (props.students.length === 0) {
                receivers = <li>No students.</li>;
            } else {
                receivers = props.students.map(student => {
                    return <label key={student.user.email}
                                  className={"row w-100 "+classes.RemoveLabel}
                                  onClick={() => props.removePersonFromList(student)}>
                        <div className="col-md-1"></div>
                        <div className="col-md-4">{student.user.email}</div>
                        <div className="col-md-6">{student.name+" "+student.surname}</div>
                        <div className="col-md-1"></div>
                    </label>
                });
            }
        }
        semPicker = <Input type="select" name="semester" id="exampleSem"
                           groupclasses="col-md-4"
                           label="Semester"
                           value={props.semester} onChange={props.onSemesterChange}>
            <option value='1'>1</option>
            {semOptions}
        </Input>

        receiverPicker = <ListPersons
            path={"/api/common/students/" + props.semester}
            receivers={props.students}
            addPersonToList={props.addPersonToList}
            saveAll={props.saveAll}
            semester={props.semester}/>


        return (
            <Form className={classNames} onSubmit={props.onSaveChanges}>
                <h3 className="text-center mt-2 mb-3">Manage Semesters:</h3>

                <Label divstyle={{maxHeight: '200px', overflowY: 'scroll', listStyleType: 'circle'}}
                       label="Students Who Passed:"
                       content={<ul>{receivers}</ul>}/>
                {semPicker}
                {receiverPicker}

                <div className="form-row p-1">
                    <div className="col-md-4"></div>
                    <Button color="light"
                            className="m-auto border"
                            onClick={props.addAll}>Add All</Button>
                    <div className="col-md-4"></div>
                </div>

                <SubmitButton label='save changes' disabled={props.students.length === 0}/>
            </Form>
        );
    }
;

export default manageSemestersForm;
import React from "react";
import classes from "../Forms.module.css";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import ListTeachers from "../../../../containers/Lists/ListTeachers";

const editTeachersInSubjectForm=(props)=>{
    const classNames = "border rounded pt-4 pb-5 mt-5 mb-4 pr-3 pl-3 " + classes.ListForm;

    const subjectOptions = props.subjects.map(subject => {
        return <option
            value={subject.id}
            key={subject.id}>
            {subject.name}
        </option>
    });

    let teachers;
    let teachersInSubject = <p>No teachers</p>;

    if (props.teachersInSubject.length !== 0) {
        teachersInSubject = props.teachersInSubject.map(teacher => {
            return <li key={teacher.id}>{teacher.name + ' ' + teacher.surname}</li>
        })
    }

    if(props.subject){
        teachers = <ListTeachers
            teachersInSubject={props.teachersInSubject}
            addingToSubjectTopic={true}
            addToSubject={props.addToSubject}
            removeFromSubject={props.removeFromSubject}/>
    }

    return(

        <Form className={classNames} onSubmit={props.onSubmit}>
            <h3 className="text-center mt-2">Edit Teachers In Subject</h3>
            <p>Teachers in Subject</p>
            <ul>
                {teachersInSubject}
            </ul>

            <FormGroup className="p-2 mb-2 mt-2">
                <Label for="exampleSubject" className="mr-2 pl-1">Subject</Label>
                <Input type="select" name="subject" id="exampleSubject"
                       defaultValue='default' onChange={props.onSubjectChange}>

                    <option disabled={true} value='default'>Choose Subject</option>
                    {subjectOptions}
                </Input>
            </FormGroup>

            {teachers}

            <div className="form-row text-center pt-4">
                <div className="col-md-12">
                    <Button type="submit" className="btn btn-primary">Edit Teachers In Subject</Button>
                </div>
            </div>

        </Form>
    );
};

export default editTeachersInSubjectForm;
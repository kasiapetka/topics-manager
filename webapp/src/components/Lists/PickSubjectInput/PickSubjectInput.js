import React from 'react';
import {Input, Label} from "reactstrap";

const pickSubjectInput = (props) => {
    const subjectOptions = props.subjects.map(subject => {
        return <option
            value={subject.id}
            key={subject.id}>
            {subject.name}
        </option>
    });

    return (
            <div className="p-4 mb-2 mt-2">
                <Label for="exampleSubject" className="mr-2 pl-1">Subject</Label>
                <Input type="select" name="subject" id="exampleSubject"
                       defaultValue='default' onChange={props.onSubjectChange}>
                    <option disabled={true} value='default'>Choose Subject</option>
                    {subjectOptions}
                </Input>
            </div>
    )
};

export default pickSubjectInput;
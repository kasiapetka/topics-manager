import React from 'react';
import {FormGroup, Input, Label} from "reactstrap";

const pickSemesterInput = (props) => {

    const semesters = [2,3,4,5,6,7];

    let options = semesters.map(sem => {
        return <option key={sem}
                       value={sem}>{sem}</option>
    });

    return (
        <div className="p-4 mb-2 mt-2">
            <FormGroup className="mb-2 mt-3 col-md-3 mr-auto ml-auto">
                <Label for="exampleSem" className="mr-2 pl-1">Semester</Label>

                <Input type="select" name="semester" id="exampleSem"
                       onChange={props.onSemesterChange}>
                    <option value='1'>1</option>
                    {options}
                </Input>

            </FormGroup>
        </div>
    )
};

export default pickSemesterInput;
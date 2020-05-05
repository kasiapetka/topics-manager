import React from 'react';
import classes from "../../../Forms.module.css";
import Input from "../../../../FormElements/Input/Input";


const viewPresenceForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 mb-4 pr-3 pl-3 " + classes.Form;
    let dates = <option>No presence dates in this section.</option>, students;

    if (props.dates) {
        if (props.dates.length === 0) {
            dates = <option >No presence dates in this section.</option>
        } else {
            dates = props.dates.map(date => {
                return <option key={date}>
                    {date}
                </option>
            });
        }
    }
    if (props.students) {
        if(props.students.length === 0){
            students = <li>No students in this section</li>
        }else {
            students = props.students.map((student) => {
                return <li key={student.album} className='form-row'>
                    <div className='col-md-5 pt-3'>{student.name + ' ' + student.surname}</div>
                </li>
            });
        }
    }

    return (
        <div className={classNames}>
            <h3 className="text-center mt-2">View Presence</h3>

            <Input type='select' label="pick date" name='date'
                   defaultValue='default' onChange={props.onDateChange}>
                <option disabled={true} value='default'>Choose Date</option>
                {dates}
            </Input>

            <ul>
                {students}
            </ul>


        </div>
    )
};

export default viewPresenceForm;
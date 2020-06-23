import React, {useState} from 'react';
import classes from './MultiSelect.module.css'
import {FormGroup} from "reactstrap";

const MultiSelect = (props) => {
    const [expanded, setExpanded] = useState(true);
    const labelsClasses = [classes.Labels, classes.Visible];

    let formGroupClasses = "p-2", persons = <p>No persons here.</p>;

    if (props.persons) {
        if(props.persons.length !== 0){
            persons = props.persons.map(person => {
                if (person.user && !person.checked)
                    return <label key={person.user.email}
                                  className="row w-100"
                                  onClick={() => props.updateList(person)}>
                        <div className="col-md-1"></div>
                        <div className="col-md-4">{person.user.email}</div>
                        <div className="col-md-6">{person.name+" "+person.surname}</div>
                        <div className="col-md-1"></div>
                    </label>
                else return null
            })
        }
    }

    return (
        <FormGroup className={formGroupClasses}>
            <div className={classes.SelectBox} onClick={() => {
                setExpanded(!expanded);
            }}>
                <select color="light"
                        className="pt-2 pb-2 pl-2 w-100 border shadow-sm bg-white rounded text-left">
                    <option>Select</option>
                </select>
                <div className={classes.OverSelect}></div>
            </div>
            {
                expanded
                    ?
                    <div className={labelsClasses.join(' ')}>
                        {persons}
                    </div>
                    :
                    null
            }
        </FormGroup>
    );
};

export default MultiSelect;

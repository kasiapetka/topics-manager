import React from 'react'
import {Input, Label} from "reactstrap";
import Teachers from "./ListTeachers";
import classes from '../../css/pages.module.css'

const ListTeachersComponent =(props)=> {
    return (
        <div className={classes.Teachers}>
            <div className="text-center mt-3">
                            <span className="ml-5"><input type="radio" name="radio1"
                                                          onChange={props.conditionChange} value="Email"
                                                          checked={props.condition === "Email"}/>{' '}Email</span>
                <span className="ml-5"><input type="radio" name="radio1"
                                              onChange={props.conditionChange} value="Name"/>{' '}Name</span>
                <span className="ml-5"><input type="radio" name="radio1"
                                              onChange={props.conditionChange} value="Surname"/>{' '}Surname</span>
            </div>
            <Label className={classes.Label} for="exampleSearch">Search Teacher on: {props.condition}</Label>
            <Input className="p-2 w-75 m-auto"
                   type="search"
                   name="search"
                   id="exampleSearch"
                   placeholder="search..."
                   value={props.search || ''}
                   onChange={props.change}
            />
            <Teachers
                teachers={props.filtered}
                edit={props.edit}/>
        </div>
    )
}

export default ListTeachersComponent
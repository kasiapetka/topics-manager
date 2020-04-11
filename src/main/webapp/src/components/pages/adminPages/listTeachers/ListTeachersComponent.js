import React, {useContext} from 'react'
import {Input, Label} from "reactstrap";
import Teachers from "./ListTeachers";
import classes from './listTeachers.module.css'
import AdminListsContext from "../../../../context/listTeachersContext";

const ListTeachersComponent =(props)=> {

    const teachersContext = useContext(AdminListsContext);

    return (
        <div className={classes.Teachers}>
            <div className="text-center mt-4 mb-4">
                            <span className="ml-5"><input type="radio" name="radio1"
                                                          onChange={teachersContext.conditionChange} value="Email"
                                                          checked={teachersContext.condition === "Email"}/>{' '}Email</span>
                <span className="ml-5"><input type="radio" name="radio1"
                                              onChange={teachersContext.conditionChange} value="Name"/>{' '}Name</span>
                <span className="ml-5"><input type="radio" name="radio1"
                                              onChange={teachersContext.conditionChange} value="Surname"/>{' '}Surname</span>
            </div>
            <Label className={classes.Label} for="exampleSearch">Search Teacher on: {teachersContext.condition}</Label>
            <Input className="p-2 w-75 m-auto"
                   type="search"
                   name="search"
                   id="exampleSearch"
                   placeholder="search..."
                   value={teachersContext.search || ''}
                   onChange={teachersContext.change}
            />
            <Teachers/>
        </div>
    )
};

export default ListTeachersComponent;
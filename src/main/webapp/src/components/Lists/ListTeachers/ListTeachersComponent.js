import React from 'react'
import FilterPersonsList from "../FilterPersonsList";
import Teachers from "./Teachers";
import classes from './ListTeachers.module.css'

const listTeachersComponent = (props) => {

    return (
        <div className={classes.Teachers}>
            <FilterPersonsList
                list="T"/>
            <Teachers/>
        </div>
    )
};

export default listTeachersComponent;
import React from 'react'
import FilterPersonsList from "../FilterPersonsList";
import Teachers from "./ListTeachers";
import classes from './listTeachers.module.css'

const ListTeachersComponent = (props) => {

    return (
        <div className={classes.Teachers}>
            <FilterPersonsList
                list="T"/>
            <Teachers/>
        </div>
    )
};

export default ListTeachersComponent;
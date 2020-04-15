import React from 'react'
import FilterPersonsList from "../FilterPersonsList";
import Teachers from "./Teachers";
import classes from './ListTeachers.module.css'

const listTeachers = (props) => {

    return (
        <div className={classes.Teachers}>
            <FilterPersonsList
                list="T"/>
            <Teachers/>
        </div>
    )
};

export default listTeachers;
import React from 'react'
import Students from "./Students";
import classes from './ListStudents.module.css'
import FilterPersonsList from "../FilterPersonsList";

const listStudents =(props)=> {
    return (
        <div className={classes.Students}>
            <FilterPersonsList
                list="S"/>
            <Students />
        </div>
    )
};

export default listStudents;
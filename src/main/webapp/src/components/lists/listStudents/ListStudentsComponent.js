import React from 'react'
import Students from "./ListStudents";
import classes from './listStudents.module.css'
import FilterPersonsList from "../FilterPersonsList";

const ListStudentsComponent =(props)=> {
    return (
        <div className={classes.Students}>
            <FilterPersonsList
                list="S"/>
            <Students/>
        </div>
    )
};

export default ListStudentsComponent;
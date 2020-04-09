import React from 'react'
import Students from "./../listStudents/ListStudents";
import classes from './listStudents.module.css'

const ListStudentsComponent =(props)=> {
    return (
        <div className={classes.Students}>
            <Students/>
        </div>
    )
};

export default ListStudentsComponent;
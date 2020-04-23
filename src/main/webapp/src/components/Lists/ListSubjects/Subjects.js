import React  from "react";
import Subject from "./Subject";
import classes from "./ListSubjects.module.css"

const Subjects =(props)=>{

    const subjects =  props.subjects.map((subject, index) => {
        return <Subject
            name={subject.name}
            summary={subject.summary}
            key={subject.id}
        />
    });

    return(
        <div className={classes.Subjects}>
            {subjects}
        </div>
    )
};

export default Subjects;
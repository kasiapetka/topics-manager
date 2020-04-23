import React  from "react";
import Subject from "./Subject";

const Subjects =(props)=>{
    return(
        props.subjects.map((subject, index) => {
            return <Subject
                name={subject.name}
                summary={subject.summary}
                key={subject.id}
            />
        })
    )
};

export default Subjects;
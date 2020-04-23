import React  from "react";
import Subject from "./Subject";

const Subjects =(props)=>{
    return(
        props.subjects.map((subject, index) => {
            return <Subject
                name={subject.name}
                surname={subject.surname}
                key={subject.album}
            />
        })
    )
};

export default Subjects;
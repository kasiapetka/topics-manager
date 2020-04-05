import React from "react";
import Teacher from "./ListTeachersItem";

const Teachers =(props)=>{

    return(
        props.teachers.map((teacher, index) => {
            return <Teacher
                name={teacher.name}
                surname={teacher.surname}
                email={teacher.user ? teacher.user.email : null}
                key={teacher.id}
               />
        })
    )
}

export default Teachers
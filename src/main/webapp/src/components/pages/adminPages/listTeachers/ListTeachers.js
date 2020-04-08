import React , {useContext} from "react";
import Teacher from "./ListTeachersItem";
import TeachersContext from "../../../../context/listTeachersContext";

const Teachers =()=>{

    const teachersContext = useContext(TeachersContext);

    return(
        teachersContext.teachers.map((teacher, index) => {
            return <Teacher
                name={teacher.name}
                surname={teacher.surname}
                email={teacher.user ? teacher.user.email : null}
                key={teacher.id}
                edit={() =>teachersContext.edit(index)}
               />
        })
    )
}

export default Teachers
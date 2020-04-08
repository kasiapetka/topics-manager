import React , {useContext} from "react";
import Teacher from "./ListStudentsItem";
import StudentsContext from "../../../context/listStudentsContext";

const Students =()=>{

    const studentsContext = useContext(StudentsContext);

    return(
        studentsContext.students.map((student, index) => {
            return <Teacher
                name={student.name}
                surname={student.surname}
                email={student.user ? student.user.email : null}
                album={student.album}
                key={student.id}
                edit={() =>studentsContext.edit(index)}
            />
        })
    )
};

export default Students;
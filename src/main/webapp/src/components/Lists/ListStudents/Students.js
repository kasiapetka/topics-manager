import React , {useContext} from "react";
import Student from "./Student";
import PersonsContext from "../../../context/listPersonsContext";

const Students =()=>{

    const studentsContext = useContext(PersonsContext);

    return(
        studentsContext.persons.map((student, index) => {
            return <Student
                name={student.name}
                surname={student.surname}
                email={student.user ? student.user.email : "No Account"}
                album={student.album}
                key={student.album}
                edit={() =>studentsContext.edit(index)}
                delete={() => studentsContext.delete(index)}
                addToSection={()=>studentsContext.addToSection(index)}
                addStudentsToSection={studentsContext.addStudentsToSection}
                removeFromSection={()=>studentsContext.removeFromSection(index)}
            />
        })
    )
};

export default Students;
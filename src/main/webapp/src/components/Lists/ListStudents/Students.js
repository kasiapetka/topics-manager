import React, {useContext} from "react";
import Student from "./Student";
import PersonsContext from "../../../context/listPersonsContext";
import FilterPersonsList from "../FilterPersonsList";
import classes from "./ListStudents.module.css";

const Students = () => {

    const studentsContext = useContext(PersonsContext);
    const students =
        studentsContext.persons.map((student, index) => {
            return <Student
                name={student.name}
                surname={student.surname}
                email={student.user ? student.user.email : "No Account"}
                album={student.album}
                key={student.album}
                edit={() => studentsContext.edit(index)}
                delete={() => studentsContext.delete(index)}
                addToSection={() => studentsContext.addToSection(index)}
                addStudentsToSection={studentsContext.addStudentsToSection}
                removeFromSection={() => studentsContext.removeFromSection(index)}
            />
        });

    return (
        <div className={classes.Students}>
            <FilterPersonsList
                list="S"/>
            {students}
        </div>
    )
};

export default Students;
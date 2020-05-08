import React, {useContext} from "react";
import Student from "./Student";
import PersonsContext from "../../../context/listPersonsContext";
import FilterPersonsList from "../FilterLists/FilterPersonsList";
import classes from '../Lists.module.css'

const Students = (props) => {

    const studentsContext = useContext(PersonsContext);
    let students;

    if(studentsContext.persons.length !== 0){
        students = studentsContext.persons.map((student, index) => {
            return <Student
                name={student.name}
                surname={student.surname}
                email={student.user ? student.user.email : "No Account"}
                album={student.album}
                key={student.album}
                edit={() => studentsContext.edit(index)}
                delete={() => studentsContext.delete(index)}
                isInSection={student.isInSection}
                addToSection={() => props.addToSection(student)}
                sectionCreation={props.sectionCreation}
                oversize={props.oversize}
                removeFromSection={() => props.removeFromSection(student)}
            />
        });
    } else{
        students = <h4 className="mt-4 text-center">No students on this semester yet.</h4>
    }

    return (
        <div className={classes.List}>
            <FilterPersonsList
                list="S"/>
            {students}
        </div>
    )
};

export default Students;
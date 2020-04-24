import React, {useContext} from "react";
import Teacher from "./Teacher";
import PersonsContext from "../../../context/listPersonsContext";
import classes from '../Lists.module.css'
import FilterPersonsList from "../FilterPersonsList";

const Teachers = () => {

    const teachersContext = useContext(PersonsContext);
    const teachers = teachersContext.persons.map((teacher, index) => {
        return <Teacher
            name={teacher.name}
            surname={teacher.surname}
            email={teacher.user ? teacher.user.email : "No Account"}
            key={teacher.id}
            edit={() => teachersContext.edit(index)}
            delete={() => teachersContext.delete(index)}
        />
    });

    return (
        <div className={classes.List}>
            <FilterPersonsList
                list="T"/>
            {teachers}
        </div>
    )
};

export default Teachers;
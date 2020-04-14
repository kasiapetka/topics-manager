import React , {useContext} from "react";
import Teacher from "./Teacher";
import PersonsContext from "../../../context/listPersonsContext";

const Teachers =()=>{

    const teachersContext = useContext(PersonsContext);

    return(
        teachersContext.persons.map((teacher, index) => {
            return <Teacher
                name={teacher.name}
                surname={teacher.surname}
                email={teacher.user ? teacher.user.email : "No Account"}
                key={teacher.id}
                edit={() =>teachersContext.edit(index)}
                delete={() => teachersContext.delete(index)}
               />
        })
    )
};

export default Teachers;
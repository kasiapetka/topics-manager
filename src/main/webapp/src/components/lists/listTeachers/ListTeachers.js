import React , {useContext} from "react";
import Teacher from "./ListTeachersItem";
import AdminListsContext from "../../../context/listTeachersContext";

const Teachers =()=>{

    const teachersContext = useContext(AdminListsContext);

    return(
        teachersContext.teachers.map((teacher, index) => {
            return <Teacher
                name={teacher.name}
                surname={teacher.surname}
                email={teacher.user ? teacher.user.email : "No Account"}
                key={teacher.id}
                edit={() =>teachersContext.edit(index)}
               />
        })
    )
};

export default Teachers;
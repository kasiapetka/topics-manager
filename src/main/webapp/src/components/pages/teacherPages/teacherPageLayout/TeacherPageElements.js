import React from "react";
import AccountDetailsCard from "../../../accountCard/AccountDetailsCard";
import TeacherAccountControls from "./TeacherAccountControls";
import Messages from "../../../messages/Messages";
import StudentsContext from "../../../../context/listStudentsContext";
import ListStudentsComponent from "../../listStudents/ListStudentsComponent";
import EditAccount from "../../../../containers/formsPages/EditAccount";
import auth from "../../../../Auth";
import ListSectionsComponent from "../listSections/ListSectionsComponent";

const TeacherPageElements=(props)=>(
    <div className="container-fluid h-100 mt-5">
        <div className="row h-100">
            <div className="col-md-3 border-right">
                <AccountDetailsCard
                    person={props.teacher}/>
                <TeacherAccountControls
                    toggle={props.toggleStudents}/>
                <Messages/>
            </div>
            <div className="col-md-8">

                <StudentsContext.Provider value={{students: props.students, edit: props.onStudentEdition}}>
                    {
                        props.showStudents
                            ?
                            <ListStudentsComponent/>
                            :
                            null
                    }
                </StudentsContext.Provider>
                {
                    props.editStudent
                        ?
                        <EditAccount
                            path={"/api/teacher/modifyStudent"}
                            id={props.editStudentId}
                            token={auth.getToken()}
                            personEdition={true}/>
                        :
                        null
                }
                <ListSectionsComponent/>
            </div>
            <div className="col-md-1"></div>
        </div>
    </div>
);

export default TeacherPageElements;
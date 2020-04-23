import React, {Component} from 'react';
import PageNavbar from "../../components/UI/Layout/PageNavbar";
import AdminPageElements from "../../components/Pages/AdminPages/AdminPageElements/AdminPageElements";
import ListTeachers from "../Lists/ListTeachers";
import ListStudents from "../Lists/ListStudents";
import EditAccount from "../FormsPages/EditAccount/EditAccount";
import auth from "../../Auth";
import AddPerson from "../FormsPages/AddPerson/AddPerson";
import DeletePersonCard from "../../components/UI/DeletePersonCard/DeletePersonCard";

class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editPerson: false,
            editPersonId: '',
            modifyPath: '',
            personRole: '',
            deletePerson:'',
            personToDelete:'',
            deletedPerson: null,
            addPerson: false,
        };
    }

    editPersonHandler = (modifyPath, editPersonId, personRole) => {
       this.setState({
            editPerson: true,
            modifyPath: modifyPath,
            editPersonId: editPersonId,
            personRole: personRole,
            addPerson: false,
        })
    };

    deletePersonHandler=(personToDelete, personRole)=>{
        this.setState((prevState) => {
            return {
                deletePerson: !this.state.deletePerson,
                personToDelete: personToDelete,
                personRole: personRole,
            }
        });
    };

    personDeletedHandler=(personDeleted,personRole)=>{
        let role;
        if(personRole==='T') role='Teacher';
        if(personRole==='S') role='Student';
        const person= {
            role:role,
            person: {...personDeleted}
        };

        this.setState((prevState) => {
            return {
                deletePerson: !this.state.deletePerson,
                deletedPerson: person,
            }
        });
    };

    addPersonHandler=()=>{
        this.setState((prevState) => {
            return {
                editPerson: false,
                addPerson: true,
                deletedPerson: null,
            }
        });
    };

    render() {

        return (
            <React.Fragment>
                <PageNavbar/>
                <AdminPageElements
                deletePerson={this.state.deletePerson}
                personToDelete={this.state.personToDelete}
                deletePersonHandler={this.deletePersonHandler}
                personDeletedHandler={this.personDeletedHandler}
                addPersonHandler={this.addPersonHandler}
                editPersonHandler={this.editPersonHandler}
                personRole={this.state.personRole}
                modifyPath={this.state.modifyPath}
                editPersonId={this.state.editPersonId}
                deletedPerson = {this.state.deletedPerson}
      />

            </React.Fragment>
        );
    }
}

export default AdminPage;
import React, {Component} from 'react';
import PageNavbar from "../../components/Navigation/Navbar/Navbar";
import AdminPageElements from "../../components/Pages/AdminPages/AdminPageElements/AdminPageElements";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

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
            showSideDrawer: false
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
                deletePerson: !prevState.deletePerson,
                personToDelete: personToDelete,
                personRole: personRole,
            }
        });
    };

    personDeletedHandler=(personDeleted)=>{
        this.setState((prevState) => {
            return {
                deletePerson: !prevState.deletePerson,
                deletedPerson: personDeleted,
            }
        });
    };

    addPersonHandler=()=>{
        this.setState({
                editPerson: false,
                addPerson: true,
                deletedPerson: null,
        });
    };

    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        });
    };

    render() {
        return (
            <React.Fragment>
                <PageNavbar logoClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    clicked={this.sideDrawerToggleHandler}
                    show={this.state.showSideDrawer}
                    addPerson={this.addPersonHandler}/>

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
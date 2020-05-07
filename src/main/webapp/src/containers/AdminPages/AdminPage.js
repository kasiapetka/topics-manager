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
            personInfo: {
                role: '',
                id: null
            },
            deletePerson: '',
            personToDelete: '',
            deletedPerson: null,
            addPerson: false,
            showSideDrawer: false,
            deleted: false
        };
    }

    editPersonHandler = (modifyPath, editPersonId, personRole) => {
        this.setState({
            editPerson: true,
            modifyPath: modifyPath,
            personInfo: {
                role: personRole,
                id: editPersonId
            },
            addPerson: false,
        })
    };

    deletePersonHandler = (personToDelete, personRole) => {
        const id = personToDelete.id ? personToDelete.id : personToDelete.album;
        this.setState((prevState) => {
            return {
                deletePerson: !prevState.deletePerson,
                personToDelete: personToDelete,
                personInfo: {
                    id: id,
                    role: personRole,
                },
                deleted:false
            }
        });
    };

    cancelClickedDeletePersonHandler = ()=>{
        this.setState((prevState) => {
            return {deletePerson: !prevState.deletePerson,}
        });
    };

    deleteClickedPersonHandler=()=>{
        this.setState({deleted: true});
    };

    addPersonHandler = () => {
        this.setState({
            editPerson: false,
            addPerson: true,
            deletedPerson: null,
        });
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
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
                    cancelClickedDeletePersonHandler={this.cancelClickedDeletePersonHandler}
                    deleteClickedPersonHandler={this.deleteClickedPersonHandler}
                    addPersonHandler={this.addPersonHandler}
                    editPersonHandler={this.editPersonHandler}
                    personInfo={this.state.personInfo}
                    modifyPath={this.state.modifyPath}
                    deletedPerson={this.state.deletedPerson}
                    deleted={this.state.deleted}
                />
            </React.Fragment>
        );
    }
}

export default AdminPage;
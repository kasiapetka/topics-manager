import React, {Component, PureComponent} from 'react';
import auth from "../../Auth";
import axios from 'axios'
import ListStudentsComponent from "../../components/Lists/ListStudents/ListStudents";
import PersonsContext from "../../context/listPersonsContext";
import filterList from "../../components/Lists/FilterList";
import ListTeachersComponent from "../../components/Lists/ListTeachers/ListTeachers";
import EditAccount from "../FormsPages/EditAccount";
import DeletePersonModal from "../../components/UI/DeletePersonModal/DeletePersonModal";
import DeletePerson from "../FormsPages/DeletePerson";
import AdminAccountControls from "../../components/Pages/AdminPages/AdminPageLayout/AdminAccountControls";
import Messages from "../../components/Messages/Messages";
import PersonEditionContext from "../../context/personEdition";
import PageNavbar from "../../components/UI/Layout/PageNavbar";

class ListPersons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            personsFiltered: [],
            persons: [],
            search: '',
            condition: 'Email',
            editPerson: false,
            editPersonId: '',
            modifyPath: '',
            personRole: '',
            mounted: false
        };
    }

    componentDidMount() {
        console.log('componentDidMount')
        const request = {
            headers: {
                'Authorization': 'Bearer ' + auth.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        axios.get(this.props.path, request).then(async response => {
            if (response.status !== 200) {
                this.setState({error: true})
            } else {
                let teachers = [...response.data];
                this.setState({persons: teachers});
                this.setState({personsFiltered: teachers});
                console.log(this.state.persons)
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     let path;
    //     if (this.props.showStudents && prevProps.showStudents !== this.props.showStudents) {
    //         path = '/api/admin/students';
    //     }
    //     if (this.props.showTeachers && prevProps.showTeachers !== this.props.showTeachers) {
    //         path = '/api/admin/teachers';
    //     }
    //
    //     if (path) {
    //         const request = {
    //             headers: {
    //                 'Authorization': 'Bearer ' + auth.getToken(),
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //         };
    //
    //         axios.get(path, request).then(async response => {
    //             if (response.status !== 200) {
    //                 this.setState({error: true})
    //             } else {
    //                 let teachers = [...response.data];
    //                 this.setState({persons: teachers});
    //                 this.setState({personsFiltered: teachers});
    //                 console.log(this.state.persons)
    //             }
    //         })
    //             .catch(error => {
    //                 console.error('There was an error!', error);
    //             });
    //
    //     }
    // }


    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        let newList;

        newList = filterList(value, this.state.condition, this.state.persons);
        this.setState({
            personsFiltered: newList,
            search: value
        });
    };

    onPersonEdition = (index) => {
        const person = this.state.personsFiltered[index];
        let id, path, role;

        if (this.props.showStudents) {
            id = person.album;
            path = '/api/admin/modifyStudent';
            role = 'S';
        }
        if (this.props.showTeachers) {
            id = person.id;
            path = '/api/admin/modifyTeacher';
            role = 'T';
        }

        this.setState({
            editPersonId: id,
            editPerson: true,
            modifyPath: path,
            personRole: role
        });
    };

    onConditionChanged = (event) => {
        this.setState({
            condition: event.currentTarget.value,
            personsFiltered: this.state.persons,
            search: ''
        });
    };

    onPersonDeleteHandler = (index) => {
        this.setState((prevState) => {
            return {
                showModal: !this.state.showModal
            }
        });
    };

    render() {

        return (
            <React.Fragment>

                            <PersonsContext.Provider
                                value={{
                                    persons: this.state.personsFiltered,
                                    edit: this.onPersonEdition,
                                    change: this.handleChange,
                                    conditionChange: this.onConditionChanged,
                                    condition: this.state.condition,
                                    search: this.state.search,
                                    delete: this.onPersonDeleteHandler
                                }}>
                                <PersonEditionContext.Provider
                                    value={{
                                        personRole: this.state.personRole,
                                    }}>
                                    {
                                        this.props.showTeachers
                                            ?
                                            <ListTeachersComponent/>
                                            :
                                            null
                                    }
                                    {
                                        this.props.showStudents
                                            ?
                                            <ListStudentsComponent/>
                                            :
                                            null
                                    }
                                    {
                                        this.props.editPerson
                                            ?
                                            <EditAccount
                                                path={this.state.modifyPath}
                                                id={this.state.editPersonId}
                                                token={auth.getToken()}
                                                personEdition={true}
                                            />
                                            :
                                            null
                                    }
                                </PersonEditionContext.Provider>
                            </PersonsContext.Provider>

            </React.Fragment>
        );
    }
}

export default ListPersons;
import React, {Component, PureComponent} from 'react';
import auth from "../../Auth";
import axios from 'axios'
import ListStudentsComponent from "../../components/Lists/ListStudents/ListStudentsComponent";
import PersonsContext from "../../context/listPersonsContext";
import filterList from "../../components/Lists/FilterList";
import ListTeachersComponent from "../../components/Lists/ListTeachers/ListTeachersComponent";
import EditAccount from "../FormsPages/EditAccount";

class ListPersons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            personsFiltered: [],
            persons: [],
            students:[],
            teachers:[],
            search: '',
            condition: 'Email',
            editPerson: false,
            editPersonId: '',
        };
    }

    componentDidMount() {
        console.log('componentDidMount')
        const request = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + auth.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        axios('/api/admin/students',request).then(async response => {
            if (response.status !== 200) {
                this.setState({error: true})
            } else {
                let students = [...response.data];
                this.setState({students: students});
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
            });

        axios('/api/admin/teachers',request).then(async response => {
            if (response.status !== 200) {
                this.setState({error: true})
            } else {
                let teachers = [...response.data];
                this.setState({teachers: teachers});
                this.setState({persons: teachers});
                this.setState({personsFiltered: teachers});
                console.log(this.state.persons)
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('shouldComponentUpdate')
        if(nextProps.modifyPath !== this.props.modifyPath)
            return true;
        return false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate')
        if(this.props.showTeachers)
            this.setState({persons: this.state.teachers});
        if(this.props.showStudents)
            this.setState({persons: this.state.students});
    }

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
        let id;
        if (this.props.showStudents) {
            id = person.album;
        }
        if (this.props.showTeachers) {
            id = person.id;
        }

        this.setState({
            editPersonId: id,
            editPerson: true,
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
                            path={this.props.path}
                            id={this.state.editPersonId}
                            token={auth.getToken()}
                            personEdition={true}
                        />
                        :
                        null
                }
            </PersonsContext.Provider>

        );
    }
}

export default ListPersons;
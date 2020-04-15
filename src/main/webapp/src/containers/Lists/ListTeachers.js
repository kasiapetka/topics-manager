import React, {Component} from 'react'
import FilterPersonsList from "../../components/Lists/FilterPersonsList";
import Teachers from "../../components/Lists/ListTeachers/Teachers";
import classes from '../../components/Lists/ListTeachers/ListTeachers.module.css'
import auth from "../../Auth";
import axios from "axios";
import filterList from "../../components/Lists/FilterList";
import {Alert} from "reactstrap";
import PersonsContext from "../../context/listPersonsContext";

class ListTeachers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teachers: [],
            error: false,
            showTeachers: false,
            search: '',
            teachersFiltered: [],
            condition: 'Email',
            personRole: '',
            deletePerson: false,
            personToDelete: ''
        };
    }

    componentDidMount = () => {
        const request = {
            headers: {
                'Authorization': 'Bearer ' + auth.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };
        axios.get('/api/admin/teachers', request).then(response => {
            if (response.status !== 200) {
                this.setState({error: true})
            } else {
                let teachers = [...response.data];
                this.setState({teachers: teachers});
                this.setState({teachersFiltered: teachers});
            }
        })
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        let newList;
        newList = filterList(value, this.state.condition, this.state.teachers);
        this.setState({
            teachersFiltered: newList,
            search: value
        });
    };

    onTeachersEditHandler = (index) => {
        const person = this.state.teachersFiltered[index];
        this.props.editPerson("/api/admin/modifyTeacher", person.id, 'T');
    };

    onConditionChanged = (event) => {
        this.setState({
            condition: event.currentTarget.value,
            teachersFiltered: this.state.teachers,
            search: ''
        });
    };

    onTeachersDeleteHandler = (index) => {
        const person = this.state.teachersFiltered[index];
        this.props.deletePerson(person);
    };

    render() {
        const error = this.state.error;
        let list;

        if (error) {
            list = (
                <Alert color="danger">
                    Server Error, Please Try Again.
                </Alert>
            )
        } else if (this.state.teachers) {
            list = (
                <React.Fragment>
                    <PersonsContext.Provider
                        value={{
                            persons: this.state.teachersFiltered,
                            edit: this.onTeachersEditHandler,
                            change: this.handleChange,
                            conditionChange: this.onConditionChanged,
                            condition: this.state.condition,
                            search: this.state.search,
                            delete: this.onTeachersDeleteHandler,
                        }}>
                        <div className={classes.Teachers}>
                            <FilterPersonsList
                                list="T"/>
                            <Teachers/>
                        </div>
                    </PersonsContext.Provider>
                </React.Fragment>)
        } else {
            list = (<p>Loading...</p>)
        }
        return list;
    }
};

export default ListTeachers;
import React, {Component} from 'react'
import Students from "../../components/Lists/ListStudents/Students";
import classes from '../../components/Lists/ListStudents/ListStudents.module.css'
import FilterPersonsList from "../../components/Lists/FilterPersonsList";
import auth from "../../Auth";
import axios from "axios";
import filterList from "../../components/Lists/FilterList";
import PersonsContext from "../../context/listPersonsContext";
import {Alert} from "reactstrap";

class ListStudents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: [],
            error: false,
            showStudents: false,
            search: '',
            studentsFiltered: [],
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
        axios.get(this.props.path, request).then(response => {
            let students = [...response.data];
            this.setState({students: students});
            this.setState({studentsFiltered: students});
        }).catch(error => {
            this.setState({error: true})
        })
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        let newList;
        newList = filterList(value, this.state.condition, this.state.students);
        this.setState({
            studentsFiltered: newList,
            search: value
        });
    };

    onStudentEditHandler = (index) => {
        const person = this.state.studentsFiltered[index];
        this.props.editPerson("/api/admin/modifyStudent", person.album, 'S');
    };

    onConditionChanged = (event) => {
        this.setState({
            condition: event.currentTarget.value,
            studentsFiltered: this.state.students,
            search: ''
        });
    };

    onStudentDeleteHandler = (index) => {
        const person = this.state.studentsFiltered[index];
        this.props.deletePerson(person, 'S');
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
        } else if (this.state.students) {
            list = (
                <React.Fragment>
                    <PersonsContext.Provider
                        value={{
                            persons: this.state.studentsFiltered,
                            edit: this.onStudentEditHandler,
                            change: this.handleChange,
                            conditionChange: this.onConditionChanged,
                            condition: this.state.condition,
                            search: this.state.search,
                            delete: this.onStudentDeleteHandler,
                        }}>
                        <div className={classes.Students}>
                            <FilterPersonsList
                                list="S"/>
                            <Students/>
                        </div>
                    </PersonsContext.Provider>

                </React.Fragment>
            )
        } else {
            list = (<p>Loading...</p>)
        }

        return list;
    }
};

export default ListStudents;
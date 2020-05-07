import React, {Component} from 'react'
import Teachers from "../../components/Lists/ListTeachers/Teachers";
import axios from "axios";
import filterList from "../../components/Lists/FilterList";
import {Alert} from "reactstrap";
import PersonsContext from "../../context/listPersonsContext";
import Spinner from "../../components/UI/Spinner/Spinner";

class ListTeachers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teachers: [],
            error: null,
            showTeachers: false,
            search: '',
            teachersFiltered: [],
            condition: 'Email',
            personRole: '',
            deletePerson: false,
            personToDelete: '',
            addingToSubjectTopic: props.addingToSubjectTopic ? props.addingToSubjectTopic : null,
            loading: false,
            mounted: false
        };
    }

    componentDidMount = () => {
        this.setState({loading: true});
        axios.get('/api/admin/teachers').then(response => {
            let teachers = [...response.data];
            if (this.state.addingToSubjectTopic) {
                teachers.forEach(teacher => {
                    this.props.teachersInSubject.forEach(teacherInSubject => {
                        if (teacherInSubject.id === teacher.id) {
                            teacher.isInSubject = true;
                        } else if (teacher.isInSubject !== true) {
                            teacher.isInSubject = false;
                        }
                    });
                });
            }
            this.setState({
                teachers: teachers,
                teachersFiltered: teachers,
                loading: false,
                mounted: true
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false
            })
        })
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (!this.state.addingToSubjectTopic || !this.state.mounted) {
            return true;
        }

        if (this.props.teachersInSubject !== nextProps.teachersInSubject) {
            let teachers = [...nextState.teachers];
            teachers.forEach(teacher => {
                teacher.isInSubject = false;
            });

            teachers.forEach(teacher => {
                nextProps.teachersInSubject.forEach(teacherInSubject => {
                    if (teacherInSubject.id === teacher.id) {
                        teacher.isInSubject = true;
                    } else if (teacher.isInSubject !== true) {
                        teacher.isInSubject = false;
                    }
                });
            });

            this.setState({
                teachers: teachers,
                teachersFiltered: teachers,
            });
            return true;
        }
        return false;
    }

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
        this.props.editPerson("/api/admin/modifyteacher", person.id, 'T');
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
        console.log('onTeachersDeleteHandler');
        console.log(person);
        this.props.deletePerson(person, 'T');
    };

    render() {
        const error = this.state.error;
        let list;

        if (error) {
            list = (
                <Alert color="danger">
                    Server Error, Please Try Again.<br/>
                    {error.message}
                </Alert>
            )
        } else if (this.state.loading) {
            list = (<Spinner/>)
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
                        <Teachers
                            addToSubject={this.props.addToSubject}
                            removeFromSubject={this.props.removeFromSubject}
                            addingToSubjectTopic={this.state.addingToSubjectTopic}
                        />
                    </PersonsContext.Provider>
                </React.Fragment>)
        }
        return list;
    }
};

export default ListTeachers;
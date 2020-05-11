import React, {Component} from 'react'
import Students from "../../components/Lists/ListStudents/Students";
import axios from "axios";
import handleConditionChange from "../../components/Lists/FilterLists/FilterList";
import PersonsContext from "../../context/listPersonsContext";
import {Alert} from "reactstrap";
import Spinner from "../../components/UI/Spinner/Spinner";
import PickSemesterInput from "../../components/Lists/PickSemesterInput/PickSemesterInput";

class ListStudents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: [],
            error: null,
            search: '',
            studentsFiltered: [],
            condition: 'Email',
            personRole: '',
            deletePerson: false,
            personToDelete: '',
            semester: 1,
            loading: true,
            oversize: false,
            sectionCreation: this.props.addStudentToSection ? this.props.addStudentToSection : false,
            studentsAlreadyInSection: this.props.studentsInSection ? Array.from(this.props.studentsInSection) : false,
            studentsInSection: 0,
            editSectionMembers: false
        };
    }

    componentDidMount = () => {
        let sem = this.state.semester;
        if (this.props.sectionSemester) {
            sem = this.props.sectionSemester;
        }
        axios.get('/api/adminteacher/students/' + sem).then(response => {
                let students = [...response.data];
                let studentsInSection = 0, oversize = false;
                let editSectionMembers = false;

                if (this.state.studentsAlreadyInSection) {
                    editSectionMembers = true;
                    students.forEach(student=> student.isOnSem = true)

                    const studentsAlreadyInSection = [...this.state.studentsAlreadyInSection];
                    studentsAlreadyInSection.forEach(studentAlreadyInSection => {
                        students.forEach(student => {
                            if (studentAlreadyInSection.album === student.album) {
                                studentAlreadyInSection.isOnSem = true;
                            } else if (studentAlreadyInSection.isOnSem !== true) {
                                studentAlreadyInSection.isOnSem = false;
                            }
                        })
                    });
                    studentsAlreadyInSection.forEach(studentAlreadyInSection => {
                        if (studentAlreadyInSection.isOnSem !== true) {
                            students.push(studentAlreadyInSection);
                        }
                    });
                    students.forEach(student => {
                        studentsAlreadyInSection.forEach(studentAlreadyInSection => {
                            if (studentAlreadyInSection.album === student.album) {
                                student.isInSection = true;
                            } else if (student.isInSection !== true) {
                                student.isInSection = false;
                            }
                        })
                    });

                    studentsInSection = this.state.studentsAlreadyInSection.length;
                    if (studentsInSection === this.props.sectionSize) {
                        oversize = true;
                    }
                }
                this.setState({
                    students: students,
                    studentsFiltered: students,
                    loading: false,
                    studentsInSection: studentsInSection,
                    oversize: oversize,
                    editSectionMembers: editSectionMembers
                });
            }
        ).catch(error => {
            this.setState({
                error: error,
                loading: false
            })
        })
    }
    ;

    handleChange = (event) => {
        let content = handleConditionChange(event, this.state.condition,
            this.state.students);
        this.setState({
            studentsFiltered: content.newList,
            search: content.value
        });
    };

    onConditionChanged = (event) => {
        this.setState({
            condition: event.currentTarget.value,
            studentsFiltered: this.state.students,
            search: ''
        });
    };

    onSemesterChangeHandler = (event) => {
        this.setState({loading: true});
        const sem = event.target.value;
        this.setState({
            semester: sem,
        });
        axios.get('/api/adminteacher/students/' + sem).then(response => {
            let students = [...response.data];
            this.setState({
                students: students,
                studentsFiltered: students,
                loading: false
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false
            })
        })
    };

    onStudentEditHandler = (index) => {
        const student = this.state.studentsFiltered[index];
        this.props.editPerson("/api/admin/modifystudent", student.album, 'S');
    };

    onStudentDeleteHandler = (index) => {
        const student = this.state.studentsFiltered[index];
        this.props.deletePerson(student, 'S');
    };

    addToSectionHandler = (student) => {
        let size = this.state.studentsInSection;
        size = size + 1;
        if (size >= this.props.sectionSize) {
            this.setState({
                oversize: true,
            });
        }
        this.setState({studentsInSection: size});
        this.props.addToSection(student);
    };

    removeFromSectionHandler = (student) => {
        let size = this.state.studentsInSection;
        if (size >= this.props.sectionSize) {
            this.setState({
                oversize: false,
            });
        }
        size = size - 1;
        this.setState({studentsInSection: size});
        student.isInSection = false;
        this.props.removeFromSection(student);
    };

    render() {
        const error = this.state.error;
        let list, sem;
        if (!this.state.sectionCreation) {
            sem = <PickSemesterInput
                semester={this.state.semester}
                onSemesterChange={this.onSemesterChangeHandler}
            />
        }
        if (error) {
            list = (
                <Alert color="danger">
                    Server Error, Please Try Again.<br/>
                    {error.message}
                </Alert>
            )
        } else if (this.state.loading) {
            list = (<Spinner/>)
        } else if (this.state.students) {
            list = (
                <React.Fragment>
                    {sem}
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
                        <Students
                            editSectionMembers={this.state.editSectionMembers}
                            oversize={this.state.oversize}
                            addToSection={this.addToSectionHandler}
                            removeFromSection={this.removeFromSectionHandler}
                            sectionCreation={this.state.sectionCreation}/>

                    </PersonsContext.Provider>
                </React.Fragment>)
        }
        return list;
    }
}
;

export default ListStudents;
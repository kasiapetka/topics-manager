import React, {Component} from 'react'
import Students from "../../components/Lists/ListStudents/Students";
import axios from "axios";
import filterList from "../../components/Lists/FilterList";
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
            studentsInSection: 0
        };
    }

    componentDidMount = () => {
        let sem;

        if(this.props.sectionSemester){
            sem=this.props.sectionSemester;
        }
        else{
            sem= this.state.semester;
        }

        axios.get('/api/adminteacher/students/'+sem).then(response => {
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

    onConditionChanged = (event) => {
        this.setState({
            condition: event.currentTarget.value,
            studentsFiltered: this.state.students,
            search: ''
        });
    };

    onSemesterChangeHandler = (event) => {
        this.setState({loading: true});
        const id = event.target.value;

        console.log(id)
        this.setState({
            semester: id,
        });

        axios.get('/api/adminteacher/students/' + id).then(response => {
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
        this.setState((prevState) => {
            return {
                studentsInSection: size
            }
        });
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
        this.setState((prevState) => {
            return {
                studentsInSection: size
            }
        });
        this.props.removeFromSection(student);
    };

    render() {
        const error = this.state.error;
        let list, sem;
        if(!this.state.sectionCreation){
            sem=<PickSemesterInput
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
                            oversize={this.state.oversize}
                            addToSection={this.addToSectionHandler}
                            removeFromSection={this.removeFromSectionHandler}
                            sectionCreation={this.state.sectionCreation}/>

                </PersonsContext.Provider>
        </React.Fragment>)
        }
        return list;
    }
};

export default ListStudents;
import React, {Component} from 'react'
import Students from "../../components/Lists/ListStudents/Students";
import classes from '../../components/Lists/ListStudents/ListStudents.module.css'
import FilterPersonsList from "../../components/Lists/FilterPersonsList";
import auth from "../../Auth";
import axios from "axios";
import filterList from "../../components/Lists/FilterList";
import PersonsContext from "../../context/listPersonsContext";
import {Alert} from "reactstrap";
import Spinner from "../../components/UI/Spinner/Spinner";

class ListStudents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: [],
            error: false,
            search: '',
            studentsFiltered: [],
            condition: 'Email',
            personRole: '',
            deletePerson: false,
            personToDelete: '',
            loading: true,
            addStudentsToSection: this.props.addStudentToSection ? this.props.addStudentToSection : false,
            studentsInSection:0
        };
    }

    componentDidMount = () => {

        axios.get(this.props.path).then(response => {
            let students = [...response.data];
            this.setState({
                students: students,
                studentsFiltered: students,
                loading: false
            });
        }).catch(error => {
            this.setState({
                error: true,
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

    onStudentEditHandler = (index) => {
        const student = this.state.studentsFiltered[index];
        this.props.editPerson("/api/admin/modifystudent", student.album, 'S');
    };

    onStudentDeleteHandler = (index) => {
        const student = this.state.studentsFiltered[index];
        this.props.deletePerson(student, 'S');
    };

    addToSectionHandler = (index) =>{
        const student = this.state.studentsFiltered[index];
        let size =  this.state.studentsInSection;
        size = size +1;
        if(size >= this.props.sectionSize){
            this.setState({
                addStudentsToSection: false,
            });
        }

        this.setState((prevState)=> {
            return{
                studentsInSection: size
            }
        });
        this.props.addToSection(student);
    };

    removeFromSectionHandler=(index)=>
    {
        const student = this.state.studentsFiltered[index];
        let size =  this.state.studentsInSection;
        if(size >= this.props.sectionSize){
            this.setState({
                addStudentsToSection: true,
            });
        }
        size = size -1;

        this.setState((prevState)=> {
            return{
                studentsInSection: size
            }
        });
        this.props.removeFromSection(student);
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
        } else if(this.state.loading){
            list = (<Spinner/>)
        }else if (this.state.students) {
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
                            addStudentsToSection: this.state.addStudentsToSection,
                            addToSection: this.addToSectionHandler,
                            removeFromSection: this.removeFromSectionHandler,
                        }}>
                        <div className={classes.Students}>
                            <FilterPersonsList
                                list="S"/>
                            <Students/>
                        </div>
                    </PersonsContext.Provider>

                </React.Fragment>
            )
        }
        return list;
    }
};

export default ListStudents;
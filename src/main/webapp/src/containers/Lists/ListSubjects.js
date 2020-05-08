import React, {Component} from 'react'
import axios from "axios";
import {Alert} from "reactstrap";
import Spinner from "../../components/UI/Spinner/Spinner";
import Subjects from "../../components/Lists/ListSubjects/Subjects";
import auth from "../../Auth";
import handleConditionChange from "../../components/Lists/FilterLists/FilterList";
import FilterSubjectsList from "../../components/Lists/FilterLists/FilterSubjectsList";

class ListSubjects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            subjectsFiltered: [],
            condition: 'Name',
            search:'',
            error: null,
            loading: true,
            role: auth.getRole()
        };
    }

    componentDidMount = () => {
        let path;
        if(this.state.role === 'A') path='/api/admin/subjects';
        if(this.state.role === 'T') path='/api/teacher/subjects/'+auth.getId();

        axios.get(path).then(response => {
            let subjects = [...response.data];
            this.setState({
                subjects: subjects,
                subjectsFiltered: subjects,
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
        let content = handleConditionChange(event, this.state.condition,
            this.state.subjects);
        this.setState({
            subjectsFiltered: content.newList,
            search: content.value
        });
    };

    onConditionChanged = (event) => {
        this.setState({
            condition: event.currentTarget.value,
            subjectsFiltered: this.state.subjects,
            search: ''
        });
    };

    // onSubjectEditHandler = (index) => {
    //     const student = this.state.studentsFiltered[index];
    //     this.props.editPerson("/api/admin/modifystudent", student.album, 'S');
    // };
    //
    // onSubjectDeleteHandler = (index) => {
    //     const student = this.state.studentsFiltered[index];
    //     this.props.deletePerson(student, 'S');
    // };

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
        } else if(this.state.loading){
            list = (<Spinner/>)
        }else if (this.state.subjects) {
            list = (
                <React.Fragment>
                    <FilterSubjectsList
                        condition={this.state.condition}
                        search={this.state.search}
                        change={this.handleChange}
                        conditionChange={this.onConditionChanged}
                    />
                <Subjects
                    subjects={this.state.subjectsFiltered}/>
                </React.Fragment>
            )
        }
        return list;
    }
};

export default ListSubjects;
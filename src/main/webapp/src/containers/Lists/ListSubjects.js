import React, {Component} from 'react'
import axios from "axios";
import {Alert} from "reactstrap";
import Spinner from "../../components/UI/Spinner/Spinner";
import Subjects from "../../components/Lists/ListSubjects/Subjects";
import auth from "../../Auth";

class ListSubjects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
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
                loading: false
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false
            })
        })
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
                <Subjects
                    subjects={this.state.subjects}/>
                </React.Fragment>
            )
        }
        return list;
    }
};

export default ListSubjects;
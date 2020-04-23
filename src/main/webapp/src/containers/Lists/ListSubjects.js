import React, {Component} from 'react'
import axios from "axios";
import {Alert} from "reactstrap";
import Spinner from "../../components/UI/Spinner/Spinner";
import Subjects from "../../components/Lists/ListSubjects/Subjects";

class ListSubjects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            error: false,
            loading: true,
        };
    }

    componentDidMount = () => {

        axios.get('/api/adminteacher/subjects').then(response => {
            let subjects = [...response.data];
            this.setState({
                subjects: subjects,
                loading: false
            });
        }).catch(error => {
            this.setState({
                error: true,
                loading: false
            })
        })
    };

    //
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
                    Server Error, Please Try Again.
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
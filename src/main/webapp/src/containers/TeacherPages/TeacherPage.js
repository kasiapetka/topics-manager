import React, {Component} from 'react';
import PageNavbar from "../../components/UI/Layout/PageNavbar";
import {Alert} from "reactstrap";
import TeacherPageElements from "../../components/Pages/TeacherPages/TeacherPageLayout/TeacherPageElements";
import axios from 'axios'


class TeacherPage extends Component {
    state = {
        teacher: '',
        error: false,
        modifyPath: '',
        personRole: '',
        deletePerson: '',
        personToDelete: ''
    };


    componentDidMount() {
        axios.get('/api/teacher/info').then(response => {
            let student = {...response.data};
            this.setState({teacher: student})
        })
            .catch(error => {
                this.setState({error: true})
            });

    }

    render() {

        if (this.state.error) {
            return (
                <Alert color="danger">
                    Server Error, Please Try Again.
                </Alert>
            )
        }

        return (
            <React.Fragment>
                <PageNavbar/>

                <TeacherPageElements
                    teacher={this.state.teacher}
                />

            </React.Fragment>
        );
    }
};

export default TeacherPage;
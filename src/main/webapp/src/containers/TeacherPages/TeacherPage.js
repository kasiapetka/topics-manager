import React, {Component} from 'react';
import PageNavbar from "../../components/UI/Layout/PageNavbar";
import {Alert} from "reactstrap";
import TeacherPageElements from "../../components/Pages/TeacherPages/TeacherPageLayout/TeacherPageElements";
import axios from 'axios'
import ListStudents from "../Lists/ListStudents";


class TeacherPage extends Component {
    state = {
        teacher: '',
        error: false,
        showStudents: true,
        editPerson: false,
        editPersonId: '',
        modifyPath: '',
        personRole: '',
        deletePerson:'',
        personToDelete:''
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

    toggleStudents = () => {
        this.setState((prevState) => {
            return {
                showStudents: !this.state.showStudents,
                editPerson: false,
            }
        });
    };



    render() {
        let showStudents = this.state.showStudents;
        if (this.state.error) {
            return (
                <Alert color="danger">
                    Server Error, Please Try Again.
                </Alert>
            )
        }
        let content;
        if(showStudents){
            content=( <ListStudents
                editPerson={this.editPersonHandler}
                deletePerson={this.deletePersonHandler}
                path='/api/admin/students'/>)
        }

        return (
            <React.Fragment>
                <PageNavbar/>

                    {
                        <TeacherPageElements
                            teacher={this.state.teacher}
                            toggleStudents={this.toggleStudents}
                            showStudents={this.state.showStudents}
                            content={content}
                        />
                    }

            </React.Fragment>
        );
    }
};

export default TeacherPage;
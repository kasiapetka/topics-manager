import React, {Component} from 'react';
import PageNavbar from "../../components/UI/Layout/PageNavbar";
import {Alert} from "reactstrap";
import auth from "../../Auth";
import TeacherPageElements from "../../components/Pages/TeacherPages/TeacherPageLayout/TeacherPageElements";
import StudentsContext from "../../context/listStudentsContext";
import filterList from "../../components/Lists/FilterList";
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

        const request = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + auth.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        axios.get('/api/teacher/info', request).then(response => {
            if (response.status !== 200) {
                this.setState({error: true})
            } else {
                let student = {...response.data};
                this.setState({teacher: student})
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
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
                            students={this.state.students}
                            showStudents={this.state.showStudents}
                            content={content}
                        />
                    }

            </React.Fragment>
        );
    }
};

export default TeacherPage;
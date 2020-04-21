import React, {Component} from 'react';
import PageNavbar from "../../components/UI/Layout/PageNavbar";
import {Alert} from "reactstrap";
import TeacherPageElements from "../../components/Pages/TeacherPages/TeacherPageLayout/TeacherPageElements";
import axios from 'axios'
import ListStudents from "../Lists/ListStudents";
import AddSection from "../FormsPages/AddSection/AddSection";

class TeacherPage extends Component {
    state = {
        teacher: '',
        error: false,
        showStudents: true,
        addSection: false,
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
                addSection: false,
            }
        });
    };

    toggleAddSection=()=>{
        this.setState((prevState) => {
            return {
                showStudents: false,
                addSection: !this.state.addSection,
            }
        });
    };

    render() {
        let showStudents = this.state.showStudents;
        let showAddSection = this.state.addSection;

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
                path='/api/teacher/students'/>)
        }
        if(showAddSection){
            content=( <AddSection/>)
        }

        return (
            <React.Fragment>
                <PageNavbar/>

                    {
                        <TeacherPageElements
                            teacher={this.state.teacher}
                            toggleStudents={this.toggleStudents}
                            toggleAddSection={this.toggleAddSection}
                            showStudents={this.state.showStudents}
                            content={content}
                        />
                    }

            </React.Fragment>
        );
    }
};

export default TeacherPage;
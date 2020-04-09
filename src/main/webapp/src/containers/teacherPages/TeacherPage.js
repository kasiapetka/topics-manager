import React,{Component} from 'react';
import PageNavbar from "../../components/layoutComponents/PageNavbar";
import {Alert} from "reactstrap";
import auth from "../../Auth";
import TeacherPageElements from "../../components/pages/teacherPages/teacherPageLayout/TeacherPageElements";


class TeacherPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            teacher: '',
            error: false,
            students: [],
            editStudent: false,
            editStudentId:'',
            showStudents: true,
        };
    }

    componentDidMount() {

        const request = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + auth.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        fetch('/api/teacher/info', request).then(async response => {
            const data = await response.json();
            if (response.status !== 200) {
                this.setState({error:true})
            } else {
                let student = {...data};
                this.setState({teacher: student})
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
            });

        fetch('/api/teacher/students', request).then(async response => {
            const data = await response.json();
            if (response.status !== 200) {
                this.setState({error: true})
            } else {
                let students = [...data];
                this.setState({students: students});
                this.setState({students: students});
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    toggleStudents = () => {
        this.setState((prevState)=>{
            return {
                showStudents: !this.state.showStudents,
                editStudent: false
            }
        });
    };

    onStudentEdition = (index) => {
        const student = this.state.students[index];
        console.log(" id "+ index)

        this.setState({
            editStudent: true,
            editStudentId: student.album,
            showStudents: false
        });

    };

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
                    toggleStudents={this.toggleStudents}
                    students={this.state.students}
                    showStudents={this.state.showStudents}
                    editStudent={this.state.editStudent}
                    editStudentId={this.state.editStudentId}
                    onStudentEdition={this.onStudentEdition}/>

            </React.Fragment>
        );
    }
};

export default TeacherPage;
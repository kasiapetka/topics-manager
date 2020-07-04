import React, {Component} from 'react';
import PageNavbar from "../Navbar/Navbar";
import StudentPageElements from "../../components/Pages/StudentPages/StudentPageElements/StudentPageElements";
import {Alert} from "reactstrap";
import axios from 'axios'
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import auth from "../../Auth";

class StudentPage extends Component {


    state = {
        student: '',
        error: null
    };

    componentDidMount() {

        axios.get('/api/student/info').then(response => {
                let student = {...response.data};
                auth.saveId(student.album);
                this.setState({student: student})
        })
            .catch(error => {
                this.setState({error: error})
            });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        });
    };

    render() {

        if (this.state.error) {
            return (
                <Alert color="danger">
                    Server Error, Please Try Again.<br/>
                    {this.state.error.message}
                </Alert>
            )
        }

        return (
            <React.Fragment>
                <PageNavbar logoClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    clicked={this.sideDrawerToggleHandler}
                    show={this.state.showSideDrawer}
                    addPerson={this.addPersonHandler}/>

                    <StudentPageElements
                    student={this.state.student}/>

            </React.Fragment>
        );
    }
}

export default StudentPage;
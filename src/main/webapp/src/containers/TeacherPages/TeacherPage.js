import React, {Component} from 'react';
import PageNavbar from "../../components/Navigation/Navbar/Navbar";
import {Alert} from "reactstrap";
import TeacherPageElements from "../../components/Pages/TeacherPages/TeacherPageElements/TeacherPageElements";
import axios from 'axios'
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import auth from "../../Auth";

class TeacherPage extends Component {
    state = {
        teacher: '',
        error: null,
        modifyPath: '',
        personRole: '',
        deletePerson: '',
        personToDelete: '',
        showSideDrawer: false,
    };

    componentDidMount() {
        axios.get('/api/teacher/info').then(response => {
            let teacher = {...response.data};
            auth.saveId(teacher.id);
            this.setState({teacher: teacher})
        })
            .catch(error => {
                this.setState({error: error})
            });

    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !this.state.showSideDrawer
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
                <TeacherPageElements
                    teacher={this.state.teacher}/>

            </React.Fragment>
        );
    }
};

export default TeacherPage;
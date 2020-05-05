import React, {Component} from 'react';
import PageNavbar from "../../components/Navigation/Navbar/Navbar";
import AccountDetailsCard from "../../components/UI/Cards/AccountDetailsCard/AccountDetailsCard";
import {Alert} from "reactstrap";
import ListStudentSections from "../Lists/ListStudentSections";
import Messages from "../../components/Messages/Messages";
import axios from 'axios'
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class StudentPage extends Component {


    state = {
        student: '',
        error: null
    };

    componentDidMount() {

        axios.get('/api/student/info').then(response => {
                let student = {...response.data};
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

                <div className="container-fluid h-100 mt-5">
                    <div className="row h-100">
                        <div className="col-md-3">
                            <AccountDetailsCard
                                person={this.state.student}/>
                            <Messages/>
                        </div>
                        <div className="col-md-8 border-right">
                            <ListStudentSections/>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default StudentPage;
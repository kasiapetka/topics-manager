import React,{Component} from 'react';
import PageNavbar from "../../components/PageNavbar";
import AccountDetailsCard from "../../components/AccountDetailsCard";
import {Alert} from "reactstrap";
import auth from "../../Auth";

class TeacherPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            teacher: '',
            error: false
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
    }

    render() {

        if(this.state.error){
            return (
                <Alert color="danger">
                    Server Error, Please Try Again.
                </Alert>
            )
        }
        return (
            <div>
                <PageNavbar/>
                <AccountDetailsCard
                    person={this.state.teacher}/>
            </div>
        );
    }
};

export default TeacherPage;
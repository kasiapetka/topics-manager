import React, {Component} from 'react';
import axios from 'axios'
import DeletePersonCard from "../../components/UI/DeletePersonCard/DeletePersonCard";
import {Alert} from "reactstrap";

class DeletePerson extends Component {

    state={
        error: false
    };

    personDeleteHandler=()=>{
        let id,path;

        if(this.props.personRole==='S'){
            id=this.props.person.album;
            path='/api/admin/deleteStudent';
        }
        else if(this.props.personRole==='T'){
            id=this.props.person.id;
            path='/api/admin/deleteTeacher';
        }

        axios.put(path,id).then(response => {
                alert('udao sie')
        })
            .catch(error => {
                this.setState({error: true});
            });
    };

    render() {
        const error = this.state.error;
        if(error){
            return(
                <Alert color="danger">
                    Server Error, Please Try Again.
                </Alert>
            )
        }

        return (
            <DeletePersonCard
                person={this.props.person}
                cancel={this.props.cancelClicked}
                delete={this.personDeleteHandler}/>
        );
    }
}

export default DeletePerson;
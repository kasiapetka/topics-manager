import React, {Component} from 'react';
import axios from 'axios'
import DeletePersonCard from "../../../../components/UI/Cards/PersonCards/DeletePersonCard/DeletePersonCard";
import {Alert} from "reactstrap";

class DeletePerson extends Component {

    state={
        error: false
    };

    personDeleteHandler=()=>{
        let id,path;

        if(this.props.personRole==='S'){
            id=this.props.person.album;
            path='/api/admin/deletestudent';
        }
        else if(this.props.personRole==='T'){
            id=this.props.person.id;
            path='/api/admin/deleteteacher';
        }

        axios.put(path,id).then(response => {
        })
            .catch(error => {
                this.setState({error: true});
            });

        this.props.cancelClicked();
        this.props.deleteClicked(this.props.person);
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
                deleted={false}
                person={this.props.person}
                cancel={this.props.cancelClicked}
                delete={this.personDeleteHandler}/>
        );
    }
}

export default DeletePerson;
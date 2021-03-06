import React, {Component} from 'react';
import axios from 'axios'
import DeletePersonCard from "../../../../components/UI/Cards/PersonCards/DeletePersonCard/DeletePersonCard";
import {Alert} from "reactstrap";

class DeletePerson extends Component {

    state = {
        error: null,
        deleted: this.props.deleted
    };

    personDeleteHandler = () => {
        let id, path;
        if (this.props.personInfo.role === 'S') {
            id = this.props.personInfo.id;
            path = '/api/admin/deletestudent';
        }
        if (this.props.personInfo.role === 'T') {
            id = this.props.personInfo.id;
            path = '/api/admin/deleteteacher';
        }

         axios.put(path,JSON.stringify(id)).then(response => {
             this.props.deleteClicked();
         })
             .catch(error => {
                 this.setState({error: error});
            });
    };

    render() {
        const error = this.state.error;
        if (error) {
            return <Alert color="danger">
                    Server Error, Please Try Again. <br/>
                    {error.message}
                </Alert>
        }

        return (
            <DeletePersonCard
                deleted={this.props.deleted}
                person={this.props.person}
                cancel={this.props.cancelClicked}
                delete={this.personDeleteHandler}/>
        );
    }
}

export default DeletePerson;
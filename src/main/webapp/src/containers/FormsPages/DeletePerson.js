import React, {Component} from 'react';
import axios from 'axios'
import DeletePersonCard from "../../components/UI/DeletePersonCard/DeletePersonCard";

class DeletePerson extends Component {
    render() {
        return (
            <DeletePersonCard
                person={this.props.person}
                cancel={this.props.cancelClicked}/>
        );
    }
}

export default DeletePerson;
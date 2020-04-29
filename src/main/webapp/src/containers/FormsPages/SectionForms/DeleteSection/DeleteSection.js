import React, {Component} from 'react';
import axios from 'axios'
import DeleteSectionCard from "../../../../components/UI/Cards/SectionCards/DeleteSectionCard/DeleteSectionCard";
import {Alert} from "reactstrap";

class DeleteSection extends Component {

    state = {
        error: false
    };

    sectionDeleteHandler = () => {
        let id, path;
        id = this.props.section.id;
        path = '/api/adminteacher/deletesection';

        axios.put(path, id).then(response => {
        })
            .catch(error => {
                this.setState({error: true});
            });

        this.props.cancelClicked();
        this.props.deleteClicked(this.props.section);
    };

    render() {
        const error = this.state.error;
        if (error) {
            return (
                <Alert color="danger">
                    Server Error, Please Try Again.
                </Alert>
            )
        }

        return (
            <React.Fragment>
                <DeleteSectionCard
                    deleted={false}
                    section={this.props.section}
                    cancel={this.props.cancelClicked}
                    delete={this.sectionDeleteHandler}/>
            </React.Fragment>
        );
    }
}

export default DeleteSection;
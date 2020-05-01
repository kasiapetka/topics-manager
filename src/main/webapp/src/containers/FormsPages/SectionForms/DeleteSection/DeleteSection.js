import React, {Component} from 'react';
import axios from 'axios'
import DeleteSectionCard from "../../../../components/UI/Cards/SectionCards/DeleteSectionCard/DeleteSectionCard";
import {Alert} from "reactstrap";
import {withRouter} from "react-router-dom";

class DeleteSection extends Component {

    state = {
        error: false
    };

    sectionDeleteHandler = () => {
        let id, path;
        id = this.props.section.id;
        path = '/api/adminteacher/deletesection';

        // axios.put(path, id).then(response => {
            this.props.cancelClicked();
            this.props.deleteClicked(this.props.section);
            this.props.history.push(this.props.match.path + '/deletedsection')
        // })
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
        //
        //this.props.deleteClicked(this.props.section);
    };

    render() {
        const error = this.state.error;
        let content;
        if (error) {
            content= (
                <Alert color="danger">
                    Server Error, Please Try Again.
                </Alert>
            )
        } else{
            content= ( <DeleteSectionCard
                deleted={false}
                section={this.props.section}
                cancel={this.props.cancelClicked}
                delete={this.sectionDeleteHandler}/>)
        }

        return content;
    }
}

export default DeleteSection;
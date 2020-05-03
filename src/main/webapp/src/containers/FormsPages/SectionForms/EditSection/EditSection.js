import React, {Component} from "react";
import EditSectionForm from "../../../../components/Forms/FormsTemplates/SectionForms/EditSectionForm/EditSectionForm";
import auth from "../../../../Auth";
import {Redirect} from "react-router-dom";


class EditSection extends Component {

    render() {
        let path;
        if(auth.getRole() === 'A') path='/admin';
        if(auth.getRole() === 'T') path='/teacher';

        if(!this.props.section){
            return <Redirect to={path+'/sections'}/>
        }

        return (
            <EditSectionForm section={this.props.section}/>
    );
    }
}

export default EditSection;
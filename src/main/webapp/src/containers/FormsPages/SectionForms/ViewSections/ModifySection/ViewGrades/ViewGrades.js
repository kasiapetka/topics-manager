import React, {Component} from "react";
import {Alert} from "reactstrap";
import ViewGradesForm
    from "../../../../../../components/Forms/FormsTemplates/SectionForms/ModifySectionForm/ViewGradesForm/ViewGradesForm";

class ViewGrades extends Component {
    state = {
        section: this.props.section,
        students: this.props.students,
        date:this.props.date,
        issued: false,
        error: null
    };

    render() {
        const error = this.state.error;
        let content;
        if (error) {
            content = (
                <Alert color="danger">
                    Server Error, Please Try Again.<br/>
                    {error.message}
                </Alert>
            )
        } else {
            content = <ViewGradesForm
                date={this.state.date}
                students={this.state.students}
            />
        }
        return content;
    };
};

export default ViewGrades;
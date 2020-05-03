import React, {Component} from 'react'
import Modal from "../../components/UI/Modal/Modal";
import DeleteSection from "../FormsPages/SectionForms/DeleteSection/DeleteSection";
import PrivateAdminRoute from "../../components/PrivateRoutes/PrivateAdminRoute";
import DeleteSectionCard from "../../components/UI/Cards/SectionCards/DeleteSectionCard/DeleteSectionCard";
import PrivateTeacherRoute from "../../components/PrivateRoutes/PrivateTeacherRoute";
import {withRouter} from "react-router-dom";
import EditSection from "../FormsPages/SectionForms/EditSection/EditSection";
import ModifySection from "../FormsPages/SectionForms/ViewSections/ModifySection/ModifySection";
import ViewSections from "../FormsPages/SectionForms/ViewSections/ViewSections";

class ListSections extends Component {
    state = {
        semester: 1,
        sectionDelete: false,
        deletedSection: null,
        deletedSectionPage: false,
    };


    onSectionEditHandler = (section) => {
        this.props.history.push(this.props.match.path + '/editsection/'+section.id);
    };

    onSectionModifyHandler = (section) => {
        this.props.history.push({
            pathname: this.props.match.path + '/modifysection/'+section.id,
        });
    };

    onSectionDeleteHandler = (section) => {
        this.setState((prev) => {
            return {
                sectionDelete: !this.state.sectionDelete,
                section: section,
            };
        })
    };

    showDeleteModalHandler = () => {
        this.setState((prevState) => {
            return {
                sectionDelete: !this.state.sectionDelete,
            }
        });
    };

    sectionDeletedHandler = (section) => {
        this.setState({
            section: section,
        });
        this.props.history.push('/deletedsection')
    };


    render() {
        const sectionDelete = this.state.sectionDelete;
        let deleteModal;

        if (sectionDelete) {
            deleteModal = (<Modal
                show={sectionDelete}
                modalClosed={this.showDeleteModalHandler}>
                <DeleteSection
                    section={this.state.section}
                    cancelClicked={this.showDeleteModalHandler}
                    deleteClicked={this.sectionDeletedHandler}
                    {...this.props}
                />
            </Modal>)
        }
        return (
            <React.Fragment>
                {deleteModal}
                <PrivateAdminRoute exact path="/admin/sections/deletedsection" component={() => <DeleteSectionCard
                    deleted={true}
                    section={this.state.section}
                    {...this.props}/>}/>

                <PrivateAdminRoute exact path="/admin/sections/editsection/:id" component={EditSection}/>

                <PrivateAdminRoute path="/admin/sections/modifysection/:id" component={ModifySection}/>

                <PrivateTeacherRoute exact path="/teacher/sections/deletedsection" component={() => <DeleteSectionCard
                    deleted={true}
                    section={this.state.section}
                    {...this.props}/>}/>

                <PrivateTeacherRoute exact path="/teacher/sections/editsection/:id" component={EditSection}/>

                <PrivateTeacherRoute path="/teacher/sections/modifysection/:id" component={ModifySection}/>

                <PrivateAdminRoute exact path="/admin/sections" component={() =><ViewSections
                        delete={this.onSectionDeleteHandler}
                        edit={this.onSectionEditHandler}
                        modify={this.onSectionModifyHandler}
                    />
                }/>
                <PrivateTeacherRoute exact path="/teacher/sections" component={() =><ViewSections
                    delete={this.onSectionDeleteHandler}
                    edit={this.onSectionEditHandler}
                    modify={this.onSectionModifyHandler}
                />
                }/>
            </React.Fragment>
        );
    }
};

export default withRouter(ListSections);
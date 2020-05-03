import React, {Component} from 'react'
import axios from "axios";
import {Alert} from "reactstrap";
import Spinner from "../../components/UI/Spinner/Spinner";
import Sections from "../../components/Lists/ListSections/Sections";
import PickSemesterInput from "../../components/Lists/PickSemesterInput/PickSemesterInput";
import Modal from "../../components/UI/Modal/Modal";
import DeleteSection from "../FormsPages/SectionForms/DeleteSection/DeleteSection";
import PrivateAdminRoute from "../../components/PrivateRoutes/PrivateAdminRoute";
import DeleteSectionCard from "../../components/UI/Cards/SectionCards/DeleteSectionCard/DeleteSectionCard";
import PrivateTeacherRoute from "../../components/PrivateRoutes/PrivateTeacherRoute";
import {withRouter} from "react-router-dom";
import EditSection from "../FormsPages/SectionForms/EditSection/EditSection";
import ModifySection from "../FormsPages/SectionForms/ModifySection/ModifySection";

class ListSections extends Component {
    state = {
        error: null,
        sections: [],
        loading: true,
        semester: 1,
        sectionDelete: false,
        section: null,
        deletedSection: null,
        deletedSectionPage: false
    };

    componentDidMount() {
        axios.get('/api/adminteacher/sections/' + this.state.semester).then(response => {
            let sections = [...response.data];

            console.log(sections)
            this.setState({
                sections: sections,
                loading: false,
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false,
            })
        })
    }

    onSemesterChangeHandler = (event) => {
        this.setState({loading: true});
        const id = event.target.value;

        this.setState({
            semester: id,
        });

        axios.get('/api/adminteacher/sections/' + id).then(response => {
            let sections = [...response.data];
            this.setState({
                sections: sections,
                loading: false
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false
            })
        })
    };

    onSectionEditHandler = (index) => {
        const section = this.state.sections[index];
        this.setState({
            section:section
        });

       this.props.history.push(this.props.match.path + '/editsection');
    };

    onSectionModifyHandler = (index) => {
        const section = this.state.sections[index];
        this.setState({
            section:section
        });

        this.props.history.push(this.props.match.path + '/modifysection');
    };

    onSectionDeleteHandler = (index) => {
        const section = this.state.sections[index];

        console.log(section)
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
        axios.get('/api/adminteacher/sections/' + this.state.semester).then(response => {
            let sections = [...response.data];

            this.setState({
                sections: sections,
                section: section,
                loading: false,
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false,
            })
        })
    };


    render() {
        const error = this.state.error;
        const loading = this.state.loading;
        const sectionDelete = this.state.sectionDelete;
        let content, deleteModal;
        if (error) {
            return (
                <Alert color="danger">
                    Server Error, Please Try Again.<br/>
                    {error.message}
                </Alert>
            )
        } else if (loading) {
            content = <Spinner/>
        } else {
            content = <React.Fragment>
                <PickSemesterInput
                    semester={this.state.semester}
                    onSemesterChange={this.onSemesterChangeHandler}/>
                <Sections
                    sections={this.state.sections}
                    delete={this.onSectionDeleteHandler}
                    edit={this.onSectionEditHandler}
                    modify={this.onSectionModifyHandler}
                />
            </React.Fragment>
        }
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

                <PrivateAdminRoute exact path="/admin/sections/editsection" component={() => <EditSection
                    section={this.state.section}
                    {...this.props}/>}/>

                <PrivateAdminRoute exact path="/admin/sections/modifysection" component={() => <ModifySection
                    section={this.state.section}
                    {...this.props}/>}/>

                <PrivateTeacherRoute exact path="/teacher/sections/deletedsection" component={() => <DeleteSectionCard
                    deleted={true}
                    section={this.state.section}
                    {...this.props}/>}/>

                <PrivateTeacherRoute exact path="/teacher/sections/editsection" component={() => <EditSection
                    section={this.state.section}
                    {...this.props}/>}/>

                <PrivateTeacherRoute exact path="/teacher/sections/modifysection" component={() => <ModifySection
                    section={this.state.section}
                    {...this.props}/>}/>

                <PrivateAdminRoute exact path="/admin/sections" component={() =>
                    <React.Fragment>
                        {content}
                    </React.Fragment>
                }/>
                <PrivateTeacherRoute exact path="/teacher/sections" component={() =>
                    <React.Fragment>
                        {content}
                    </React.Fragment>
                }/>
            </React.Fragment>
        );
    }
};

export default withRouter(ListSections);
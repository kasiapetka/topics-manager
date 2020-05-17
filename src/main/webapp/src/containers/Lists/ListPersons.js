import React, {Component} from 'react';
import axios from 'axios';
import MultiSelect from "../../components/Messages/MultiSelect/MultiSelect";

class ListPersons extends Component {

    state = {
        error: null,
        loading: false,
        persons: null,
        mounted: false,
    };

    getPersons = () => {
        this.setState({loading: true});
        axios.get(this.props.path).then(response => {
            let persons = [...response.data];
            const receivers = this.props.receivers;
            persons.forEach(person => {
                receivers.forEach(rcv => {
                    if (person.user) {
                        if (person.user.email === rcv) {
                            person.checked = true;
                        } else if (person.checked !== true) {
                            person.checked = false;
                        }
                    }
                });
            });
            this.setState({
                persons: persons,
                loading: false,
                mounted: true
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false,
                mounted: true
            })
        })
    };

    componentDidMount() {
        this.getPersons();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.mounted && (this.props.path !== prevProps.path || this.props.receivers !== prevProps.receivers)) {
            this.getPersons();
        }
    }

    updateListHandler = (email) => {
        this.props.addPersonToList(email);
    };

    render() {

        return (
            <div>
                <MultiSelect
                    updateList={this.updateListHandler}
                    persons={this.state.persons}/>
            </div>
        );
    }
}

export default ListPersons;
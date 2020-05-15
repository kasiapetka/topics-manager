import React, {Component} from 'react';

class ListPersons extends Component {

    state={
        error: null,
        loading: false
    };

    // componentDidMount() {
    //     this.setState({loading: true});
    //
    //     axios.get(this.props.path).then(response => {
    //         let persons = [...response.persons];
    //         this.setState({
    //             subjects: subjects,
    //             loading: false,
    //         });
    //     }).catch(error => {
    //         this.setState({
    //             error: error,
    //             loading: false,
    //         })
    //     })
    // }

    render() {
        return (
            <div>
                {this.props.path}
            </div>
        );
    }
}

export default ListPersons;
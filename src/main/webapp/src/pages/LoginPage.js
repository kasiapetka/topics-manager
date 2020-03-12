import React from "react";

import PageNavbar from "../components/PageNavbar";
import LoginForm from "../components/LoginForm";

class LoginPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLogginActive: true
        };
    }

    render() {
        return (
            <div>
                <PageNavbar/>
                <LoginForm/>
            </div>
        );
    }
};

export default LoginPage;
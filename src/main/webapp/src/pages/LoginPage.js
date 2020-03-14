import React from "react";
import PageNavbar from "../components/PageNavbar";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <PageNavbar/>
                {this.props.isLoginOnAct ? <LoginForm/> : <RegisterForm/>}
            </div>
        );
    }
}

export default LoginPage;
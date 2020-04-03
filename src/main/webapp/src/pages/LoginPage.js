import React from "react";
import PageNavbar from "../components/PageNavbar";
import LoginForm from "../containers/LoginForm";
import RegisterForm from "../containers/RegisterForm";

class LoginPage extends React.Component {

    render() {
        return (
            <div>
                <PageNavbar/>
                {this.props.isLoginOnAct ? <LoginForm /> : <RegisterForm/>}
            </div>
        );
    }
}

export default LoginPage;
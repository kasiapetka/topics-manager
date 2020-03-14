import React from "react";

import PageNavbar from "../components/PageNavbar";
import RegisterForm from "../components/RegisterForm";

class RegisterPage extends React.Component{
    render() {
        return (
            <div>
                <PageNavbar/>
                <RegisterForm/>
            </div>
        );
    }
};

export default RegisterPage;
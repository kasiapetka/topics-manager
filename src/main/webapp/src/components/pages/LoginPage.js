import React from "react";
import PageNavbar from "../layoutComponents/PageNavbar";
import LoginForm from "../../containers/formsPages/LoginForm";
import RegisterForm from "../../containers/formsPages/RegisterForm";

const LoginPage = (props) => (
    <div>
        <PageNavbar/>
        {props.isLoginOnAct ? <LoginForm/> : <RegisterForm/>}
    </div>
);

export default LoginPage;
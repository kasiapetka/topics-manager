import React from "react";
import PageNavbar from "../UI/Layout/PageNavbar";
import LoginForm from "../../containers/FormsPages/LoginForm";
import RegisterForm from "../../containers/FormsPages/RegisterForm";

const loginPage = (props) => (
    <div>
        <PageNavbar/>
        {props.isLoginOnAct ? <LoginForm/> : <RegisterForm/>}
    </div>
);

export default loginPage;
class Auth {

    login(){
        window.sessionStorage.setItem("auth", "true");
    }

    logout(){
        window.sessionStorage.setItem("auth", "false");
    }

    isAuthenticated(){
        const a = window.sessionStorage.getItem("auth");
        return a === 'true';
    }
}

export default new Auth()
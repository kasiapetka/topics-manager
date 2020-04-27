class Auth {

    login(role, token) {
        window.sessionStorage.setItem("auth", "true " + role + " " + token);
    }

    saveId(id){
        window.sessionStorage.setItem("id",id);
    }

    logout() {
        window.sessionStorage.setItem("auth", "false");
    }

    isAuthenticated() {
        const a = window.sessionStorage.getItem("auth");
        if (!a) return false;
        const authtab = a.split(' ');
        return authtab[0] === 'true';

    }

    parseJwt = (token) => {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    getRole() {
        const a = window.sessionStorage.getItem("auth");
        if (!a) return '';
        const authtab = a.split(' ');
        if (authtab[0] === 'true') {
            return authtab[1];
        }
    }

    getToken() {
        const a = window.sessionStorage.getItem("auth");
        if (!a) return '';
        const authtab = a.split(' ');
        if (authtab[0] === 'true') {
            return authtab[2];
        }
    }

    getId(){
        return window.sessionStorage.getItem("id");
    }
}

export default new Auth()
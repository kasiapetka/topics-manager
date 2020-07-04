class Auth {

    login(role, token) {
        const email = this.parseJwt(token);
        window.sessionStorage.setItem('token', token);
        window.sessionStorage.setItem('role', role);
        window.sessionStorage.setItem('email', email);
        window.sessionStorage.setItem('auth', 'true');
    }

    saveId(id) {
        window.sessionStorage.setItem("id", id);
    }

    logout() {
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('role');
        window.sessionStorage.removeItem('email');
        window.sessionStorage.removeItem('auth');
    }

    isAuthenticated() {
        return window.sessionStorage.getItem("auth");
    }

    getRole() {
        return window.sessionStorage.getItem('role');
    }

    getToken() {
        return window.sessionStorage.getItem('token');
    }

    getId() {
        return window.sessionStorage.getItem("id");
    }

    parseJwt = (token) => {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };
}

export default new Auth()

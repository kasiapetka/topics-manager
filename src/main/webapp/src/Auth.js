class Auth {

    login(role, token) {
        const email = this.parseJwt(token);
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('email', email);
        localStorage.setItem('auth', 'true');
    }

    saveId(id) {
        localStorage.setItem("id", id);
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        localStorage.removeItem('auth');
    }

    isAuthenticated() {
        return localStorage.getItem("auth");
    }

    getRole() {
        return localStorage.getItem('role');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getId() {
        return localStorage.getItem("id");
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
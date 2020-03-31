class Auth {

    login(role){
        window.sessionStorage.setItem("auth", "true "+role);
    }

    logout(){
        window.sessionStorage.setItem("auth", "false");
    }

    isAuthenticated(){
        const a = window.sessionStorage.getItem("auth");
        if(!a) return false;

         const authtab = a.split(' ');
         return authtab[0] === 'true';

    }

    getRole(){
        const a = window.sessionStorage.getItem("auth");
        if(!a) return '';
        const authtab = a.split(' ');
        if (authtab[0] === 'true'){
            return authtab[1];
        }
    }
}

export default new Auth()
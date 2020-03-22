class Auth {
    constructor(){
        this.isAuth = false
    }

    login(cb){
        this.isAuth = true
        cb()
    }

    logout(cb){
        this.isAuth = false
        cb()
    }

    isAuthenticated(){
        return this.isAuth
    }
}

export default new Auth()
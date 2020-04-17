import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'
import auth from './Auth'

axios.interceptors.request.use(request => {

    if(auth.isAuthenticated()){
        request.headers = {
            'Authorization': 'Bearer ' + auth.getToken(),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    }
    else{
        request.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    }
    return request;
}, );

ReactDOM.render(
    <App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

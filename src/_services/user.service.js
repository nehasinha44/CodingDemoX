import { authHeader } from '../_helpers';
import axios from 'axios'

export const userService = {
    login,
    logout,
    search,
    getAll,
    getById,
    update,
    delete: _delete
    
};

function login(username,password) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const usernameold = username.username;
    const url = 'https://swapi.co/api/people/?search='+usernameold;
    return fetch(url, requestOptions)
        .then(handleResponse);

            
}

function logout() {
    console.lg("remove user from local storage to log user out");
   // localStorage.removeItem('user');
}
function search(user) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const url ='https://swapi.co/api/planets/?search='+user;
    return fetch(url, requestOptions)
        .then(handleResponse);
}

function getAll() {
    alert(getall);
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users/' + _id, requestOptions).then(handleResponse);
}



function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/users/' + user.id, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/users/' + id, requestOptions).then(handleResponse);;
}

function handleResponse(response) {
    //console.log(response);
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}
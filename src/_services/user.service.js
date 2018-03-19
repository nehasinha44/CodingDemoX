import { authHeader } from '../_helpers';
import axios from 'axios'

export const userService = {
    login,
    logout,
    search,
   showPaginationData,
    cancelRequest
    
};
var CancelToken=null;
var source = null;
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
   localStorage.removeItem('usre');
   localStorage.removeItem('SearchCount');
   location.reload();
}
function search(user) {
    if(source){ source.cancel('Operation canceled by the user.'); }
     CancelToken = axios.CancelToken;
     source = CancelToken.source();
        const requestOptions = {
                method: 'GET',
                headers: authHeader(),
                cancelToken: source.token
            };       
       return axios.get('https://swapi.co/api/planets/?search='+user,requestOptions).then(function (response) {
            return response.data;
          }).catch(function(thrown) {
                      if (axios.isCancel(thrown)) {
                        console.log('Request canceled', thrown.message);
                      } else {
                        // handle error
                      }
                    });
}
function cancelRequest(){
     if(source){ source.cancel('Operation canceled by the user.'); }
}
function showPaginationData(url){
    if(source){ source.cancel('Operation canceled by the user.'); }
     CancelToken = axios.CancelToken;
     source = CancelToken.source();

        const requestOptions = {
                method: 'GET',
                headers: authHeader(),
                cancelToken: source.token
            };
       
       return axios.get(url,requestOptions).then(function (response) {
          return response.data;
        }).catch(function(thrown) {
                    if (axios.isCancel(thrown)) {
                      console.log('Request canceled', thrown.message);
                    } else {
                      // handle error
                    }
                  });
}

function handleResponse(response) {
    //console.log(response);
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}
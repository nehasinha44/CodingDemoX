import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    getAll,
    delete: _delete,
    search,
    palnetsdel
};


function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        const prm = {username,password}
        userService.login(prm)
            .then(
                user => { 
                    if (user.count > 0) {
                        const userinfo = user.results[0];
                        if (userinfo.birth_year == prm.password) {
                            localStorage.setItem('usre', JSON.stringify(user));
                            dispatch(success(user));

                        }
                         else
                            {
                                dispatch(failure("password wrong"));
                                dispatch(alertActions.error("password wrong"));  
                            }
                         
                    }
                    else
                    {
                       dispatch(failure("username and password both wrong"));
                      dispatch(alertActions.error("username and password both wrong"));  
                    }
                },
                error => {
                  //  console.log("usernmae and password both incorrect");
                    dispatch(failure("usernmae and password both incorrect"));
                    dispatch(alertActions.error("sernmae and password both incorrect"));
                }
            );
    };
    //console.log(user);

    function request(user) { return { type: userConstants.LOGIN_REQUEST, username } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, username } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, username } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}
function search(search)
{
    //console.log(search);
    return dispatch => {
         userService.search(search)
         .then(
             user => { 
                if (user.count > 0) {
                   
                    dispatch({'type': 'listplanets','payload':user.results.sort(compare)}); 
                }
             }
            );
    }

}

function compare(a, b) {
  const p1 = parseInt(a.population);
  const p2 = parseInt(b.population);
  
  let comparison = 0;
  if (p1 > p2) {
    comparison = 1;
  } else if (p1 < p2) {
    comparison = -1;
  }
  return comparison;
}

function palnetsdel(palnetsdel)
{
     return dispatch => {
   dispatch({'type': 'palnetsdel','payload':palnetsdel});  
}
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => { 
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}
import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    search,
    showPaginationData,
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
                              location.reload();
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
      function request(user) { return { type: userConstants.LOGIN_REQUEST, username } }
      function success(user) { return { type: userConstants.LOGIN_SUCCESS, username } }
      function failure(error) { return { type: userConstants.LOGIN_FAILURE, username } }
  }

  function logout() {
      userService.logout();
      return { type: userConstants.LOGOUT };
  }
  function showPaginationData(url){

      return dispatch => {
       userService.showPaginationData(url)
           .then(
               user => { 
                  if (user.count > 0) {
                      dispatch({'type': 'listplanets','payload':{...user,results:user.results.sort(compare)} }); 
                  }
               }
              );
       }
  }
  function search(search)
  {
      return dispatch => {
          if(!search){
              userService.cancelRequest();
              dispatch({'type': 'listplanets','payload':[]}); 
              dispatch({'type': 'palnetsdel','payload':""}); 
              return true;
          }
           userService.search(search)
           .then(
               user => { 
                  if (user.count > 0) {
                      const SearchCount = (localStorage.getItem('SearchCount')== "NaN" ? 1:localStorage.getItem('SearchCount')); 
                      console.log(SearchCount,"se");
                      const username = JSON.parse(localStorage.getItem('usre'));

                      if (SearchCount < 15 || username.results[0].name == 'Luke Skywalker') {
                           localStorage.setItem('SearchCount', parseInt(SearchCount)+1); 
                           dispatch({'type': 'listplanets','payload':{...user,results:user.results.sort(compare)}})
                       }
                         else{
                          alert("Limit exceeded ");
                         }
                       
                  }
                  else{
                    alert("sorry, No data found");
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

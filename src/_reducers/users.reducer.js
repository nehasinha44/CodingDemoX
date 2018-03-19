import { userConstants } from '../_constants';
//console.log("reducer");

export function users(state = {SearchCount:0}, action) {
 console.log(action.payload);
  switch (action.type) {
   
       case "listplanets":
       return {...state,
        registration : action.payload,
        SearchCount: state.SearchCount +  1
          };
        case "palnetsdel":
        return{
          ...state,
          authentication:{'detail':action.payload,nexturl:""}
        }

    default:
      return state
      break;
  }
}
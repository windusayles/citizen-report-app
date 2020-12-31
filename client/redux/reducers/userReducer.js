import { SIGNUP_SUCCESSFUL, SIGNUP_FAILED } from "../actionTypes/userActionTypes";

const initialState = {
  isLoggedIn: false,
  profileObj: {},
  id_token: ''
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SIGNUP_SUCCESSFUL:
      return {
        ...state,
        isLoggedIn: true,
        profileObj: {...action.payload.profileObj},
        id_token: action.payload.tokenObj.id_token,
      };
    case SIGNUP_FAILED:
      return initialState;
    default:
      return state;
  };
};
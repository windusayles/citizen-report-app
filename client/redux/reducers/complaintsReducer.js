import { SUCCESSFUL_CREATE_COMPLAINTS, SUCCESSFUL_DELETE_COMPLAINTS, SUCCESSFUL_GET_COMPLAINTS } from "../actionTypes/complaintsActionTypes";

const initialState = {
  complaints: []
};

export default (state=initialState, action) => {
  switch(action.type) {
    case SUCCESSFUL_GET_COMPLAINTS:
      return {
        ...state,
        complaints: [...action.payload]
      }
    default:
      return state;
  }
};
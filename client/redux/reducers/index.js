import { combineReducers } from 'redux';
import auth from './authReducer';
import complaints from './complaintsReducer';
import user from './userReducer';

export default combineReducers({ auth, complaints, user });
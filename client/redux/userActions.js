import { response } from "express";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
//won't need an actionType or reducer, just send the data to the database
const CREATE_USER = 'CREATE_USER';
const dispatch = useDispatch();

export const createUser = (newUser) => {
  return dispatch => {
    fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(res => {
      console.log("response", res);
      return res.json();
    })
  }
}
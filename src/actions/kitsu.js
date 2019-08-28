import axios from 'axios'
import {urlApi} from "../utils";

export const GET_INITAL_LIST = 'GET_INITAL_LIST'
export const GET_CHARACTER = 'GET_CHARACTER'
export const SET_LOADING = 'SET_LOADING'


function getInitialList(characters){
  return{
    type: GET_INITAL_LIST,
    characters,
  }
}

function setLoading(){
  return{
    type: SET_LOADING,
  }
}

export function handlerGetInitialList(query) {
  return (dispatch) => {
    dispatch(setLoading());
    let offset = 10 * (query - 1);
    if(query === 0){
      offset = 0;
    }
    axios.get(`${urlApi}/characters?page[offset]=${offset}`)
      .then(function (res) {
        return dispatch(getInitialList(res));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}


function getCharacterByName(characters){
  return{
    type: GET_CHARACTER,
    characters,
  }
}

export function handlerGetCharacterByName(query) {
  return (dispatch) => {
    let offset = 10 * (query.number - 1);
    if(query.number === 0){
      offset = 0;
    }
    dispatch(setLoading());
    axios.get(`${urlApi}/characters?filter[name]=${query.name}&page[offset]=${offset}`)
      .then(function (res) {
        console.log(res);
        return dispatch(getCharacterByName(res));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
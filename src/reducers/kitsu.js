import {GET_CHARACTER, GET_INITAL_LIST, SET_LOADING} from "../actions/kitsu";

const initialState = {
  characters: [],
  loading: true,
  pagCount: 0,
}

export default function kitsu(state = initialState, action) {
  switch (action.type) {
    case GET_INITAL_LIST:
      return {
        ...state,
        characters: action.characters.data.data,
        pagCount: action.characters.data.meta.count,
        loading: false,
      }
    case GET_CHARACTER:
      return {
        ...state,
        pagCount: action.characters.data.meta.count,
        characters: action.characters.data.data,
        loading: false,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}
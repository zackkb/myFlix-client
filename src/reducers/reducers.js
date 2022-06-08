import { combineReducers } from "redux";

// Import actions
import { ADD_FAVORITEMOVIE, REMOVE_FAVORITEMOVIE, SET_FAVORITEMOVIES, SET_FILTER, SET_MOVIES, SET_USER, UPDATE_USER } from "../actions/actions";

// Reducer functions

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      console.log('SET_MOVIES!');
      return action.value;
    default:
      return state;
  }
}

function user(state = null, action) {
  switch (action.type) {
    case SET_USER:
      console.log('SET_USER!');
      return action.value;
    case UPDATE_USER:
      console.log('UPDATE_USER!');
      return action.value;
    default:
      return state;
  }
}

function favoriteMovies(state = [], action) {
  switch (action.type) {
    case SET_FAVORITEMOVIES:
      console.log('SET_FAVORITEMOVIES!');
      return action.value;
    case ADD_FAVORITEMOVIE:
      console.log('ADD_FAVORITEMOVIES!');
      return [
        ...state, action.value
      ]
    case REMOVE_FAVORITEMOVIE:
      console.log('REMOVE_FAVORITEMOVIES!');
      return state.filter(movie => movie._id != action.value._id);
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  favoriteMovies
});

export default moviesApp;
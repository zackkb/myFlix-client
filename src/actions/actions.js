export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const UPDATE_USER = "UPDATE_USER";
export const SET_FAVORITEMOVIES = 'SET_FAVORITEMOVIES';
export const ADD_FAVORITEMOVIE = 'ADD_FAVORITEMOVIE';
export const REMOVE_FAVORITEMOVIE = 'REMOVE_FAVORITEMOVIE';

// Initalize movie list with movies
export function setMovies(value) {
  return {
      type: SET_MOVIES,
      value
  };
}

// Filter movies
export function setFilter(value) {
  return {
      type: SET_FILTER,
      value
  };
}

// Set the user that is logged in
export function setUser(value) {
  return {
      type: SET_USER,
      value
  };
}

// Allow user to update their data
export function updateUser(value) {
  console.log('UPDATE_FAVORITEMOVIES!');
  return {
      type: UPDATE_USER,
      value
  };
}

// Initalize Favorite Movie List
export function setFavoriteMovies(value) {
  console.log('SET_FAVORITEMOVIES!');
  return {
      type: SET_FAVORITEMOVIES,
      value
  };
}

// Allow user to add a movie to Favorites
export function addFavoriteMovie(value) {
  console.log('ADD_FAVORITEMOVIES!');
  return {
      type: ADD_FAVORITEMOVIE,
      value
  };
}

// Allow user to remove a movie from Favorites
export function removeFavoriteMovie(value) {
  console.log('REMOVE_FAVORITEMOVIES!');
  return {
      type: REMOVE_FAVORITEMOVIE,
      value
  };
}
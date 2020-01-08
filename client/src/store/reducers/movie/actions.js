import * as types from './types';
import axios from 'axios';

export const getMovie = (id = 1) => async dispatch => {
  const { data: movie } = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
  );

  return dispatch({
    type: types.GET_MOVIE,
    payload: movie,
  });
};

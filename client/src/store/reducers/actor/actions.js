import * as types from './types';
import axios from 'axios';

export const getActor = (id = 1) => async dispatch => {
  const { data: actor } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );

  return dispatch({
    type: types.GET_ACTOR,
    payload: actor,
  });
};

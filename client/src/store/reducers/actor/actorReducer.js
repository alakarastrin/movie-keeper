import * as types from './types';

const initialState = {
  actors: [],
  actor: null,
  loading: false,
};

const actorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ACTOR:
      return { ...state, actor: action.payload };

    default:
      return state;
  }
};

export default actorReducer;

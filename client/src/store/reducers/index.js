import { combineReducers } from 'redux';

import movie from './movie/movieReducer';
import actor from './actor/actorReducer';
import profile from './profile/profileReducer';

const rootReducer = combineReducers({
  movie: movie,
  actor: actor,
  profile: profile,
});

export default rootReducer;

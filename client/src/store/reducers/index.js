import { combineReducers } from 'redux';

import movie from './movie/movieReducer';
import actor from './actor/actorReducer';
import profile from './profile/profileReducer';
import user from './user/userReducer';

const rootReducer = combineReducers({
  movie: movie,
  actor: actor,
  profile: profile,
  user: user,
});

export default rootReducer;

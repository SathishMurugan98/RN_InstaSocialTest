import auth from './auth';
import post from './post';
import {combineReducers} from 'redux';

export default combineReducers({
  auth,
  post,
});

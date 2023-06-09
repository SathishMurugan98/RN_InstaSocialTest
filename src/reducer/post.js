import {ERROR_POST, SET_POST} from '../actions/action.type';

const initialState = {
  posts: null,
  loading: true,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POST:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: false,
      };
    case ERROR_POST:
      return {
        ...state,
        // loading: false,
        error: true,
      };

    default:
      return state;
  }
};

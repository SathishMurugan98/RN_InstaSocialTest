import database from '@react-native-firebase/database';
import {SET_POST, ERROR_POST} from './action.type';

export const getPosts = () => async dispatch => {
  try {
    database()
      .ref('/posts/')
      .on('child_added', snapshot => {
        console.log('getPosts User Data : ', snapshot.val());
        if (snapshot.val()) {
          dispatch({
            type: SET_POST,
            payload: Object.values(snapshot.val()),
          });
        } else {
          dispatch({
            type: SET_POST,
            payload: [],
          });
        }
      });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR_POST,
    });
  }
};

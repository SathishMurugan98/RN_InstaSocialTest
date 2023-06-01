import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Snackbar from 'react-native-snackbar';

export const signUp = data => async dispatch => {
  const {name, email, password, bio, image, instaUsername, country} = data;
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(data => {
      console.log('SignUp Successfully===>', data);
      database()
        .ref('/users/' + data.user.uid)
        .set({
          name,
          email,
          password,
          bio,
          image,
          instaUsername,
          country,
          uid: data.user.id,
        })
        .then(() => console.log('Data set Created...'));
      Snackbar.show({
        text: 'Account Created',
        textColor: '#FFF',
        backgroundColor: '#1b262c',
      });
    })
    .catch(error => {
      console.log('Authentication Failed====>', error);
      Snackbar.show({
        text: 'Authentication Failed',
        textColor: '#fff',
        backgroundColor: '#832333',
      });
    });
};

export const signIn = data => async dispatch => {
  console.log('SignIn===>', data);
  const {email, password} = data;
  if (!email || !password) {
    return (
      console.log('Email or Password Empty...'),
      Snackbar.show({
        text: 'Required Email and Password',
        textColor: '#FFF',
        backgroundColor: '#832333',
      })
    );
  }
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(data => {
      console.log('SignIn Success...');
      Snackbar.show({
        text: 'SignIn Successfully',
        textColor: '#FFF',
        backgroundColor: '#1b262c',
      });
    })
    .catch(error => {
      console.log('SignIn failed===>', error);
      Snackbar.show({
        text: 'SignIn Failed',
        textColor: '#FFF',
        backgroundColor: '#832333',
      });
    });
};

export const signOut = () => async dispatch => {
  console.log('SignOut Page..');
  auth()
    .signOut()
    .then(() => {
      console.log('SignOut Succeess...');
      Snackbar.show({
        text: 'SignOut Successfully',
        textColor: '#FFF',
        backgroundColor: '#1b262c',
      });
    })
    .catch(error => {
      console.log('SignOut Failed==>', error);
      Snackbar.show({
        text: 'SignOut Failed',
        textColor: '#FFF',
        backgroundColor: '#832333',
      });
    });
};

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useDispatch, connect} from 'react-redux';

import CustomHeader from './layout/CustomHeader';
import {IS_AUTHENTICATED, SET_USER} from './actions/action.type';
import EmptyContainer from './compoenents/EmptyContainer';
import Home from './screens/Home';
import AddPosts from './screens/AddPosts';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import {requestPermission} from './utils/AskPermission';

const Stack = createStackNavigator();

const App = ({authState}) => {
  const dispatch = useDispatch();

  const authStateChanged = user => {
    if (user) {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: true,
      });

      console.log('USER ID ====>', user._user.uid);
      database()
        .ref(`/users/${user._user.uid}`)
        .on('child_added', snapshot => {
          console.log('USER DETAILS : ', snapshot.val());
          dispatch({
            type: SET_USER,
            payload: snapshot.val(),
          });
        });
    } else {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: false,
      });
    }
  };

  useEffect(() => {
    requestPermission();
    const subscriber = auth().onAuthStateChanged(authStateChanged);
    console.log('subscriber =========>', subscriber);
    return subscriber;
  }, []);

  if (authState.loading) {
    console.log('EmptyContainer =========>');
    return <EmptyContainer />;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: props => <CustomHeader {...props} />,
          }}>
          {authState.isAuthenticated ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="AddPosts" component={AddPosts} />
            </>
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const mapStateToProps = state => ({
  authState: state.auth,
});

export default connect(mapStateToProps)(App);

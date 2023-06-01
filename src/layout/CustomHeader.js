/* eslint-disable no-shadow */
import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {signOut} from '../actions/auth';
import {Header, Text, Body, Icon, Title, Right, Button} from 'native-base';

const CustomHeader = ({authState, navigation, signOut}) => {
  return (
    <Header
      androidStatusBarColor="#0f4c75"
      style={{backgroundColor: '#0f4c75'}}>
      <Body>
        <Title>Insta Social App</Title>
      </Body>
      <Right>
        {authState.isAuthenticated && (
          <>
            <Button
              transparent
              iconLeft
              onPress={() => navigation.navigate('AddPosts')}>
              <Text style={{color: '#fdcb9e'}}>Add Posts</Text>
            </Button>
            <Button transparent onPress={() => signOut()}>
              <Icon name="log-out-outline" style={{color: '#832333'}} />
            </Button>
          </>
        )}
      </Right>
    </Header>
  );
};

const mapStateToProps = state => ({
  authState: state.auth,
});

const mapDispatchToProps = {
  // inga irunthu than action folder la irukira auth.js file signOut() ah call pannuthu
  signOut,
};

CustomHeader.propTypes = {
  signOut: propTypes.func.isRequired,
  authState: propTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);

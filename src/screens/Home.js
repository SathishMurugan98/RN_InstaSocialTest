/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {Container, H1, Text} from 'native-base';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import EmptyContainer from '../compoenents/EmptyContainer';
import {getPosts} from '../actions/post';
import Posts from '../compoenents/Posts';

const Home = ({getPosts, userDetails, postState}) => {
  useEffect(() => {
    getPosts();
  }, []);

  if (postState.pending) {
    return <EmptyContainer />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={item => item.id}
        data={postState.posts}
        renderItem={({item}) => (
          <Posts item={item} key={item.id} userDetails={userDetails} />
        )}
        ListEmptyComponent={() => (
          <Container style={styles.emptyContainer}>
            <H1>No Posts Data Found </H1>
          </Container>
        )}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  postState: state.post,
  userDetails: state.auth.user,
});

const mapDispatchToProps = {
  getPosts,
};

Home.propTypes = {
  getPosts: propTypes.func.isRequired,
  postState: propTypes.object.isRequired,
  userDetails: propTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    justifyContent: 'flex-start',
    padding: 4,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#1b262c',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

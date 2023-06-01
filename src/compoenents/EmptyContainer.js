import React from 'react';
import {StyleSheet} from 'react-native';
import {Container, Spinner} from 'native-base';

const EmptyContainer = () => {
  return (
    <Container style={styles.container}>
      <Spinner />
    </Container>
  );
};

export default EmptyContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b262c',
  },
});

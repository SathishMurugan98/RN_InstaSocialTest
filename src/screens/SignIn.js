import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Signlogo from '../assests/SignIn_logo.jpg';
import {Container, Form, Item, H3, Input, Button} from 'native-base';
import {signIn} from '../actions/auth';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

const SignIn = ({signIn, navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doSignIn = async () => {
    signIn({email, password});
  };
  
  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Image
          source={Signlogo}
          style={{
            width: 260,
            height: 230,
            alignSelf: 'center',
            marginTop: 10,
            borderRadius: 150,
          }}
        />
        <Form>
          <TextInput
            placeholder="Enter Your Email"
            placeholderTextColor="#758283"
            style={styles.inputText}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            placeholder="Enter Your Password"
            placeholderTextColor="#758283"
            style={styles.inputText}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => doSignIn()}>
            <Text style={{color: '#FFF', textAlign: 'center', margin: 10}}>
              SIGN IN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={{color: '#FFF', textAlign: 'center', margin: 10}}>
              Do not have an account, SignUp here.
            </Text>
          </TouchableOpacity>
        </Form>
      </ScrollView>
    </Container>
  );
};

const mapStateToProps = state => ({
  authState: state.auth,
});

const mapDispatchToProps = {
  signIn: data => signIn(data),
};

SignIn.propTypes = {
  signIn: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
  },
  formItem: {
    marginBottom: 20,
  },
  inputText: {
    textAlign: 'center',
    color: '#FFF',
    height: 50,
    borderColor: '#207398',
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
  },
  signupButton: {
    backgroundColor: '#232988',
    height: 50,
    borderColor: '#12B0E8',
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
  },
});

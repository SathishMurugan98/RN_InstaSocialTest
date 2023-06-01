import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import ProgressBar from 'react-native-progress/Bar';
//import ImagePicker from 'react-native-image-picker';
//import {options} from '../utils/options';

import ImagePicker from 'react-native-image-crop-picker';

import {
  Container,
  Form,
  Text,
  Button,
  Content,
  Thumbnail,
  Item,
  Input,
} from 'native-base';

//Redux
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {signUp} from '../actions/auth';

const SignUp = ({signUp}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [instaUsername, setInstaUsername] = useState('');
  const [country, setCountry] = useState('');
  const [image, setImage] = useState(
    'https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png',
  );

  const [imageUploading, setImageUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const chooseImage = async () => {
    console.log('image========');
    ImagePicker.openPicker({
      width: 50,
      height: 50,
      cropping: true,
    }).then(image => {
      console.log('choose image path========', image.path);
      // uploadImage(image.path);
      setImage(image.path);
    });
    //   ImagePicker.launchCamera(options, response => {
    //     console.log('Print Image Picker Response = ', response);
    //     if (response.didCancel) {
    //       console.log('User cancelled image picker');
    //     } else if (response.error) {
    //       console.log('ImagePicker Error: ', response.error);
    //     } else if (response.customButton) {
    //       console.log('User tapped custom button: ', response.customButton);
    //       alert(response.customButton);
    //     } else {
    //       console.log('Image Picker Response ==== ', response);
    //       //uploadImage(response);
    //     }
    //   });
  };
  //const uploadImage = async response => {
  // setImageUploading(false);
  // const reference = storage().ref(response.fileName);
  // const task = reference.putFile(response.path);
  // task.on('state_changed', taskSnapShot => {
  //   const percentage =
  //     (taskSnapShot.bytesTransferred / taskSnapShot.totalBytes) * 1000;
  //   setUploadStatus(percentage);
  // });
  // task.then(async () => {
  //   const url = reference.getDownloadURL();
  //   setImage(url);
  //   setImageUploading(false);
  // });
  //};

  const doSignUp = async () => {
    signUp({name, email, password, instaUsername, country, bio, image});
  };

  return (
    <Container style={styles.container}>
      <Content padder>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => chooseImage()}>
              <Thumbnail large source={{uri: image}} />
            </TouchableOpacity>
          </View>
          {/* {imageUploading && (
            <ProgressBar progress={uploadStatus} style={styles.progress} />
          )} */}
          <Form>
            <TextInput
              placeholder="Enter Name"
              placeholderTextColor="#758283"
              style={styles.inputText}
              value={name}
              onChangeText={text => setName(text)}
            />

            <TextInput
              placeholder="Enter Email"
              placeholderTextColor="#758283"
              style={styles.inputText}
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              placeholder="Enter Password"
              placeholderTextColor="#758283"
              style={styles.inputText}
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
            />
            <TextInput
              placeholder="Enter Insta User Name"
              placeholderTextColor="#758283"
              style={styles.inputText}
              value={instaUsername}
              onChangeText={text => setInstaUsername(text)}
            />
            <TextInput
              placeholder="Enter Country"
              placeholderTextColor="#758283"
              style={styles.inputText}
              value={country}
              onChangeText={text => setCountry(text)}
            />
            <TextInput
              placeholder="Enter Bio"
              placeholderTextColor="#758283"
              style={styles.inputText}
              value={bio}
              onChangeText={text => setBio(text)}
            />
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => doSignUp()}>
              <Text style={{color: '#FFF', textAlign: 'center', margin: 10}}>
                SIGNUP
              </Text>
            </TouchableOpacity>
          </Form>
        </ScrollView>
      </Content>
    </Container>
  );
};

const mapDispatchToProps = {
  // inga irunthu than action folder la irukira auth.js file signUp() ah call pannuthu
  signUp: data => signUp(data),
};

SignUp.propTypes = {
  signUp: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
  progress: {
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

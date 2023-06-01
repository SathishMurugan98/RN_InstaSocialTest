import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  Container,
  Form,
  Text,
  Button,
  Content,
  Thumbnail,
  Item,
  Textarea,
  Icon,
  Input,
} from 'native-base';

import Snackbar from 'react-native-snackbar';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
//import ImagePicker from 'react-native-image-picker';
import {options} from '../utils/options';
import ProgressBar from 'react-native-progress/Bar';
import ImagePicker from 'react-native-image-crop-picker';
// Redux
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import shortid from 'shortid';

const AddPosts = ({userState, navigation}) => {
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(false);
  const [description, setDescription] = useState('');

  const [imageUploading, setImageUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

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
  };

  // const chooseImage = async () => {
  //   ImagePicker.showImagePicker(options, response => {
  //     console.log('Response = ', response);
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //       alert(response.customButton);
  //     } else {
  //       uploadImage(response);
  //     }
  //   });
  // };

  // const uploadImage = async response => {
  //   try {
  //     setImageUploading(true);
  //     const reference = storage().ref(response.fileName);
  //     const task = reference.putFile(response.path);
  //     task.on('state_changed', taskSnapShot => {
  //       const percentage =
  //         (taskSnapShot.bytesTransferred / taskSnapShot.totalBytes) * 1000;
  //       setUploadStatus(percentage);
  //     });
  //     task.then(async () => {
  //       const url = reference.getDownloadURL();
  //       setImage(url);
  //       setImageUploading(false);
  //     });
  //   } catch (error) {
  //     console.log('doAddPosts Catch Block Error===>', error);
  //     Snackbar.show({
  //       text: 'Post Upload Failed',
  //       textColor: '#FFF',
  //       backgroundColor: '#832333',
  //     });
  //   }
  // };

  const addPost = async () => {
    try {
      if (!location || !image || !description) {
        console.log('Some Fields are Missing');
        return Snackbar.show({
          text: 'Post Upload Failed',
          textColor: '#FFF',
          backgroundColor: '#832333',
        });
      }
      console.log('=====UserState Details======>', userState.name);
      const uid = shortid.generate();
      await database().ref(`/posts/${uid}`).set({
        location,
        description,
        picture: image,
        by: userState.name,
        date: Date.now(),
        instaId: userState.instaUsername,
        userImage: userState.image,
        id: uid,
      });
      console.log('===========>Add Posts Successfully');
      navigation.navigate('Home');
    } catch (error) {
      console.log('doAddPosts Catch Block Error===>', error);
      Snackbar.show({
        text: 'Post Upload Failed',
        textColor: '#FFF',
        backgroundColor: '#832333',
      });
    }
  };

  return (
    <Container style={styles.container}>
      <Content padder>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {image && (
            <Image
              source={{uri: image}}
              style={styles.image}
              resizeMode="center"
            />
          )}
          <Form>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="location"
                value={location}
                style={{color: '#eee'}}
                onChangeText={text => setLocation(text)}
              />
            </Item>

            {imageUploading ? (
              <ProgressBar progress={uploadStatus} style={styles.progress} />
            ) : (
              <Button
                regular
                bordered
                block
                iconLeft
                info
                style={styles.formItem}
                onPress={chooseImage}>
                <Icon
                  name="md-image-outline"
                  type="Ionicons"
                  style={styles.icon}
                />
                <Text
                  style={{
                    color: '#fdcb9e',
                  }}>
                  Choose Image
                </Text>
              </Button>
            )}

            <Item regular style={styles.formItem}>
              <Textarea
                rowSpan={5}
                placeholder="Some description..."
                value={description}
                style={{color: '#eee'}}
                onChangeText={text => setDescription(text)}
              />
            </Item>

            <Button regular block onPress={addPost}>
              <Text>Add Post</Text>
            </Button>
          </Form>
        </ScrollView>
      </Content>
    </Container>
  );
};

// mapStateToProps means bringing some state datas
const mapStateToProps = state => ({
  userState: state.auth.user,
});

AddPosts.propTypes = {
  userState: propTypes.object.isRequired,
};
export default connect(mapStateToProps)(AddPosts);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
  },
  formItem: {
    marginTop: 20,
  },
  progress: {
    marginBottom: 20,
  },
  imageButton: {
    textAlign: 'center',
    color: '#FFF',
    height: 50,
    borderColor: '#207398',
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
  },
  inputTextArea: {
    textAlign: 'center',
    color: '#FFF',
    height: 170,
    borderColor: '#207398',
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
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

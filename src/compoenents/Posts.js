import React, {useEffect, useState} from 'react';
import {Linking, Image} from 'react-native';
import {
  Container,
  Item,
  Card,
  CardItem,
  Button,
  Icon,
  Left,
  Right,
  Text,
  Thumbnail,
  Body,
} from 'native-base';

import database from '@react-native-firebase/database';

const Posts = ({item, userDetails}) => {
  const [upvote, setUpvote] = useState(0);
  const [downvote, setDownvote] = useState(0);

  const upVotePost = () => {
    database()
      .ref(`/posts/${item.id}/vote/${userDetails.uid}`)
      .set({
        upvote: 1,
      })
      .then(() => {
        console.log('UPVOTED...');
      });
  };

  const downVotePost = () => {
    database
      .ref(`/posts/${item.id}/vote/${userDetails.uid}`)
      .set({
        upvote: 1,
      })
      .then(() => {
        console.log('UPVOTED...');
      });
  };

  useEffect(() => {
    console.log('Item===>', item);
    if (item.upvote) {
      let voteIncrese = 0;
      let voteDecrese = 0;
      Object.values(item.vote).map(val => {
        if (val.upvote) {
          voteIncrese += 1;
        }
        if (val.downvote) {
          voteDecrese += 1;
        }
      });
      setUpvote(voteIncrese);
      setDownvote(voteDecrese);
    }
  }, [item]);
  return (
    <Card style={{backgroundColor: '#0f4c75', borderColor: '#0f4c75'}}>
      <CardItem style={{backgroundColor: 'transparent'}}>
        <Left>
          <Thumbnail source={{uri: item.userImage}} small />
          <Body>
            <Text style={{color: '#fdcb9e'}}>{item.by}</Text>
            <Text note>{item.location}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{uri: item.picture}}
          style={{height: 200, flex: 1, width: null}}
        />
      </CardItem>
      <CardItem cardBody style={{backgroundColor: 'transparent'}}>
        <Text style={{color: '#FFF'}} numberOfLines={2}>
          {item.description}
        </Text>
      </CardItem>
      <CardItem style={{backgroundColor: '#0f4c75'}}>
        <Left>
          <Button transparent onPress={upVotePost}>
            <Icon name="thumbs-up" type="Entypo" style={{color: '#fdcb9e'}} />
            <Text style={{color: '#fdcb9e'}}>{upvote}</Text>
          </Button>
          <Button transparent onPress={downVotePost}>
            <Icon name="thumbs-down" type="Entypo" style={{color: '#fdcb9e'}} />
            <Text style={{color: '#fdcb9e'}}>{downvote}</Text>
          </Button>
        </Left>
        <Right>
          <Button
            transparent
            iconLeft
            onPress={() => {
              Linking.openURL(`instagram://user?username=${item.instaId}`);
            }}>
            <Text style={{color: '#fdcb9e'}}>Open In</Text>
            <Icon name="instagram" type="Entypo" style={{color: '#fdcb9e'}} />
          </Button>
        </Right>
      </CardItem>
    </Card>
  );
};

export default Posts;

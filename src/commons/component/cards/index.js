import React from 'react';
import {View} from 'react-native';
import {scale} from 'react-native-size-matters';

const Card = (props) => {
  return <View style={[styles.container, props.style]}>{props.children}</View>;
};

const styles = {
  container: {
    flex: 1,
    margin: scale(10),
    borderRadius: 6,
    overflow: 'hidden',
  },
};

export default Card;

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

const ComBadrCardComp = (props) => {
  return <View style={[styles.container, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: scale(10),
    borderRadius: 6,
    overflow: 'hidden',
  },
});

export default ComBadrCardComp;

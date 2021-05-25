import React from 'react';
import {View, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

const ComBadrCardSectionComp = (props) => {
  return <View style={[styles.container, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: scale(5),
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
  },
});

export default ComBadrCardSectionComp;

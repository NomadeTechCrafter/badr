import React from 'react';
import {View, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {accentColor, atShadowColor} from '../../../styles/ComThemeStyle';
const ComBadrCardBoxComp = (props) => {
  let {boxShadow, defaultStyle} = styles;
  return (
    <View
      style={[
        defaultStyle,
        boxShadow,
        props.noPadding ? styles.noPadding : styles.addPadding,
        props.style,
      ]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: accentColor,
    marginBottom: scale(10),
  },
  addPadding: {
    padding: scale(10),
  },
  noPadding: {
    padding: 0,
  },
  boxShadow: {
    shadowColor: atShadowColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 7,
    elevation: 3,
  },
});

export default ComBadrCardBoxComp;

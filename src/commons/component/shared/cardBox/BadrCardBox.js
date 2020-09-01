import React from 'react';
import {View} from 'react-native';
import {scale} from 'react-native-size-matters';

const BadrCardBox = (props) => {
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

const styles = {
  defaultStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    marginBottom: scale(10),
  },
  addPadding: {
    padding: scale(10),
  },
  noPadding: {
    padding: 0,
  },
  boxShadow: {
    shadowColor: 'rgba(59,59,59,0.04)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 7,
    elevation: 3,
  },
};

export default BadrCardBox;

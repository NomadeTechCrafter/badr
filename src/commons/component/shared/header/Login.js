import {CustomStyleSheet} from '../../../styles';
import React from 'react';
import {Image, View} from 'react-native';

const buildHeader = (style, img) => {
  return (
    <View>
      <Image style={{}} source={require('../../../../assets/images/logo.jpg')}/>
      <Image style={style} source={img}/>
    </View>
  );
};

export default class BadrLoginHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return buildHeader(
      CustomStyleSheet.loginHeaderImage,
      require('../../../../assets/images/badr.png'),
    );
  }
}

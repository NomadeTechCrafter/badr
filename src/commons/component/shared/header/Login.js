import {CustomStyleSheet} from '../../../styles';
import React from 'react';
import {Image, View} from 'react-native';

export default class BadrLoginHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Image
          style={{}}
          source={require('../../../../assets/images/logo.jpg')}
        />
        <Image
          style={CustomStyleSheet.loginHeaderImage}
          source={require('../../../../assets/images/badr.png')}
        />
      </View>
    );
  }
}

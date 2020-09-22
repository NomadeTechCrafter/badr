import {CustomStyleSheet} from '../../../styles/ComThemeStyle';
import React from 'react';
import {Image, View} from 'react-native';

export default class ComBadrLoginHeaderComp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Image
          style={{}}
          source={require('../../../../assets/images/badrDouanesHeader.jpg')}
        />
        <Image
          style={CustomStyleSheet.loginHeaderImage}
          source={require('../../../../assets/images/badrHeader.png')}
        />
      </View>
    );
  }
}

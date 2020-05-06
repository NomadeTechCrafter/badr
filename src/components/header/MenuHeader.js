import {CustomStyleSheet} from '../../styles/index';
import React from 'react';
import {Image, View, ImageBackground, Text} from 'react-native';

import {A} from '../../common/constants/paths';

export default class MenuHeader extends React.Component {
  constructor(props) {
    super(props);
    console.log(A);
  }
  render() {
    return (
      <ImageBackground
        blurRadius={3}
        style={CustomStyleSheet.menuHeader}
        source={require('../../common/assets/images/ADII.jpg')}>
        <View
          style={{
            ...CustomStyleSheet.menuHeader,
            backgroundColor: 'rgba(0, 154, 178,  0.6)',
            width: '100%',
            marginTop: -20,
            marginBottom: -15,
          }}>
          <Image
            style={CustomStyleSheet.menuUserImage}
            source={require('../../common/assets/images/agent.png')}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={CustomStyleSheet.menuHeaderTitle}>
              {this.props.fullname}
            </Text>
            <Text style={CustomStyleSheet.menuHeaderSubTitle}>
              {'Bureau :  '}
              {this.props.bureau}
            </Text>
            <Text style={CustomStyleSheet.menuHeaderSubTitle}>
              {'Arrondissement :  '}
              {this.props.arrondissement}
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

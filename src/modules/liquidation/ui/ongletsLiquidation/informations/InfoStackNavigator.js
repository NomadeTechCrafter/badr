import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import LiquidationInfoScreen from './LiquidationInfoScreen';
import LiquidationInfoDetailsScreen from './LiquidationInfoDetailsScreen';
import {CustomStyleSheet} from '../../../../../commons/styles/ComThemeStyle';

const Stack = createStackNavigator();

class MainStackNavigator extends React.Component {
  render() {
    return (
      <View style={CustomStyleSheet.fullContainer}>
        {/* <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('liq.title')}
          subtitle={translate('liq.titleLiqAuto')}
          icon="menu"
        /> */}
        <Stack.Navigator>
          <Stack.Screen
            name="LiquidationInfoScreen"
            options={{headerShown: false}}
            component={LiquidationInfoScreen}
          />
          <Stack.Screen
            name="LiquidationInfoDetailsScreen"
            options={{headerShown: false}}
            component={LiquidationInfoDetailsScreen}
          />
        </Stack.Navigator>
      </View>
    );
  }
}

export {MainStackNavigator};

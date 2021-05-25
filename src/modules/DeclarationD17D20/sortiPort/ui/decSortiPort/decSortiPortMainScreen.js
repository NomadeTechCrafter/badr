import React from 'react';

import {View, Dimensions} from 'react-native';

import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {primaryColor} from '../../../../../commons/styles/ComThemeStyle';

import SortiPortByRefDec from './decSortiPortByRefDec';
import SortiPortListeByRefVh from './decSortiPortListeByRefVh';
import SortiPortListeDeclaration from './decSortiPortListeDeclaration';
/** REDUX **/
import {connect} from 'react-redux';

/**Custom Components */
import {
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
} from '../../../../../commons/component';

const Tab = createMaterialTopTabNavigator();

const MainStack = createStackNavigator();

function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <ComBadrToolbarComp
        navigation={props.navigation}
        icon="menu"
        title={translate('sortiPort.title')}
        subtitle={translate('sortiPort.subTitleAction')}
      />
      {props.showProgress && <ComBadrProgressBarComp />}
      {/* {this.props.showProgress && <ComBadrCircleProgressBarComp size={30} />} */}

      <Tab.Navigator
        initialLayout={{height: Dimensions.get('window').height}}
        swipeEnabled={false}
        tabBarOptions={{
          labelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
          showLabel: true,
          allowFontScaling: true,
          activeBackgroundColor: primaryColor,
          activeTintColor: primaryColor,
          inactiveTintColor: 'gray',
          indicatorStyle: {
            backgroundColor: primaryColor,
            borderWidth: 2.5,
            borderColor: primaryColor,
          },
          scrollEnabled: true,
          style: {height: 50},
          tabStyle: {
            borderRightWidth: 1,
            borderRightColor: primaryColor,
            width: 250,
          },
        }}>

        <Tab.Screen
          name={translate('tabs.vumEmb.rechByVH')}
          component={SortiPortListeByRefVh}
        />
        <Tab.Screen
          name={translate('tabs.vumEmb.rechByRef')}
          component={SortiPortByRefDec}
        />
      </Tab.Navigator>
    </View>
  );
}

class SortiPortScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MainStack.Navigator>
        <MainStack.Screen
          name="HomeSortiPort"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="SortiPortListeDeclaration2"
          component={SortiPortListeDeclaration}
          options={{headerShown: false}}
        />
      </MainStack.Navigator>
    );
  }
}

const styles = {
  container: {width: '100%', height: '100%'},
};
const mapStateToProps = (state) => ({...state.genericReducer});
export default connect(mapStateToProps, null)(SortiPortScreen);

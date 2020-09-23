import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import packageJson from '../../../../../package.json';
const Stack = createStackNavigator();
import _ from 'lodash';
import {connect} from 'react-redux';
import {
  primaryColor,
  primaryColorRgba,
  accentColor,
} from '../../../styles/ComThemeStyle';
import Spinner from 'react-native-loading-spinner-overlay';
import {translate} from '../../../i18n/ComI18nHelper';
import {navigationRef} from '../../../utils/ComRootNavigationUtils';

class ComBadrStackNavigatorComp extends React.Component {
  buildHeader = () => {
    /*
      Put the app header here
     */
    return <></>;
  };

  buildFooter = () => {
    /*
     Put the app footer here
    */
    return (
      <View>
        <Text style={styles.footerText}>
          {packageJson.name} - Version {packageJson.version}{' '}
        </Text>
      </View>
    );
  };
  render = () => {
    return (
      <View style={styles.container}>
        <View>{this.buildHeader()}</View>
        {this.props.showProgress && (
          <Spinner
            visible={true}
            cancelable={false}
            animation="fade"
            color={accentColor}
            overlayColor={'rgba(' + primaryColorRgba + ',0.80)'}
            textContent={translate('transverse.inprogress')}
            textStyle={[styles.spinnerTextStyle, styles.textStyle]}
          />
        )}
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator>{this.props.children}</Stack.Navigator>
        </NavigationContainer>
        <View>{this.buildFooter()}</View>
      </View>
    );
  };
}

const mapStateToProps = (state) => {
  let reducerHasLoading = _.pickBy(state, {showProgress: true});
  if (reducerHasLoading) {
    const target = _.keys(reducerHasLoading)[0];
    let nextProps = reducerHasLoading[target];
    if (target) {
      return {...nextProps};
    }
  }
  return {...state};
};

export default connect(mapStateToProps, null)(ComBadrStackNavigatorComp);

const styles = StyleSheet.create({
  container: {flex: 1},
  spinnerTextStyle: {
    color: primaryColor,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorHolder: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  footerText: {textAlign: 'center'},
  textStyle: {
    color: accentColor,
    fontSize: 20,
    fontWeight: 'normal',
  },
});

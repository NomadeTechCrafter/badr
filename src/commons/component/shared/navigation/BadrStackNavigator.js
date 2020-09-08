import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import packageJson from '../../../../../package.json';
const Stack = createStackNavigator();
import _ from 'lodash';
import {connect} from 'react-redux';
import {primaryColor, primaryColorRgba, accentColor} from '../../../styles';
import Spinner from 'react-native-loading-spinner-overlay';
import {translate} from '../../../i18n/I18nHelper';

class BadrStackNavigator extends React.Component {

  buildHeader = () => {
    /*
      Put the app header here
     */
    return <></>;
  }

  buildFooter = () => {
    /*
     Put the app footer here
    */
    return (<View>
      <Text style={styles.footerText}>{packageJson.name} - Version {packageJson.version} </Text>
    </View>);
  }
  render = () => {
    return (
      <View style={styles.container}>
        <View>
          {this.buildHeader()}
        </View>
        {this.props.showProgress && (
          <Spinner
            visible={true}
            cancelable={false}
            animation="fade"
            color={accentColor}
            overlayColor={'rgba(' + primaryColorRgba + ',0.80)'}
            textStyle={styles.spinnerTextStyle}
            textContent={translate('transverse.inprogress')}
            textStyle={{color: accentColor, fontSize: 20, fontWeight: 'normal'}}
          />
        )}
        <NavigationContainer>
          <Stack.Navigator>
            {this.props.children}
          </Stack.Navigator>
        </NavigationContainer>
        <View>
          {this.buildFooter()}
        </View>
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

export default connect(mapStateToProps, null)(BadrStackNavigator);

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
  footerText : {textAlign : 'center'}
});
import React from 'react';

import {View, Text, ScrollView, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {translate} from '../../../common/translations/i18n';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {primaryColor, accentColor} from '../../../styles/index';

import PlaquesImmatriculationSearch from './search';
import PlaquesImmatriculationResult from './result';

/**Custom Components */
import {
  BadrProgressBar,
  BadrCircleProgressBar,
  Toolbar,
} from '../../../components';

/** REDUX **/
import {connect} from 'react-redux';

const Tab = createMaterialTopTabNavigator();
/** CONSTANTS **/
const screenWidth = Dimensions.get('window').width;

function ResultScreen({route, navigation}) {
  return <PlaquesImmatriculationResult navigation={navigation} route={route} />;
}

function SearchScreen({route, navigation}) {
  return <PlaquesImmatriculationSearch navigation={navigation} route={route} />;
}

class PlaquesImmatriculation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Toolbar
          navigation={this.props.navigation}
          icon="menu"
          title={translate('referentiel.plaquesImm.title')}
          subtitle={translate('referentiel.plaquesImm.subTitle')}
        />
        {this.props.showProgress && <BadrProgressBar width={screenWidth} />}
        {/* {this.props.showProgress && <BadrCircleProgressBar size={30} />} */}
        <NavigationContainer independent={true}>
          <Tab.Navigator
            initialLayout={{height: Dimensions.get('window').height}}
            swipeEnabled={false}
            tabBarOptions={{
              labelStyle: {fontSize: 16, fontWeight: 'bold'},
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
            }}>
            <Tab.Screen name="Recherche" component={SearchScreen} />
            <Tab.Screen name="Resultat" component={ResultScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {...state.plaquesImmReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaquesImmatriculation);

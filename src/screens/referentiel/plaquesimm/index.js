import React from 'react';

import {View, Text, ScrollView, Dimensions} from 'react-native';

import {translate} from '../../../common/translations/i18n';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {primaryColor, accentColor} from '../../../styles/index';

import PlaquesImmatriculationSearch from './search';
import PlaquesImmatriculationResult from './result';

/**Custom Components */
import {BadrProgressBar, BadrCircleProgressBar, Toolbar} from '../../../components';

/** REDUX **/
import {connect} from 'react-redux';

const Tab = createMaterialTopTabNavigator();
/** CONSTANTS **/
const screenHeight = Dimensions.get('window').height;

class PlaquesImmatriculation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
      <Toolbar
            navigation={this.props.navigation}
            icon="menu"
            title={translate('referentiel.plaquesImm.title')}
            subtitle={translate('referentiel.plaquesImm.subTitle')}
          />
        {this.props.showProgress && <BadrProgressBar width={screenHeight} />}
         {/* {this.props.showProgress && <BadrCircleProgressBar size={30} />} */}
        <Tab.Navigator
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
          <Tab.Screen
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="search" color={color} size={size} />
              ),
            }}
            name="Recherche"
            component={PlaquesImmatriculationSearch}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="list" color={color} size={size} />
              ),
            }}
            name="Resultat"
            component={PlaquesImmatriculationResult}
          />

        </Tab.Navigator>
      </ScrollView>
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

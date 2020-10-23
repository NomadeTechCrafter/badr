import React from 'react';

import {View, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PlaquesImmatriculationSearch from './refPlaquesImmSearchScreen';
import PlaquesImmatriculationResult from './refPlaquesImmResultScreen';
import {connect} from 'react-redux';
import {primaryColor} from '../../../../commons/styles/ComThemeStyle';
import translate from '../../../../commons/i18n/ComI18nHelper';
import style from '../style/refPlaquesImmStyle';
import {
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
} from '../../../../commons/component';
const Tab = createMaterialTopTabNavigator();
function ResultScreen({route, navigation}) {
  return <PlaquesImmatriculationResult navigation={navigation} route={route} />;
}

function SearchScreen({route, navigation}) {
  return <PlaquesImmatriculationSearch navigation={navigation} route={route} />;
}

class RefPlaquesImmMainScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={style.container}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('plaquesImm.title')}
          subtitle={translate('plaquesImm.subTitle')}
        />
        {this.props.showProgress && <ComBadrProgressBarComp />}
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
)(RefPlaquesImmMainScreen);

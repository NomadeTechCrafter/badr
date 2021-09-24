import React from 'react';

import {Dimensions, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AtRechMultiSearch from './atRechMultiSearchScreen';
import AtRechMultiResult from './atRechMultiResultScreen';
/**Custom Components */
import {
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
} from '../../../../../commons/component';
/** REDUX **/
import {connect} from 'react-redux';

import {primaryColor} from '../../../../../commons/styles/ComThemeStyle';
import translate from '../../../../../commons/i18n/ComI18nHelper';

const Tab = createMaterialTopTabNavigator();

/** CONSTANTS **/
function ResultScreen({route, navigation}) {
  return <AtRechMultiResult navigation={navigation} route={route} />;
}

function SearchScreen({route, navigation}) {
  return <AtRechMultiSearch navigation={navigation} route={route} />;
}

class AtRechMultiMainScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('at.title')}
          subtitle={translate('at.recherche.subTitleMulti')}
        />
        {this.props.showProgress && <ComBadrProgressBarComp circle={false} />}
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
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {...state.atRechercheReducer};
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
)(AtRechMultiMainScreen);

const styles = StyleSheet.create({
  container: {width: '100%', height: '100%'},
});

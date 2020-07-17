import React from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import _ from 'lodash';
import {connect} from 'react-redux';

import {BadrProgressBar} from '../';

const Stack = createStackNavigator();
class BadrStackNavigator extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        {this.props.showProgress && <SmartLoader visible={true} />}
        <NavigationContainer>
          <Stack.Navigator>{this.props.children}</Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  };
}

const SmartLoader = (props) => {
  const {isLoading} = props;
  return (
    <Modal
      transparent
      animationType={'none'}
      visible={isLoading}
      onRequestClose={() => {}}>
      <BadrProgressBar />
      <View style={styles.modalBackground}></View>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  console.log('--------- BEGIN -------------');
  let reducerHasLoading = _.pickBy(state, {showProgress: true});
  if (reducerHasLoading) {
    let nextProps = reducerHasLoading[_.keys(reducerHasLoading)[0]];
    if (_.keys(reducerHasLoading)[0]) {
      console.log(nextProps);
      return {...nextProps};
    }
  }
  console.log('--------- END -------------');
  return {...state};
};

export default connect(mapStateToProps, null)(BadrStackNavigator);

const styles = StyleSheet.create({
  container: {flex: 1},
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
});

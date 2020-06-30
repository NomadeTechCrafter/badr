import React from 'react';

import {View, Text} from 'react-native';

export default class T6bis extends React.Component {
  render = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>T6BIS (under construction)</Text>
      </View>
    );
  };
}
const styles = {
  container: {justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 40, textAlign: 'center'},
};

import React from 'react';
import {View, Text} from 'react-native';

export default class NumeroPlaque extends React.Component {
  render() {
    const parts = this.props.numero.split('-');
    return (
      <Text>
        {parts[2]}
        {'- '}
        {parts[0]}
        {'- '}
        {parts[1]}
      </Text>
    );
  }
}

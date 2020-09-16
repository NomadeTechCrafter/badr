import React from 'react';
import {Text} from 'react-native';

export default class ComNumeroPlaqueRemorqueDiploComp extends React.Component {
  render() {
    return (
      <Text>
        {this.props.numero1 > 0 ? this.props.numero1 : ''}
        {this.props.numero1 > 0 && this.props.numero2 > 0 ? ' - ' : ''}
        {this.props.numero2 > 0 ? this.props.numero2 : ''}
      </Text>
    );
  }
}

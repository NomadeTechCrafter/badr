import React from 'react';
import {Text} from 'react-native';

import {CopyPaste} from '../';

export default class NumeroPlaque extends React.Component {
  buildNumero = parts => {
    return (
      ' \t' + parts[2] + '\t - \t' + parts[1] + '\t - \t' + parts[0] + '\t'
    );
  };

  render() {
    if (this.props.numero) {
      const parts = this.props.numero.split('-');
      const numero = this.buildNumero(parts);
      return <CopyPaste value={numero} />;
    } else {
      return <Text />;
    }
  }
}

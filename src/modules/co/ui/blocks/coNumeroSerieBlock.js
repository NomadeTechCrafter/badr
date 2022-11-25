import React from 'react';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {Col, Row} from 'react-native-easy-grid';
import {TextInput} from 'react-native-paper';

export default class CONumeroSerieBlock extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Row>
        <Col size={1} />
        <Col size={8}>
          <TextInput
            mode="outlined"
            label={translate('co.filtreRecherche.numeroSerie')}
            value={this.state.numeroSerie}
            onChangeText={(text) => this.setState({numeroSerie: text})}
          />
        </Col>
        <Col size={1} />
      </Row>
    );
  }
}

import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {TextInput, Button, Divider} from 'react-native-paper';
import {Col, Row} from 'react-native-easy-grid';

import {ComAccordionComp} from '../../../components';

export default class PlaquesImmatriculationFormationSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prenom: '',
    };
  }

  handleSearch = () => {
    this.props.navigation.navigate('Resultat', {});
  };

  render = () => {
    return (
      <ScrollView>
        <ComAccordionComp expanded={true} title="Recherche">
          <Row>
            <Col>
              <TextInput
                mode="outlined"
                style={styles.column}
                label="Prénom"
                value={this.state.prenom}
                onChangeText={(text) => this.setState({prenom: text})}
              />
            </Col>
          </Row>
          <Divider style={styles.divider} />
          <Row>
            <Col size={20} />
            <Col size={60}>
              <Button icon="check" mode="contained" onPress={this.handleSearch}>
                Rechercher
              </Button>
            </Col>
            <Col size={20} />
          </Row>
        </ComAccordionComp>
      </ScrollView>
    );
  };
}

const styles = StyleSheet.create({
  divider: {margin: 30},
  buttonIcon: {margin: 10, marginTop: 40},
  column: {
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    alignContent: 'space-around',
    margin: 10,
  },
});

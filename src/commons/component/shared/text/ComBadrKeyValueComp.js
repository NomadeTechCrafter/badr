import React from 'react';
import {View, Text} from 'react-native';
import {Row, Col} from 'react-native-easy-grid';
import {primaryColor, CustomStyleSheet} from '../../../styles/theme';

class ComBadrKeyValueComp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  buildValue = () => {
    return this.props.children ? (
      this.props.children
    ) : (
      <ValueComp value={this.props.value}></ValueComp>
    );
  };

  buildLibelle = () => {
    return this.props.libelle ? (
      <Col size={2}>
        <KeyComp
          style={this.props.style}
          libelle={this.props.libelle}></KeyComp>
      </Col>
    ) : (
      <></>
    );
  };

  render() {
    return this.props.rtl ? (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Col size={1}>{this.buildValue()}</Col>
        {this.buildLibelle()}
      </View>
    ) : (
      <View style={{flex: 1, flexDirection: 'row'}}>
        {this.buildLibelle()}
        <Col size={2}>{this.buildValue()}</Col>
      </View>
    );
  }
}

class KeyComp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={{...CustomStyleSheet.badrLibelleBleu, ...this.props.style}}>
        {this.props.libelle}
      </Text>
    );
  }
}

class ValueComp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Text>{this.props.value}</Text>;
  }
}

export default ComBadrKeyValueComp;

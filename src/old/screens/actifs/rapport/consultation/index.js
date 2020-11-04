import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import {
  ComContainerComp,
  ComBadrCardBoxComp,
  ComAccordionComp,
  ComBadrButtonComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
  BadrList,
  ComBadrLibelleComp,
  ComBadrPickerComp,
  ComBadrPickerCheckerComp,
  ComBadrItemsPickerComp,
} from '../../../../../commons/component';
import moment from 'moment';

import {
  Checkbox,
  TextInput,
  Text,
  RadioButton,
  Paragraph,
  TouchableRipple,
  Button,
  IconButton,
} from 'react-native-paper';
import {Col, Row, Grid} from 'react-native-easy-grid';
/**i18n */

import {connect} from 'react-redux';

import Entete from '../creation/entete';

class Consultation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let rows = '';
    if (this.props.value && this.props.value.jsonVO) {
      rows = this.props.value.jsonVO;
    }

    return <Entete />;
  }
}

const mapStateToProps = (state) => ({...state.consultationreducer});

export default connect(mapStateToProps, null)(Consultation);

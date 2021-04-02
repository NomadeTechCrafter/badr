import React from 'react';

import {FlatList, SafeAreaView, View} from 'react-native';

import {
  ComAccordionComp,
  ComBadrCardBoxComp,
  ComBadrLibelleComp,
  ComBadrListComp,
  ComBadrNumericTextInputComp,
} from '../../../../commons/component';
import {Button, RadioButton, Text, TextInput} from 'react-native-paper';
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import {CustomStyleSheet} from '../../../../commons/styles/ComThemeStyle';
import {Col, Grid, Row} from 'react-native-easy-grid';

export default class EcorExpInformationEcorComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      generateurNumScelleAu: '',
      generateurNumScelleDu: '',
      messagesErreur: [],
      listeNombreDeScelles: [],
      messageVisibility: false,
      message: '',
      messageType: '',
      selectedItemListScelle: '',
      includeScelles: false,
    };
  }
  render() {
    const {ecorInfo} = this.props;
    const {
      generateurNumScelleDu,
      generateurNumScelleAu,
      listeNombreDeScelles,
    } = this.state;
    return (
      <ComBadrCardBoxComp noPadding={true}>
        {/* Informations ECOR */}
        <ComAccordionComp
          title={translate(
            'mainlevee.delivrerMainlevee.informationsEcor.title',
          )}>
          <Grid>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={1}>
                <TextInput
                  mode={'outlined'}
                  maxLength={8}
                  value={ecorInfo.numeroPince}
                  label={translate(
                    'mainlevee.delivrerMainlevee.informationsEcor.numeroPince',
                  )}
                  style={CustomStyleSheet.badrInputHeight}
                  onChangeText={(text) =>
                    this.setState({
                      ecorInfo: {
                        ...this.state.ecorInfo,
                        numeroPince: text,
                      },
                    })
                  }
                />
              </Col>
              <Col size={1} />
              <Col size={1}>
                <ComBadrNumericTextInputComp
                  maxLength={8}
                  value={ecorInfo.nombreDeScelles}
                  label={translate(
                    'mainlevee.delivrerMainlevee.informationsEcor.nombreScelles',
                  )}
                  onChangeBadrInput={(text) =>
                    this.setState({
                      ecorInfo: {
                        ...this.state.ecorInfo,
                        nombreDeScelles: text,
                      },
                    })
                  }
                />
              </Col>
            </Row>
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col size={5}>
                <ComBadrLibelleComp withColor={true}>
                  {translate(
                    'mainlevee.delivrerMainlevee.informationsEcor.generateurScelle',
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrNumericTextInputComp
                  onRef={(input) => {
                    this.generateurNumScelleDu = input;
                  }}
                  maxLength={8}
                  value={this.state.generateurNumScelleDu}
                  label={translate('transverse.du')}
                  onChangeBadrInput={(text) =>
                    this.setState({
                      generateurNumScelleDu: text,
                    })
                  }
                />
              </Col>
              <Col size={1} />
              <Col size={2}>
                <ComBadrNumericTextInputComp
                  onRef={(input) => {
                    this.generateurNumScelleAu = input;
                  }}
                  maxLength={8}
                  value={generateurNumScelleAu}
                  label={translate('transverse.au')}
                  onChangeBadrInput={(text) =>
                    this.setState({
                      generateurNumScelleAu: text,
                    })
                  }
                />
              </Col>
              <Col size={2} />
              <Col size={1}>
                <Button
                  mode="contained"
                  compact="true"
                  onPress={this.genererNumeroScelle}>
                  {translate('transverse.Ok')}
                </Button>
              </Col>
              <Col size={2} />
            </Row>
            <Row style={[CustomStyleSheet.whiteRow, styles.rowListNumScelle]}>
              <Col size={5}>
                <ComBadrNumericTextInputComp
                  onRef={(input) => {
                    this.numeroScelleInput = input;
                  }}
                  maxLength={8}
                  value={this.numeroScelle}
                  label={translate(
                    'mainlevee.delivrerMainlevee.informationsEcor.numeroScelle',
                  )}
                  onChangeBadrInput={(text) => {
                    this.numeroScelle = text;
                  }}
                />
              </Col>
              <Col size={2} />

              <Col size={1}>
                <Button
                  onPress={this.addNumeroScelle}
                  icon="plus-box"
                  mode="contained"
                  compact="true"
                />
                <Button
                  onPress={this.deleteNumeroScelle}
                  icon="delete"
                  mode="contained"
                  compact="true"
                />
              </Col>
              <Col size={2} />
              <Col size={5}>
                <ComBadrListComp
                  data={listeNombreDeScelles}
                  onPressListItem={(index) =>
                    this.setState({selectedItemListScelle: index})
                  }
                />
              </Col>
            </Row>
          </Grid>
        </ComAccordionComp>
      </ComBadrCardBoxComp>
    );
  }
}
const styles = {
  rowListNumScelle: {
    height: 170,
  },
  boxContainer: {
    backgroundColor: '#ebecf3',
    borderRadius: 4,
  },
  boxSafeArea: {
    margin: '5%',
    height: 200,
    borderRadius: 4,
  },
  boxItem: {
    backgroundColor: '#ffffff',
    marginVertical: 2,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
  },
  boxItemText: {
    paddingLeft: '4%',
    color: '#000000',
  },
  selectedBoxItem: {
    backgroundColor: '#009ab2',
    marginVertical: 2,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
  },
  selectedBoxItemText: {
    paddingLeft: '4%',
    color: '#ffffff',
  },
  dualListContainer: {
    borderRadius: 10,
    width: '50%',
    paddingBottom: 30,
  },
};

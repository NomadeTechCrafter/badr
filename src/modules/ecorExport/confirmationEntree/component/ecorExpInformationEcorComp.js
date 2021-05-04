import React from 'react';

import {FlatList, SafeAreaView, View, TouchableOpacity} from 'react-native';

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
import style from '../style/ecorExpConfirmationEntreeStyle';
import _ from 'lodash';
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
      selectedScelle: {},
    };
    this.numeroScelle = '';
  }
  genererNumeroScelle = () => {
    console.log('generateurNumScelleDu');
    let listeScelles = [];
    var {
      generateurNumScelleDu,
      generateurNumScelleAu,
      listeNombreDeScelles,
    } = this.state;
    if (generateurNumScelleDu && generateurNumScelleAu) {
      if (
        generateurNumScelleDu.length === 8 &&
        generateurNumScelleAu.length === 8
      ) {
        var du = Number(generateurNumScelleDu);
        var au = Number(generateurNumScelleAu);
        if (au > du) {
          if (au - du <= 100) {
            console.log('generateurNumScelleDu ok condition');
            //$scope.listeNombreDeScelles = $scope.listeNombreDeScelles ? $scope.listeNombreDeScelles : [];
            var nbScelle = du;

            for (var i = du; i <= au; i++) {
              listeScelles.push(('00000000' + nbScelle).slice(-8));
              //this.setState({listeNombreDeScelles: listeNombreDeScelles});
              nbScelle += 1;
            }
            console.log('generateurNumScelleDu listeScelles', listeScelles);
            listeScelles.forEach((value) => {
              this.props.ecorInfo.scellesConfirmationEntree[value] = value;
            });
            console.log(
              'generateurNumScelleDu scellesConfirmationEntree',
              this.props.ecorInfo.scellesConfirmationEntree,
            );

            this.setState({
              generateurNumScelleDu: '',
              generateurNumScelleAu: '',
            });
            this.generateurNumScelleDu.clear();
            this.generateurNumScelleAu.clear();
            this.props.setError(null);
          } else {
            this.props.setError(translate('errors.maxNombreScelle'));
          }
        } else {
          this.props.setError(translate('errors.numScelleInferieur'));
        }
      } else {
        this.props.setError(translate('errors.numScelleLongueur'));
      }
    }
  };

  addNumeroScelle = () => {
    const {ecorInfo} = this.props;
    let numeroScelle = this.numeroScelle;
    if (numeroScelle && numeroScelle.length === 8) {
      console.log(
        'add selle arry ',
        Object.values(ecorInfo.scellesConfirmationEntree),
      );
      if (Object.values(ecorInfo.scellesConfirmationEntree).length < 100) {
        if (
          _.indexOf(
            Object.values(ecorInfo.scellesConfirmationEntree),
            numeroScelle,
          ) === -1
        ) {
          this.props.ecorInfo.scellesConfirmationEntree[
            numeroScelle
          ] = numeroScelle;
          console.log(
            'add selle',
            this.props.ecorInfo.scellesConfirmationEntree,
          );
          this.numeroScelleInput.clear();
          this.setState({
            numeroScelleInput: '',
          });
        } else {
          this.props.setError(translate('errors.numScelleExisteDeja'));
        }
      } else {
        this.props.setError(translate('errors.maxNombreScelle'));
      }
    } else {
      this.props.setError(translate('errors.numScelleLongueur'));
    }
  };

  deleteNumeroScelle = () => {
    var {selectedItemListScelle, listeNombreDeScelles} = this.state;
    if (
      selectedItemListScelle !== '' &&
      listeNombreDeScelles[selectedItemListScelle]
    ) {
      listeNombreDeScelles.splice(selectedItemListScelle, 1);
      this.setState({
        listeNombreDeScelles: listeNombreDeScelles,
      });
    }
  };
  renderBoxItem = ({item}) => {
    const itemStyle =
      item === this.state.selectedScelle
        ? style.selectedBoxItem
        : style.boxItem;
    const itemTextStyle =
      item === this.state.selectedScelle
        ? style.selectedBoxItemText
        : style.boxItemText;

    return (
      <View style={itemStyle}>
        <TouchableOpacity
          disabled={this.state.readonly}
          onPress={() =>
            this.setState({
              ...this.state,
              selectedScelle: item,
            })
          }>
          <Text style={itemTextStyle}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };
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
                  value={ecorInfo.numeroPinceConfirmationEntree}
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
                  value={ecorInfo.nombreScelleConfirmationEntree}
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
            <Row style={[CustomStyleSheet.whiteRow, style.rowListNumScelle]}>
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
                  style={{margin: 20}}
                />
                <Button
                  onPress={this.deleteNumeroScelle}
                  icon="delete"
                  mode="contained"
                  compact="true"
                  style={{margin: 20}}
                />
              </Col>
              <Col size={2} />

              <Col size={5} style={style.boxContainer}>
                <SafeAreaView style={style.boxSafeArea}>
                  {_.isEmpty(ecorInfo.scellesConfirmationEntree) && (
                    <Text style={style.boxItemText}>Aucun élément</Text>
                  )}

                  {!_.isEmpty(ecorInfo.scellesConfirmationEntree) && (
                    <FlatList
                      data={Object.values(ecorInfo.scellesConfirmationEntree)}
                      renderItem={(item) => this.renderBoxItem(item)}
                      keyExtractor={(item) => item}
                      nestedScrollEnabled={true}
                      disabled={this.props.readOnly}
                    />
                  )}
                </SafeAreaView>
              </Col>
            </Row>
          </Grid>
        </ComAccordionComp>
      </ComBadrCardBoxComp>
    );
  }
}

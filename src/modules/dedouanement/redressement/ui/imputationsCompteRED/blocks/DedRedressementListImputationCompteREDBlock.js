import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrButtonComp,
  ComBadrCardBoxComp,
  ComBadrErrorMessageComp,
  ComBadrLibelleComp,
  ComBasicDataTableComp,
} from '../../../../../../commons/component';
import {cleDS, getValueByPath} from '../../../utils/DedUtils';
import _ from 'lodash';
import {
  Checkbox,
  HelperText,
  Paragraph,
  RadioButton,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {translate} from '../../../../../../commons/i18n/ComI18nHelper';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../../../commons/styles/ComThemeStyle';
import DedRedressementRow from '../../common/DedRedressementRow';
import ComBadrKeyValueComp from '../../../../../../commons/component/shared/text/ComBadrKeyValueComp';
import * as ValiderCompteRedAction from '../../../../../dedouanement/redressement/state/actions/dedValiderCompteRedAction';
import * as Constants from '../../../state/DedRedressementConstants';
import {connect} from 'react-redux';
import dedUpdateRedressementAction from '../../../state/actions/dedUpdateRedressementAction';
import {REDRESSEMENT_UPDATE} from '../../../state/DedRedressementConstants';

class DedRedressementListImputationCompteREDBlock extends React.Component {

  buildCompteREDImputationsCols = () => {
    const styles = {

      flexDirectionRow: {
        flexDirection: 'row',
      },
          textRadio: {
        color: '#0a0a0a',
      },
      flexColumn: {flexDirection: 'row'},
    };
    return [
      {code: 'numeroImputation', libelle: 'N°', width: 20},

      {
        code: 'render',
        libelle: 'NGP',
        width: 100,
        render: (row) => {
          let npg = row.referenceRefLCR ? row.ngpRefLCR : row.ngpRefIntrant;
          let numArticle = row.referenceRefLCR ? row.spoRefLCR : '';
          return npg + '\n\r \n\r Spo/N° Article : ' + numArticle;
        },
      },
      {
        code: 'render',
        libelle: 'Orig',
        width: 45,
        render: (row) => {
          return row.referenceRefLCR
            ? row.paysOrigineRefLCR
            : row.paysOrigineRefIntrant;
        },
      },
      {
        code: 'render',
        libelle: 'Qté / Val Solde',
        width: 150,
        render: (row) => {
          let quantite = row.referenceRefLCR
            ? row.quantiteSoldeRefLCR
            : row.quantiteSoldeRefIntrant;
          let unite = row.referenceRefLCR
            ? row.uniteRefLCR
            : row.uniteRefIntran;
          let solde = row.referenceRefLCR ? row.valeurSoldeRefLCR : '';

          return _.join([quantite, unite, solde], '\n\r \n\r');
        },
      },
      {
        code: 'render',
        libelle: 'Qté nette à imputer',
        width: 200,
        render: (row) => {
          return (
            <ComBadrKeyValueComp
              children={
                <TextInput
                  mode="flat"
                  style={{width: 120, height: 40, fontSize: 12}}
                  placeholder={translate('transverse.cle')}
                  onChangeText={(text) =>
                    this.setState({quantiteNetteAImputer: text})
                  }
                  value={this.state.quantiteNetteAImputer}
                />
              }
            />
          );
        },
        /*render: (row) => {
          return (
            row.quantiteNetteAImputer +
            '\n\r \n\r Tx. Dech : ' +
            row.tauxDechets
          );
        },*/
      },
      {
        code: 'render',
        libelle: 'Qté / Val brute à imputer',
        width: 200,
        render: (row) => {
          return (
            <ComBadrKeyValueComp
              children={
                <TextInput
                  mode="flat"
                  style={{width: 150, height: 40, fontSize: 12}}
                  placeholder={translate('transverse.cle')}
                  onChangeText={(text) =>
                    this.setState({quantiteBruteAImputer: text})
                  }
                  value={this.state.quantiteBruteAImputer}
                />
              }
            />
          );
        },
        /*render: (row) => {
          return (
            row.quantiteBruteAImputer +
            '\n\r \n\r Tx. Dech : ' +
            row.valeurBruteAImputer
          );
        },*/
      },
      {
        code: 'render',
        libelle: 'Déch. taxables',
        width: 200,

        render: (row) => {
          return (
            <RadioButton.Group
              onValueChange={(value) =>
                this.setState({dechetsTaxables : value})
              }
              value={this.state.dechetsTaxables}>
              <View>
                <Text style={styles.textRadio}>
                 oui
                </Text>
                <RadioButton
                  color={styles.textRadio.color}
                  value="true"
                />
              </View>
              <View >
                <Text style={styles.textRadio}>
                non
                </Text>
                <RadioButton
                  color={styles.textRadio.color}
                  value="false"
                />
              </View>

            </RadioButton.Group>
          );
        },
      },
    ];
  };

  constructor(props) {
    super(props);
    this.state = {
      compteRedImputations: [],
      dedDumVo: this.props.data,
      dechets: false,
      dechetsTaxables:false,
      regimeDUM: '070',
      bureau: '309',
      regime: '023',
      annee: '2020',
      serie: '0000004',
      cle: 'E',
      cleValide: '',
      codeNGP: '5204110000',
      numeroSPO: '1',
      showErrorMsg: false,
      nouveau: false,
      quantiteBruteAImputer: '100',
      quantiteNetteAImputer: '90',
      compteRedImputationsCols: this.buildCompteREDImputationsCols(),
    };
    this.cols = [
      {code: 'numeroImputation', libelle: 'N°', width: 20},

      {
        code: 'render',
        libelle: 'NGP',
        width: 100,
        render: (row) => {
          let npg = row.referenceRefLCR ? row.ngpRefLCR : row.ngpRefIntrant;
          let numArticle = row.referenceRefLCR ? row.spoRefLCR : '';
          return npg + '\n\r \n\r Spo/N° Article : ' + numArticle;
        },
      },
      {
        code: 'render',
        libelle: 'Orig',
        width: 45,
        render: (row) => {
          return row.referenceRefLCR
            ? row.paysOrigineRefLCR
            : row.paysOrigineRefIntrant;
        },
      },
      {
        code: 'render',
        libelle: 'Qté / Val Solde',
        width: 150,
        render: (row) => {
          let quantite = row.referenceRefLCR
            ? row.quantiteSoldeRefLCR
            : row.quantiteSoldeRefIntrant;
          let unite = row.referenceRefLCR
            ? row.uniteRefLCR
            : row.uniteRefIntran;
          let solde = row.referenceRefLCR ? row.valeurSoldeRefLCR : '';

          return _.join([quantite, unite, solde], '\n\r \n\r');
        },
      },
      {
        code: 'quantiteNetteAImputer',
        libelle: 'Qté nette à imputer',
        width: 100,
      },
      {
        code: 'quantiteBruteAImputer',
        libelle: 'Qté / Val brute à imputer',
        width: 100,
      },
      {
        code: 'render',
        libelle: 'Déch. taxables',
        width: 80,

        render: (row) => {
          return row.dechetsTaxables === 'true' ? 'Oui' : 'Non';
        },
      },
    ];
  }
  static getDerivedStateFromProps(props, state) {
    if (
      props.data?.dedReferenceVO?.identifiant !=
      state.dedDumVo.dedReferenceVO?.identifiant
    ) {
      return {
        dedDumVo: props.data,
      };
    }
    return null;
  }
  updateRedressement = (data) => {
    let action = dedUpdateRedressementAction.update({
      type: REDRESSEMENT_UPDATE,
      value: data,
    });

    this.props.dispatch(action);
  };

  componentDidMount() {
    this.loadCompteREDList();
  }

  loadCompteREDList = () => {
    this.setState({
      compteRedImputations: getValueByPath(
        'dedDumSectionImputationsVO.ligneImputationMetierFormVO',
        this.props.data,
      ),
    });
  };
  _hasErrors = (field) => {
    return this.state.showErrorMsg && _.isEmpty(this.state[field]);
  };
  isCleValide = () => {
    return this.state.showErrorMsg && this.state.cle !== this.state.cleValide;
  };
  cleDUM = function (regime, serie) {
    let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
    /*while (serie.length < 6) {
        serie = '0' + serie;
      }*/
    if (serie.length > 6) {
      let firstSerie = serie.substring(0, 1);
      if (firstSerie == '0') {
        serie = serie.substring(1, 7);
      }
    }
    let obj = regime + serie;
    let RS = obj % 23;
    alpha = alpha.charAt(RS);
    return alpha;
  };
  addZeros = (input) => {
    let keyImput = _.keys(input)[0];
    if (input[keyImput] !== '') {
      this.setState({
        [keyImput]: _.padStart(input[keyImput], input.maxLength, '0'),
      });
    }
  };
  nouveau = () => {
    this.setState({nouveau: !this.state.nouveau});
  };
  confirmer = () => {
    if (!this.state.dechets) {
      let imputation = this.props?.picker['ded.validerCompteRED']?.data;
      imputation.numeroImputation = this.state.compteRedImputations.length + 1;
      imputation.quantiteBruteAImputer = this.state.quantiteBruteAImputer;
      imputation.quantiteNetteAImputer = this.state.quantiteNetteAImputer;
      imputation.dechetsTaxables = this.state.dechetsTaxables;
      this.setState(
        {
          compteRedImputations: [
            ...this.state.compteRedImputations,
            imputation,
          ],
        },
        () => console.log('imputationRed', this.state.compteRedImputations),
      );

      let dedDumVo = {
        ...this.state.dedDumVo,
        dedDumSectionImputationsVO: {
          ...this.state.dedDumVo.dedDumSectionEnteteVO,
          ligneImputationMetierFormVO: [
            ...this.state.compteRedImputations,
            imputation,
          ],
        },
      };
      this.setState(
        {
          dedDumVo: dedDumVo,
        },
        () => {
          this.props.update(dedDumVo);
        },
      );
    } else {
    }
  };
  ok = () => {
    this.setState({showErrorMsg: true});

    if (this.state.regime && this.state.serie) {
      this.state.cleValide = this.cleDUM(this.state.regime, this.state.serie);
      if (this.state.cle === this.state.cleValide) {
        var action = ValiderCompteRedAction.request(
          {
            type: Constants.VALIDER_COMPTE_RED_REQUEST,
            value: {
              login: this.state.login,
              command: 'ded.validerCompteRED',
              module: 'DED_LIB',
              // typeService: this.props.typeService,
              data: {
                dechets: this.state.dechets,
                regimeDUM: this.state.regimeDUM,
                bureau: this.state.bureau,
                regime: this.state.regime,
                annee: this.state.annee,
                serie: this.state.serie,
                cle: this.state.cle,
                codeNGP: this.state.codeNGP,
                numeroSPO: this.state.numeroSPO,
              },
            },
          },
          this.props.navigation,
          this.props.successRedirection,
        );
        this.props.actions.dispatch(action);
        console.log('dispatch fired !!');
      }
    }
  };

  render() {
    const lignesDeComptes = [];
    this.props?.picker['ded.validerCompteRED']?.data
      ? lignesDeComptes.push(this.props?.picker['ded.validerCompteRED']?.data)
      : '';
    console.log('ligne imputaton', lignesDeComptes[0]);
    return (
      <ScrollView style={styles.container}>
        {this.props.errorMessage != null && (
          <ComBadrErrorMessageComp message={this.props.errorMessage} />
        )}
        <ComAccordionComp title="" expanded={true}>
          <Row>
            <Col size={2}>
              <Text
                style={{padding: 10}}>{`Nombre total des liges de compte : ${
                this.state.compteRedImputations
                  ? this.state.compteRedImputations.length
                  : 0
              }`}</Text>
            </Col>
            <Col size={1} />
            <Col style={{alignItems: 'flex-end'}} size={2}>
              <View style={{flexDirection: 'row'}}>
                <TouchableRipple
                  onPress={() => {
                    this.setState({
                      dechets: !this.state.dechets,
                    });
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View pointerEvents="none">
                      <Checkbox
                        color={primaryColor}
                        status={this.state.dechets ? 'checked' : 'unchecked'}
                      />
                    </View>
                    <Paragraph>Imputation de déchets</Paragraph>
                  </View>
                </TouchableRipple>
              </View>
            </Col>
          </Row>

          <ComBasicDataTableComp
            rows={this.state.compteRedImputations}
            cols={this.cols}
            totalElements={
              this.state.compteRedImputations
                ? this.state.compteRedImputations.length
                : 0
            }
            maxResultsPerPage={5}
            paginate={true}
          />
          <View style={{alignItems: 'center'}}>
            <ComBadrButtonComp
              style={[styles.actionBtn]}
              onPress={() => {
                this.nouveau();
              }}
              text={
                !this.state.nouveau
                  ? translate('transverse.nouveau')
                  : translate('transverse.abandonner')
              }
            />
          </View>
        </ComAccordionComp>

        {this.state.nouveau && (
          <View>
            <ComAccordionComp title="Référence du compte à imputer">
              <ComBadrCardBoxComp noPadding={true}>
                <Grid style={styles.gridContainer}>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col size={20}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('transverse.bureau')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={20}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('transverse.regime')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={20}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('transverse.annee')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={20}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('transverse.serie')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={10}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('transverse.cle')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={20}>
                      <TextInput
                        error={this._hasErrors('bureau')}
                        keyboardType="numeric"
                        placeholder={translate('transverse.bureau')}
                        onChangeText={(text) => this.setState({bureau: text})}
                        value={this.state.bureau}
                        onEndEditing={(event) =>
                          this.addZeros({
                            bureau: event.nativeEvent.text,
                            maxLength: 3,
                          })
                        }
                      />
                    </Col>
                    <Col size={20}>
                      <TextInput
                        error={this._hasErrors('regime')}
                        keyboardType="numeric"
                        placeholder={translate('transverse.regime')}
                        onChangeText={(text) => this.setState({regime: text})}
                        value={this.state.regime}
                        onEndEditing={(event) =>
                          this.addZeros({
                            regime: event.nativeEvent.text,
                            maxLength: 3,
                          })
                        }
                      />
                    </Col>
                    <Col size={20}>
                      <TextInput
                        keyboardType="numeric"
                        error={this._hasErrors('annee')}
                        placeholder={translate('transverse.annee')}
                        onChangeText={(text) => this.setState({annee: text})}
                        value={this.state.annee}
                        onEndEditing={(event) =>
                          this.addZeros({
                            annee: event.nativeEvent.text,
                            maxLength: 4,
                          })
                        }
                      />
                    </Col>

                    <Col size={20}>
                      <TextInput
                        error={this._hasErrors('serie')}
                        keyboardType="numeric"
                        placeholder={translate('transverse.serie')}
                        onChangeText={(text) => this.setState({serie: text})}
                        value={this.state.serie}
                        onEndEditing={(event) =>
                          this.addZeros({
                            serie: event.nativeEvent.text,
                            maxLength: 7,
                          })
                        }
                      />
                    </Col>

                    <Col size={10}>
                      <TextInput
                        error={this.isCleValide('cle')}
                        keyboardType="numeric"
                        autoCapitalize={'characters'}
                        placeholder={translate('transverse.cle')}
                        onChangeText={(text) =>
                          this.setState({cle: text.replace(/[^A-Za-z]/g, '')})
                        }
                        value={this.state.cle}
                      />
                    </Col>
                  </Row>

                  <Row style={CustomStyleSheet.lightBlueRow}>
                    {this._hasErrors('bureau') && (
                      <HelperText
                        type="error"
                        padding="none"
                        visible={this._hasErrors('bureau')}>
                        {translate('errors.donneeObligatoire', {
                          champ: translate('transverse.bureau'),
                        })}
                      </HelperText>
                    )}
                    {this._hasErrors('regime') && (
                      <HelperText
                        type="error"
                        padding="none"
                        visible={this._hasErrors('regime')}>
                        {translate('errors.donneeObligatoire', {
                          champ: translate('transverse.regime'),
                        })}
                      </HelperText>
                    )}
                    {this._hasErrors('annee') && (
                      <HelperText
                        type="error"
                        padding="none"
                        visible={this._hasErrors('annee')}>
                        {translate('errors.donneeObligatoire', {
                          champ: translate('transverse.annee'),
                        })}
                      </HelperText>
                    )}
                    {this._hasErrors('serie') && (
                      <HelperText
                        type="error"
                        padding="none"
                        visible={this._hasErrors('serie')}>
                        {translate('errors.donneeObligatoire', {
                          champ: translate('transverse.serie'),
                        })}
                      </HelperText>
                    )}
                    {this.isCleValide('cle') && (
                      <HelperText
                        type="error"
                        padding="none"
                        style={styles.cleHelperMsg}
                        visible={this.isCleValide('cle')}>
                        {translate('errors.cleNotValid', {
                          cle: this.state.cleValide,
                        })}
                      </HelperText>
                    )}
                  </Row>
                </Grid>
              </ComBadrCardBoxComp>
            </ComAccordionComp>
            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Code NGP"
                children={
                  <TextInput
                    mode="flat"
                    style={{width: 160, height: 40, fontSize: 12}}
                    placeholder={translate('transverse.cle')}
                    onChangeText={(text) => this.setState({codeNGP: text})}
                    value={this.state.codeNGP}
                  />
                }
              />
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Spot/N° Article"
                children={
                  <View style={{flexDirection: 'row'}}>
                    <TextInput
                      style={{width: 160, height: 40, fontSize: 12}}
                      // label={translate('transverse.nouveau')}
                      placeholder={translate('dedouanement.articles.numSpot')}
                      onChangeText={(text) => this.setState({numeroSPO: text})}
                      value={this.state.numeroSPO}
                    />
                    <ComBadrButtonComp
                      style={{width: 50, height: 40}}
                      onPress={() => {
                        this.ok();
                      }}
                      text={translate('transverse.Ok')}
                    />
                  </View>
                }
              />
            </DedRedressementRow>
            <ComAccordionComp
              title={translate('dedouanement.info.nbrTotalLigneCon')}
              expanded={true}>
              <ComBasicDataTableComp
                ref="_badrTable"
                id="scannerTable"
                rows={lignesDeComptes}
                cols={this.state.compteRedImputationsCols}
                totalElements={lignesDeComptes.length}
                maxResultsPerPage={10}
                paginate={true}
                showProgress={this.props.showProgress}
                withId={false}
              />
            </ComAccordionComp>
            <DedRedressementRow
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <ComBadrButtonComp
                style={{height: 40}}
                onPress={() => {
                  this.confirmer();
                }}
                text={translate('transverse.confirmer')}
              />
              <ComBadrButtonComp
                style={{height: 40}}
                onPress={() => {
                  this.confirmer();
                }}
                text={translate('transverse.retablir')}
              />
            </DedRedressementRow>
          </View>
        )}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {...state.genericDedReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DedRedressementListImputationCompteREDBlock);

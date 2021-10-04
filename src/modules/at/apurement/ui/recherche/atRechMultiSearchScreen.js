import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import { View, ScrollView, StyleSheet } from 'react-native';
import { HelperText, TextInput, Button } from 'react-native-paper';
import { Col, Row } from 'react-native-easy-grid';
import {
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComAtRechercheRefComp,
  ComBadrToolbarComp,
  ComBadrCardWithTileComp,
  ComBadrCardBoxComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrKeyValueComp,
  ComBadrPickerComp,
  ComBadrAutoCompleteComp,
  ComBadrLibelleComp,
  ComBadrDialogComp,
} from '../../../../../commons/component';
import ComBadrReferentielPickerComp from '../../../../../commons/component/shared/pickers/ComBadrReferentielPickerComp';
import atRechercheAction, * as AtRechercheAction from '../../state/actions/atRechercheAction';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../../commons/styles/ComThemeStyle';
/** Utils */
import ComUtils from '../../../../../commons/utils/ComUtils';
import * as ConstantsAt from '../../state/atConstants';

const initialState = {
  bureau: '',
  annee: '',
  numero: '',
  serie: '',
  typeIdentifiant: '',
  identifiant: '',
  paysPasseport: '',
  nomVoyageur: '',
  typeComposant: '',
  matricule: '',
  pays: '',
  numChassis: '',
  showDataMatricule: false,
  errorMessage: null,
  typeIdent: '',
  ident: '',
  paysPP: '',
};

class AtRechMultiSearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  componentDidMount() {
    this.state = { ...initialState };
    // this.unsubscribe = this.props.navigation.addListener('focus', () => {
    //   this.onScreenReloaded();
    // });
  }

  componentWillUnmount() {
    // this.unsubscribe();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.qrCodeReducer.value &&
      nextProps.qrCodeReducer.value.data &&
      !nextProps.qrCodeReducer.qrFailed
    ) {
      this.setState({
        bureau: this.props.qrCodeReducer.value.data.slice(0, 3),
        annee: this.props.qrCodeReducer.value.data.slice(3, 7),
        numero: this.props.qrCodeReducer.value.data.slice(7, 10),
        serie: this.props.qrCodeReducer.value.data.slice(10, 17),
      });
    } else if (nextProps.qrCodeReducer && nextProps.qrCodeReducer.qrFailed) {
      this.setState({
        bureau: '',
        annee: '',
        numero: '',
        serie: '',
        showErrorMsg: false,
      });
    }
  }

  initRechercheAt() {
    var action = AtRechercheAction.init({
      type: ConstantsAt.RECH_MULTI_INIT,
      value: {},
    });
    this.props.actions.dispatch(action);
  }

  onScreenReloaded = () => {
    this.initRechercheAt();
  };

  handleTypeIdentChanged = (selectedValue, selectedIndex, item) => {
    this.setState({ typeIdentifiant: '' });
    if (selectedIndex !== 0) {
      this.setState({ typeIdentifiant: selectedValue });
    }
  };

  handleVoyageurChanged = (voyageur) => {
    this.setState({
      nomVoyageur: voyageur.code,
      typeIdent: voyageur.code.split(ConstantsAt.SEPAR_ID_VOY)[0],
      ident: voyageur.code.split(ConstantsAt.SEPAR_ID_VOY)[1],
      paysPP: voyageur.code.split(ConstantsAt.SEPAR_ID_VOY)[2],
    });
  };

  handlePaysChanged = (pays) => {
    this.setState({
      pays: pays.code,
    });
  };

  handleTypeCompoChanged = (selectedValue, selectedIndex, item) => {
    this.setState({
      typeComposant: '',
      showDataMatricule: false,
      matricule: '',
      pays: '',
    });
    if (selectedIndex !== 0) {
      this.setState({ typeComposant: selectedValue });
    }
    if (
      selectedValue === ConstantsAt.CODE_TYPE_COMP_VEHICULE ||
      selectedValue === ConstantsAt.CODE_TYPE_COMP_MOTO_QUAD
    ) {
      this.setState({ showDataMatricule: true });
    }
  };

  onChangeInput = (input) => {
    let keyImput = _.keys(input)[0];
    if (keyImput === 'bureau' || keyImput === 'annee' ||
      keyImput === 'numero' || keyImput === 'serie') {
      let keyImput = _.keys(input)[0];
      this.setState({ [keyImput]: input[keyImput].replace(/[^0-9]/g, '') });
    }
    else if (keyImput === 'paysPasseport') {
      this.setState({ [keyImput]: input[keyImput].replace(/[^A-Z]/g, '') });
    } else if (
      keyImput === 'identifiant' ||
      keyImput === 'matricule' ||
      keyImput === 'numChassis'
    ) {
      this.setState({ [keyImput]: input[keyImput].replace(/[^A-Z0-9]/g, '') });
    } else {
      this.setState({ [keyImput]: input[keyImput] });
    }
  };

  rechercher = () => {
    if (!this.validateChamps()) {
      return;
    }
    let reference = ComUtils.concatReference(this.state.bureau, this.state.annee, this.state.numero, this.state.serie);
    let referenceVO = null;
    if (!_.isEmpty(reference)) {
      referenceVO = {
        reference: reference,
        enregistre: true,
      }
    }
    let action = atRechercheAction.request(
      {
        type: ConstantsAt.RECH_MULTI_REQUEST,
        value: {
          atRechercheBean: {
            referenceVO: referenceVO,
            typeIdentifiant: this.state.typeIdentifiant,
            identifiant: this.state.identifiant,
            paysPasseport: this.state.paysPasseport,
            typeComposant: this.state.typeComposant,
            motoQuad:
              this.state.typeComposant === ConstantsAt.CODE_TYPE_COMP_MOTO_QUAD
                ? true
                : false,
            matricule: this.state.matricule,
            paysMatricule: this.state.pays,
            numChassis: this.state.numChassis,
            typeIdent: this.state.typeIdent,
            ident: this.state.ident,
            paysPP: this.state.paysPP,
          },
          pageSize: ConstantsAt.MAX_RESULTS_PER_PAGE,
          offset: 0,
        },
      },
      this.props.navigation,
    );
    this.props.actions.dispatch(action);
  };

  validateChamps = () => {
    this.setState({ errorMessage: null });
    if (
      _.isEmpty(this.state.bureau) &&
      _.isEmpty(this.state.annee) &&
      _.isEmpty(this.state.numero) &&
      _.isEmpty(this.state.serie) &&
      _.isEmpty(this.state.typeIdentifiant) &&
      _.isEmpty(this.state.identifiant) &&
      _.isEmpty(this.state.paysPasseport) &&
      _.isEmpty(this.state.typeComposant) &&
      _.isEmpty(this.state.matricule) &&
      _.isEmpty(this.state.pays) &&
      _.isEmpty(this.state.numChassis) &&
      _.isEmpty(this.state.typeIdent) &&
      _.isEmpty(this.state.ident) &&
      _.isEmpty(this.state.paysPP)
    ) {
      this.setState({ errorMessage: translate('at.recherche.msgRequiredField') });
      return false;
    }
    return true;
  };

  retablir = () => {
    this.cmbTypeIdent.clearInput();
    this.cmbTypeComp.clearInput();
    this.initRechercheAt();
    this.setState({...initialState});
  };

  addZeros = (input) => {
    let keyImput = _.keys(input)[0];
    if (input[keyImput] !== '') {
      this.setState({
        [keyImput]: _.padStart(input[keyImput], input.maxLength, '0'),
      });
    }
  };

  render() {
    return (
      <ScrollView>
        {this.state.errorMessage != null && (
          <View>
            <ComBadrErrorMessageComp
              onClose={() => (this.setState({ errorMessage: null }))}
              style={styles.centerErrorMsg}
              message={this.state.errorMessage}
              showError={true}
            />
          </View>
        )}
        {this.props.qrCodeReducer &&
          this.props.qrCodeReducer.errorMessage && (
            <ComBadrErrorMessageComp
              onClose={this.retablir}
              message={this.props.qrCodeReducer.errorMessage}
            />
          )}
        <ComBadrCardBoxComp style={styles.cardBox}>
          <ComBadrCardWithTileComp
            title={translate('at.recherche.critereTitle')}>
            <View>
              <Row size={100}>
                <Col size={100}>
                  <TextInput
                    maxLength={3}
                    keyboardType={'number-pad'}
                    value={this.state.bureau}
                    label={translate('transverse.bureau')}
                    onChangeText={(val) => this.onChangeInput({ bureau: val })}
                    onEndEditing={(event) =>
                      this.addZeros({
                        bureau: event.nativeEvent.text,
                        maxLength: 3,
                      })
                    }
                    style={styles.margin15}
                  />
                </Col>
                <Col size={100}>
                  <TextInput
                    maxLength={4}
                    keyboardType={'number-pad'}
                    value={this.state.annee}
                    label={translate('transverse.annee')}
                    onChangeText={(val) => this.onChangeInput({ annee: val })}
                    onEndEditing={(event) => {
                      this.addZeros({
                        annee: event.nativeEvent.text,
                        maxLength: 4,
                      });
                    }}
                    style={styles.margin15}
                  />
                </Col>
              </Row>
              <Row size={100}>
                <Col size={100}>
                  <TextInput
                    maxLength={3}
                    keyboardType={'number-pad'}
                    value={this.state.numero}
                    label={translate('transverse.numero')}
                    onChangeText={(val) => this.onChangeInput({ numero: val })}
                    onEndEditing={(event) =>
                      this.addZeros({
                        numero: event.nativeEvent.text,
                        maxLength: 3,
                      })
                    }
                    style={styles.margin15}
                  />
                </Col>
                <Col size={100}>
                  <TextInput
                    maxLength={7}
                    keyboardType={'number-pad'}
                    value={this.state.serie}
                    label={translate('transverse.serie')}
                    onChangeText={(val) => this.onChangeInput({ serie: val })}
                    onEndEditing={(event) =>
                      this.addZeros({
                        serie: event.nativeEvent.text,
                        maxLength: 7,
                      })
                    }
                    style={styles.margin15}
                  />
                </Col>
              </Row>
              <Row size={100}>
                <Col size={100}>
                  <ComBadrPickerComp
                    onRef={(ref) => (this.cmbTypeIdent = ref)}
                    key="cmbTypeIdent"
                    style={CustomStyleSheet.badrPicker}
                    titleStyle={CustomStyleSheet.badrPickerTitle}
                    title={translate('at.typeIdent')}
                    cle="code"
                    libelle="libelle"
                    module="AT"
                    command="getCmbTypeIdentVoy"
                    onValueChange={(selectedValue, selectedIndex, item) =>
                      this.handleTypeIdentChanged(
                        selectedValue,
                        selectedIndex,
                        item,
                      )
                    }
                    param={null}
                    typeService="SP"
                    storeWithKey="code"
                    storeLibelleWithKey="libelle"
                  />
                </Col>
              </Row>
              <Row size={100}>
                <Col size={50}>
                  <TextInput
                    value={this.state.identifiant}
                    style={styles.margin15}
                    underlineColor={primaryColor}
                    mode="outlined"
                    onChangeText={(val) =>
                      this.onChangeInput({ identifiant: val.toUpperCase() })
                    }
                    label={translate('at.identifiant')}
                  />
                </Col>
                <Col size={50}>
                  <TextInput
                    mode="outlined"
                    maxLength={3}
                    value={this.state.paysPasseport}
                    style={styles.margin15}
                    onChangeText={(val) =>
                      this.onChangeInput({ paysPasseport: val.toUpperCase() })
                    }
                    label={translate('at.pays')}
                  />
                </Col>
              </Row>
              <Row size={100}>
                <Col size={50}>
                  <ComBadrAutoCompleteChipsComp
                    placeholder={translate('at.nomVoyageur')}
                    selected={this.state.nomVoyageur}
                    code="code"
                    maxItems={5}
                    libelle="libelle"
                    command="getCmbVoyageur"
                    module="AT"
                    onDemand={true}
                    initialValue={{ code: '' }}
                    searchZoneFirst={false}
                    onValueChange={(item) => this.handleVoyageurChanged(item)}
                  />
                </Col>
                <Col size={50} />
              </Row>
              <Row size={100}>
                <Col size={100}>
                  <ComBadrPickerComp
                    onRef={(ref) => (this.cmbTypeComp = ref)}
                    key="cmbTypeComp"
                    style={CustomStyleSheet.badrPicker}
                    titleStyle={CustomStyleSheet.badrPickerTitle}
                    title={translate('at.typeCompo')}
                    cle="code"
                    libelle="libelle"
                    module="AT"
                    command="getAllTypeComposant"
                    onValueChange={(selectedValue, selectedIndex, item) =>
                      this.handleTypeCompoChanged(
                        selectedValue,
                        selectedIndex,
                        item,
                      )
                    }
                    param={null}
                    typeService="SP"
                    storeWithKey="code"
                    storeLibelleWithKey="libelle"
                  />
                </Col>
              </Row>
              {this.state.showDataMatricule === true && (
                <View>
                  <Row size={100}>
                    <Col size={50}>
                      <TextInput
                        mode="outlined"
                        style={styles.margin15}
                        value={this.state.matricule}
                        onChangeText={(val) =>
                          this.onChangeInput({ matricule: val.toUpperCase() })
                        }
                        label={translate('at.numMatricule')}
                      />
                    </Col>
                    <Col size={50}>
                      <ComBadrAutoCompleteChipsComp
                        placeholder={translate('at.pays')}
                        selected={this.state.pays}
                        code="code"
                        maxItems={5}
                        libelle="libelle"
                        command="getCmbPaysMatr"
                        module="AT"
                        onDemand={true}
                        searchZoneFirst={false}
                        initialValue={{ code: '' }}
                        onValueChange={(item) => this.handlePaysChanged(item)}
                      />
                    </Col>
                  </Row>
                  <Row size={100}>
                    <Col size={50}>
                      <TextInput
                        value={this.state.numChassis}
                        style={styles.margin15}
                        underlineColor={primaryColor}
                        mode="outlined"
                        onChangeText={(val) =>
                          this.onChangeInput({ numChassis: val.toUpperCase() })
                        }
                        label={translate('at.composants.numChassis')}
                      />
                    </Col>
                    <Col size={50} />
                  </Row>
                </View>
              )}
              <Row size={100}>
                <Col size={20} style={styles.margin15}>
                  <Button
                    loading={this.props.showProgress}
                    style={styles.btnAction}
                    mode="contained"
                    icon="magnify"
                    onPress={() => this.rechercher()}
                    compact="true">
                    {translate('at.recherche.rechercher')}
                  </Button>
                </Col>
                <Col size={20} style={styles.margin15}>
                  <Button
                    loading={this.props.showProgress}
                    style={styles.btnAction}
                    mode="contained"
                    icon="autorenew"
                    onPress={() => this.retablir()}
                    compact="true">
                    {translate('at.retablir')}
                  </Button>
                </Col>
              </Row>
            </View>
          </ComBadrCardWithTileComp>
        </ComBadrCardBoxComp>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  let clonedState = {
    atRechercheReducer: { ...state.atRechercheReducer },
    qrCodeReducer: { ...state.qrCodeReducer },
  };
  return clonedState;
}

function mapDispatchToProps(dispatch) {
  let actions = { dispatch };
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AtRechMultiSearchScreen);

const styles = StyleSheet.create({
  centerErrorMsg: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBox: {
    flexDirection: 'column',
    padding: 0,
    margin: 15,
  },
  margin15: {
    margin: 15,
  },
  btnAction: {
    padding: 5,
  },
});

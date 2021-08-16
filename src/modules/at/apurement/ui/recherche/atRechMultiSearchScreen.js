import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {View, ScrollView, StyleSheet} from 'react-native';
import {HelperText, TextInput, Button} from 'react-native-paper';
import {Col, Row} from 'react-native-easy-grid';
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
import * as ConstantsAt from '../../state/atConstants';

const initialState = {
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

class RechercheAtMulti extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...initialState};
  }

  componentDidMount() {
    this.state = {...initialState};
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.onScreenReloaded();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
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
    this.setState({typeIdentifiant: ''});
    if (selectedIndex !== 0) {
      this.setState({typeIdentifiant: selectedValue});
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
      this.setState({typeComposant: selectedValue});
    }
    if (
      selectedValue === ConstantsAt.CODE_TYPE_COMP_VEHICULE ||
      selectedValue === ConstantsAt.CODE_TYPE_COMP_MOTO_QUAD
    ) {
      this.setState({showDataMatricule: true});
    }
  };

  onChangeInput = (input) => {
    let keyImput = _.keys(input)[0];
    if (keyImput === 'paysPasseport') {
      this.setState({[keyImput]: input[keyImput].replace(/[^A-Z]/g, '')});
    } else if (
      keyImput === 'identifiant' ||
      keyImput === 'matricule' ||
      keyImput === 'numChassis'
    ) {
      this.setState({[keyImput]: input[keyImput].replace(/[^A-Z0-9]/g, '')});
    } else {
      this.setState({[keyImput]: input[keyImput]});
    }
  };

  rechercher = () => {
    console.log('this.state');
    console.log(this.state);
    if (!this.validateChamps()) {
      return;
    }
    let action = atRechercheAction.request(
      {
        type: ConstantsAt.RECH_MULTI_REQUEST,
        value: {
          atRechercheBean: {
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
        },
      },
      this.props.navigation,
    );
    this.props.navigation.navigate('Resultat', {
      login: this.state.login,
      first: true,
    });
    this.props.actions.dispatch(action);
  };

  validateChamps = () => {
    this.setState({errorMessage: null});
    if (
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
      this.setState({errorMessage: translate('at.recherche.msgRequiredField')});
      return false;
    }
    return true;
  };

  retablir = () => {
    this.initRechercheAt();
    this.setState({
      typeIdentifiant: '',
      identifiant: '',
      paysPasseport: '',
      nomVoyageur: '',
      typeComposant: '',
      matricule: '',
      numChassis: '',
      pays: '',
      showDataMatricule: false,
      typeIdent: '',
      ident: '',
      paysPP: '',
    });
  };

  render() {
    return (
      <ScrollView>
        {this.state.errorMessage != null && (
          <View>
            <ComBadrErrorMessageComp
              onClose={this.initRechercheAt()}
              style={styles.centerErrorMsg}
              message={this.state.errorMessage}
            />
          </View>
        )}
        <ComBadrCardBoxComp style={styles.cardBox}>
          <ComBadrCardWithTileComp
            title={translate('at.recherche.critereTitle')}>
            <View>
              <Row size={100}>
                <Col size={100}>
                  <ComBadrPickerComp
                    key="code"
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
                      this.onChangeInput({identifiant: val.toUpperCase()})
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
                      this.onChangeInput({paysPasseport: val.toUpperCase()})
                    }
                    label={translate('at.pays')}
                  />
                </Col>
              </Row>
              <Row size={100}>
                <Col size={50}>
                  <ComBadrAutoCompleteChipsComp
                    placeholder={translate('at.nomVoyageur')}
                    code="code"
                    maxItems={5}
                    libelle="libelle"
                    command="getCmbVoyageur"
                    module="AT"
                    onDemand={true}
                    initialValue={{code: ''}}
                    searchZoneFirst={false}
                    onValueChange={(item) => this.handleVoyageurChanged(item)}
                  />
                </Col>
                <Col size={50} />
              </Row>
              <Row size={100}>
                <Col size={100}>
                  <ComBadrPickerComp
                    key="code"
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
                          this.onChangeInput({matricule: val.toUpperCase()})
                        }
                        label={translate('at.numMatricule')}
                      />
                    </Col>
                    <Col size={50}>
                      <ComBadrAutoCompleteChipsComp
                        placeholder={translate('at.pays')}
                        code="code"
                        maxItems={5}
                        libelle="libelle"
                        command="getCmbPaysMatr"
                        module="AT"
                        onDemand={true}
                        searchZoneFirst={false}
                        initialValue={{code: ''}}
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
                          this.onChangeInput({numChassis: val.toUpperCase()})
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
  return {...state.atRechercheReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RechercheAtMulti);

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

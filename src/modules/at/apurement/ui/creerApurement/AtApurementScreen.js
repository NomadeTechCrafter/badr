import React from 'react';
import _ from 'lodash';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { HelperText, TextInput, Button } from 'react-native-paper';
import { Col, Row } from 'react-native-easy-grid';
import {connect} from 'react-redux';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComAtRechercheRefComp,
  ComBadrToolbarComp,
  ComBadrDialogComp,
  ComAccordionComp,
  ComBadrCardBoxComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrPickerComp,
  ComBasicDataTableComp,
  ComBadrTouchableButtonComp,
} from '../../../../../commons/component';
import {
  CustomStyleSheet,
} from '../../../../../commons/styles/ComThemeStyle';
import * as CreateApurementAction from '../../state/actions/atApurementCreateAction';
import * as InitApurementAction from '../../state/actions/atApurementInitAction';
import * as AtRechercheAction from '../../state/actions/atRechercheAction';
import * as AtConsulterAction from '../../state/actions/atConsulterAction';
import * as ConstantsAt from '../../state/atConstants';

const initialState = {
  reference: '',
  dialogVisibility: false,
  dialogMessage: '',
  apurAutoData: null,
  errorMessage:'',
  typeIdent: '',
  ident: '',
  paysPP: '',
  nomVoyageur: '',
  typeComposant: '',
  matricule: '',
  pays: '',
};

class CreerApurement extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
    this.setState({ showBlocRef: true });
    this.cols = [
      {
        code: 'referenceAt',
        libelle: translate('at.apurement.reference'),
        width: 150,
      },
      {
        code: 'dateCreation',
        libelle: translate('at.dateCreation'),
        width: 150,
      },
      {
        code: 'dateDebutAt',
        libelle: translate('at.dateDebutAt'),
        width: 150,
      },
      {
        code: 'dateFinAt',
        libelle: translate('at.dateFinAt'),
        width: 150,
      },
      {
        code: 'statut',
        libelle: translate('at.statut'),
        width: 100,
      },
    ];
  }

  onItemSelected = (row) => {
    let action = InitApurementAction.request(
      {
        type: ConstantsAt.INIT_APUR_REQUEST,
        value: {
          reference: row.referenceAt,
        },
      },
      this.props.navigation,
    );
    this.props.actions.dispatch(action);
  };

  showDialog = (message, data) => {
    this.setState({
      dialogVisibility: true,
      dialogMessage: message,
      apurAutoData: data,
    });
  };

  hideDialog = () => this.setState({dialogVisibility: false});

  componentDidMount() {
    this.state = {...initialState};
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.onScreenReloaded();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  initApurement = () => {
    let action = InitApurementAction.init({
      type: ConstantsAt.INIT_APUR_INIT,
      value: {},
    });
    this.props.actions.dispatch(action);
  };

  initRechercheAt() {
    var action = AtRechercheAction.init({
      type: ConstantsAt.RECH_MULTI_INIT,
      value: {},
    });
    this.props.actions.dispatch(action);
  }

  initConsulterAt() {
    var action = AtConsulterAction.init({
      type: ConstantsAt.CONSULTER_AT_INIT,
      value: {},
    });
    this.props.actions.dispatch(action);
  }

  onScreenReloaded = () => {
    this.initApurement();
    this.initRechercheAt();
    this.initConsulterAt();
    this.setState({ showBlocRef: true });
  };

  apurManuelle = (reference) => {
    let action = InitApurementAction.request(
      {
        type: ConstantsAt.INIT_APUR_REQUEST,
        value: {
          reference: reference,
        },
      },
      this.props.navigation,
    );
    this.props.actions.dispatch(action);
  };

  apurAutomatique = (reference) => {
    let action = InitApurementAction.requestAuto(
      {
        type: ConstantsAt.INIT_APURAUTO_REQUEST,
        value: {
          reference: reference,
        },
      },
      this,
    );
    this.props.actions.dispatch(action);
  };

  confirmApurAutomatique = () => {
    let action = CreateApurementAction.requestAutomatique(
      {
        type: ConstantsAt.CREATE_APURAUTO_REQUEST,
        value: {
          atVO: this.state.apurAutoData,
        },
      },
      this,
    );
    this.props.actions.dispatch(action);
    this.hideDialog();
  };

  handleVoyageurChanged = (voyageur) => {
    this.setState({
      nomVoyageur: voyageur.code,
      typeIdent: voyageur.code.split(ConstantsAt.SEPAR_ID_VOY)[0],
      ident: voyageur.code.split(ConstantsAt.SEPAR_ID_VOY)[1],
      paysPP: voyageur.code.split(ConstantsAt.SEPAR_ID_VOY)[2],
    });
  };
  handleTypeCompoChanged = (selectedValue, selectedIndex, item) => {
    this.setState({
      typeComposant: '',
    });
    if (selectedIndex !== 0) {
      this.setState({ typeComposant: selectedValue });
    }
  };
  handlePaysChanged = (pays) => {
    this.setState({
      pays: pays.code,
    });
  };
  onChangeInput = (input) => {
    let keyImput = _.keys(input)[0];
    this.setState({ [keyImput]: input[keyImput].replace(/[^A-Z0-9]/g, '') });
  };
  rechercher = () => {
    console.log(this.props);
    if (!this.validateChamps()) {
      return;
    }
    
    let action = AtRechercheAction.request(
      {
        type: ConstantsAt.RECH_MULTI_REQUEST,
        value: {
          atRechercheBean: {           
            typeComposant: this.state.typeComposant,
            motoQuad:
              this.state.typeComposant === ConstantsAt.CODE_TYPE_COMP_MOTO_QUAD
                ? true
                : false,
            matricule: this.state.matricule,
            paysMatricule: this.state.pays,   
            typeIdent: this.state.typeIdent,
            ident: this.state.ident,
            paysPP: this.state.paysPP,
            etat: [ConstantsAt.ETATOBJET_ENREGISTREE],
          },
          pageSize: ConstantsAt.MAX_RESULTS_PER_PAGE,
          offset: 0,
          isApurement:true,
        },
      },
      this.props.navigation,
    );
    this.props.actions.dispatch(action);
 
  };
  retablir = () => {
    this.cmbTypeComp.clearInput();
    this.initRechercheAt();
    this.setState({ ...initialState });
  };

  moreOption = () => {
    this.setState({ showBlocRef: !this.state.showBlocRef });
    this.initRechercheAt();
    this.setState({ ...initialState });
  };

  validateChamps = () => {
    this.setState({ errorMessage: null });
    if (_.isEmpty(this.state.typeComposant) &&
      _.isEmpty(this.state.matricule) &&
      _.isEmpty(this.state.pays) &&
      _.isEmpty(this.state.typeIdent) &&
      _.isEmpty(this.state.ident) &&
      _.isEmpty(this.state.paysPP)
    ) {
      this.setState({ errorMessage: translate('at.recherche.msgReqFieldApur') });
      return false;
    } else if ((_.isEmpty(this.state.typeComposant) ||
      _.isEmpty(this.state.matricule) ||
      _.isEmpty(this.state.pays)) &&
      (_.isEmpty(this.state.typeIdent) &&
        _.isEmpty(this.state.ident) &&
        _.isEmpty(this.state.paysPP))) {
      this.setState({ errorMessage: translate('at.recherche.msgReqFieldVeh') });
      return false;
    }
    return true;
  };

  render() {
    return (
      <ScrollView>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('at.title')}
          subtitle={translate('at.apurement.subTitleAction')}
        />
        {this.props.initApurementReducer.errorMessage != null && (
          <View style={styles.messages}>
            <ComBadrErrorMessageComp
              style={styles.centerErrorMsg}
              message={this.props.initApurementReducer.errorMessage}
            />
          </View>
        )}
        {this.props.initApurementReducer.messageInfo != null && (
          <View style={styles.messages}>
            <ComBadrInfoMessageComp
              style={styles.centerInfoMsg}
              message={this.props.initApurementReducer.messageInfo}
            />
          </View>
        )}
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
        {this.state.showBlocRef && (
          <ComAtRechercheRefComp
            onApurManuelle={(reference) => this.apurManuelle(reference)}
            onApurAutomatique={(reference) => this.apurAutomatique(reference)}
          />
        )}
        <View style={styles.flexDirectionRow}>
        <ComBadrTouchableButtonComp
          onPress={() => this.moreOption()}
            text={this.state.showBlocRef ? translate('at.optionRech') : translate('at.rechercheRef')}
          style={styles.touchableButtonStyle}
          />
        </View>
        <ComBadrDialogComp
          title={translate('at.apurementauto.confirmDialog.info')}
          confirmMessage={translate('at.apurementauto.confirmDialog.oui')}
          cancelMessage={translate('at.apurementauto.confirmDialog.non')}
          dialogMessage={this.state.dialogMessage}
          onCancel={this.hideDialog}
          onOk={this.confirmApurAutomatique}
          dialogVisibility={this.state.dialogVisibility}
        />
        {/* Option de recherche */}
        {!this.state.showBlocRef && (
        <View>
            <View style={styles.flexDirectionRow}>
              <Row size={100}>
                <Col size={100}>
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
              </Row>
              <Row size={100}>
                <Col size={100}>
                  <ComBadrPickerComp
                    onRef={(ref) => (this.cmbTypeComp = ref)}
                    key="cmbTypeComp"
                    style={styles.pickerComp}
                    titleStyle={CustomStyleSheet.badrPickerTitle}
                    title={translate('at.typeCompo')}
                    cle="code"
                    libelle="libelle"
                    module="AT"
                    command="getTypeComposantEntete"
                    // selectedValue={ConstantsAt.CODE_TYPE_COMP_VEHICULE}
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
                <Col size={20} style={styles.margin15}>
                  <Button
                    loading={this.props.atRechercheReducer.showProgress}
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
                    loading={this.props.atRechercheReducer.showProgress}
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
              <View style={styles.flexDirectionRow}>
                <Text style={styles.margin10}>
                  {translate('at.recherche.titleResult')} : {this.props.atRechercheReducer.data.length}
                </Text>
                <ComBasicDataTableComp
                  onRef={(ref) => (this.resultTable = ref)}
                  key="resultTable"
                  id="referenceAt"
                  rows={this.props.atRechercheReducer.data}
                  // rowCount={rowCount}
                  cols={this.cols}
                  // command="recupererListAt"
                  // module= {ConstantsAt.AT_MODULE}
                  // typeService="SP"
                  // searchObject={searchObject}
                  onItemSelected={this.onItemSelected}
                  totalElements={this.props.atRechercheReducer.data.length}
                  maxResultsPerPage={10}
                  paginate={true}
                  // paginateServer={true}
                  showProgress={this.props.atRechercheReducer.showProgress}
                />
              </View>
        </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  messages: {},
  centerErrorMsg: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerInfoMsg: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBox: {
    flexDirection: 'column',
    padding: 0,
    marginBottom: 15,
  },
  flexDirectionRow: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  margin15: {
    margin: 15,
  },
  pickerComp: {
    ...CustomStyleSheet.badrPicker,
    marginRight: 15,
    marginLeft:15,
  },
  btnAction: {
    padding: 5,
  },
  margin10: {
    margin: 10,
  },
  touchableButtonStyle: {
    width: 200, height: 30, margin: 5 },
});

function mapStateToProps(state) {
  let clonedState = {
    initApurementReducer: { ...state.initApurementReducer },
    atRechercheReducer: { ...state.atRechercheReducer },
  };
  return clonedState;
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreerApurement);

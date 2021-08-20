import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Col, Grid, Row } from 'react-native-easy-grid';
import {
  ComAccordionComp,
  ComBadrLibelleComp,
  ComBadrPickerComp,
  ComBadrAlphabetPickerComp,
  ComBadrToolbarComp,
  ComBadrButtonIconComp,
  ComBadrErrorMessageComp,
  ComBadrItemsPickerComp,
  ComBadrPopupComp,
  ComBasicDataTableComp,
} from '../../../../commons/component';
import {
  CustomStyleSheet,
} from '../../../../commons/styles/ComThemeStyle';
import styles from '../style/ecorExpConfirmationEntreeArriveeStyle';
import _ from 'lodash';
/**i18n */
import { translate } from '../../../../commons/i18n/ComI18nHelper';
import { connect } from 'react-redux';
import * as Constants from '../state/ecorExpConfirmationEntreeArriveeConstants';
import * as ConstantsArrivee from '../../confirmationArrivee/state/ecorExpConfirmationArriveeConstants';
import * as ConstantsEntree from '../../confirmationEntree/state/ecorExpConfirmationEntreeConstants';
import * as ConfirmationEntreeArriveeRechercheAction from '../state/actions/ecorExpConfirmationEntreeArriveeRechercheAction';
import * as ConfirmationArrivee from '../../confirmationArrivee/state/actions/ecorExpConfirmationArriveeRechercheAction';
import * as ConfirmationEntree from '../../confirmationEntree/state/actions/ecorExpConfirmationEntreeRechercheAction';
import { MODULE_ECOREXP, TYPE_SERVICE_SP } from '../../../../commons/Config';
import { ComSessionService } from '../../../../commons/services/session/ComSessionService';
import { TYPE_SERVICE_UC } from '../../../../commons/constants/ComGlobalConstants';

class ConfirmationEntreeArriveeRechercheScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      immatriculation: '5AAAED',
      localErrorMessage: '',
    };

    this.cols = [
      {
        code: 'reference',
        libelle: translate('confirmationEntree.ref'),
        width: 150,
      },
      {
        code: 'numeroVersion',
        libelle: translate('confirmationEntree.numeroVersion'),
        width: 200,
      },
      {
        code: 'dateEnregistrement',
        libelle: translate('confirmationEntree.dateEnreg'),
        width: 200,
      },
      {
        code: 'operateurDeclarant',
        libelle: translate('confirmationEntree.operateurDeclarant'),
        width: 200,
      },
      {
        code: '',
        libelle: 'Confirmation Entrée Arrivée',
        width: 150,
        icon: 'pencil',
        size: 25,
        component: 'button',
        action: (row, index) => this.onDeclarationChecked(row, index),
      },
    ];

  }


  initActionDataEntree = (referenceDed) => {
    let wsData = {
      bureau: referenceDed.slice(0, 3),
      regime: referenceDed.slice(3, 6),
      annee: referenceDed.slice(6, 10),
      serie: referenceDed.slice(10, 17),
      cle: '',
      referenceEnregistrement: '',
      dateEffectiveEnregistrement: '',
      numeroOrdreVoyage: '',
    };

    return {
      type: ConstantsEntree.INITCONFIRMATIONENTREE_ETATCHARGEMENT_REQUEST,
      value: {
        login: ComSessionService.getInstance().getLogin(),
        commande: 'initConfirmerEntree',
        module: MODULE_ECOREXP,
        typeService: TYPE_SERVICE_UC,
        data: wsData,
        referenceDed: referenceDed,
        cle: '',
      },
    };
  };


  initActionData = (referenceDed) => {
    let wsData = {
      bureau: referenceDed.slice(0, 3),
      regime: referenceDed.slice(3, 6),
      annee: referenceDed.slice(6, 10),
      serie: referenceDed.slice(10, 17),
      cle: '',
      referenceEnregistrement: '',
      dateEffectiveEnregistrement: '',
      numeroOrdreVoyage: '',
    };

    return {
      type: ConstantsArrivee.INITCONFIRMATIONARRIVEE_ETATCHARGEMENT_REQUEST,
      value: {
        login: ComSessionService.getInstance().getLogin(),
        commande: 'initConfirmerArrivee',
        module: MODULE_ECOREXP,
        typeService: TYPE_SERVICE_UC,
        data: wsData,
        referenceDed: referenceDed,
        cle: '',
      },
    };
  };

  onDeclarationChecked = (row, index) => {
    console.log(' Ligne selectionnée : ' + JSON.stringify(row));
    console.log('=======================================================================================================');

    if (true === row.confirmationEntree) {
      let referenceDed = row.reference;
      let dataAction = this.initActionDataEntree(referenceDed);
      // this.props.commande === 'initConfirmerEntree'
      let action = ConfirmationEntree.request(dataAction, this.props.navigation, 'ConfirmationEntreeResultScreen')
      this.props.actions.dispatch(action);
    } else {
      let referenceDed = row.reference;
      let dataAction = this.initActionData(referenceDed);
      // this.props.commande === 'initConfirmerArrivee'
      let action = ConfirmationArrivee.request(dataAction, this.props.navigation, 'ConfirmationArriveeResultScreen');
      this.props.actions.dispatch(action);
    }

  };

  retablir = () => {
    console.log('retablir');
    this.setState({
      immatriculation: '',
      localErrorMessage: '',
    });
  };

  confirmer = () => {
    this.setState({ showErrorMsg: true });
    if (this.state.immatriculation) {

      this.setState({
        localErrorMessage: '',
      });

      let action = ConfirmationEntreeArriveeRechercheAction.request({
        type: Constants.CONFIRMATION_ENTREE_ARRIVEE_REQUEST,
        value: {
          commande: 'findListDumConfirmerEntreeArrivee',
          module: MODULE_ECOREXP,
          typeService: TYPE_SERVICE_SP,
          data: {
            codeActeur: ComSessionService.getInstance().getLogin(),
            numeroImmatriculation: this.state.immatriculation,
            codeBureau: ComSessionService.getInstance().getCodeBureau(),
          },
        },
      });
      this.props.actions.dispatch(action);
    } else {
      this.state.localErrorMessage = 'Immatriculation : Valeur obligatoire.';
    }
  };

  render() {

    return (
      <View>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('confirmationEntree.title')}
          subtitle={translate('confirmationEntree.subTitleEA')}
          icon="menu"
        />
        <ScrollView
          horizontal={false}
          ref={(ref) => {
            this.scrollViewRef = ref;
          }}
          onLayout={(event) => {
            this.layout = event.nativeEvent.layout;
          }}>
          {!_.isEmpty(this.props.errorMessage) && (
            <ComBadrErrorMessageComp
              style={styles.centerErrorMsg}
              message={this.props.errorMessage}
            />
          )}
          {!_.isEmpty(this.state.localErrorMessage) && (
            <ComBadrErrorMessageComp
              style={styles.centerErrorMsg}
              message={this.state.localErrorMessage}
            />
          )}

          <View>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={2}>
                <ComBadrLibelleComp withColor={true} isRequired={true}>
                  {translate('confirmationEntree.immatriculation')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={4}>
                <TextInput
                  mode="outlined"
                  value={this.state.immatriculation}
                  onChangeText={(text) =>
                    this.setState({ immatriculation: text })
                  }
                />
              </Col>
              <Col size={2} />
            </Row>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={2} />
              <Col size={2}>
                <Button
                  onPress={this.confirmer}
                  icon="check"
                  compact="true"
                  mode="contained"
                  loading={this.props.showProgress}>
                  {translate('transverse.confirmer')}
                </Button>
              </Col>
              <Col size={1} />
              <Col size={2}>
                <Button onPress={this.retablir} icon="autorenew" mode="contained">
                  {translate('transverse.retablir')}
                </Button>
              </Col>
              <Col size={2} />
            </Row>

            <Row style={CustomStyleSheet.whiteRow}>
              <ComBasicDataTableComp
                ref="_badrTable"
                id="listConfirmationEntreeArrivee"
                rows={this.props?.data ? this.props?.data : []}
                cols={this.cols}
                totalElements={this.props?.data?.length}
                maxResultsPerPage={10}
                paginate={true}
                showProgress={this.props.showProgress}
              />
            </Row>
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.ecorExpConfirmationEntreeArriveeReducer };
}

function mapDispatchToProps(dispatch) {
  let actions = { dispatch };
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmationEntreeArriveeRechercheScreen);

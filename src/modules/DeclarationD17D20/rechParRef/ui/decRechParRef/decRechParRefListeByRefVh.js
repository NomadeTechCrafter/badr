import React from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {
  ComBadrButtonIconComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComAccordionComp as Accordion,
  ComBadrCardBoxComp as CardBox,
  ComBasicDataTableComp,
} from '../../../../../commons/component';
import _ from 'lodash';

import * as RechParRefRefVHAction from '../../state/actions/decRechParRefVhAction';
import {Button, HelperText, TextInput} from 'react-native-paper';
import * as Constants from '../../state/decRechParRefConstants';
import * as RechParRefInitAction from '../../state/actions/decRechParRefInitAction';
import { ComSessionService } from '../../../../../commons/services/session/ComSessionService';
import { accentColor } from '../../../../../commons/styles/ComThemeStyle';

const initialState = {
  matriculeVehicule: '',
  showErrorMsg: false,
};

class RechParRefListeByRefVh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...initialState};
    this.composantTablesCols = this.buildComposantsColumns(true);
  }

  componentDidMount() {
    var action = RechParRefInitAction.init();
    this.props.actions.dispatch(action);
    //this.state = {...initialState};
    // this.unsubscribe = this.props.navigation.addListener('focus', () => {
    //   this.onScreenReloaded();
    // });
  }

  componentWillUnmount() {
    // this.unsubscribe();
  }

  buildComposantsColumns = (actions) => {
    return [
      {
        code: 'dedo_num_enreg',
        libelle: translate('rechParRef.decEnDetail.ref'),
        width: 160,
      },
      {
        code: 'numeroVersion',
        libelle: 'Numero version',
        width: 160,
      },
      {
        code: 'nomOperateurDeclarant',
        libelle: 'Operateur',
        width: 200,
      },
      {
        code: 'matriculeVehicule',
        libelle: 'Matricule Vehicule',
        width: 150,
      },
      {
        code: '',
        libelle: 'Sorti du Port',
        width: 150,
        icon: 'eye',
        size: 25,
        component: 'button',
        action: (row, index) => this.onComponentChecked(row, index),
      },
    ];
  };

  onComponentChecked = (row, index) => {
    console.log(' Ref selectionner' + row.dedo_num_enreg);

    var action = RechParRefInitAction.request(
      {
        type: Constants.RECHERCHE_D17_DUM_REQUEST,
        value: {
          login: ComSessionService.getInstance().getLogin(),
          commande: 'ded.initRechercheDeclarationTryp',
          module: 'DED_LIB',
          typeService: 'UC',
          data: row.idPourRecherche,
        },
      },
      this.props.navigation,
      this.props.successRedirection,
    );
    this.props.actions.dispatch(action);
  };

  hasErrors = (field) => {
    return this.state.showErrorMsg && _.isEmpty(this.state[field]);
  };

  confirmer = () => {
    this.setState({showErrorMsg: true});
    if (this.state.matriculeVehicule && this.state.matriculeVehicule !== '') {
      const data = {
        codeBureau: ComSessionService.getInstance().getCodeBureau(),
        immatriculationVehicule: this.state.matriculeVehicule,
      };
      const action = {
        type: Constants.VU_EMB_RECH_BY_REF_VH_REQUEST,
        value: {
          login: ComSessionService.getInstance().getLogin(),
          commande: 'ded.getDecSortiPortParMatVehicule',
          module: 'DED_LIB',
          typeService: 'SP',
          data: data,
        },
      };

      this.props.actions.dispatch(RechParRefRefVHAction.request(action));
    }
  };

  retablir = () => {
    this.setState({ matriculeVehicule: '', showErrorMsg: false });
    var action = RechParRefInitAction.init();
    this.props.actions.dispatch(action);
  };

  render() {
    return (
      <ScrollView>
        {this.props.tryp &&
          this.props.tryp.errorMessage != null &&
          this.props.tryp.errorMessage !== '' && (
            <View style={styles.messages}>
              <ComBadrErrorMessageComp
                style={styles.centerErrorMsg}
                message={this.props.tryp.errorMessage}
              />
            </View>
          )}
        {this.props.vh?.messageInfo != null && (
          <View style={styles.messages}>
            <ComBadrInfoMessageComp
              style={styles.centerInfoMsg}
              message={this.props.vh?.messageInfo}
            />
          </View>
        )}
        <View style={styles.containerInputs}>
          <View>
            <TextInput
              style={{width: 300, marginTop: 20}}
              error={this.hasErrors('matriculeVehicule')}
              maxLength={20}
              value={this.state.matriculeVehicule}
              label={translate('rechParRef.matriculeVehicule')}
              onChangeText={(val) => this.setState({matriculeVehicule: val})}
            />
            <HelperText
              type="error"
              padding="none"
              visible={this.hasErrors('matriculeVehicule')}>
              {translate('errors.donneeObligatoire', {
                champ: translate('rechParRef.matriculeVehicule'),
              })}
            </HelperText>
          </View>
          <View style={styles.containerBtn}>
            <ComBadrButtonIconComp
              onPress={this.confirmer}
              icon="check"
              compact={false}
              style={styles.btnConfirmer}
              loading={this.props.showProgress}
              text={translate('transverse.confirmer')}
            />
            <Button
              onPress={this.retablir}
              icon="autorenew"
              mode="contained"
              style={styles.btnRetablir}>
              {translate('transverse.retablir')}
            </Button>
          </View>
        </View>

        {this.props.vh?.data && this.props.vh?.data?.length > 0 && (
          <CardBox style={styles.cardBox}>
            <Accordion
              badr
              title={''}
              expanded>
              <Text style={styles.nombreResult}>
                {translate('rechParRef.versions.nbreVersions')} :
                <Text style={styles.libelle}>{this.props.vh?.data?.length}</Text>
              </Text>
              <ComBasicDataTableComp
                badr
                onRef={(ref) => (this.badrComposantsTable = ref)}
                hasId={false}
                id="listeDecByRefVH"
                rows={this.props.vh?.data}
                cols={this.composantTablesCols}
                //onItemSelected={this.onComposantSelected}
                totalElements={
                  this.props.vh?.data?.length ? this.props.vh?.data?.length : 0
                }
                maxResultsPerPage={5}
                paginate={true}
              />
            </Accordion>
          </CardBox>
        )}
      </ScrollView>
    );
  }
}

const value = {
  fontSize: 14,
  fontWeight: 'bold',
};

const styles = StyleSheet.create({
  messages: {},
  nombreResult: { margin: 20, marginVertical: 10, ...value },
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
  containerInputs: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  btnConfirmer: {
    color: accentColor,
    padding: 5,
    marginRight: 15,
  },
  btnRetablir: {
    color: accentColor,
    padding: 5,
  },
});

function mapStateToProps(state) {
  return { vh: state.rechParRefVh, tryp: state.rechParRefInitReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RechParRefListeByRefVh);

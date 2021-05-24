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

import * as VuEmbRefVHAction from '../../state/actions/vuEmbRefVhAction';
import {Button, HelperText, TextInput} from 'react-native-paper';
import * as Constants from '../../state/vuEmbarquerConstants';
import * as VuEmbInitAction from '../../state/actions/vuEmbInitAction';

const initialState = {
  matriculeVehicule: '',
  showErrorMsg: false,
};

class VuEmbListeByRefVh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...initialState};
    this.composantTablesCols = this.buildComposantsColumns(true);
  }

  componentDidMount() {
    var action = VuEmbInitAction.init();
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
        libelle: translate('vuEmbarquee.decEnDetail.ref'),
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
        libelle: 'Vu Embarquer',
        width: 150,
        icon: 'pencil',
        size: 25,
        component: 'button',
        action: (row, index) => this.onComponentChecked(row, index),
      },
    ];
  };

  onComponentChecked = (row, index) => {
    console.log(' Ref selectionner' + row.dedo_num_enreg);
    var data = {
      referenceVO: {
        bureau: row.dedo_num_enreg.slice(0, 3),
        regime: row.dedo_num_enreg.slice(3, 6),
        annee: row.dedo_num_enreg.slice(6, 10),
        serie: row.dedo_num_enreg.slice(-7),
      },
      enregistree: true,
    };

    console.log(JSON.stringify(data));
    var action = VuEmbInitAction.request(
      {
        type: Constants.RECHERCHE_D17_DUM_REQUEST,
        value: {
          login: 'AD6025',
          commande: 'ded.vuEmbRechercheDeclarationTrypByRef',
          module: 'DED_LIB',
          typeService: 'UC',
          data: data,
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
        codeBureau: '309',
        immatriculationVehicule: this.state.matriculeVehicule,
      };
      const action = {
        type: Constants.VU_EMB_RECH_BY_REF_VH_REQUEST,
        value: {
          login: 'AD6025',
          commande: 'ded.getDecTryptiqueParMatVehicule',
          module: 'DED_LIB',
          typeService: 'SP',
          data: data,
        },
      };

      this.props.actions.dispatch(VuEmbRefVHAction.request(action));
    }
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
              label={translate('vuEmbarquee.matriculeVehicule')}
              onChangeText={(val) => this.setState({matriculeVehicule: val})}
            />
            <HelperText
              type="error"
              padding="none"
              visible={this.hasErrors('matriculeVehicule')}>
              {translate('errors.donneeObligatoire', {
                champ: translate('vuEmbarquee.matriculeVehicule'),
              })}
            </HelperText>
          </View>
          <View>
            <ComBadrButtonIconComp
              onPress={this.confirmer}
              icon="check"
              compact={false}
              style={styles.btnConfirmer}
              loading={this.props.showProgress}
              text={translate('transverse.confirmer')}
            />
          </View>
        </View>

        {this.props.vh?.data && this.props.vh?.data?.length > 0 && (
          <CardBox style={styles.cardBox}>
            <Accordion
              badr
              title={translate('vuEmbarquee.historique.title')}
              expanded>
              <Text style={styles.nombreResult}>
                {translate('vuEmbarquee.versions.nbreVersions')} :
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
  nombreResult: { margin: 20, marginVertical: 10, ...value },
});

function mapStateToProps(state) {
  return {vh: state.vuEmbRefVH, tryp: state.vuEmbInitReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VuEmbListeByRefVh);

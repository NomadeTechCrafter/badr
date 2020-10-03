/** React Components */
import React from 'react';
import {View, ScrollView, StyleSheet, Dimensions} from 'react-native';

/**Custom Components */
import {
  ComBadrPickerCheckerComp,
  ComBadrPickerComp,
  ComBadrFloatingButtonComp,
  ComBadrProgressBarComp,
  ComBadrErrorMessageComp,
} from '../../../../commons/component';

/** REDUX **/
import {connect} from 'react-redux';
import * as ConstantsConfirmCnx from '../../../common/constants/hab/confirmConnexion';
import * as confirmCnxAction from '../../../redux/actions/hab/confirmCnx';

/** STYLING **/
import {CustomStyleSheet} from '../../../styles/index';

import {translate} from '../../../../commons/i18n/ComI18nHelper';

/** Inmemory session */
import {ComSessionService} from '../../../../commons/services/session/ComSessionService';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBureau: '',
      selectedBureauIndex: 0,
      nomBureauDouane: '',
      selectedArrondissement: '',
      selectedArrondissementLibelle: '',
      selectedProfiles: [],
    };
  }

  buildConfirmConnexionAction = (
    navigation,
    codeBureau,
    listeProfilCoche,
    selectedArrondissement,
  ) => {
    var action = confirmCnxAction.request(
      {
        type: ConstantsConfirmCnx.CONFIRMCNX_REQUEST,
        value: {
          codeBureau: codeBureau,
          listeProfilCoche: listeProfilCoche,
          codeArrondissement: selectedArrondissement,
        },
      },
      navigation,
    );
    return action;
  };

  handleArrondissementChanged = (selectedValue, selectedIndex, item) => {
    this.setState({
      selectedArrondissement: selectedValue,
      selectedArrondissementLibelle: item.libelle,
    });
  };

  handleBureauChanged = (selectedValue, selectedIndex, item) => {
    this.setState({
      selectedBureau: selectedValue,
      selectedBureauIndex: selectedIndex,
      nomBureauDouane: item.nomBureauDouane,
      selectedArrondissement: '',
    });
    this.comboArrondissements.refresh(selectedValue, this.comboBureaux);
  };

  handleOnConfirmProfils = (items) => {};

  handleOnProfilItemsChanged = (items) => {
    this.setState({selectedProfiles: items});
  };

  handleConfirmButton = () => {
    if (this.state.selectedBureau != null) {
      let action = this.buildConfirmConnexionAction(
        this.props.navigation,
        this.state.selectedBureau,
        this.state.selectedProfiles,
        this.state.selectedArrondissement,
      );
      /** Update Inmemory session */
      ComSessionService.getInstance().setCodeBureau(this.state.selectedBureau);
      ComSessionService.getInstance().setNomBureauDouane(
        this.state.nomBureauDouane,
      );
      ComSessionService.getInstance().setCodeArrondissement(
        this.state.selectedArrondissement,
      );
      ComSessionService.getInstance().setLibelleArrondissement(
        this.state.selectedArrondissementLibelle,
      );
      ComSessionService.getInstance().setProfiles(this.state.selectedProfiles);

      this.props.actions.dispatch(action);
    } else {
      this.setState({});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.confirmConnexionReducer.showProgressConfirmCnx && (
          <ComBadrProgressBarComp />
        )}
        <ScrollView>
          <View>
            {this.props.confirmConnexionReducer.displayError && (
              <ComBadrErrorMessageComp
                message={this.props.confirmConnexionReducer.errorMessage}
              />
            )}
          </View>

          <ComBadrPickerComp
            onRef={(ref) => (this.comboBureaux = ref)}
            key="bureau"
            style={CustomStyleSheet.badrPicker}
            titleStyle={CustomStyleSheet.badrPickerTitle}
            title={translate('profile.listeBureaux')}
            cle="codeBureau"
            libelle="nomBureauDouane"
            module="REF_LIB"
            command="getListeBureaux"
            onValueChange={(selectedValue, selectedIndex, item) =>
              this.handleBureauChanged(selectedValue, selectedIndex, item)
            }
            param=""
            typeService="SP"
            storeWithKey="bureau"
            storeLibelleWithKey="nomBureauDouane"
          />

          <ComBadrPickerComp
            onRef={(ref) => (this.comboArrondissements = ref)}
            style={CustomStyleSheet.badrPicker}
            titleStyle={CustomStyleSheet.badrPickerTitle}
            key="arrondissements"
            title={translate('profile.listeArrondissements')}
            cle="code"
            libelle="libelle"
            module="REF_LIB"
            command="getArrondissementsByAgentAndBureau"
            onValueChange={(selectedValue, selectedIndex, item) =>
              this.handleArrondissementChanged(
                selectedValue,
                selectedIndex,
                item,
              )
            }
            param={this.state.selectedBureau}
            typeService="SP"
            storeWithKey="arrondissement"
            storeLibelleWithKey="libelle"
          />

          <ComBadrPickerCheckerComp
            key="profil"
            title={translate('profile.listeProfils')}
            titleStyle={CustomStyleSheet.badrPickerTitle}
            style={CustomStyleSheet.badrPicker}
            cle="codeProfil"
            libelle="libelleProfil"
            module="HAB_LIB"
            command="getListeProfil"
            onValueChange={(selectedValue, selectedIndex) =>
              this.handleProfileChanged(selectedValue, selectedIndex)
            }
            param=""
            typeService="SP"
            onConfirm={this.handleOnConfirmProfils}
            onSelectedItemObjectsChange={this.handleOnProfilItemsChanged}
          />
        </ScrollView>

        <ComBadrFloatingButtonComp
          visible={
            this.state.selectedBureauIndex > 0 &&
            this.state.selectedProfiles.length > 0
          }
          onConfirm={this.handleConfirmButton}
          icon="check"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

function mapStateToProps(state) {
  return {...state};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

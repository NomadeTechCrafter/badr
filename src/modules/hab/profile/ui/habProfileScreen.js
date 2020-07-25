/** React Components */
import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';

import style from '../style/habLoginStyle';

/** REDUX **/
import {connect} from 'react-redux';

import * as ConstantsConfirmCnx from '../state/habProfileConstants';
import * as confirmCnxAction from '../state/actions/habProfileAction';

/** STYLING **/
import {CustomStyleSheet} from '../../../../commons/styles';

/** Inmemory session */
import {Session} from '../../../../commons/services/session/Session';
import {translate} from '../../../../commons/i18n';
import BadrProgressBar from '../../../../commons/component/shared/progressbars/BadrProgressBar';
import BadrErrorMessage from '../../../../commons/component/shared/messages/Error';
import BadrPicker from '../../../../commons/component/shared/pickers/BadrPicker';
import BadrPickerChecker from '../../../../commons/component/shared/pickers/BadrPickerChecker';
import BadrFloatingButton from '../../../../commons/component/shared/buttons/BadrFloatingButton';

class habProfileScreen extends React.Component {
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
    console.log(item);
  };

  handleBureauChanged = (selectedValue, selectedIndex, item) => {
    this.setState({
      selectedBureau: selectedValue,
      selectedBureauIndex: selectedIndex,
      nomBureauDouane: item.nomBureauDouane,
      selectedArrondissement: '',
    });
    this.comboArrondissements.refresh(selectedValue, this.comboBureaux);
    console.log(item);
  };

  handleOnConfirmProfils = (items) => {
    console.log(items);
  };

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
      Session.getInstance().setCodeBureau(this.state.selectedBureau);
      Session.getInstance().setNomBureauDouane(this.state.nomBureauDouane);
      Session.getInstance().setCodeArrondissement(
        this.state.selectedArrondissement,
      );
      Session.getInstance().setLibelleArrondissement(
        this.state.selectedArrondissementLibelle,
      );
      Session.getInstance().setProfiles(this.state.selectedProfiles);

      this.props.actions.dispatch(action);
    } else {
      this.setState({});
    }
  };

  render() {
    console.log(this.props);
    return (
      <View style={style.container}>
        {this.props.confirmConnexionReducer.showProgress && (
          <BadrProgressBar/>
        )}
        <ScrollView>
          <View>
            {this.props.confirmConnexionReducer.displayError && (
              <BadrErrorMessage
                message={this.props.confirmConnexionReducer.errorMessage}
              />
            )}
          </View>

          <BadrPicker
            toggle={true}
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

          <BadrPicker
            toggle={true}
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

          <BadrPickerChecker
            toggle={true}
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

        <BadrFloatingButton
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

function mapStateToProps(state) {
  return {...state};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(habProfileScreen);

/** React Components */
import React from 'react';
import {View, ScrollView} from 'react-native';

import style from '../style/habLoginStyle';

/** REDUX **/
import {connect} from 'react-redux';

import * as ConstantsConfirmCnx from '../state/habProfileConstants';
import * as confirmCnxAction from '../state/actions/habProfileAction';

/** STYLING **/
import {CustomStyleSheet} from '../../../commons/styles';


/** Inmemory session */
import {CommonSession} from '../../../commons/services/session/commonSession';
import {translate} from '../../../commons/i18n';
import BadrProgressBar from '../../../commons/component/progressbars/BadrProgressBar';
import BadrErrorMessage from '../../../commons/component/messages/Error';
import BadrPicker from '../../../commons/component/pickers/BadrPicker';
import BadrPickerChecker from '../../../commons/component/pickers/BadrPickerChecker';
import BadrFloatingButton from '../../../commons/component/buttons/BadrFloatingButton';

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
    let action = confirmCnxAction.request(
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

  handleConfirmButton = () => {
    if (this.state.selectedBureau != null) {
      let action = this.buildConfirmConnexionAction(
        this.props.navigation,
        this.state.selectedBureau,
        this.state.selectedProfiles,
        this.state.selectedArrondissement,
      );
      /** Update Inmemory session */
      CommonSession.getInstance().setCodeBureau(this.state.selectedBureau);
      CommonSession.getInstance().setNomBureauDouane(this.state.nomBureauDouane);
      CommonSession.getInstance().setCodeArrondissement(
        this.state.selectedArrondissement,
      );
      CommonSession.getInstance().setLibelleArrondissement(
        this.state.selectedArrondissementLibelle,
      );
      CommonSession.getInstance().setProfiles(this.state.selectedProfiles);

      this.props.actions.dispatch(action);
    } else {
      this.setState({});
    }
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

  handleOnProfileItemsChanged = (items) => {
    this.setState({selectedProfiles: items});
  };

  render = () => {
    return (
      <View style={style.container}>
        {this.props.confirmConnexionReducer.showProgressConfirmCnx && (
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
            key="profil"
            title={translate('profile.listeProfils')}
            titleStyle={CustomStyleSheet.badrPickerTitle}
            style={CustomStyleSheet.badrPicker}
            cle="codeProfil"
            libelle="libelleProfil"
            module="HAB_LIB"
            command="getListeProfil"
            param=""
            typeService="SP"
            onSelectedItemObjectsChange={this.handleOnProfileItemsChanged}
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
  };
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

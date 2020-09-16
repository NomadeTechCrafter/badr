/** React Components */
import React from 'react';
import {View, ScrollView} from 'react-native';

import style from '../style/habProfileStyle';

/** REDUX **/
import {connect} from 'react-redux';

import * as ConstantsConfirmCnx from '../state/habProfileConstants';
import * as confirmCnxAction from '../state/actions/habProfileAction';

/** STYLING **/
import {CustomStyleSheet} from '../../../../commons/styles/theme';

/** Inmemory session */
import {Session} from '../../../../commons/services/session/Session';
import {translate} from '../../../../commons/i18n/I18nHelper';
import ComBadrProgressBarComp from '../../../../commons/component/shared/progressbars/ComBadrProgressBarComp';
import ComBadrErrorMessageComp from '../../../../commons/component/shared/messages/ComBadrErrorMessageComp';
import ComBadrPickerComp from '../../../../commons/component/shared/pickers/ComBadrPickerComp';
import ComBadrPickerCheckerComp from '../../../../commons/component/shared/pickers/ComBadrPickerCheckerComp';
import ComBadrFloatingButtonComp from '../../../../commons/component/shared/buttons/ComBadrFloatingButtonComp';
class habProfileScreen extends React.Component {
  /*
     Constructor
  */
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
  /*
    componentDidMount Initialization
    */
  componentDidMount() {
    //HttpHelper.sendStats('user', 'profile').then(console.log('send stats'));
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
    return (
      <View style={style.container}>
        {this.props.confirmConnexionReducer.showProgress && (
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

          <ComBadrPickerComp
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

          <ComBadrPickerCheckerComp
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

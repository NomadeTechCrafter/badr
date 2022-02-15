/** React Components */
import React from 'react';
import {View, ScrollView} from 'react-native';

import style from '../style/habOperatStyle';

/** REDUX **/
import {connect} from 'react-redux';

import * as ConstantsConfirmCnx from '../state/habOperatConstants';
import * as confirmCnxAction from '../state/actions/habOperatAction';

/** STYLING **/
import {CustomStyleSheet} from '../../../../commons/styles/ComThemeStyle';

/** Inmemory session */
import {ComSessionService} from '../../../../commons/services/session/ComSessionService';
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import ComBadrProgressBarComp from '../../../../commons/component/shared/progressbars/ComBadrProgressBarComp';
import ComBadrErrorMessageComp from '../../../../commons/component/shared/messages/ComBadrErrorMessageComp';
import ComBadrPickerComp from '../../../../commons/component/shared/pickers/ComBadrPickerComp';
import ComBadrPickerCheckerComp from '../../../../commons/component/shared/pickers/ComBadrPickerCheckerComp';
import ComBadrFloatingButtonComp from '../../../../commons/component/shared/buttons/ComBadrFloatingButtonComp';
class habOperateurScreen extends React.Component {
  /*
     Constructor
  */
  constructor(props) {
    super(props);
    this.state = {
      selectedOperateur: '',
      selectedOperateurIndex: 0,

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
    operateur
  ) => {
    var action = confirmCnxAction.request(
      {
        type: ConstantsConfirmCnx.CONFIRMCNX_DECLARANT_REQUEST,
        value: {
          operateur: operateur
        },
      },
      navigation,
    );
    return action;
  };

  handleOperateurChanged = (selectedValue, selectedIndex, item) => {
    console.log('----------------------------handleOperateurChanged------------------------------------');
    console.log('----------------------------------------------------------------');
    console.log('----------------------------------------------------------------');
    console.log('----------------------------------------------------------------');
    console.log(JSON.stringify(selectedValue));
    console.log('----------------------------------------------------------------');
    console.log('----------------------------------------------------------------');
    console.log('----------------------------------------------------------------');
    console.log('-----------------------------handleOperateurChanged-----------------------------------');
    this.setState({
      selectedOperateurIndex: selectedValue,
      selectedOperateur: item ? item.libelle : '',
    });
  };





  handleConfirmButton = () => {
  console.log('inside confirm',this.state.selectedOperateurIndex)
    if (this.state.selectedOperateurIndex != null) {

      let action = this.buildConfirmConnexionAction(
        this.props.navigation,
        this.state.selectedOperateurIndex
      );
      /** Update Inmemory session */
    //  ComSessionService.getInstance().selectedOperateurIndex(this.state.selectedOperateurIndex);


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
            toggle={false}
            onRef={(ref) => (this.comboBureaux = ref)}
            key="operateur"
            style={CustomStyleSheet.badrPicker}
            titleStyle={CustomStyleSheet.badrPickerTitle}
            title={translate('operateur.listeOperateurs')}
            cle="codeOperateur"
            libelle="nomOperateur"
            module="REF_LIB"
            command="getListeOperateurs"
            onValueChange={(selectedValue, selectedIndex, item) =>
              this.handleOperateurChanged(selectedValue, selectedIndex, item)
            }
            param=""
            typeService="SP"
            storeWithKey="operateur"
            storeLibelleWithKey="nomOperateur"
          />


        </ScrollView>

        <ComBadrFloatingButtonComp
          visible={
            this.state.selectedOperateurIndex > 0
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

export default connect(mapStateToProps, mapDispatchToProps)(habOperateurScreen);

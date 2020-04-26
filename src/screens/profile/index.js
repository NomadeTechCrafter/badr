import React from 'react';

import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import BadrPicker from '../../components/pickers/BadrPicker';
import BadrPickerChecker from '../../components/pickers/BadrPickerChecker';
import {BadrFloatingButton} from '../../components/buttons/BadrFloatingButton';
import {BadrProgressBar} from '../../components/progressbars/BadrProgressBar';

/** REDUX **/
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as ConstantsConfirmCnx from '../../common/constants/confirmConnexion';
import * as confirmCnxAction from '../../redux/actions/confirmCnx';

/** STYLING **/
import {CustomStyleSheet} from '../../styles/index';

import {translate} from '../../common/translations/i18n';

/** CONSTANTS **/
const screenHeight = Dimensions.get('window').height;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBureau: '',
      selectedArrondissement: '',
      selectedProfiles: [],
    };
  }

  buildConfirmConnexionAction = (
    navigation,
    codeBureau,
    listeProfilCoche,
    login,
  ) => {
    var action = confirmCnxAction.request(
      {
        type: ConstantsConfirmCnx.CONFIRMCNX_REQUEST,
        value: {
          login: login,
          codeBureau: codeBureau,
          listeProfilCoche: listeProfilCoche,
        },
      },
      navigation,
    );
    return action;
  };

  handleArrondissementChanged = (selectedValue, selectedIndex) => {
    this.setState({selectedArrondissement: selectedValue});
  };

  handleBureauChanged = (selectedValue, selectedIndex) => {
    this.setState({
      selectedBureau: selectedValue,
      selectedArrondissement: '',
    });
    this.comboArrondissements.refresh(selectedValue);
  };

  handleOnConfirmProfils = items => {
    // console.log(items);
  };

  handleOnProfilItemsChanged = items => {
    this.setState({selectedProfiles: items});
  };

  handleConfirmButton = () => {
    let action = this.buildConfirmConnexionAction(
      this.props.navigation,
      this.state.selectedBureau,
      this.state.selectedProfiles,
      this.props.route.params.login,
    );
    console.log(action);
    this.props.actions.dispatch(action);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.confirmConnexionReducer.showProgressConfirmCnx && (
          <BadrProgressBar width={screenHeight} />
        )}

        <ScrollView>
          <BadrPicker
            key="bureau"
            style={CustomStyleSheet.badrPicker}
            titleStyle={CustomStyleSheet.badrPickerTitle}
            title={translate('profile.listeBureaux')}
            cle="codeBureau"
            libelle="nomBureauDouane"
            module="REF_LIB"
            command="getListeBureaux"
            onValueChange={(selectedValue, selectedIndex) =>
              this.handleBureauChanged(selectedValue, selectedIndex)
            }
            param=""
            typeService="SP"
          />

          <BadrPicker
            onRef={ref => (this.comboArrondissements = ref)}
            style={CustomStyleSheet.badrPicker}
            titleStyle={CustomStyleSheet.badrPickerTitle}
            key="arrondissements"
            style={CustomStyleSheet.badrPicker}
            title={translate('profile.listeArrondissements')}
            cle="code"
            libelle="libelle"
            module="REF_LIB"
            command="getArrondissementsByAgentAndBureau"
            onValueChange={(selectedValue, selectedIndex) =>
              this.handleArrondissementChanged(selectedValue, selectedIndex)
            }
            param={this.state.selectedBureau}
            typeService="SP"
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
            onValueChange={(selectedValue, selectedIndex) =>
              this.handleProfileChanged(selectedValue, selectedIndex)
            }
            param=""
            typeService="SP"
            onConfirm={this.handleOnConfirmProfils}
            onSelectedItemObjectsChange={this.handleOnProfilItemsChanged}
          />
        </ScrollView>

        <BadrFloatingButton onConfirm={this.handleConfirmButton} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

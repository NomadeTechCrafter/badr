import React from 'react';

import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import BadrPicker from '../../components/pickers/BadrPicker';
import BadrPickerChecker from '../../components/pickers/BadrPickerChecker';
import {BadrFloatingButton} from '../../components/buttons/BadrFloatingButton';

/** REDUX **/
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

/** STYLING **/
import {CustomStyleSheet} from '../../styles/index';

import {translate} from '../../common/translations/i18n';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBureau: '',
      selectedArrondissement: '',
      selectedProfiles: [],
    };
  }

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
    console.log(this.state);
  };

  render() {
    return (
      <View style={styles.container}>
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
  return {...state.badrPickerReducer};
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

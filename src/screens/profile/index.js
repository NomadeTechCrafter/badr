import React from 'react';

import {Text, View} from 'react-native';

import BadrPicker from '../../components/pickers/BadrPicker';
import BadrPickerChecker from '../../components/pickers/BadrPickerChecker';
/** REDUX **/
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

/** STYLING **/
import {CustomStyleSheet} from '../../styles/index';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBureau: '',
      selectedProfiles: [],
    };
  }

  handleProfileChanged = (selectedValue, selectedIndex) => {};

  handleBureauChanged = (selectedValue, selectedIndex) => {
    this.child.refresh(selectedValue);
  };

  refreshArrondissements = () => {};

  render() {
    return (
      <View>
        <BadrPicker
          key="bureau"
          style={CustomStyleSheet.badrPicker}
          titleStyle={CustomStyleSheet.badrPickerTitle}
          title="Liste des bureaux"
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
          onRef={ref => (this.child = ref)}
          style={CustomStyleSheet.badrPicker}
          titleStyle={CustomStyleSheet.badrPickerTitle}
          key="arrondissements"
          style={CustomStyleSheet.badrPicker}
          title="Liste des arrondissements"
          cle="code"
          libelle="libelle"
          module="REF_LIB"
          command="getArrondissementsByAgentAndBureau"
          onValueChange={(selectedValue, selectedIndex) =>
            this.handleProfileChanged(selectedValue, selectedIndex)
          }
          param={this.state.selectedBureau}
          typeService="SP"
        />

        <BadrPickerChecker
          key="profil"
          style={CustomStyleSheet.badrPicker}
          titleStyle={CustomStyleSheet.badrPickerTitle}
          style={CustomStyleSheet.badrPicker}
          title="Liste des profil"
          cle="codeProfil"
          libelle="libelleProfil"
          module="HAB_LIB"
          command="getListeProfil"
          onValueChange={(selectedValue, selectedIndex) =>
            this.handleProfileChanged(selectedValue, selectedIndex)
          }
          param=""
          typeService="SP"
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log('*************** mapStateToProps - PROFILE ');
  // console.log(state.badrPickerReducer.picker.getArrondissementsByAgentAndBureau);
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

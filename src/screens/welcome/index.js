import React from 'react';
import {Text, View} from 'react-native';
/** STYLING **/
import {CustomStyleSheet} from '../../styles/index';
import {Icon} from 'react-native-elements';

import BadrPicker from '../../components/pickers/BadrPicker';

/** i18n **/
import {translate} from '../../common/translations/i18n';

class WelcomeScreen extends React.Component {
  /*
    getCmbTypeIdentifiant
    getListeProfil
    getAllTypeT6bis
  */
  render() {
    console.log('dispatch=');
    console.log(this.props.dispatch);
    return (
      <View>
        <BadrPicker
          key="profil"
          style={{width: 400}}
          title="Profil"
          cle="codeProfil"
          libelle="libelleProfil"
          module="HAB_LIB"
          command="getListeProfil"
          typeService="SP"
        />

        <BadrPicker
          key="typeT6BIS"
          style={{width: 400}}
          title="Type t6bis"
          cle="code"
          libelle="libelle"
          module="T6BIS_LIB"
          command="getAllTypeT6bis"
          typeService="SP"
        />

        <BadrPicker
          key="typeDoc"
          style={{width: 400}}
          title="Type document"
          cle="code"
          libelle="libelle"
          module="REF_LIB"
          command="getCmbTypeIdentifiant"
          typeService="SP"
        />
      </View>
    );
  }
}

export default WelcomeScreen;

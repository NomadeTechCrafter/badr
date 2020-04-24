import React from 'react';

import {Text, View} from 'react-native';

import BadrPicker from '../../components/pickers/BadrPicker';

class Profile extends React.Component {
  handleProfileChanged = (selectedValue, selectedIndex) => {
    console.log('Handle change : ');
    console.log(selectedValue);
    console.log(selectedIndex);
  };

  render() {
    return (
      <View>
        <BadrPicker
          key="profil"
          style={{width: 400}}
          title="Liste des profil"
          cle="codeProfil"
          libelle="libelleProfil"
          module="HAB_LIB"
          command="getListeProfil"
          onValueChange={(selectedValue, selectedIndex) =>
            this.handleProfileChanged(selectedValue, selectedIndex)
          }
          typeService="SP"
        />
      </View>
    );
  }
}

export default Profile;

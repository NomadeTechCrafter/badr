import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { translate } from '../../../common/translations/i18n';
import { RechercheRefAt, Toolbar } from '../../../components';

export default class CreerApurement extends React.Component {
  confirmer = () => {};

  retablir = () => {};

  render() {
    return (
      <ScrollView>
        <Toolbar
          navigation={this.props.navigation}
          icon="menu"
          title={translate('at.title')}
          subtitle={translate('at.subTitle')}
        />  
        <RechercheRefAt>
          <Button
            onPress={this.confirmer}
            mode="contained"
            icon="check"
            compact="true"
            style={styles.btnConfirmer}>
            {translate('transverse.confirmer')}
          </Button>
          <Button
            onPress={this.confirmer}
            mode="contained"
            icon="check"
            compact="true"
            style={styles.btnConfirmer}>
            {translate('transverse.confirmer')}
          </Button>
          <Button
            onPress={this.retablir}
            icon="autorenew"
            mode="contained"
            style={styles.btnRetablir}>
            {translate('transverse.retablir')}
          </Button>
        </RechercheRefAt>
      </ScrollView>
    );
  }
}

const styles = {
  btnConfirmer: {
    color: '#FFF',
    padding: 5,
    marginRight: 15,
  },
  btnRetablir: {
    color: '#FFF',
    padding: 5,
  },
};

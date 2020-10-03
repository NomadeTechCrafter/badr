import React, {Component} from 'react';
import {View} from 'react-native';
import {RechercheRefDum, ComBadrToolbarComp} from '../../../components';
/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';

class RechercheEcorImport extends Component {
  getInfoEcorImport = () => {
    let typeEcorImport = 'EnleverMarchandise'; //this.props.route.params.typeEcorImport;
    switch (typeEcorImport) {
      case 'EnleverMarchandise':
        return {
          successRedirectionScreen: 'EnleverMarchandise',
          subtitle: translate('ecorimport.enleverMarchandise.title'),
          commande: 'initEnleverMarchandise',
        };
      case 'EnleverMarchandiseParPesage':
        return {
          successRedirectionScreen: 'EnleverMarchandiseParPesage',
          subtitle: translate('ecorimport.enleverMarchandiseParPesage.title'),
          commande: 'initEnleverMarchandiseParPesage',
        };
    }
  };
  render() {
    let infoEcorImport = this.getInfoEcorImport();
    return (
      <View>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('ecorimport.title')}
          subtitle={infoEcorImport.subtitle}
          icon="menu"
        />
        <RechercheRefDum
          module="ECI_LIB"
          commande={infoEcorImport.commande}
          typeService="UC"
          navigation={this.props.navigation}
          successRedirection={infoEcorImport.successRedirectionScreen}
          routeParams={this.props.route.params}
        />
      </View>
    );
  }
}

export default RechercheEcorImport;

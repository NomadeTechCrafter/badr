import React, {Component} from 'react';
import {View} from 'react-native';
import {
  ComBadrToolbarComp,
} from '../../../../commons/component/index';
import ComEcorImportRechercheRefComp from '../../../../commons/component/modules/rechercheRefDum/ComEcorImportRechercheRefComp';
/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';

class EcorImportRechercheScreen extends Component {
  getInfoEcorImport = () => {
    let typeEcorImport = this.props.route.params.typeEcorImport;
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
      case 'EnleverMarchandiseSsManifeste':
        return {
          successRedirectionScreen: 'EnleverMarchandiseSsManifeste',
          subtitle: translate('ecorimport.enleverMarchandiseSsManifeste.title'),
          commande: 'initEnleverMarchandiseSsManifeste',
        };
      case 'VerifierPContreEcorSsManifeste':
        return {
          successRedirectionScreen: 'VerifierPContreEcorSsManifeste',
          subtitle: translate('ecorimport.verifierPContreEcorSsManifeste.title'),
          commande: 'initVerifierParContreEcorSansManifeste',
        };

      case 'ConfirmerArriveeSsManifeste':
        return {
          successRedirectionScreen: 'ConfirmerArriveeSsManifeste',
          subtitle: translate('ecorimport.confirmerArriveeSsManifeste.title'),
          commande: 'initConfirmerArriveeSansManifeste',
        };
      case 'AutoriserAcheminementSsManifeste':
        return {
          successRedirectionScreen: 'AutoriserAcheminementSsManifeste',
          subtitle: translate('ecorimport.autoriserAcheminementSsManifeste.title'),
          commande: 'initAutoriserAcheminementSansManifeste',
        };

      case 'PeserMarchandise':
        return {
          successRedirectionScreen: 'PeserMarchandise',
          subtitle: translate('ecorimport.peserMarchandise.title'),
          commande: 'initPeserMarchandise',
        };
      case 'VerifierParContreEcor':
        return {
          successRedirectionScreen: 'VerifierParContreEcor',
          subtitle: translate('ecorimport.verifierParContreEcor.title'),
          commande: 'initVerifierParContreEcor',
        };
    }
  };
  render() {
    let infoEcorImport = this.getInfoEcorImport();
    return (
      <View style={styles.container}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('ecorimport.title')}
          subtitle={infoEcorImport.subtitle}
          icon="menu"
        />
        <ComEcorImportRechercheRefComp
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
const styles = {
  container: { width: '100%', height: '100%' },
};
export default EcorImportRechercheScreen;

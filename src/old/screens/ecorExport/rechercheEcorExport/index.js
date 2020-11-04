import React, {Component} from 'react';
import {View} from 'react-native';
import {RechercheRefDum, Toolbar} from '../../.../';
/**i18n */
import {translate} from '../../../common/translations/i18n';

class RechercheEcorExport extends Component {
  getInfoEcorExport = () => {
    let typeEcorExport = 'VuEmbarquer'; //this.props.route.params.typeEcorExport;
    console.log('  getSuccessRedirectionScreen', typeEcorExport);
    switch (typeEcorExport) {
      case 'VuEmbarquer':
        return {
          successRedirectionScreen: 'VuEmbarque',
          subtitle: translate('ecorexport.vuEmbarque.title'),
          commande: 'initVuEmbarquer',
        };
    }
  };
  render() {
    let infoEcorExport = this.getInfoEcorExport();
    console.log('  infoEcorExport', infoEcorExport);
    return (
      <View>
        <Toolbar
          navigation={this.props.navigation}
          title={translate('ecorexport.title')}
          subtitle={infoEcorExport.subtitle}
          icon="menu"
        />
        <RechercheRefDum
          module="ECOREXP_LIB"
          commande={infoEcorExport.commande}
          typeService="UC"
          navigation={this.props.navigation}
          successRedirection={infoEcorExport.successRedirectionScreen}
          routeParams={this.props.route.params}
        />
      </View>
    );
  }
}

export default RechercheEcorExport;

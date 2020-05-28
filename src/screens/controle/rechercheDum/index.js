import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Container, RechercheRefDum,Toolbar} from '../../../components';
/**i18n */
import {translate} from '../../../common/translations/i18n';

class RechecheDum extends Component {
  subTitle='';
  constructor(props) {
    super(props);

  }
  getInfoControle = () => {
      let typeControle = this.props.route.params.typeControle;
      console.log('  getSuccessRedirectionScreen', typeControle )
      switch (typeControle) {
      case 'RI':
        return {
          successRedirectionScreen:'RegimeInterne',
          subtitle:translate("controle.RI"),
          commande:'initControlerDedRI'
        };
        break;
      case 'AC':
          return {successRedirectionScreen:'ACVP',subtitle:translate("controle.ACVP"),commande:'initControlerDedACVP'};
    }
  };
    getSubTitle = () => {
        let typeControle = this.props.route.params.typeControle;
        console.log('  getSuccessRedirectionScreen', typeControle )
        switch (typeControle) {
            case 'RI':
                return translate("controle.RI");
                break;
            case 'AC':
                return translate("controle.ACVP");
        }
    };
  render() {
    let infoControle = this.getInfoControle();
    return (
      <View>
      <Toolbar navigation={this.props.navigation} title="Contrôle" subtitle={infoControle.subtitle} icon="menu"/>
      <RechercheRefDum
        module="CONTROL_LIB"
        commande={infoControle.commande}
        typeService="UC"
        navigation={this.props.navigation}
        successRedirection={infoControle.successRedirectionScreen}
        routeParams={this.props.route.params}
      />

      </View>
    );
  }
}


export default RechecheDum;

import React from 'react';
import {
  ComBadrToolbarComp,
  ComContainerComp,
  ComRedressementRechercheRefComp,
} from '../../../../commons/component';
import { translate } from '../../../../commons/i18n/ComI18nHelper';
import { View } from 'react-native';

class DedRechercheRedressementScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: translate('dedouanement.title')
    };
  }
  componentDidMount() {
    switch (this.props?.from) {
      case 'ENVOYER_VALEUR':
        return this.setState({
          title : translate('dedouanement.titleEnvoyerValeur')
        });
      case 'TRAITER_VALEUR':
        return this.setState({
          title : translate('dedouanement.titleTraiterValeur')
        });
      case 'ETUDE_RETUDE':
        return this.setState({
          title : translate('dedouanement.titleEtudeRetude')
        });
      case 'RETUDE_RETUDE':
        return this.setState({
          title : translate('dedouanement.titleREtudeRetude')
        });
      case 'RECOTER_ETUDE':
        return this.setState({
          title : translate('dedouanement.titleRecoterEtude')
        });
      default:
        this.setState({
          title : translate('dedouanement.title')
        });
    }
  }

  render() {
    return (
      <View>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={this.state.title}
          subtitle={translate('dedouanement.subTitle')}
        />
        <ComRedressementRechercheRefComp navigation={this.props.navigation} fromWhere={this.props?.from} />
      </View>
    );
  }
}

export default DedRechercheRedressementScreen;

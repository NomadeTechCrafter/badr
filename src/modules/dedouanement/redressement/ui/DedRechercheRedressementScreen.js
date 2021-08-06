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

      default:
        this.setState({
          title : translate('dedouanement.title')
        });
    }

    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log('componentDidMount DedRechercheRedressementScreen from  : ' + this.props?.from);
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
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

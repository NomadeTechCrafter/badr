import React, {Component} from 'react';
import {View} from 'react-native';
import {RechercheRefDum, ComBadrToolbarComp} from '../../../components';
/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';

class RechecheMLV extends Component {
  render() {
    return (
      <View>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('mainlevee.title')}
          subtitle={translate('mainlevee.delivrerMainlevee.title')}
          icon="menu"
        />
        <RechercheRefDum
          commande={'initDelivrerMlv'}
          module="MLV_LIB"
          typeService="UC"
          successRedirection={'DelivrerMLV'}
          navigation={this.props.navigation}
          routeParams={this.props.route.params}
        />
      </View>
    );
  }
}

export default RechecheMLV;

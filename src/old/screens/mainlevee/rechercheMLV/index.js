import React, {Component} from 'react';
import {View} from 'react-native';
import {RechercheRefDum, Toolbar} from '../../../components';
/**i18n */
import {translate} from '../../../../commons/i18n/I18nHelper';

class RechecheMLV extends Component {
  render() {
    return (
      <View>
        <Toolbar
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

import React, {Component} from 'react';
import {View} from 'react-native';
import {
  ComLiquidationRechercheRefComp,
  ComBadrToolbarComp,
} from '../../../../commons/component';
/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import LiquidationHomeScreen from '../ongletsLiquidation/home/LiquidationHomeScreen';

class LiquidationRechercheScreen extends Component {
  render() {
    return (
      <View>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('liq.title')}
          subtitle={translate('liq.titleLiqAuto')}
          icon="menu"
        />
        <ComLiquidationRechercheRefComp
          commande={'initLiquiderAutomatiquement'}
          module="ALI_DEC"
          typeService="UC"
          successRedirection={'LiquidationHomeScreen'}
          navigation={this.props.navigation}
          routeParams={this.props.route.params}
        />
      </View>
    );
  }
}

export default LiquidationRechercheScreen;

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
    const isAutomatique = this.props.type === 'automatique';
    let typeLiq = this.props.route?.params?.typeLiq
      ? this.props.route?.params?.typeLiq
      : 'automatique';
    console.log('LiquidationRechercheScreen', typeLiq);

    return (
      <View style={styles.container}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('liq.title')}
          subtitle={
            typeLiq === 'automatique'
              ? translate('liq.titleLiqAuto')
              : translate('liq.liquidationManuelle.title')
          }
          icon="menu"
        />

        <ComLiquidationRechercheRefComp
          type={typeLiq}
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
const styles = {
  container: {width: '100%', height: '100%'},
};
export default LiquidationRechercheScreen;

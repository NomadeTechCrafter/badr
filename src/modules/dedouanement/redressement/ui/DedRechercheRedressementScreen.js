import React from 'react';
import {
  ComBadrToolbarComp,
  ComContainerComp,
  ComRedressementRechercheRefComp,
} from '../../../../commons/component';
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import {View} from 'react-native';

class DedRechercheRedressementScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    return (
      <View>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('dedouanement.title')}
          subtitle={translate('dedouanement.subTitle')}
        />
        <ComRedressementRechercheRefComp navigation={this.props.navigation} />
      </View>
    );
  }
}

export default DedRechercheRedressementScreen;

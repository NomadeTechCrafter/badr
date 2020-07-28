import React from 'react';
import {View} from 'react-native';

/**Custom Components */
import {BadrApiTable, DetailBAD} from '../../../components';
import {translate} from '../../../../commons/i18n/I18nHelper';

export default class BAD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
      detail: {},
    };
  }

  componentDidMount = () => {
    console.log(this.props.data);
  };

  onItemSelected = (item) => {};

  handleBadPressed = (item) => {
    this.setState({detail: item, showDetail: true});
  };

  onDismiss = () => {
    this.setState({showDetail: false});
  };

  render() {
    return (
      <View>
        <BadrApiTable
          module="CONTROL_LIB"
          command="listePreapurements"
          typeService="SP"
          searchObject={{
            numeroVersionCourante: '3',
            infosDUMVO: {
              identifiant: '141381',
            },
          }}
          id="referenceDs"
          onItemSelected={(item) => this.onItemSelected(item)}
          cols={[
            {code: 'vo.typeDS', libelle: translate('bad.typeDS'), width: 70},
            {
              code: 'referenceDs',
              libelle: translate('bad.referenceDS'),
              width: 200,
            },
            {
              code: 'vo.lieuChargement',
              libelle: translate('bad.lieuDechargement'),
              width: 180,
            },
            {
              code: 'vo.referenceLot',
              libelle: translate('bad.referenceLot'),
              width: 120,
            },
            {
              code: 'vo.poidsLot',
              libelle: translate('bad.poidbrut'),
              width: 120,
            },
            {
              code: 'vo.nombreContenant',
              libelle: translate('bad.nombreContenant'),
              width: 130,
            },
            {
              code: 'vo.lieuChargement',
              libelle: translate('bad.title'),
              action: (item) => this.handleBadPressed(item),
              width: 200,
              actionCondition: 'hasBAD',
            },
          ]}
          paginate={false}
        />

        {this.state.detail && this.state.detail.referenceDs && (
          <DetailBAD
            referenceDs={this.state.detail.referenceDs}
            detail={this.state.detail.vo}
          />
        )}
      </View>
    );
  }
}

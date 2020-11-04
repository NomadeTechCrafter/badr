import React from 'react';
import {View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrLibelleComp,
  ComBasicDataTableComp,
} from '../../../../../../commons/component';
import {getValueByPath} from '../../../utils/DedUtils';
import _ from 'lodash';
import {request} from '../../../state/actions/DedAction';
import {
  GENERIC_DED_INIT,
  GENERIC_DED_REQUEST,
} from '../../../state/DedRedressementConstants';
import {connect} from 'react-redux';
import {translate} from '../../../../../../commons/i18n/ComI18nHelper';
import {CustomStyleSheet} from '../../../../../../commons/styles/ComThemeStyle';
import {Col, Row} from 'react-native-easy-grid';
class DedRedressementListeVersionBlock extends React.Component {
  listeVersionsCols = () => {
    return [
      {
        code: 'numVersion',
        libelle: translate('dedouanement.info.num'),
        width: 250,
      },
      {
        code: 'type',
        libelle: translate('dedouanement.info.type'),
        width: 250,
      },
      {
        code: 'statut',
        libelle: translate('dedouanement.info.statut'),
        width: 250,
      },
      {
        code: 'initiateur',
        libelle: translate('dedouanement.info.initiateur'),
        width: 250,
      },
      {
        code: 'dateCreation',
        libelle: translate('dedouanement.info.dateC'),
        width: 250,
      },
      {
        code: 'dateEnreg',
        libelle: translate('dedouanement.info.dateEnrg'),
        width: 250,
      },
      {
        code: 'dateDepot',
        libelle: translate('dedouanement.info.dateD'),
        width: 250,
      },
    ];
  };

  constructor(props) {
    super(props);
    this.state = {
      listeVersionsCols: this.listeVersionsCols(),
    };
  }
  componentDidMount() {
    this.getListeVersions();
  }

  getListeVersions = () => {
    let identifiantDUM = getValueByPath(
      'dedReferenceVO.identifiant',
      this.props.data,
    );
    this.callRedux({
      command: 'ded.recupererListeVersions',
      typeService: 'SP',
      jsonVO: identifiantDUM,
    });
  };

  render() {
    let listeVersions = this.extractCommandData(
      'ded.recupererListeVersions',
      'genericDedReducer',
    );

    return (
      <View style={styles.container}>
        {/* Accordion liste des version */}
        {!_.isNil(listeVersions) && !_.isNil(listeVersions.data) && (
          <ComAccordionComp
            title={translate('dedouanement.info.listeV')}
            expanded={true}>
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col>
                <ComBadrLibelleComp>
                  {translate('dedouanement.info.nbrV')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {listeVersions.data.length}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2} />
            </Row>
            <ComBasicDataTableComp
              rows={listeVersions.data}
              cols={this.state.listeVersionsCols}
              totalElements={
                listeVersions.data.length ? listeVersions.data.length : 0
              }
              maxResultsPerPage={5}
              paginate={true}
            />
          </ComAccordionComp>
        )}
      </View>
    );
  }

  /**
   * start
   * Redux
   */

  callRedux = (jsonVO) => {
    if (this.props.dispatch) {
      console.log('calling redux ...');
      this.props.dispatch(request({type: GENERIC_DED_REQUEST, value: jsonVO}));
    }
  };

  init = () => {
    this.props.dispatch(request({type: GENERIC_DED_INIT, value: {}}));
  };

  extractCommandData = (command, reducerName) => {
    return this.props[reducerName] && this.props[reducerName].picker
      ? this.props[reducerName].picker[command]
      : null;
  };

  /**
   * end
   * Redux
   */
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps, null)(DedRedressementListeVersionBlock);

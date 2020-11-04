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
class DedRedressementCertificatsDechargeBlock extends React.Component {
  cols = () => {
    return [
      {
        code: 'numero',
        libelle: translate('dedouanement.info.num'),
        width: 250,
      },
      {
        code: 'libelleTypeCertificatDecharge',
        libelle: translate('dedouanement.info.type'),
        width: 250,
      },
      {
        code: 'dateEnregistrement',
        libelle: translate('dedouanement.info.dateEnregistrement'),
        width: 250,
      },
      {
        code: 'statut',
        libelle: translate('dedouanement.info.statut'),
        width: 250,
      },
      {
        code: 'montantDesengage',
        libelle: translate('dedouanement.info.montantDesengage'),
        width: 250,
      },
    ];
  };

  constructor(props) {
    super(props);
    this.state = {
      cols: this.cols(),
    };
  }
  componentDidMount() {
    this.getCertificatsDecharge();
  }

  getCertificatsDecharge = () => {
    let identifiantDUM = getValueByPath(
      'dedReferenceVO.identifiant',
      this.props.data,
    );
    this.callRedux({
      command: 'ded.getCertificatsDechargeCompteRED',
      typeService: 'SP',
      jsonVO: identifiantDUM,
    });
  };

  render() {
    let CertificatsDecharge = this.extractCommandData(
      'ded.getCertificatsDechargeCompteRED',
      'genericDedReducer',
    );

    return (
      <View style={styles.container}>
        {/* Accordion Liste des certificats de décharge */}
        {!_.isNil(CertificatsDecharge) && !_.isNil(CertificatsDecharge.data) && (
          <ComAccordionComp
            title={translate('dedouanement.info.listeCertificatsDecharges')}
            expanded={false}>
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col>
                <ComBadrLibelleComp>
                  {translate('dedouanement.info.nombreCertificatsDecharge')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {CertificatsDecharge.data.length}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2} />
            </Row>
            <ComBasicDataTableComp
              rows={CertificatsDecharge.data}
              cols={this.state.cols}
              totalElements={CertificatsDecharge.data.length}
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

export default connect(
  mapStateToProps,
  null,
)(DedRedressementCertificatsDechargeBlock);

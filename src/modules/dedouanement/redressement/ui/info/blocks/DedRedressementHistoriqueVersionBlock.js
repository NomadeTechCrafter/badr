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
import {Col, Row, Grid} from 'react-native-easy-grid';
import {CustomStyleSheet} from '../../../../../../commons/styles/ComThemeStyle';
class DedRedressementHistoriqueVersionBlock extends React.Component {
  cols = () => {
    return [
      {
        code: 'date',
        libelle: translate('dedouanement.info.date'),
        width: 250,
      },
      {
        code: 'intervention',
        libelle: translate('dedouanement.info.intervention'),
        width: 250,
      },
      {
        code: 'etatResultat',
        libelle: translate('dedouanement.info.agentetatRes'),
        width: 250,
      },
      {
        code: 'utilisateur',
        libelle: translate('dedouanement.info.utilisateur'),
        width: 250,
      },
      {
        code: 'commentaire',
        libelle: translate('dedouanement.info.comm'),
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
    this.getHistoriqueVersion();
  }

  getHistoriqueVersion = () => {
    let idDec = getValueByPath('dedReferenceVO.identifiant', this.props.data);
    let numVersion = getValueByPath(
      'dedReferenceVO.numeroVersion',
      this.props.data,
    );
    let data = {
      idDec: idDec,
      numVersion: numVersion,
    };
    this.callRedux({
      command: 'ded.recupererListeHistoriqueVersion',
      typeService: 'SP',
      jsonVO: data,
    });
  };

  render() {
    let historiqueVersion = this.extractCommandData(
      'ded.recupererListeHistoriqueVersion',
      'genericDedReducer',
    );

    return (
      <View style={styles.container}>
        {/* Accordion historique de la déclaration*/}
        {!_.isNil(historiqueVersion) && !_.isNil(historiqueVersion.data) && (
          <ComAccordionComp
            title={translate('dedouanement.info.historiqueDec')}
            expanded={false}>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col>
                <ComBadrLibelleComp>
                  {translate('dedouanement.info.type')}:
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {getValueByPath('dedReferenceVO.type', this.props.data)}
                </ComBadrLibelleComp>
              </Col>
              <Col />
              <Col>
                <ComBadrLibelleComp>
                  {translate('dedouanement.info.numero')}:
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {getValueByPath(
                    'dedReferenceVO.numeroVersion',
                    this.props.data,
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col />
              <Col>
                <ComBadrLibelleComp>
                  {translate('dedouanement.info.statut')}:
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {getValueByPath('dedReferenceVO.status', this.props.data)}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col>
                <ComBadrLibelleComp>
                  {translate('dedouanement.info.mode')}:
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {getValueByPath(
                    'dedReferenceVO.modeAquisition',
                    this.props.data,
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col size={4} />

              <Col>
                <ComBadrLibelleComp>
                  {translate('dedouanement.info.nbreResultat')}:
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {historiqueVersion.data.length}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <ComBasicDataTableComp
              rows={historiqueVersion.data}
              cols={this.state.cols}
              totalElements={
                historiqueVersion.data.length
                  ? historiqueVersion.data.length
                  : 0
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

export default connect(
  mapStateToProps,
  null,
)(DedRedressementHistoriqueVersionBlock);

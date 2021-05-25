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
class DedRedressementDeclarationsCoupleeBlock extends React.Component {
  cols = () => {
    return [
      {
        code: 'strLotCodeLieuChargement',
        libelle: translate('dedouanement.info.lieuChang'),
        width: 250,
      },
      {
        code: 'strReferenceLot',
        libelle: translate('dedouanement.info.refLot'),
        width: 250,
      },
      {
        code: 'poidsLot',
        libelle: translate('dedouanement.info.poidBrut'),
        width: 250,
      },
      {
        code: 'strDecNumeroEnregistrement',
        libelle: translate('dedouanement.info.refDeD'),
        width: 250,
      },
      {
        code: 'annule',
        libelle: translate('dedouanement.info.annule'),
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
    this.getListeDeclarationsCouplees();
  }

  getListeDeclarationsCouplees = () => {
    let identifiantDUM = getValueByPath(
      'dedReferenceVO.identifiant',
      this.props.data,
    );
    this.callRedux({
      command: 'ded.recupererListeDeclarationsCouplees',
      typeService: 'SP',
      jsonVO: identifiantDUM,
    });
  };

  render() {
    let listeDeclarationsCouplees = this.extractCommandData(
      'ded.recupererListeDeclarationsCouplees',
      'genericDedReducer',
    );

    return (
      <View style={styles.container}>
        {/* Accordion liste des déclarations couplées */}
        {!_.isNil(listeDeclarationsCouplees) &&
          !_.isNil(listeDeclarationsCouplees.data) && (
            <ComAccordionComp
              title={translate('dedouanement.info.listeDecl')}
              expanded={false}>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={3} />
                <Col>
                  <ComBadrLibelleComp>
                    {translate('transverse.bureau')}:
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {translate('transverse.regime')}:
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {translate('transverse.annee')}:
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {translate('transverse.serie')}:
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {translate('transverse.cle')}:
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={3}>
                  <ComBadrLibelleComp>
                    {translate('transverse.reference')}:
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {getValueByPath(
                      'strDecCodeBureau',
                      listeDeclarationsCouplees[0],
                    )}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {getValueByPath(
                      'strDecCodeRegime',
                      listeDeclarationsCouplees[0],
                    )}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {getValueByPath(
                      'strDecAnnee',
                      listeDeclarationsCouplees[0],
                    )}
                  </ComBadrLibelleComp>
                </Col>
                <Col />
                <Col>
                  <ComBadrLibelleComp>
                    {getValueByPath('strDecCle', listeDeclarationsCouplees[0])}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={3}>
                  <ComBadrLibelleComp>
                    {translate('dedouanement.info.modeTrans')}:
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {getValueByPath(
                      'descriptionModeTransport',
                      listeDeclarationsCouplees[0],
                    )}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={4} />
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={3}>
                  <ComBadrLibelleComp>
                    {translate('dedouanement.info.moyenTrans')}:
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {getValueByPath(
                      'moyenTransport',
                      listeDeclarationsCouplees[0],
                    )}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={4} />
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={3}>
                  <ComBadrLibelleComp>
                    {translate('dedouanement.info.dateA')}:
                  </ComBadrLibelleComp>
                </Col>
                <Col size={5} />
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={6} />
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {translate('dedouanement.info.nbrDeclaration')}
                    {' : '}
                    {listeDeclarationsCouplees.data.length}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <ComBasicDataTableComp
                rows={listeDeclarationsCouplees.data}
                cols={this.state.cols}
                totalElements={listeDeclarationsCouplees.data.length}
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
)(DedRedressementDeclarationsCoupleeBlock);

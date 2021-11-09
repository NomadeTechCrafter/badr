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
class DedRedressementListAnnotationBlock extends React.Component {
  cols = () => {
    return [
      {
        code: 'date',
        libelle: translate('dedouanement.info.date'),
        width: 250,
      },
      {
        code: 'version',
        libelle: translate('dedouanement.info.version'),
        width: 250,
      },
      {
        code: 'agent',
        libelle: translate('dedouanement.info.agent'),
        width: 250,
      },
      {
        code: 'annotation',
        libelle: translate('dedouanement.info.annotation'),
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
    let identifiantDUM = getValueByPath(
      'dedReferenceVO.identifiant',
      this.props.data,
    );
    this.callRedux({
      command: 'ded.recupererListeAnnotations',
      typeService: 'SP',
      jsonVO: identifiantDUM,
    });
  };

  render() {
    let listeAnnotation = this.extractCommandData(
      'ded.recupererListeAnnotations',
      'genericDedReducer',
    );

    return (
      <View style={styles.container}>
        {/* Accordion liste des Annotations */}
        {!_.isNil(listeAnnotation) && !_.isNil(listeAnnotation.data) && (
          <ComAccordionComp
            title={translate('dedouanement.info.listeAnn')}
            expanded={false}>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col>
                <ComBadrLibelleComp>
                  {translate('dedouanement.info.versionCour')}:
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {getValueByPath(
                    'dedReferenceVO.numeroVersionCourante',
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
              <Col />
              <Col>
                <ComBadrLibelleComp>
                  {translate('dedouanement.info.nombreAnn')}:
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {listeAnnotation.data.length}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <ComBasicDataTableComp
              rows={listeAnnotation.data}
              cols={this.state.cols}
              totalElements={
                listeAnnotation.data.length ? listeAnnotation.data.length : 0
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
)(DedRedressementListAnnotationBlock);

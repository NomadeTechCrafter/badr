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
class DedRedressementEstimationDroitsTaxeBlock extends React.Component {
  cols = () => {
    return [
      {
        code: 'numeroOrdreArticle',
        libelle: translate('dedouanement.info.article'),
        width: 250,
      },
      {
        code: 'codeTaxe',
        libelle: translate('dedouanement.info.taxe'),
        width: 250,
      },
      {
        code: 'codeSousTaxe',
        libelle: translate(
          'dedouanement.articles.popUpEstimationDroitsTaxes.detail',
        ),
        width: 250,
      },
      {
        code: 'quantite',
        libelle: translate('transverse.qte'),
        width: 250,
      },
      {
        code: 'assiette',
        libelle: translate(
          'dedouanement.articles.popUpEstimationDroitsTaxes.assiette',
        ),
        width: 250,
      },
      {
        code: 'montant',
        libelle: translate('dedouanement.info.montant'),
        width: 250,
      },
    ];
  };

  colsTotal = () => {
    return [
      {
        code: 'codeTaxe',
        libelle: translate('dedouanement.info.taxe'),
        width: 350,
      },
      {
        code: 'description',
        libelle: translate('dedouanement.info.descp'),
        width: 350,
      },
      {
        code: 'montant',
        libelle: translate('dedouanement.info.montant'),
        width: 350,
      },
    ];
  };
  constructor(props) {
    super(props);
    this.state = {
      cols: this.cols(),
      colsTotal: this.colsTotal(),
    };
  }
  componentDidMount() {
    this.getEstimationDroitsTaxe('');
    //this.getEstimationDroitsTaxe(null);
  }

  getEstimationDroitsTaxe = (article) => {
    let identifiantDUM = getValueByPath(
      'dedReferenceVO.identifiant',
      this.props.data,
    );
    let numeroVersion = getValueByPath(
      'dedReferenceVO.numeroVersionCourante',
      this.props.data,
    );
    let data = {
      identifiantDum: identifiantDUM,
      numeroVersion: numeroVersion,
      numeroOrdreArticle: article,
    };
    this.callRedux({
      command: 'ded.recupererEstimationDroitsTaxes',
      typeService: 'SP',
      jsonVO: data,
    });
  };

  render() {
    let EstimationDroitsTaxesTemp = this.extractCommandData(
      'ded.recupererEstimationDroitsTaxes',
      'genericDedReducer',
    );
    return (
      <View style={styles.container}>
        {/* Accordion Estimation Driots et taxes*/}
        <ComAccordionComp
          title={translate('dedouanement.info.estimationDroit')}
          expanded={false}>
          {!_.isNil(EstimationDroitsTaxesTemp) &&
            !_.isNil(EstimationDroitsTaxesTemp.data) &&
            _.keysIn(EstimationDroitsTaxesTemp.data[0]).length === 7 && (
              <View>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col>
                    <ComBadrLibelleComp>
                      {translate('dedouanement.info.nbrDroit')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {EstimationDroitsTaxesTemp.data.length}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col />
                </Row>
                <ComBasicDataTableComp
                  rows={EstimationDroitsTaxesTemp.data}
                  cols={this.state.cols}
                  totalElements={EstimationDroitsTaxesTemp.data.length}
                  maxResultsPerPage={5}
                  paginate={true}
                />
              </View>
            )}
          {!_.isNil(EstimationDroitsTaxesTemp) &&
            !_.isNil(EstimationDroitsTaxesTemp.data) &&
            _.keysIn(EstimationDroitsTaxesTemp.data[0]).length === 4 && (
              <View>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <ComBadrLibelleComp>
                      {translate('dedouanement.info.total')}:
                    </ComBadrLibelleComp>
                  </Col>
                </Row>
                <ComBasicDataTableComp
                  rows={EstimationDroitsTaxesTemp.data}
                  cols={this.state.colsTotal}
                  totalElements={EstimationDroitsTaxesTemp.data.length}
                  maxResultsPerPage={5}
                  paginate={true}
                />
              </View>
            )}
        </ComAccordionComp>
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
)(DedRedressementEstimationDroitsTaxeBlock);

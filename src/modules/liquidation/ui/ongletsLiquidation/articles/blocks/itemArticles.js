import _ from 'lodash';
import React from 'react';
import Numeral from 'numeral';
import {connect} from 'react-redux';
import {IconButton} from 'react-native-paper';
import {Col, Row} from 'react-native-easy-grid';
import Spinner from 'react-native-loading-spinner-overlay';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {ComBadrLibelleComp} from '../../../../../../commons/component';
import {callRedux, extractCommandData} from '../../../../utils/LiqUtils';
import {
  accentColor,
  primaryColor,
  CustomStyleSheet,
  primaryColorRgba,
} from '../../../../../../commons/styles/ComThemeStyle';
import {translate} from '../../../../../../commons/i18n/ComI18nHelper';
import TransverseApi from '../../../../../../commons/services/api/ComTransverseApi';
import {failed, success} from '../../../../state/actions/liquidationAction';

class ItemArticles extends React.Component {
  constructor() {
    super();
    this.state = {
      libelleArticle: null,
      rStateArticle: null,
    };
  }
  componentDidMount() {
    const {item, liquidationType} = this.props;
    this.loadLibeleForEachArticle(item, liquidationType);
    this.loadRStateForEachArticle(item, liquidationType);
  }

  loadLibeleForEachArticle = (item, liquidationType) => {
    TransverseApi.doProcess('ALI_DEC', 'getArticleLibelle', 'SP', {
      idArticleLiquideParOperation: item.idArticleLiquideParOperation,
      isLiquidationAutomatique: liquidationType == 'automatique' ? true : false,
    })
      .then((response) => {
        if (response && response.data && !_.isNil(response.data.jsonVO)) {
          console.log('getArticleLibelle', response.data.jsonVO);
          this.setState({libelleArticle: response.data.jsonVO});
        } else {
          console.log('----LIQ Action ERR data');
          console.log(JSON.stringify(response));
        }
      })
      .catch((e) => {
        console.log('----LIQ Action ERR loadLibeleForEachArticle', e);
      });
  };

  loadRStateForEachArticle = (item, liquidationType) => {
    TransverseApi.doProcess('ALI_DEC', 'testArticleDisplayRState', 'SP', {
      idArticleLiquideParOperation: item.idArticleLiquideParOperation,
      isLiquidationAutomatique: liquidationType == 'automatique' ? true : false,
    })
      .then((response) => {
        if (response && response.data && !_.isNil(response.data.jsonVO)) {
          console.log('testArticleDisplayRState', response.data.jsonVO);
          this.setState({rStateArticle: response.data.jsonVO});
        } else {
          console.log('----LIQ Action ERR data 2 ');
          console.log(JSON.stringify(response));
        }
      })
      .catch((e) => {
        console.log('----LIQ Action ERR testArticleDisplayRState', e);
      });
  };

  render() {
    const {item, index, liquidationType} = this.props;
    const {libelleArticle, rStateArticle} = this.state;

    /* let libelleArticle = extractCommandData(
      this.props,
      'getArticleLibelle',
      'liquidationReducer',
    );
    let rStateArticle = extractCommandData(
      this.props,
      'testArticleDisplayRState',
      'liquidationReducer',
    );*/
    return (
      <View>
        {!_.isNil(libelleArticle) && !_.isNil(rStateArticle) ? (
          <TouchableOpacity
            disabled={
              !(
                liquidationType == 'automatique' ||
                liquidationType == 'automatiqueRedevanceAT'
              )
            }
            onPress={() =>
              this.props.showDetailArticle(item, libelleArticle)
            }>
            <Row
              key={index}
              style={
                index % 2 === 0
                  ? CustomStyleSheet.whiteRow
                  : CustomStyleSheet.lightBlueRow
              }>
              <Col size={0.4}>
                <ComBadrLibelleComp style={{color: 'red'}}>
                  {rStateArticle ? 'R>' : ''}
                </ComBadrLibelleComp>
              </Col>
              <Col size={0.6}>
                <ComBadrLibelleComp style={{textAlign: 'center'}}>
                  {item.numArticle}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp style={{textAlign: 'center'}}>
                  {item.refParametresLiquidation.codeNomenclature}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp style={{textAlign: 'center'}}>
                  {Numeral(item.refParametresLiquidation.valeurTaxable).format(
                    '0.000',
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp style={{textAlign: 'center'}}>
                  {Numeral(item.refParametresLiquidation.quantite).format(
                    '0.000',
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col size={0.6}>
                <ComBadrLibelleComp style={{textAlign: 'center'}}>
                  {item.refParametresLiquidation.refUniteQuantiteDesc}
                </ComBadrLibelleComp>
              </Col>
              <Col size={0.6}>
                <ComBadrLibelleComp style={{color: 'red', textAlign: 'center'}}>
                  {libelleArticle}
                </ComBadrLibelleComp>
              </Col>
              {(liquidationType == 'manuelle' ||
                liquidationType == 'manuelleOffice' ||
                liquidationType == 'manuelleRedevanceAT') && (
                <Col size={0.4}>
                  <IconButton
                    icon="pencil"
                    size={20}
                    color={'white'}
                    style={{backgroundColor: primaryColor}}
                    onPress={() =>
                      this.props.showDetailArticle(item, libelleArticle)
                    }
                  />
                </Col>
              )}
              {(liquidationType == 'manuelle' ||
                liquidationType == 'manuelleOffice' ||
                liquidationType == 'manuelleRedevanceAT') && (
                <Col size={0.4}>
                  <IconButton
                    icon="delete"
                    size={20}
                    color={'white'}
                    style={{backgroundColor: primaryColor}}
                    onPress={() =>
                      this.props.deleteArticle(
                        this.props.item,
                        this.props.index,
                      )
                    }
                  />
                </Col>
              )}
            </Row>
          </TouchableOpacity>
        ) : (
          <Spinner
            visible={true}
            cancelable={false}
            animation="fade"
            color={accentColor}
            overlayColor={'rgba(' + primaryColorRgba + ',0.80)'}
            textContent={translate('transverse.inprogress')}
            textStyle={styles.spinnerTextStyle}
          />
        )}
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps, null)(ItemArticles);

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: accentColor,
    fontSize: 20,
    fontWeight: 'normal',
  },
  centerErrorMsg: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

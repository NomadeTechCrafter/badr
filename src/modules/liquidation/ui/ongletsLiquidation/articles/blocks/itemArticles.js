import _ from 'lodash';
import React from 'react';
import Numeral from 'numeral';
import { connect } from 'react-redux';
import { IconButton } from 'react-native-paper';
import { Col, Row } from 'react-native-easy-grid';
import Spinner from 'react-native-loading-spinner-overlay';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ComBadrLibelleComp } from '../../../../../../commons/component';
import { callRedux, extractCommandData } from '../../../../utils/LiqUtils';
import {
  accentColor,
  primaryColor,
  CustomStyleSheet,
  primaryColorRgba,
} from '../../../../../../commons/styles/ComThemeStyle';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';

class ItemArticles extends React.Component {
  componentDidMount() {
    const { item } = this.props;
    this.loadLibeleForEachArticle(item);
    this.loadRStateForEachArticle(item);
  }

  loadLibeleForEachArticle = (item) => {
    callRedux(this.props, {
      command: 'getArticleLibelle',
      typeService: 'SP',
      jsonVO: {
        idArticleLiquideParOperation: item.idArticleLiquideParOperation,
        isLiquidationAutomatique: 'automatique',
      },
    });
  };

  loadRStateForEachArticle = (item) => {
    callRedux(this.props, {
      command: 'testArticleDisplayRState',
      typeService: 'SP',
      jsonVO: {
        idArticleLiquideParOperation: item.idArticleLiquideParOperation,
        isLiquidationAutomatique: 'automatique',
      },
    });
  };

  

  render() {
    const { item, index, liquidationType } = this.props;
    let libelleArticle = extractCommandData(
      this.props,
      'getArticleLibelle',
      'liquidationReducer',
    );
    let rStateArticle = extractCommandData(
      this.props,
      'testArticleDisplayRState',
      'liquidationReducer',
    );
    return (
      <View>
        {!_.isNil(rStateArticle) &&
          !_.isNil(libelleArticle) &&
          !_.isNil(rStateArticle.data) &&
          !_.isNil(libelleArticle.data) ? (
          <TouchableOpacity
            disabled={!(liquidationType == 'automatique' || liquidationType == 'automatiqueRedevanceAT')}
            onPress={() =>
              this.props.showDetailArticle(item, libelleArticle.data)
            }>
            <Row
              key={index}
              style={
                index % 2 === 0
                  ? CustomStyleSheet.whiteRow
                  : CustomStyleSheet.lightBlueRow
              }>
              <Col size={0.4}>
                <ComBadrLibelleComp style={{ color: 'red' }}>
                  {rStateArticle.data ? 'R>' : ''}
                </ComBadrLibelleComp>
              </Col>
              <Col size={0.6}>
                <ComBadrLibelleComp style={{ textAlign: 'center' }}>
                  {item.numArticle}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp style={{ textAlign: 'center' }}>
                  {item.refParametresLiquidation.codeNomenclature}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp style={{ textAlign: 'center' }}>
                  {Numeral(item.refParametresLiquidation.valeurTaxable).format(
                    '0.000',
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp style={{ textAlign: 'center' }}>
                  {Numeral(item.refParametresLiquidation.quantite).format(
                    '0.000',
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col size={0.6}>
                <ComBadrLibelleComp style={{ textAlign: 'center' }}>
                  {item.refParametresLiquidation.refUniteQuantiteDesc}
                </ComBadrLibelleComp>
              </Col>
              <Col size={0.6}>
                <ComBadrLibelleComp style={{ color: 'red', textAlign: 'center' }}>
                  {libelleArticle.data}
                </ComBadrLibelleComp>
              </Col>
              {(liquidationType == 'manuelle' || liquidationType == 'manuelleOffice' || liquidationType == 'manuelleRedevanceAT') &&
                <Col size={0.4}>
                  <IconButton
                    icon="pencil"
                    size={20}
                    color={'white'}
                    style={{ backgroundColor: primaryColor }}
                    onPress={() => this.props.showDetailArticle(item, libelleArticle.data)}
                  />
                </Col>
              }
              {(liquidationType == 'manuelle' || liquidationType == 'manuelleOffice' || liquidationType == 'manuelleRedevanceAT') &&
                <Col size={0.4}>
                  <IconButton
                    icon="delete"
                    size={20}
                    color={'white'}
                    style={{ backgroundColor: primaryColor }}
                  onPress={() => this.props.deleteArticle(this.props.item,this.props.index)}
                  />
                </Col>
              }
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
  return { ...state };
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

import _ from 'lodash';
import React from 'react';
import {StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import {
  ComContainerComp,
  ComBadrLibelleComp,
  ComBadrCardBoxComp,
} from '../../../../../commons/component';
import {
  primaryColor,
  CustomStyleSheet,
} from '../../../../../commons/styles/ComThemeStyle';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {extractCommandData} from '../../../utils/LiqUtils';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {connect} from 'react-redux';

class LiquidationInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liquidationVO: {},
      emissions: [],
      consignations: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    let response = extractCommandData(
      this.props,
      'validerOrdonnancerLiquidationDUM',
      'liquidationReducer',
    );
    if (!_.isNil(response) && !_.isNil(response.data) && prevState.liquidationVO != response.data)
      this.getLiquidationInfo(response);
  }

  getLiquidationInfo = (response) => {
    if (response && response.data && response.data.refOperationSimultanee) {
      let emissions = [];
      let consignations = [];
      _.forEach(
        response.data.refOperationSimultanee.refFichesReference,
        function (item) {
          if (item.indicateurRemise == 'false') {
            consignations.push(item);
            console.log('-----consignations-------', item);
          } else if (item.indicateurRemise == 'true') {
            emissions.push(item);
            console.log('-----emissions-------', item);
          }
        },
      );
      this.setState({
        emissions: emissions,
        consignations: consignations,
        liquidationVO: response.data,
      });
    }
  };

  handelClick = (item) => {
    console.log('LiquidationInfoDetailsScreen', item);
    this.props.navigation.navigate('LiquidationInfoDetailsScreen', {
      ficheAvisualiserVO: item,
    });
  };

  render() {
    const {liquidationVO, emissions, consignations} = this.state;
    console.log('liquidationVO', liquidationVO);
    return (
      <ComContainerComp
        ContainerRef={(ref) => {
          this.scrollViewRef = ref;
        }}>
        {/* Bloc opération de Liquidation*/}
        {liquidationVO && (
          <ComBadrCardBoxComp>
            <Grid>
              <Row style={CustomStyleSheet.whiteRow}>
                <ComBadrLibelleComp
                  withColor={true}
                  style={{fontSize: 14, color: 'grey'}}>
                  {translate('liq.recapitulation.operationsLiquidationEC')}
                </ComBadrLibelleComp>
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.natureOperationPrincipale')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {liquidationVO.refNatureOperationLibelle}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.numeroOperation')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp>
                    {liquidationVO.numOrdreOperation}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.natureOperationSimultane')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {
                      liquidationVO.refOperationSimultanee
                        ?.refNatureOperationLibelle
                    }
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.numeroOperation')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp>
                    {liquidationVO.refOperationSimultanee?.numOrdreOperation}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.typeRecette')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {liquidationVO.refTypeRecetteLibelle}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2} />
              </Row>
            </Grid>
          </ComBadrCardBoxComp>
        )}
        {/* Bloc Info opération de Liquidation*/}
        {liquidationVO && (
          <ComBadrCardBoxComp>
            <Grid>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.ongletInformations.visualisationFichesTitle')}
                </ComBadrLibelleComp>
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <ComBadrLibelleComp>
                  {translate('liq.ongletInformations.emissionsTitle')}
                </ComBadrLibelleComp>
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col>
                      <ComBadrLibelleComp
                        style={{textAlign: 'center'}}
                        withColor={true}>
                        {translate('liq.ongletInformations.numeroOrdre')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp
                        style={{textAlign: 'center'}}
                        withColor={true}>
                        {translate('liq.ongletInformations.typeBordereau')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp
                        style={{textAlign: 'center'}}
                        withColor={true}>
                        {translate('liq.ongletInformations.montantFiche')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp
                        style={{textAlign: 'center'}}
                        withColor={true}>
                        {translate('liq.ongletInformations.statusFiche')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={0.5}></Col>
                  </Row>
                  {emissions &&
                    _.orderBy(emissions, 'numOrdreOperation', 'asc').map(
                      (item, index) => (
                        <Row key={index} style={CustomStyleSheet.whiteRow}>
                          <Col>
                            <ComBadrLibelleComp style={{textAlign: 'center'}}>
                              {item.numOrdreOperation}
                            </ComBadrLibelleComp>
                          </Col>
                          <Col>
                            <ComBadrLibelleComp style={{textAlign: 'center'}}>
                              {liquidationVO.numOrdreOperation}
                            </ComBadrLibelleComp>
                          </Col>
                          <Col>
                            <ComBadrLibelleComp style={{textAlign: 'center'}}>
                              {liquidationVO.numOrdreOperation}
                            </ComBadrLibelleComp>
                          </Col>
                          <Col>
                            <ComBadrLibelleComp style={{textAlign: 'center'}}>
                              {liquidationVO.numOrdreOperation}
                            </ComBadrLibelleComp>
                          </Col>
                          <Col size={0.5}>
                            <IconButton
                              icon="pencil-outline"
                              color={'white'}
                              size={20}
                              style={{backgroundColor: primaryColor}}
                              onPress={() => {
                                this.props.navigation.navigate(
                                  'LiquidationInfoDetailsScreen',
                                );
                              }}
                            />
                          </Col>
                        </Row>
                      ),
                    )}
                </Col>
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <ComBadrLibelleComp>
                  {translate('liq.ongletInformations.consignationsTitle')}
                </ComBadrLibelleComp>
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col>
                      <ComBadrLibelleComp
                        style={{textAlign: 'center'}}
                        withColor={true}>
                        {translate('liq.ongletInformations.numeroOrdre')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp
                        style={{textAlign: 'center'}}
                        withColor={true}>
                        {translate('liq.ongletInformations.typeBordereau')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp
                        style={{textAlign: 'center'}}
                        withColor={true}>
                        {translate('liq.ongletInformations.montantFiche')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp
                        style={{textAlign: 'center'}}
                        withColor={true}>
                        {translate('liq.ongletInformations.statusFiche')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={0.5}></Col>
                  </Row>
                  {consignations &&
                    _.orderBy(consignations, 'numOrdreOperation', 'asc').map(
                      (item, index) => (
                        <Row key={index} style={CustomStyleSheet.whiteRow}>
                          <Col>
                            <ComBadrLibelleComp style={{textAlign: 'center'}}>
                              {item.numOrdreFiche}
                            </ComBadrLibelleComp>
                          </Col>
                          <Col>
                            <ComBadrLibelleComp style={{textAlign: 'center'}}>
                              {item.refBordereau?.refModePaiementLibelle}
                            </ComBadrLibelleComp>
                          </Col>
                          <Col>
                            <ComBadrLibelleComp style={{textAlign: 'center'}}>
                              {item.montantTotalFiche}
                            </ComBadrLibelleComp>
                          </Col>
                          <Col>
                            <ComBadrLibelleComp style={{textAlign: 'center'}}>
                              {item.refStatutFicheLibelle}
                            </ComBadrLibelleComp>
                          </Col>
                          <Col size={0.5}>
                            <IconButton
                              icon="pencil-outline"
                              color={'white'}
                              size={20}
                              style={{backgroundColor: primaryColor}}
                              onPress={() => this.handelClick(item)}
                            />
                          </Col>
                        </Row>
                      ),
                    )}
                </Col>
              </Row>
            </Grid>
          </ComBadrCardBoxComp>
        )}
      </ComContainerComp>
    );
  }
}

const styles = StyleSheet.create({
  decisionContainerRB: {
    backgroundColor: primaryColor,
    padding: 8,
  },
  textRadio: {
    color: '#FFF',
  },
});

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps, null)(LiquidationInfoScreen);

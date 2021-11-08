import React from 'react';
import {
  ComBadrCardBoxComp,
  ComBadrLibelleComp,
  ComAccordionComp,
} from '../../../../../commons/component';
import {View} from 'react-native';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../../commons/styles/ComThemeStyle';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {IconButton} from 'react-native-paper';
import _ from 'lodash';
export default class EciListEnlevementsEffectuesBlock extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {enleverMarchandiseVO} = this.props;
    return (
      <ComBadrCardBoxComp noPadding={true}>
        <ComAccordionComp
          title={translate(
            'ecorimport.enleverMarchandise.listeEnlevementsEffectues.title',
          )}
          expanded={true}>
          <Grid>
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col size={1}>
                {!this.props.isConsultationMode && (
                  <IconButton
                    icon="plus"
                    size={20}
                    color={'white'}
                    style={{backgroundColor: primaryColor}}
                    onPress={this.props.addEnlevement}
                  />
                )}
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('ecorimport.numLigne')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('transverse.refDS')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('ecorimport.lotDedouanement.title')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('ecorimport.enleverMarchandise.numBonSortie')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate(
                    'ecorimport.enleverMarchandise.listeEnlevementsEffectues.colis',
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrLibelleComp withColor={true}>
                  {translate(
                    'ecorimport.enleverMarchandise.listeEnlevementsEffectues.dateHeureEnlevement',
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1} />
            </Row>
            {enleverMarchandiseVO.refMarchandiseEnlevee.map((item, index) => {
              return (
                <Row style={CustomStyleSheet.whiteRow} key={index}>
                  <Col size={1} />
                  <Col size={1}>
                    <ComBadrLibelleComp>{index + 1}</ComBadrLibelleComp>
                  </Col>
                  <Col size={2}>
                    <ComBadrLibelleComp>
                      {_.join(
                        [
                          item.referenceDS.refBureauDouane.codeBureau,
                          item.referenceDS.regime,
                          item.referenceDS.anneeEnregistrement,
                          item.referenceDS.numeroSerieEnregistrement,
                          item.referenceDS.cle,
                        ],
                        '-',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={2}>
                    <ComBadrLibelleComp>
                      {_.join(
                        [
                          item.lieuChargement.descriptionLieuChargement,
                          item.referenceLot,
                        ],
                        '.',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={1}>
                    <ComBadrLibelleComp>
                      {item.numeroBonSortie}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={1}>
                    <ComBadrLibelleComp>
                      {item.nombreContenant}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={2}>
                    <ComBadrLibelleComp>
                      {item.dateHeureEnlevement}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={1}>
                    <Row>
                      {this.props.isConsultationMode ? (
                        <IconButton
                          icon="eye-circle-outline"
                          color={'white'}
                          size={20}
                          style={{backgroundColor: primaryColor}}
                          onPress={() => this.props.editEnlevement(item, index)}
                        />
                      ) : (
                        <Row>
                          <IconButton
                            icon="pencil-outline"
                            color={'white'}
                            size={20}
                            style={{backgroundColor: primaryColor}}
                            onPress={() =>
                              this.props.editEnlevement(item, index)
                            }
                          />
                          <IconButton
                            icon="trash-can-outline"
                            color={'white'}
                            size={20}
                            style={{backgroundColor: primaryColor}}
                            onPress={() =>
                              this.props.deleteEnlevement(item, index)
                            }
                          />
                        </Row>
                      )}
                    </Row>
                  </Col>
                </Row>
              );
            })}
            <Row>
              <Col size={6} />
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('transverse.total')}
                  {' : '}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {_.sumBy(
                    enleverMarchandiseVO.refMarchandiseEnlevee,
                    function (o) {
                      return _.parseInt(o.nombreContenant);
                    },
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col size={3} />
            </Row>
          </Grid>
        </ComAccordionComp>
      </ComBadrCardBoxComp>
    );
  }
}

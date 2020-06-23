import React from 'react';
import {View} from 'react-native';
import {primaryColor} from '../../../../styles/index';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Paragraph, Caption} from 'react-native-paper';
import {connect} from 'react-redux';
import {BadrTable, CardBox, Accordion} from '../../../';
import {translate} from '../../../../common/translations/i18n';
import * as Constants from '../../../../common/constants/controle/BAD';
import * as BadActions from '../../../../redux/actions/controle/BAD';

class DetailBAD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEquipement: null,
    };
  }
  componentDidMount = () => {
    if (this.props.data) {
      let actionParam = {
        typeDS: this.props.data.typeDS,
        refDS: this.props.referenceDs,
        reflot: this.props.data.referenceLot,
        lieuChargement: this.props.data.lieuChargement,
      };
      console.log('Detail BAD with params : ');
      console.log(actionParam);
      var action = BadActions.request({
        type: Constants.DETAIL_BAD_REQUEST,
        value: actionParam,
      });
      this.props.dispatch(action);
    }
  };

  onEquipementClicked = (row) => {
    console.log(row.badequipementVOList);
    this.setState({selectedEquipement: row.badequipementVOList});
  };

  render() {
    let data = this.props.detail;
    let detailBAD = {};
    if (this.props.data && this.props.data.bad) {
      detailBAD = this.props.data.bad;
    }
    console.log('############## rendering data ===> ');
    console.log(data);
    return data !== null ? (
      <View style={styles.container}>
        <Grid>
          <Col size={20} style={styles.colStyle}>
            <Caption style={styles.caption}>
              {translate('bad.numeroBAD')}
            </Caption>
          </Col>
          <Col size={30} style={styles.colStyle}>
            <Paragraph style={styles.paragraph}>
              {detailBAD.numeroBAD}
            </Paragraph>
          </Col>
          <Col size={20} style={styles.colStyle}>
            <Caption style={styles.caption}>
              {translate('bad.statutBAD')}
            </Caption>
          </Col>
          <Col size={30} style={styles.colStyle}>
            <Paragraph style={styles.paragraph}>
              {detailBAD.statutBAD}
            </Paragraph>
          </Col>
        </Grid>

        <Grid>
          <Col size={20} style={styles.colStyle}>
            <Caption style={styles.caption}>
              {translate('bad.nomImportateur')}
            </Caption>
          </Col>
          <Col size={30} style={styles.colStyle}>
            <Paragraph style={styles.paragraph}>
              {detailBAD.nomImportateur}
            </Paragraph>
          </Col>
          <Col size={20} style={styles.colStyle}>
            <Caption style={styles.caption}>
              {translate('bad.nomTransportateur')}
            </Caption>
          </Col>
          <Col size={30} style={styles.colStyle}>
            <Paragraph style={styles.paragraph}>
              {detailBAD.nomTransportateur}
            </Paragraph>
          </Col>
        </Grid>

        <Grid>
          <Col size={20} style={styles.colStyle}>
            <Caption style={styles.caption}>
              {translate('bad.nomConsignataire')}
            </Caption>
          </Col>
          <Col size={30} style={styles.colStyle}>
            <Paragraph style={styles.paragraph}>
              {detailBAD.nomConsignataire}
            </Paragraph>
          </Col>
          <Col size={20} style={styles.colStyle}>
            <Caption style={styles.caption}>
              {translate('bad.dateBonADelivrerStr')}
            </Caption>
          </Col>
          <Col size={30} style={styles.colStyle}>
            <Paragraph style={styles.paragraph}>
              {detailBAD.dateBonADelivrerStr}
            </Paragraph>
          </Col>
        </Grid>

        <Grid>
          <Col size={20} style={styles.colStyle}>
            <Caption style={styles.caption}>
              {translate('bad.descriptionMoyenTransport')}
            </Caption>
          </Col>
          <Col size={30} style={styles.colStyle}>
            <Paragraph style={styles.paragraph}>
              {detailBAD.descriptionMoyenTransport}
            </Paragraph>
          </Col>
          <Col size={20} style={styles.colStyle}>
            <Caption style={styles.caption}>
              {translate('bad.numeroEscale')}
            </Caption>
          </Col>
          <Col size={30} style={styles.colStyle}>
            <Paragraph style={styles.paragraph}>
              {detailBAD.numeroEscale}
            </Paragraph>
          </Col>
        </Grid>

        <Grid>
          <Col size={20} style={styles.colStyle}>
            <Caption style={styles.caption}>
              {translate('bad.lieuDechargement')}
            </Caption>
          </Col>
          <Col size={30} style={styles.colStyle}>
            <Paragraph style={styles.paragraph}>
              {data.lieuChargement}
            </Paragraph>
          </Col>
          <Col size={20} style={styles.colStyle}>
            <Caption style={styles.caption}>
              {translate('bad.lieuProvenance')}
            </Caption>
          </Col>
          <Col size={30} style={styles.colStyle}>
            <Paragraph style={styles.paragraph}>
              {detailBAD.lieuProvenance}
            </Paragraph>
          </Col>
        </Grid>

        <Grid>
          <Col size={20} style={styles.colStyle}>
            <Caption style={styles.caption}>
              {translate('bad.dateArrivee')}
            </Caption>
          </Col>
          <Col size={30} style={styles.colStyle}>
            <Paragraph style={styles.paragraph}>
              {detailBAD.dateArrivee}
            </Paragraph>
          </Col>
          <Col size={20} style={styles.colStyle}>
            <Caption style={styles.caption}>
              {translate('bad.referenceDSBAD')}
            </Caption>
          </Col>
          <Col size={30} style={styles.colStyle}>
            <Paragraph style={styles.paragraph}>
              {this.props.referenceDs}
            </Paragraph>
          </Col>
        </Grid>

        <Grid>
          <Col size={20} style={styles.colStyle}>
            <Caption style={styles.caption}>
              {translate('bad.descriptionTypeDSBAD')}
            </Caption>
          </Col>
          <Col size={30} style={styles.colStyle}>
            <Paragraph style={styles.paragraph}>
              {detailBAD.descriptionTypeDSBAD}
            </Paragraph>
          </Col>
          <Col size={20} style={styles.colStyle}>
            <Caption style={styles.caption}>
              {translate('bad.referenceCNTBAD')}
            </Caption>
          </Col>
          <Col size={30} style={styles.colStyle}>
            <Paragraph style={styles.paragraph}>
              {detailBAD.referenceCNTBAD}
            </Paragraph>
          </Col>
        </Grid>

        <CardBox>
          <Accordion title="Lignes du Bon à délivrer">
            <Grid>
              <Row>
                <BadrTable
                  id="numeroLigne"
                  rows={
                    this.props.data && detailBAD && detailBAD.refBADLigneLot
                      ? detailBAD.refBADLigneLot
                      : []
                  }
                  cols={[
                    {
                      width: 100,
                      code: 'numeroLigne',
                      libelle: translate('bad.numeroLigne'),
                    },
                    {
                      width: 430,
                      code: 'natureMarchandise',
                      libelle: translate('bad.natureMarchandise'),
                    },
                    {
                      width: 120,
                      code: 'poidsBrut',
                      libelle: translate('bad.poidbrut'),
                    },
                    {
                      width: 120,
                      code: 'tareLigne',
                      libelle: translate('bad.tare'),
                    },
                    {
                      code: '',
                      libelle: '',
                      width: 100,
                      component: 'button',
                      icon: 'eye',
                      attrCondition: 'idApurement',
                      action: (row, index) => {
                        this.onEquipementClicked(row);
                      },
                    },
                  ]}
                  paginate={false}
                />
              </Row>

              <Row style={styles.rowStyle}>
                {this.state.selectedEquipement && (
                  <View>
                    <Paragraph style={styles.paragraphTitle}>
                      {translate('bad.listEquipementsTitle')}
                    </Paragraph>

                    <BadrTable
                      id="numeroEquipement"
                      rows={
                        this.state.selectedEquipement
                          ? this.state.selectedEquipement
                          : []
                      }
                      cols={[
                        {
                          width: 300,
                          code: 'numeroEquipement',
                          libelle: translate('bad.numeroEquipement'),
                        },
                        {
                          width: 300,
                          code: 'tareEquipement',
                          libelle: translate('bad.tareEquipement'),
                        },
                      ]}
                      paginate={false}
                    />
                  </View>
                )}
              </Row>
            </Grid>
          </Accordion>
        </CardBox>
      </View>
    ) : (
      <View />
    );
  }
}

const mapStateToProps = (state) => {
  return {...state.badReducer};
};

export default connect(mapStateToProps, null)(DetailBAD);

const styles = {
  colStyle: {padding: 20},
  title: {textAlign: 'center', fontSize: 20, padding: 15},
  caption: {fontSize: 14, color: primaryColor, fontWeight: 'bold'},
  paragraph: {
    fontSize: 12,
  },
  paragraphTitle: {
    fontSize: 14,
    paddingTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {padding: 30},
  rowStyle: {justifyContent: 'center'},
};

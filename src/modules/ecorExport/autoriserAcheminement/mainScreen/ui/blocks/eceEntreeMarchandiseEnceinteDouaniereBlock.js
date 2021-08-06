import React from 'react';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { View } from 'react-native';
import {
  TextInput
} from 'react-native-paper';
import {
  ComAccordionComp, ComBadrCardBoxComp,
  ComBadrLibelleComp
} from '../../../../../../commons/component';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';

export default class EceEntreeMarchandiseEnceinteDouaniereBlock extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const vo = this.props.vo;
    return (
      <View>
      <ComBadrCardBoxComp noPadding={true}>
        {/* Accordion Déclaration en Détail*/}
        <ComAccordionComp
            title={translate('autoriserAcheminemenMainScreen.entreeEnceinteDouaniere.title')}
          expanded={true}>
          <Grid>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.entreeEnceinteDouaniere.dateHeure')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {vo?.dateHeureEntree}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.entreeEnceinteDouaniere.agentDouanier')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {vo?.refAgentEntree?.nom}{' '}
                  {vo?.refAgentEntree?.prenom}
                </ComBadrLibelleComp>
              </Col>
            </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
              <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.entreeEnceinteDouaniere.refDocument')}
                </ComBadrLibelleComp>
              </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {vo.documentEntreeEnceinte}
                  </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
              </Col>
              <Col size={1}>
              </Col>
            </Row>
          </Grid>
        </ComAccordionComp>
        </ComBadrCardBoxComp>
      </View>
    );
  }
}
const value = {
  fontSize: 14,
  fontWeight: 'bold',
};

const style = {
  container: { width: '100%', height: '100%' },
  buttonIcon: { margin: 10, marginTop: 40 },
  dateInputStyle: {
    padding: 10,
  },
  boxContainer: {
    backgroundColor: '#ebecf3',
    borderRadius: 4,
  },
  boxSafeArea: {
    margin: '5%',
    height: 200,
    borderRadius: 4,
    flex: 1,
  },
  boxItem: {
    backgroundColor: '#ffffff',
    marginVertical: 2,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
  },
  boxItemText: {
    paddingLeft: '4%',
    color: '#000000',
  },
  selectedBoxItem: {
    backgroundColor: '#009ab2',
    marginVertical: 2,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
  },
  selectedBoxItemText: {
    paddingLeft: '4%',
    color: '#ffffff',
  },
  rowListNumScelle: {
    height: 170,
  },
  btnActionList: {
    margin: 15,
  },
  toolBarBtn: {
    backgroundColor: 'white',
  },
  centerErrorMsg: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueL: {
    ...value,
    flex: 3,
  },
  flexColumn: { flexDirection: 'column' },
  flexRow: { flexDirection: 'row' },
};
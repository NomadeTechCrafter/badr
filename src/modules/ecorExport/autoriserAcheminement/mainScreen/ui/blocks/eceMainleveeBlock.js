import React from 'react';
import {
  ComBadrCardBoxComp,
  ComBadrLibelleComp,
  ComAccordionComp,
} from '../../../../../../commons/component';

import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import { getFormattedScelles } from '../../utils/autoriserAcheminementUtil';
import _ from 'lodash';

export default class EceMainleveeBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  renderBoxItem = ({ item }) => {


    return (
      <View style={style.boxItem}>

        <Text style={style.boxItemText}>{item}</Text>
      </View>
    );
  };
  render() {
    const vo = this.props.vo;
    return (
      <View>
        <ComBadrCardBoxComp noPadding={true}>
          <ComAccordionComp
            title={translate('autoriserAcheminemenMainScreen.mainlevee.title')}
            expanded={true}>
            <Grid>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.mainlevee.dateValidationMainlevee')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {vo.refMainlevee.dateValidation}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.mainlevee.agentValidationMainlevee')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {vo.refMainlevee.refAgentValidation.nom}{' '}
                    {vo.refMainlevee.refAgentValidation.prenom}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.mainlevee.dateDelivranceMainlevee')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {vo.refMainlevee.dateImpression}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.mainlevee.agentDelivranceMainlevee')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {vo.refMainlevee.refAgentEdition.nom}{' '}
                    {vo.refMainlevee.refAgentEdition.prenom}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row
                style={CustomStyleSheet.whiteRow}>
                <Col size={5}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate(
                      'autoriserAcheminemenMainScreen.mainlevee.conteneursCibles',
                    )}
                  </ComBadrLibelleComp>

                </Col>


                <Col size={5} style={style.boxContainer}>
                  
                    {_.isEmpty(this.props.vo.refMainlevee.conteneursCibles) && (
                      <Text>
                        {translate(
                          'autoriserAcheminemenMainScreen.informationsEcor.aucunElement',
                        )}
                      </Text>
                    )}

                  {!_.isEmpty(this.props.vo.refMainlevee.conteneursCibles) && (
                    <SafeAreaView style={style.boxSafeArea}>
                      <FlatList
                        data={this.props.vo.refMainlevee.conteneursCibles}
                        renderItem={(item) => this.renderBoxItem(item)}
                        keyExtractor={(item) => item}
                        nestedScrollEnabled={true}
                        disabled={true}
                      />
                    </SafeAreaView>
                    )}
                  
                </Col>
              </Row>
              <Row
                style={CustomStyleSheet.lightBlueRow}>
                <Col size={5}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate(
                      'autoriserAcheminemenMainScreen.mainlevee.scellesMainLevee',
                    )}
                  </ComBadrLibelleComp>

                </Col>


                <Col size={5} style={style.boxContainer}>
                  
                    {_.isEmpty(this.props.vo.refMainlevee.listScelle) && (
                      <Text style={style.boxItemText}>
                        {translate(
                          'autoriserAcheminemenMainScreen.informationsEcor.aucunElement',
                        )}
                      </Text>
                    )}

                  {!_.isEmpty(this.props.vo.refMainlevee.listScelle) && (
                    <SafeAreaView style={style.boxSafeArea}>
                      <FlatList
                        data={getFormattedScelles(this.props.vo.refMainlevee.listScelle)}
                        renderItem={(item) => this.renderBoxItem(item)}
                        keyExtractor={(item) => item}
                        nestedScrollEnabled={true}
                        disabled={true}
                      />
                    </SafeAreaView>
                    )}
                  
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
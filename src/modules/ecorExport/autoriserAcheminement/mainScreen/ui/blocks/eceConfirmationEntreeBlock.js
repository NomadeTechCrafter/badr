import _ from 'lodash';
import React from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import {
  ComAccordionComp, ComBadrCardBoxComp,
  ComBadrLibelleComp
} from '../../../../../../commons/component';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';
import { getFormattedScelles } from '../../utils/autoriserAcheminementUtil';
import { TextInput } from 'react-native-paper';

export default class EceConfirmationEntreeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      generateurNumScelleDu: '',
      generateurNumScelleAu: '',
      numeroScelle: ''
    }
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
          {/* Informations ECOR */}
          <ComAccordionComp
            title={translate(
              'autoriserAcheminemenMainScreen.informationsEcor.title',
            )} expanded={true}>
            <Grid>
              <Row style={CustomStyleSheet.whiteRow}>

                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.informationsEcor.numeroPince')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {vo.numeroPinceConfirmationEntree}
                  </ComBadrLibelleComp>
                </Col>


                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.informationsEcor.nombreScelles')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {vo.nombreScelleConfirmationEntree}
                  </ComBadrLibelleComp>
                </Col>

              </Row>
            </Grid>
            <Grid>
              
              <Row
                style={CustomStyleSheet.lightBlueRow}>
                <Col size={5}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate(
                      'autoriserAcheminemenMainScreen.informationsEcor.numeroScelle',
                    )}
                  </ComBadrLibelleComp>
                  
                </Col>
                

                <Col size={5} style={style.boxContainer}>
                  
                    {_.isEmpty(this.props.vo.scellesConfirmationEntree) && (
                      <Text style={style.boxItemText}>
                        {translate(
                          'autoriserAcheminemenMainScreen.informationsEcor.aucunElement',
                        )}
                      </Text>
                    )}

                  {!_.isEmpty(this.props.vo.scellesConfirmationEntree) && (
                    <SafeAreaView style={style.boxSafeArea}>
                      <FlatList
                        data={getFormattedScelles(this.props.vo.scellesConfirmationEntree)}
                        renderItem={(item) => this.renderBoxItem(item)}
                        keyExtractor={(item) => item}
                        nestedScrollEnabled={true}
                        disabled={true}
                      />
                    </SafeAreaView>
                    )}
                 
                </Col>
              </Row>
              <Row size={100}>
                <Col size={30} style={style.labelContainer}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.informationsEcor.transporteurExploitantMEAD')}
                  </ComBadrLibelleComp>
                </Col>

                <Col size={70}>


                  <TextInput
                    value={this.props.transporteurExploitantMEAD?.libelle}
                    disabled={true}
                  />

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
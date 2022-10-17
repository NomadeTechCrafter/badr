import React from 'react';
import {
  ComBadrCardBoxComp,
  ComBadrLibelleComp,
  ComAccordionComp,
  ComBadrNumericTextInputComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrInfoMessageComp,
} from '../../../../../commons/component';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {CustomStyleSheet} from '../../../../../commons/styles/ComThemeStyle';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {FlatList, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {Button, RadioButton, Text, TextInput} from 'react-native-paper';
import style from '../../../../referentiel/plaquesImmatriculation/style/refPlaquesImmStyle';
import _ from 'lodash';

export default class EciMainleveeScelleBlockBlock extends React.Component {
  constructor(props) {
    super(props);
  }
  renderBoxItem = ({item}) => {
    const itemStyle = styles.selectedBoxItem;
    const itemTextStyle = styles.selectedBoxItemText;

    return (
      <View style={itemStyle}>
        <TouchableOpacity>
          <Text style={itemTextStyle}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const {verifierCntEcorVO} = this.props;
    return (
      <ComBadrCardBoxComp noPadding={true}>
        {/* Informations ECOR */}
        <ComAccordionComp
          title={translate('ecorimport.scelles.mlvScelle')}
          expanded={true}>
          <Grid>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={2}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('ecorimport.scelles.nouveauxScelles')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={4}>
                <View style={styles.flexRow}>
                  <RadioButton.Group
                    value={
                      verifierCntEcorVO?.refMainlevee?.infoEcorScelle ===
                      true
                        ? 'true'
                        : 'false'
                    }>
                    <View style={styles.flexColumn}>
                      <Text>{translate('ecorimport.scelles.oui')}</Text>
                      <RadioButton disabled value="true" />
                    </View>
                    <View style={styles.flexColumn}>
                      <Text>{translate('ecorimport.scelles.non')}</Text>
                      <RadioButton disabled value="false" />
                    </View>
                  </RadioButton.Group>
                </View>
              </Col>
            </Row>
            {verifierCntEcorVO?.refMainlevee?.infoEcorScelle == true && (
              <View>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={1}>
                    <TextInput
                      mode={'outlined'}
                      maxLength={8}
                      value={verifierCntEcorVO?.refMainlevee?.numeroPince}
                      label={translate('ecorimport.scelles.numeroPince')}
                      style={CustomStyleSheet.badrInputHeight}
                      disabled={true}
                    />
                  </Col>
                  <Col size={1} />
                  <Col size={1}>
                    <ComBadrNumericTextInputComp
                      maxLength={8}
                      value={
                        verifierCntEcorVO?.refMainlevee?.nombreDeScelles
                      }
                      label={translate('ecorimport.scelles.nombreScelles')}
                      disabled={true}
                    />
                  </Col>
                </Row>
                <Row
                  style={[CustomStyleSheet.whiteRow, styles.rowListNumScelle]}>
                  <Col size={2}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorimport.scelles.nouveauxScelles')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={4} style={styles.boxContainer}>
                    <SafeAreaView style={styles.boxSafeArea}>
                      {_.isEmpty(
                        Object.values(
                          verifierCntEcorVO?.refMainlevee?.listScelle,
                        ),
                      ) && (
                        <Text style={styles.boxItemText}>
                          {translate('ecorimport.scelles.aucunElement')}
                        </Text>
                      )}

                      {!_.isEmpty(
                        Object.values(
                          verifierCntEcorVO?.refMainlevee?.listScelle,
                        ),
                      ) && (
                        <FlatList
                          data={Object.values(
                            verifierCntEcorVO?.refMainlevee?.listScelle,
                          )}
                          renderItem={(item) => this.renderBoxItem(item)}
                          keyExtractor={(item) => item}
                          nestedScrollEnabled={true}
                        />
                      )}
                    </SafeAreaView>
                  </Col>
                </Row>
              </View>
            )}
          </Grid>
        </ComAccordionComp>
      </ComBadrCardBoxComp>
    );
  }
}
const styles = {
  flexColumn: {flexDirection: 'column'},
  flexRow: {flexDirection: 'row'},
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
};

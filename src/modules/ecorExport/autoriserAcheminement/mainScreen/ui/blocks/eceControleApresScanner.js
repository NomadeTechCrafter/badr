import _ from 'lodash';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { RadioButton, TextInput } from 'react-native-paper';
import {
  ComAccordionComp, ComBadrCardBoxComp, ComBadrLibelleComp
} from '../../../../../../commons/component';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet, primaryColor } from '../../../../../../commons/styles/ComThemeStyle';
import style from '../../style/autoriserAcheminementMainStyle';


export default class EceControleApresScannerBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vo: this.props.vo,
      operateur: {
        libelle: '',
        code: ''
      }, reference: '',
      showMsgScelle: false,
      msgScelle: '',

    }
  }


  




  
  renderBoxItem = ({ item }) => {
    const itemStyle =
      item === this.state.selectedScelle
        ? style.selectedBoxItem
        : style.boxItem;
    const itemTextStyle =
      item === this.state.selectedScelle
        ? style.selectedBoxItemText
        : style.boxItemText;

    return (
      <View style={itemStyle}>
        <TouchableOpacity
          disabled={true}
          onPress={() =>
            this.setState({
              ...this.state,
              selectedScelle: item,
            })
          }>
          <Text style={itemTextStyle}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  

  render() {
    return (
      <View>
        <ComBadrCardBoxComp noPadding={true}>
          {/* Accordion Déclaration en Détail*/}
          <ComAccordionComp
            title={translate('autoriserAcheminemenMainScreen.controleApresScanner.title')}
            expanded={true}>
            <View>

              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={2}>
                  <RadioButton.Group value={this.props.vo.infoEcorScelleCrtlApresScanner ? "true" : "false"} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>{translate('autoriserAcheminemenMainScreen.controleApresScanner.oui')}</Text>
                        <RadioButton value="true" color={primaryColor} disabled={true}/>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>{translate('autoriserAcheminemenMainScreen.controleApresScanner.non')}</Text>
                        <RadioButton value="false" color={primaryColor} disabled={true} />
                      </View>
                    </View>
                  </RadioButton.Group>
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.controleApresScanner.agentDouanier')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {this.props.vo?.refAgentCrtlApresScanner?.nom}{' '}
                    {this.props.vo?.refAgentCrtlApresScanner?.prenom}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              </View>
            {(this.props.vo.infoEcorScelleCrtlApresScanner) && (<View><Row size={100} style={CustomStyleSheet.lightBlueRow}>
                <Col size={30} style={style.labelContainer}>
                <ComBadrLibelleComp withColor={true}>
                    {translate(
                      'autoriserAcheminemenMainScreen.controleApresScanner.numeroPince',
                    )}
                  </ComBadrLibelleComp>
                </Col>

                <Col size={70}>
                  <TextInput
                    value={
                      this.props.vo
                        .numeroPinceCrtlApresScanner
                    }
                    disabled={true}
                  />
                </Col>
              </Row>

              <Row size={100} >
                <Col size={30} style={style.labelContainer}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate(
                      'autoriserAcheminemenMainScreen.controleApresScanner.nombreScelles',
                    )}
                  </ComBadrLibelleComp>
                </Col>

                <Col size={70}>
                  <TextInput
                    value={this.props.vo.nombreScelleCrtlApresScanner}
                    disabled={true}
                  />
                </Col>
              </Row>
              


              <Row size={100} style={CustomStyleSheet.lightBlueRow}>
                <Col size={30} style={style.labelContainer}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate(
                      'autoriserAcheminemenMainScreen.controleApresScanner.numeroScelle',
                    )}
                  </ComBadrLibelleComp>

                </Col>

                

                

               

                <Col size={40} style={style.boxContainer}>
                  <SafeAreaView style={style.boxSafeArea}>
                    {(this.props.vo
                      .scellesCrtlApresScanner == null ||

                      _.isEmpty(this.props.vo
                        .scellesCrtlApresScanner)) && (
                        <Text style={style.boxItemText}>
                            Aucun élément
                        </Text>
                      )}

                    {this.props.vo
                      .scellesCrtlApresScanner != null &&
                      this.props.vo
                        .scellesCrtlApresScanner
                        .size !== 0 && (
                        <FlatList
                          data={Object.values(
                            this.props.vo
                              .scellesCrtlApresScanner,
                          )}
                          renderItem={(item) =>
                            this.renderBoxItem(item)
                          }
                          keyExtractor={(item) => item}
                          nestedScrollEnabled={true}
                          disabled={true}
                        />
                      )}
                  </SafeAreaView>
                </Col>
              </Row>
              
              <Row size={100}>
                <Col size={30} style={style.labelContainer}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.controleApresScanner.transporteurExploitantMEAD')}
                  </ComBadrLibelleComp>
                </Col>

                <Col size={70}>


                  <TextInput
                    value={this.props.transporteurExploitantMEADCtrlApresScanner?.libelle}
                    disabled={true}
                  />
                  
                </Col>
              </Row>
            </View>)}
        </ComAccordionComp>
      </ComBadrCardBoxComp>
     </View>
    );
  }
}

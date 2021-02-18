import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import {
  TextInput
} from 'react-native-paper';
import {
  ComBadrCardBoxComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,

  ComBadrLibelleComp,

  ComBadrPickerCheckerComp, ComBadrPickerComp, ComBadrProgressBarComp, ComContainerComp
} from '../../../../../../commons/component';
/**i18n */
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import { save } from '../../../../../../commons/services/async-storage/ComStorageService';
import {
  CustomStyleSheet,
  primaryColor
} from '../../../../../../commons/styles/ComThemeStyle';


const screenHeight = Dimensions.get('window').height;


class AtifsRapportCreationDetailsTab extends Component {
  constructor(props) {
    super(props);
    //console.log('props entete')
    //console.log(props)
    this.state = {
      command: null,
      selectedvalue: '',
      show: false,
    };
    console.log('consultation_________details', this.props.consultation);
  }

  componentDidMount() { }

  handleOnIncidentItemsChanged = (items) => {
    this.setState({ selectedItems: items });
  };
  handleOnConfirmIncidentType = (items) => { };

  render() {
    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComContainerComp>
          {this.props.showProgress && (
            <ComBadrProgressBarComp width={screenHeight} />
          )}
          {this.props.errorMessage != null && (
            <ComBadrErrorMessageComp message={this.props.errorMessage} />
          )}
          {this.props.successMessage != null && (
            <ComBadrInfoMessageComp message={this.props.successMessage} />
          )}
          {/* Référence déclaration */}
          <ComBadrCardBoxComp noPadding={true}>
            <Grid>
              {/*first row */}
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={4}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.detail.natureIncidents')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={8}>
                  {this.props.consultation ? (
                    <TextInput
                      mode={'outlined'}
                      style={[
                        styles.textInputStyle,
                        { backgroundColor: '#f7f7fa' },
                      ]}
                      disabled={true}
                      value={''}
                      multiline={false}
                      numberOfLines={1}
                      onChangeText={(text) => { }}
                    />
                  ) : (
                      <ComBadrCardBoxComp>
                        <ComBadrPickerComp
                          onRef={(ref) => (this.code = ref)}
                          key="code"
                          titleStyle={CustomStyleSheet.badrPickerTitle}
                          style={{ flex: 1 }}
                          title={translate('actifsCreation.detail.natureIncidents')}
                          cle="code"
                          libelle="libelle"
                          module="GIB"
                          command="getNaturesIncident"
                          onValueChange={(selectedValue, selectedIndex, item) => {
                            // console.log("item", item)
                          }}
                          param={'this.state.value'}
                          typeService="SP"
                          storeWithKey="code"
                          storeLibelleWithKey="code"
                        />
                      </ComBadrCardBoxComp>
                    )}
                </Col>
              </Row>

              {this.props.consultation ? null : (
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col size={4}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('actifsCreation.detail.typesIncidents')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={8} style={{ paddingRight: 5 }}>
                    <Row>
                      <Col size={10}>
                        <ComBadrCardBoxComp>
                          <ComBadrPickerCheckerComp
                            key={'code'}
                            title={translate('actifsCreation.detail.typesIncidents')}
                            titleStyle={CustomStyleSheet.badrPickerTitle}
                            style={{ flex: 1 }}
                            cle="code"
                            libelle="libelle"
                            module="GIB"
                            command={'getTypesIncident'}
                            onValueChange={(selectedValue, selectedIndex) => {
                              //console.log(selectedValue)
                              save('typeIncident', selectedValue).then(() =>
                                console.log(selectedValue),
                              );
                            }}
                            param={''}
                            typeService="SP"
                            onConfirm={this.handleOnConfirmIncidentType}
                            onSelectedItemObjectsChange={
                              this.handleOnIncidentItemsChanged
                            }
                          />
                        </ComBadrCardBoxComp>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )}
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={4}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.detail.autresIncidents')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={8} style={{ paddingRight: 5 }}>
                  <TextInput
                    mode={'outlined'}
                    style={[
                      styles.textInputStyle,
                      { backgroundColor: '#f7f7fa' },
                    ]}
                    disabled={this.props.consultation}
                    value={this.state.autreIncident}
                    multiline={false}
                    numberOfLines={1}
                    onChangeText={(text) =>
                      this.setState({ autreIncident: text }, () =>
                        save('autreIncident', this.state.autreIncident),
                      )
                    }
                  />
                </Col>
              </Row>

              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={3}>
                  <Row>
                    <ComBadrLibelleComp style={{ paddingRight: 2 }}>
                      {translate('actifsCreation.detail.descriptionRapport')}
                    </ComBadrLibelleComp>
                  </Row>
                </Col>
                <Col size={6} style={{ paddingRight: 5 }}>
                  <TextInput
                    mode={'outlined'}
                    textAlignVertical={'top'}
                    style={[
                      styles.multilineInputStyle,
                      { backgroundColor: '#f7f7fa' },
                    ]}
                    disabled={this.props.consultation}
                    value={this.state.descriptionRapport}
                    multiline
                    numberOfLines={20}
                    onChangeText={(text) =>
                      this.setState({ descriptionRapport: text }, () =>
                        save('description', this.state.descriptionRapport),
                      )
                    }
                  />
                </Col>
              </Row>
            </Grid>
          </ComBadrCardBoxComp>
        </ComContainerComp>
      </View>
    );
  }
}

const libelle = {
  fontSize: 14,
  color: '#006acd',
};

const styles = {
  cardBoxInfoDum: {
    flexDirection: 'column',
  },
  ComBadrCardBoxComp: {
    flexDirection: 'column',
    padding: 0,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  containerActionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  libelleS: {
    ...libelle,
    flex: 1,
  },
  libelleM: {
    ...libelle,
    flex: 2,
  },
  libelleL: {
    ...libelle,
    flex: 3,
  },
  decisionContainerRB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: primaryColor,
    padding: 8,
    width: 300,
  },
  checkboxCol: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  textRadio: {
    color: '#FFF',
  },
  multilineInputStyle: {
    height: 80,
    fontSize: 12,
    backgroundColor: 'white',
    textAlignVertical: 'top',
  },
  textInputStyle: {
    height: 20,
    fontSize: 12,
    backgroundColor: 'white',
  },
  pickerStyle: {
    backgroundColor: '#f1f1f1',
    fontSize: 12,
    height: 30,
  },
};

export default AtifsRapportCreationDetailsTab;

import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import {
  ComContainerComp,
  ComBadrCardBoxComp,
  ComAccordionComp,
  ComBadrButtonComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
  BadrList,
  ComBadrLibelleComp,
  ComBadrPickerComp,
  ComBadrPickerCheckerComp,
  ComBadrItemsPickerComp,
  ComBadrNumericTextInputComp,
} from '../../../../../../commons/component/';
import moment from 'moment';
import ModalPV from './ModalPV';
import ModalMarchandise from './ModalMarchandise';
import ModalMTS from './ModalMTS';
import {
  Checkbox,
  TextInput,
  Text,
  RadioButton,
  Paragraph,
  TouchableRipple,
  Button,
  IconButton,
} from 'react-native-paper';
import {Col, Row, Grid} from 'react-native-easy-grid';
/**i18n */
import {translate} from '../../../../../../commons/i18n/ComI18nHelper';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../../../commons/styles/ComThemeStyle';

import {connect} from 'react-redux';
import * as getUnitesMesure from '../../../../../redux/actions/actifs/rapport/creation/saisie';
import * as Constants from '../../../../../common/constants/actifs/rapport/creation/saisie';

const screenHeight = Dimensions.get('window').height;

class Saisie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetailPV: false,
      showDetailMarchandise: false,
      showDetail: false,
      showDetailMTS: false,
      selectedValue: '',
      nPV: '',
      date: new Date().toString(),
      show: false,
      natureMarchandise: '',
      valeur: '',
      autre: '',
      natureVehicule: '',
      libelle: '',
      valeurMTS: '',
      dateText: 'jj/mm/aaaa',
      dataPV: [],
      dataMarchandise: [],
      dataMTS: [],
      editPV: false,
      editMarchandise: false,
      editMTS: false,
      selectedItem: {},
      selectedItemMar: {},
      selectedItemMTS: {},
    };
    this.dataPV = [];
    this.dataMarchandise = [];
    this.dataMTS = [];
  }

  componentDidMount() {
    this.getUnitesMesure();
  }

  retablir = () => {
    this.setState({
      nPV: '',
      date: new Date().toString(),
      show: false,
      natureMarchandise: '',
      valeur: '',
      autre: '',
    });
  };
  onChange = (event, selectedDate) => {
    this.setState({
      date: selectedDate,
      show: false,
      dateText: moment(selectedDate).format('MM/DD/YYYY'),
    });
  };
  showMode = (currentMode) => {
    this.setState({show: true, mode: currentMode});
  };

  confirmer = () => {
    this.state.editPV
      ? this.editPV()
      : this.state.dataPV.push({
          nPV: this.state.nPV,
          date: moment(this.state.date).format('MM/DD/YYYY'),
        });
    this.setState({showDetailPV: false});
  };
  editPV = () => {
    const dataPV = [...this.state.dataPV];
    console.log('data[item]', dataPV[this.state.selectedItem]);
    dataPV.splice(this.state.selectedItem, 1, {
      nPV: this.state.nPV,
      date: moment(this.state.date).format('MM/DD/YYYY'),
    });
    console.log('table after splice', dataPV);
    this.setState({dataPV, editPV: false}, () =>
      console.log('on press edit', this.state.dataPV),
    );
  };
  choixPV = (item) => {
    return (
      <Col size={2}>
        <Row>
          <Col size={1}>
            <IconButton
              icon="pencil-outline"
              color={'white'}
              size={15}
              style={{backgroundColor: primaryColor}}
              onPress={() => {
                this.setState({
                  showDetailPV: true,
                  editPV: true,
                  selectedItem: item,
                });
              }}
            />
          </Col>
          <Col size={1}>
            <IconButton
              icon="trash-can-outline"
              color={'white'}
              size={15}
              style={{backgroundColor: primaryColor}}
              onPress={() => {
                let dataPV = [...this.state.dataPV];
                dataPV.splice(item, 1);
                this.setState({dataPV}, () => console.log(this.state.dataPV));
              }}
            />
          </Col>
        </Row>
      </Col>
    );
  };
  mapDataArrayPV = () => {
    return this.state.dataPV.map((item, index) => {
      return (
        <Row style={CustomStyleSheet.whiteRow}>
          <Col size={2} />
          <Col size={2}>
            <ComBadrLibelleComp withColor={true}>{item.nPV}</ComBadrLibelleComp>
          </Col>
          <Col size={2}>
            <ComBadrLibelleComp withColor={true}>
              {item.date}
            </ComBadrLibelleComp>
          </Col>
          {this.choixPV(index)}
        </Row>
      );
    });
  };

  getUnitesMesure = () => {
    let data = {
      jsonVO: '',
    };
    let action = getUnitesMesure.request(
      {
        type: Constants.ACTIFS_SAISIE_REQUEST,
        value: {data: data},
      } /*,
                    this.props.navigation,
                    this.props.successRedirection,*/,
    );
    this.props.dispatch(action);
    ////console.log('dispatch fired !!');
  };
  onDismiss = () => {
    this.setState({
      showDetailPV: false,
      showDetailMarchandise: false,
      showDetailMTS: false,
    });
  };

  editMarchandise() {
    const dataMarchandise = [...this.state.dataMarchandise];
    console.log('data[item]', dataMarchandise[this.state.selectedItemMar]);
    dataMarchandise.splice(this.state.selectedItemMar, 1, {
      NDM: this.state.natureMarchandise,
      UM: this.state.selectedValue,
      quantity: this.state.quantity,
      V: this.state.valeur,
    });
    this.setState(
      {
        dataMarchandise,
        editMarchandise: false,
      },
      () => console.log('on press edit', this.state.dataMarchandise),
    );
  }
  confirmerMarchandise = () => {
    this.state.editMarchandise
      ? this.editMarchandise()
      : this.state.dataMarchandise.push({
          NDM: this.state.natureMarchandise,
          UM: this.state.selectedValue,
          quantity: this.state.quantity,
          V: this.state.valeur,
        });
    this.setState({showDetailMarchandise: false});
  };
  choixMarchandise = (item) => {
    return (
      <Col size={2}>
        <Row>
          <Col size={1}>
            <IconButton
              icon="pencil-outline"
              color={'white'}
              size={15}
              style={{backgroundColor: primaryColor}}
              onPress={() => {
                this.setState({
                  showDetailMarchandise: true,
                  editMarchandise: true,
                  selectedItemMar: item,
                });
              }}
            />
          </Col>
          <Col size={1}>
            <IconButton
              icon="trash-can-outline"
              color={'white'}
              size={15}
              style={{backgroundColor: primaryColor}}
              onPress={() => {
                let dataMarchandise = [...this.state.dataMarchandise];
                dataMarchandise.splice(item, 1);
                this.setState({dataMarchandise}, () =>
                  console.log(this.state.dataMarchandise),
                );
              }}
            />
          </Col>
        </Row>
      </Col>
    );
  };
  mapDataArrayMarchandise = () => {
    return this.state.dataMarchandise.map((item, index) => {
      return (
        <Row style={CustomStyleSheet.whiteRow}>
          <Col size={2} />
          <Col size={2}>
            <ComBadrLibelleComp>{item.NDM}</ComBadrLibelleComp>
          </Col>
          <Col size={2}>
            <ComBadrLibelleComp>{item.quantity}</ComBadrLibelleComp>
          </Col>
          <Col size={2}>
            <ComBadrLibelleComp>{item.UM}</ComBadrLibelleComp>
          </Col>
          <Col size={2}>
            <ComBadrLibelleComp>{item.V}</ComBadrLibelleComp>
          </Col>
          {this.choixMarchandise(index)}
        </Row>
      );
    });
  };

  editMTS = () => {
    const dataMTS = [...this.state.dataMTS];
    console.log('data[item]', dataMTS[this.state.selectedItemMTS]);
    dataMTS.splice(this.state.selectedItemMTS, 1, {
      natureVehicule: this.state.natureVehicule,
      libelle: this.state.libelle,
      valeurMTS: this.state.valeurMTS,
    });
    this.setState(
      {
        dataMTS,
        editMTS: false,
      },
      () => console.log('on press edit', this.state.dataMTS),
    );
  };
  confirmerMTS = () => {
    this.state.editMTS
      ? this.editMTS()
      : this.state.dataMTS.push({
          natureVehicule: this.state.natureVehicule,
          libelle: this.state.libelle,
          valeurMTS: this.state.valeurMTS,
        });
    this.setState({showDetailMTS: false});
  };
  choixMTS = (item) => {
    return (
      <Col size={2}>
        <Row>
          <Col size={1}>
            <IconButton
              icon="pencil-outline"
              color={'white'}
              size={15}
              style={{backgroundColor: primaryColor}}
              onPress={() => {
                this.setState({
                  showDetailMTS: true,
                  editMTS: true,
                  selectedItemMTS: item,
                });
              }}
            />
          </Col>
          <Col size={1}>
            <IconButton
              icon="trash-can-outline"
              color={'white'}
              size={15}
              style={{backgroundColor: primaryColor}}
              onPress={() => {
                let dataMTS = [...this.state.dataMTS];
                dataMTS.splice(item, 1);
                this.setState({dataMTS}, () => console.log(this.state.dataMTS));
              }}
            />
          </Col>
        </Row>
      </Col>
    );
  };
  mapDataArrayMTS = () => {
    return this.state.dataMTS.map((item, index) => {
      return (
        <Row style={CustomStyleSheet.whiteRow}>
          <Col size={2} />
          <Col size={2}>
            <ComBadrLibelleComp>{item.natureVehicule}</ComBadrLibelleComp>
          </Col>
          <Col size={2}>
            <ComBadrLibelleComp>{item.libelle}</ComBadrLibelleComp>
          </Col>
          <Col size={2}>
            <ComBadrLibelleComp>{item.valeurMTS}</ComBadrLibelleComp>
          </Col>
          {this.choixMTS(index)}
        </Row>
      );
    });
  };

  render() {
    let rows = '';
    if (this.props.value && this.props.value.jsonVO) {
      rows = this.props.value.jsonVO;
    }
    console.log('console.log(this.state.dataPV)', this.state.dataPV);
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
          <ComBadrCardBoxComp style={styles.ComBadrCardBoxComp}>
            <ComAccordionComp title={translate('actifs.saisie.pVSaisi')}>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={2}>
                  <IconButton
                    icon="plus"
                    color={'white'}
                    size={15}
                    style={{backgroundColor: primaryColor}}
                    onPress={() => {
                      this.setState({showDetailPV: true});
                    }}
                  />
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifs.saisie.nPV')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifs.saisie.dU')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifs.saisie.choix')}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              {this.mapDataArrayPV()}
            </ComAccordionComp>
          </ComBadrCardBoxComp>
          <ComBadrCardBoxComp style={styles.ComBadrCardBoxComp}>
            <ComAccordionComp
              title={translate('actifs.saisie.marchandisesSaisies')}>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={2}>
                  <IconButton
                    icon="plus"
                    size={15}
                    color={'white'}
                    style={{backgroundColor: primaryColor}}
                    onPress={() => {
                      this.setState({showDetailMarchandise: true});
                    }}
                  />
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifs.saisie.natureMarchandise')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifs.saisie.quantity')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifs.saisie.unityMesure')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifs.saisie.valeur')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifs.saisie.choix')}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              {this.mapDataArrayMarchandise()}
            </ComAccordionComp>
          </ComBadrCardBoxComp>
          <ComBadrCardBoxComp style={styles.ComBadrCardBoxComp}>
            <ComAccordionComp
              title={translate('actifs.saisie.moyensTransportS')}>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={2}>
                  <IconButton
                    icon="plus"
                    size={15}
                    color={'white'}
                    style={{backgroundColor: primaryColor}}
                    onPress={() => {
                      this.setState({showDetailMTS: true});
                    }}
                  />
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifs.saisie.natureVehicule')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifs.saisie.libelle')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifs.saisie.valeur')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifs.saisie.choix')}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              {this.mapDataArrayMTS()}
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          <ModalPV
            visible={this.state.showDetailPV}
            value={this.state.nPV}
            onDismiss={this.onDismiss}
            confirmer={this.confirmer}
            retablir={this.retablir}
            onChangeBadrInput={(text) => this.setState({nPV: text})}
            onChangeTextDate={(text) => this.setState({date: text})}
            valueDate={this.state.dateText}
            date={new Date(1598051730000)}
            show={this.state.show}
            onChange={this.onChange}
            showMode={this.showMode}
          />

          <ModalMarchandise
            visible={this.state.showDetailMarchandise}
            handlenatureMarchnadise={(item, index) => {
              this.setState({natureMarchandise: item}, () =>
                console.log('item ======', this.state.natureMarchandise),
              );
            }}
            onChangeTextAutre={(text) => this.setState({autre: text})}
            onChangeQuantity={(text) => this.setState({quantity: text})}
            onChangeValeur={(text) => this.setState({valeur: text})}
            Qunatity={this.state.quantity}
            autre={this.state.autre}
            valeur={this.state.valeur}
            rows={rows}
            onValueChanged={(item, index) => {
              this.setState({selectedValue: item});
            }}
            selectedvalue={this.state.selectedValue}
            confirmer={this.confirmerMarchandise}
            onDismiss={this.onDismiss}
          />

          <ModalMTS
            visible={this.state.showDetailMTS}
            onDismiss={this.onDismiss}
            onValueChangeMTS={(item, index) => {
              this.setState({natureVehicule: item});
              console.log('');
            }}
            confirmer={this.confirmerMTS}
            onChangeValueMTS={(text) => this.setState({valeurMTS: text})}
            valueMTS={this.state.valeurMTS}
            libelle={this.state.libelle}
            onChangelibelle={(text) => this.setState({libelle: text})}
          />
        </ComContainerComp>
      </View>
    );
  }
}

const styles = {
  ComBadrCardBoxComp: {
    flexDirection: 'column',
    padding: 0,
  },
};

const mapStateToProps = (state) => ({...state.saisieReducer});

export default connect(mapStateToProps, null)(Saisie);

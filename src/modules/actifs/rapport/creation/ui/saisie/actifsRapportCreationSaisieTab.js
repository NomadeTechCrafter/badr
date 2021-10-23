import moment from 'moment';
import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import {
  IconButton
} from 'react-native-paper';
import { connect } from 'react-redux';
import {
  ComAccordionComp, ComBadrCardBoxComp,


  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,



  ComBadrLibelleComp, ComBadrProgressBarComp, ComContainerComp
} from '../../../../../../commons/component';
/**i18n */
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import {
  CustomStyleSheet,
  primaryColor
} from '../../../../../../commons/styles/ComThemeStyle';
import { FORMAT_DDMMYYYY } from '../../../utils/actifsConstants';
import { formatCustomized } from '../../../utils/actifsUtils';
import * as Constants from '../../state/actifsRapportCreationConstants';
import * as getUnitesMesure from '../../state/actions/actifsRapportCreationGetUnitesMesureAction';
import ActifsRapportCreationSaisieMarchandiseModal from './ModalMarchandise/actifsRapportCreationSaisieMarchandiseModal';
import ActifsRapportCreationSaisieMTSModal from './ModalMTS/actifsRapportCreationSaisieMTSModal';
import ActifsRapportCreationSaisiePVModal from './ModalPV/actifsRapportCreationSaisiePVModal';


const screenHeight = Dimensions.get('window').height;

class AtifsRapportCreationSaisieTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetailPV: false,
      showDetailMarchandise: false,
      showDetail: false,
      showDetailMTS: false,
      selectedValue: '',
      numPV: '',
      datePV: new Date().toString(),
      show: false,
      natureMarchandise: '',
      valeur: '',
      autreMarque: '',
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
    // console.log('--AtifsRapportCreationSaisieTab  -------------------  componentDidMount');
    this.getUnitesMesure();
  }

  retablir = () => {
    this.setState({
      numPV: '',
      datePV: new Date().toString(),
      show: false,
      natureMarchandise: '',
      valeur: '',
      autreMarque: '',
      dateText: ''
    });
  };

  retablirMarchandise = () => {
    this.setState({ natureMarchandise: '', quantite: '', autreMarque: '', valeur: '' });
    this.refMarchandiseModal.clear();
  }
  onChange = (event, selectedDate) => {
    console.log('Yassine  ');
    console.log(event);
    console.log(selectedDate);
    this.setState({
      datePV: event.nativeEvent.timestamp,
      show: false,
      dateText: moment(selectedDate).format('DD/MM/YYYY'),
    });
  };
  showMode = (currentMode) => {
    this.setState({ show: true, mode: currentMode });
  };

  confirmer = () => {
    if (this.state.editPV) {
      this.editPV()

    } else {
      this.state.dataPV.push({
        numPV: this.state.numPV,
        datePV: this.state.datePV,
      });
      this.update();
    }
    this.setState({ showDetailPV: false });
  };
  editPV = () => {
    const dataPV = [...this.state.dataPV];
    console.log('data[item]', dataPV[this.state.selectedItem]);
    dataPV.splice(this.state.selectedItem, 1, {
      numPV: this.state.numPV,
      datePV: this.state.datePV,
    });
    console.log('table after splice', dataPV);
    this.setState({ dataPV, editPV: false }, () => { console.log('on press edit', this.state.dataPV); this.update(); }
    );
  };
  choixPV = (item, index) => {
    return (
      <Col size={2}>
        <Row>
          <Col size={1}>
            <IconButton
              icon="pencil-outline"
              color={'white'}
              size={15}
              style={{ backgroundColor: primaryColor }}
              onPress={() => {
                let data = item;
                console.log(item);
                this.setState({
                  showDetailPV: true,
                  editPV: true,
                  selectedItem: index,
                  numPV: data.numPV,
                  datePV: data.datePV,
                  dateText: formatCustomized(data.datePV, FORMAT_DDMMYYYY)

                });
              }}
            />
          </Col>
          <Col size={1}>
            <IconButton
              icon="trash-can-outline"
              color={'white'}
              size={15}
              style={{ backgroundColor: primaryColor }}
              onPress={() => {
                let dataPV = [...this.state.dataPV];
                dataPV.splice(item, 1);
                this.setState({ dataPV }, () => { console.log(this.state.dataPV); this.update(); });
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
        <Row style={CustomStyleSheet.whiteRow} key={index}>
          <Col size={2} />
          <Col size={2}>
            <ComBadrLibelleComp withColor={true}>{item.numPV}</ComBadrLibelleComp>
          </Col>
          <Col size={2}>
            <ComBadrLibelleComp withColor={true}>
              {formatCustomized(item.datePV, FORMAT_DDMMYYYY)}
            </ComBadrLibelleComp>
          </Col>
          {(!this.props.consultation) && this.choixPV(item,index)}
        </Row>
      );
    });
  };

  getUnitesMesure = () => {
    let action = getUnitesMesure.request(
      {
        type: Constants.ACTIFS_SAISIE_REQUEST,
        value: { data: '' },
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
      marque: this.state.natureMarchandise,
      uniteMesure: this.state.selectedValue,
      quantite: this.state.quantite,
      valeur: this.state.valeur,
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
    console.log('confirmerMarchandise : ', this.state);
    if (this.state.editMarchandise) {
      this.editMarchandise();
    } else {
       this.state.dataMarchandise.push({
         marque: this.state.natureMarchandise,
         uniteMesure: this.state.selectedValue,
      quantite: this.state.quantite,
         valeur: this.state.valeur,
         autreMarque: this.state.autreMarque
       });
      this.update();
    }
    this.setState({ showDetailMarchandise: false });
  };
  choixMarchandise = (item, index) => {
    return (
      <Col size={2}>
        <Row>
          <Col size={1}>
           <IconButton
              icon="pencil-outline"
              color={'white'}
              size={15}
              style={{ backgroundColor: primaryColor }}
              onPress={() => {
                let data = item;
                console.log('data MRS', data);
                
                this.setState({
                  showDetailMarchandise: true,
                  editMarchandise: true,
                  selectedItemMar: index,
                  quantite: data.quantite, autreMarque: data.autreMarque, valeur: data.valeur
                });

                this.refMarchandiseModal.clear();
                this.refMarchandiseModal.populate(data);
                
              }}
            />
          </Col>
          <Col size={1}>
            <IconButton
              icon="trash-can-outline"
              color={'white'}
              size={15}
              style={{ backgroundColor: primaryColor }}
              onPress={() => {
                let dataMarchandise = [...this.state.dataMarchandise];
                dataMarchandise.splice(item, 1);
                this.setState({ dataMarchandise }, () =>
                { console.log(this.state.dataMarchandise); this.update(); })
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
        <Row style={CustomStyleSheet.whiteRow} key={index}>
          <Col size={2} />
          <Col size={2}>
            <ComBadrLibelleComp>{item.marque.libelle}</ComBadrLibelleComp>
          </Col>
          <Col size={2}>
            <ComBadrLibelleComp>{item.quantite}</ComBadrLibelleComp>
          </Col>
          <Col size={2}>
            <ComBadrLibelleComp>{item.uniteMesure.descriptionUniteMesure}</ComBadrLibelleComp>
          </Col>
          <Col size={2}>
            <ComBadrLibelleComp>{item.valeur}</ComBadrLibelleComp>
          </Col>
          {(!this.props.consultation) && this.choixMarchandise(item,index)}
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
      valeur: this.state.valeurMTS,
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
        valeur: this.state.valeurMTS,
      });
    this.setState({ showDetailMTS: false });
  };
  choixMTS = (item,index) => {
    return (
      <Col size={2}>
        <Row>
          <Col size={1}>
            <IconButton
              icon="pencil-outline"
              color={'white'}
              size={15}
              style={{ backgroundColor: primaryColor }}
              onPress={() => {
                console.log('item xxx:', item);
                this.setState({
                  showDetailMTS: true,
                  editMTS: true,
                  selectedItemMTS: index,
                  natureVehicule: item.natureVehicule,
                  valeurMTS: item.valeur,
                  libelle:item.libelle
                });
              }}
            />
          </Col>
          <Col size={1}>
            <IconButton
              icon="trash-can-outline"
              color={'white'}
              size={15}
              style={{ backgroundColor: primaryColor }}
              onPress={() => {
                let dataMTS = [...this.state.dataMTS];
                dataMTS.splice(item, 1);
                this.setState({ dataMTS }, () => console.log(this.state.dataMTS));
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
        <Row style={CustomStyleSheet.whiteRow} key={index}>
          <Col size={2} />
          <Col size={2}>
            <ComBadrLibelleComp>{item.natureVehicule.libelle}</ComBadrLibelleComp>
          </Col>
          <Col size={2}>
            <ComBadrLibelleComp>{item.libelle}</ComBadrLibelleComp>
          </Col>
          <Col size={2}>
            <ComBadrLibelleComp>{item.valeur}</ComBadrLibelleComp>
          </Col>
          {(!this.props.consultation) && this.choixMTS(item,index)}
        </Row>
      );
    });
  };


  update() {

    this.props.update({
      vehiculesSaisiVO: this.state.dataMTS,
      marchandisesVO: this.state.dataMarchandise,
      pvsSaisi: this.state.dataPV,
    });


  }

  static getDerivedStateFromProps(props, state) {
    // console.log('getDerivedStateFromProps--------------------props ', props);
    // console.log('getDerivedStateFromProps--------------------state ', state);

    if (
      props.consultation && props.rapportServiceId != state.rapportServiceId
    ) {
      return {
        dataMTS: props.vehiculesSaisiVO,// update the value of specific key
        dataMarchandise: props.marchandisesVO,
        dataPV: props.pvsSaisi,
        rapportServiceId: props.rapportServiceId,
        
        

      };
    }
    if (
      !props.consultation && props.rapportServiceId != state.rapportServiceId
    ) {
      return {
        dataMTS: [],// update the value of specific key
        dataMarchandise: [],
        dataPV: [],
        rapportServiceId: props.rapportServiceId,



      };
    }
    // Return null to indicate no change to state.
    return null;
  }

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
          <ComBadrCardBoxComp style={styles.ComBadrCardBoxComp}>
            <ComAccordionComp title={translate('actifsCreation.saisie.pVSaisi')}>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={2}>
                  {(!this.props.consultation) && <IconButton
                    icon="plus"
                    color={'white'}
                    size={15}
                    style={{ backgroundColor: primaryColor }}
                    onPress={() => {
                      this.retablir();
                      this.setState({ showDetailPV: true });
                    }}
                  />}
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.saisie.nPV')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.saisie.dU')}
                  </ComBadrLibelleComp>
                </Col>
                {(!this.props.consultation) && <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.saisie.choix')}
                  </ComBadrLibelleComp>
                </Col>}
              </Row>
              {this.mapDataArrayPV()}
            </ComAccordionComp>
          </ComBadrCardBoxComp>
          <ComBadrCardBoxComp style={styles.ComBadrCardBoxComp}>
            <ComAccordionComp
              title={translate('actifsCreation.saisie.marchandisesSaisies')}>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={2}>
                  {(!this.props.consultation) && <IconButton
                    icon="plus"
                    size={15}
                    color={'white'}
                    style={{ backgroundColor: primaryColor }}
                    onPress={() => {
                      this.setState({ showDetailMarchandise: true, natureMarchandise: '', quantite: '', autreMarque: '', valeur: '' });
                      this.refMarchandiseModal.clear();
                    }}
                  />}
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.saisie.natureMarchandise')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.saisie.quantity')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.saisie.unityMesure')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.saisie.valeur')}
                  </ComBadrLibelleComp>
                </Col>
                {(!this.props.consultation) && <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.saisie.choix')}
                  </ComBadrLibelleComp>
                </Col>}
              </Row>
              {this.mapDataArrayMarchandise()}
            </ComAccordionComp>
          </ComBadrCardBoxComp>
          <ComBadrCardBoxComp style={styles.ComBadrCardBoxComp}>
            <ComAccordionComp
              title={translate('actifsCreation.saisie.moyensTransportS')}>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={2}>
                  {(!this.props.consultation) && <IconButton
                    icon="plus"
                    size={15}
                    color={'white'}
                    style={{ backgroundColor: primaryColor }}
                    onPress={() => {
                      this.setState({ showDetailMTS: true, valeurMTS: '', libelle: '', natureVehicule: '' });
                    }}
                  />}
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.saisie.natureVehicule')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.saisie.libelle')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.saisie.valeur')}
                  </ComBadrLibelleComp>
                </Col>
                {(!this.props.consultation) && <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.saisie.choix')}
                  </ComBadrLibelleComp>
                </Col>}
              </Row>
              {this.mapDataArrayMTS()}
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          <ActifsRapportCreationSaisiePVModal
            visible={this.state.showDetailPV}
            value={this.state.numPV}
            onDismiss={this.onDismiss}
            confirmer={this.confirmer}
            retablir={this.retablir}
            onChangeBadrInput={(text) => this.setState({ numPV: text })}
            valueDate={this.state.dateText}
            onChangeTextDate={(text) => this.setState({ datePV: text, dateText:text})}
            valueDate={this.state.dateText}
            date={new Date()}
            show={this.state.show}
            onChange={this.onChange}
            showMode={this.showMode}
          />

          <ActifsRapportCreationSaisieMarchandiseModal
            ref={ref => this.refMarchandiseModal = ref}
            visible={this.state.showDetailMarchandise}
            handlenatureMarchnadise={(item, index) => {
              this.setState({ natureMarchandise: item }, () =>
                console.log('item ======', this.state.natureMarchandise),
              );
            }}
            onChangeTextAutre={(text) => this.setState({ autreMarque: text })}
            onChangeQuantity={(text) => this.setState({ quantite: text })}
            onChangeValeur={(text) => this.setState({ valeur: text })}
            quantite={this.state.quantite}
            autreMarque={this.state.autreMarque}
            valeur={this.state.valeur}
            listUnites={this.props.listUnites}
            onValueChanged={(item, index) => {
              this.setState({ selectedValue: { codeUniteMesure: item.code, descriptionUniteMesure: item.libelle } }, () =>
                console.log('selectedValue ======', this.state.selectedValue));
            }}
            selectedvalue={this.state.selectedValue}
            confirmer={this.confirmerMarchandise}
            retablir={this.retablirMarchandise}
            onDismiss={this.onDismiss}
          />

          <ActifsRapportCreationSaisieMTSModal
            visible={this.state.showDetailMTS}
            onDismiss={this.onDismiss}
            onValueChangeMTS={(item, index, selectedItem) => {
              this.setState({ natureVehicule: selectedItem });
              console.log('item', item);
              console.log('selectedItem : ', selectedItem);
            }}
            natureVehicule={this.state.natureVehicule}
            confirmer={this.confirmerMTS}
            onChangeValueMTS={(text) => this.setState({ valeurMTS: text })}
            valueMTS={this.state.valeurMTS}
            libelle={this.state.libelle}
            onChangelibelle={(text) => this.setState({ libelle: text })}
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

const mapStateToProps = (state) => ({ ...state.creationActifsReducer });

export default connect(mapStateToProps, null)(AtifsRapportCreationSaisieTab);

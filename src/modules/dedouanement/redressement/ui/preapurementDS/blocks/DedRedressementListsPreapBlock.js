import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import {
  ComAccordionComp,
  ComBadrButtonComp, ComBadrErrorMessageComp, ComBasicDataTableComp
} from '../../../../../../commons/component';
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import dedValiderReferencePreapurementDSAction from '../../../state/actions/dedValiderReferencePreapurementDSAction';
import { VALIDER_REF_PREAP_DS_INIT, VALIDER_REF_PREAP_DS_REQUEST } from '../../../state/DedRedressementConstants';
import styles from '../../../style/DedRedressementStyle';
import { addZeros, cleDS, newPreapurement } from '../../../utils/DedUtils';
import DedRedressementDetailPreapDsBlock from '../blocks/DedRedressementDetailPreapDsBlock';
import DedRedressementLotDedBlock from './DedRedressementLotDedBlock';
class DedRedressementListsPreapBlock extends React.Component {
  buildPreapCols = () => {
    return [
      {
        code: '',
        libelle: '',
        width: 100,
        component: 'button',
        icon: this.props?.readOnly ? 'eye' : 'pencil',
        action: (row, index) => this.onItemSelected(row, index),
      },
      { code: 'typeDS', libelle: 'Type DS', width: 60 },
      {
        code: 'render',
        width: 240,
        render: (row) => {
          return (
            _.padStart(row.preapBureau, 3, '0') +
            ' - ' +
            _.padStart(row.preapRegime, 3, '0') +
            ' - ' +
            _.padStart(row.preapAnnee, 3, '0') +
            ' - ' +
            _.padStart(row.preapSerie, 7, '0') +
            '-' +
            cleDS(row.preapRegime + row.preapSerie + row.preapAnnee)
          );
        },
        libelle: 'Référence DS',
      },
      { code: 'lieuChargement', libelle: 'Lieu chargement', width: 100 },
      { code: 'referenceLot', libelle: 'Référence Lot', width: 80 },
      { code: 'poidsLot', libelle: 'Poids lot', width: 80 },
      { code: 'nombreContenant', libelle: 'Nombre contenant', width: 60 },
    ];
  };
  onItemSelected = (selectedItem) => {
    this.initValiderReference();
    console.log('onItemSelected selectedItem :', selectedItem);
    let preapRegime = selectedItem.preapRegime;
    let preapSerie = selectedItem.preapSerie;
    if (preapRegime.length < 3) {
      preapRegime = addZeros(preapRegime, 3);
    }
    selectedItem.preapRegime = preapRegime;
    if (preapSerie.length < 7) {
      preapSerie = addZeros(preapSerie, 7);
    }
    selectedItem.preapSerie = preapSerie;
    console.log('_.isEmpty(selectedItem.clePreap)', _.isEmpty(selectedItem.preapCle))
    console.log('selectedItem.clePreap', selectedItem.preapCle)
    if (_.isEmpty(selectedItem.preapCle)) {
      console.log('selectedItem.clePreap', selectedItem.preapCle)
      let obj = preapRegime + preapSerie + selectedItem.preapAnnee;
      selectedItem.preapCle = cleDS(obj);
    }
    this.setState({ preapurement: selectedItem, displayBlocPreapurement: true });
  };
  constructor(props) {
    super(props);
    this.state = {
      preapurements: this.props?.data?.dedDumSectionPreapVO.dedDumPreapFormVO,
      preapCols: this.buildPreapCols(),
      dedDumVo: this.props.data,
      displayBlocPreapurement: false,
      preapurement: newPreapurement(),
      errorMessage: null
    };
  }

  componentDidMount() {
  }





  nouveau = () => {
    console.log('Nouveau');
    this.initValiderReference();
    let preapurement = newPreapurement();
    preapurement.numeroOrdre = this.state?.dedDumVo?.dedDumSectionPreapVO?.dedDumPreapFormVO.length + 1;
    console.log('preapurement : ', preapurement);
    this.setState({ displayBlocPreapurement: true, preapurement:preapurement });
  };

  retablir = () => {
    console.log('retablir');
    this.initValiderReference();
    let numero = this.state.preapurement.numeroOrdre;
    let preapurement = newPreapurement();
    preapurement.numeroOrdre = numero;
    this.setState({ preapurement });
  };

  supprimer = () => {
    console.log('Supprimer');
    let list = this.state?.dedDumVo?.dedDumSectionPreapVO?.dedDumPreapFormVO;
    console.log('list before : ', list);
    let preapurement = this.state.preapurement;
    let preapurementToDelete = list.filter(function (ele) {
      return ele.numeroOrdre != preapurement.numeroOrdre;
    });

    console.log('list after : ', list);
    this.updateListPrepurements(preapurementToDelete);
    this.setState({ displayBlocPreapurement: false });


  };
  abandonner = () => {
    console.log('Abandonner');
    this.initValiderReference();
    this.setState({ displayBlocPreapurement: false, preapurement: newPreapurement() });
  };

  updateListPrepurements(list) {
    list.forEach((element, index) => {
      element.numeroOrdre = index + 1;
    });

    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionPreapVO: { ...this.state.dedDumVo.dedDumSectionPreapVO, dedDumPreapFormVO: list } };
    this.setState({
      dedDumVo: dedDumVo,

      displayBlocPreapurement: false, 
      preapurements: list,
      preapurement: newPreapurement()
    });
    this.props.update(dedDumVo);
  }

  updatePrepurement = (preapurementToUpdate) => {
    this.setState({ preapurement: preapurementToUpdate });
  }

  ajouter = () => {
    console.log('Ajouter');
    this.initValiderReference();
    let list = this.state?.dedDumVo?.dedDumSectionPreapVO?.dedDumPreapFormVO;
    console.log('list before : ', list);
    let preapurement = this.state.preapurement;

    let preapurementToDelete = list.filter(function (ele) {
      return ele.numeroOrdre != preapurement.numeroOrdre;
    });
    preapurementToDelete.push(preapurement);
    console.log('list after : ', list);
    this.updateListPrepurements(preapurementToDelete);


  };

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps--------DedRedressementListsPreapBlock------------props.preapurement ', props?.preapurement);
    console.log('getDerivedStateFromProps--------DedRedressementListsPreapBlock------------state.preapurement ', state.preapurement);

    if (
      props?.preapurement && state?.preapurement && !state?.preapurement?.declarationExistante && props?.preapurement?.declarationExistante
    ) {
      return {
        preapurement: props.preapurement,// update the value of specific key


      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  validerReference = () => {
    let dedDumPreapVO = this.state.preapurement;
    var action = dedValiderReferencePreapurementDSAction.request({
      type: VALIDER_REF_PREAP_DS_REQUEST,
      value: {
        dedDumPreapVO
      },
    });
    this.props.dispatch(action);

  }
  initValiderReference = () => {
    var action = dedValiderReferencePreapurementDSAction.init();
    this.props.dispatch(action);

  }
  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp
          title={`Nombre total des préapurements : ${this.state.preapurements ? this.state.preapurements.length : 0
            }`}
          expanded={true}>
          <Grid>
            <Row style={{ width: '100%' }}>
              <Col>
                <ComBasicDataTableComp
                  hasId={true}
                  rows={this.state.preapurements}
                  cols={this.state.preapCols}
                  totalElements={
                    this.state.preapurements ? this.state.preapurements.length : 0
                  }
                  maxResultsPerPage={5}
                  paginate={true}
                />
              </Col>
            </Row>
            {!this.props.readOnly && <Row style={{ justifyContent: 'center', paddingTop: 20 }}>
              {(!this.state.displayBlocPreapurement) && <ComBadrButtonComp
                style={{ width: 100 }}
                onPress={() => (this.nouveau())}
                text={translate('transverse.nouveau')}
              />}
              <View style={{ width: 10 }} />
              {(this.state.displayBlocPreapurement) && <ComBadrButtonComp
                style={{ width: 100 }}
                onPress={() => {
                  this.supprimer()
                }}
                text={translate('transverse.supprimer')}
              />}
              <View style={{ width: 10 }} />
              {(this.state.displayBlocPreapurement) && <ComBadrButtonComp
                style={{ width: 100 }}
                onPress={() => {
                  this.abandonner()
                }}
                text={translate('transverse.abandonner')}
              />}
              <View style={{ width: 10 }} />
            </Row>}
            <Row style={{ width: '100%' }}>
              <Col>
                {this.props.errorMessage != null && (
                  <View>
                    <ComBadrErrorMessageComp
                      style={styles.centerErrorMsg}
                      message={this.props.errorMessage}
                    />
                  </View>
                )}
                {this.state.preapurement &&
                  (this.state.displayBlocPreapurement) && <DedRedressementDetailPreapDsBlock selectedItem={this.state.preapurement} readOnly={this.props.readOnly} update={this.updatePrepurement} validerReference={this.validerReference} retablir={this.retablir}/>}
                {this.state.preapurement && (this.state.preapurement.declarationExistante) &&
                  (this.state.displayBlocPreapurement) && <DedRedressementLotDedBlock selectedItem={this.state.preapurement} readOnly={this.props.readOnly} update={this.updatePrepurement} confirmer={this.ajouter} />}

              </Col>
            </Row>
          </Grid>
        </ComAccordionComp>


      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state.dedValiderRefPreapurementReducer
  };
}

export default connect(
  mapStateToProps,
  null,
)(DedRedressementListsPreapBlock); 

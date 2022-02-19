import React from 'react';
import moment from 'moment';
import {ScrollView,FlatList, Text,SafeAreaView,View} from 'react-native';
import {Button} from 'react-native-elements';
import {HelperText,RadioButton, TextInput} from 'react-native-paper';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {
ComContainerComp,
ComBasicDataTableComp,
ComBadrCardBoxComp,
ComAccordionComp,
ComBadrButtonComp,
    ComBadrErrorMessageComp,
    ComBadrListComp,
    ComBadrLibelleComp,
    ComBadrInfoMessageComp,
    ComBadrNumericTextInputComp,
    ComBadrItemsPickerComp,
    ComBadrProgressBarComp,
} from '../../../../../commons/component';
import styles from '../../style/mlvRechercheStyle';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../../commons/styles/ComThemeStyle';
import {connect} from 'react-redux';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import style from '../../style/mlvEtatChargementStyle';
import _ from 'lodash';

import * as Constants from '../../state/mlvRechercheConstants';

import * as MLVEtatChargementInitAction from '../../state/actions/mlvEtatChargementInitAction';
import * as MLVEtatChargementSearchAction from '../../state/actions/mlvEtatChargementSearchAction';
import * as MLVValidateListMlvAction from '../../state/actions/mlvValidateListMlvAction';
import * as MLVDeliverListMlvAction from '../../state/actions/mlvDeliverListMlvAction';

import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';
const FORMAT_DDMMYYYY_HHMM = 'DD/MM/YYYY HH:mm';
const initialState = {
    bureau: '',
    regime: '001',
    delivrerMainleveeVO:'',
    annee: '',
    serie: '',
    cle: '',
    validCleDum: '',
    generateurNumScelleAu: '',
    generateurNumScelleDu: '',
    listeNombreDeScelles:[],
    typeRechercheEtatChargement: '',
    typeMoyenTransport: '',
    numeroImmatriculation: '',
    showErrorMessage: false,
};
const formatCustomized = (date, formatDate) => {

  return moment(date).format(formatDate);
}
class EtatChargementBlock extends React.Component {
    constructor(props) {
        super(props);
        console.log('mainleveerender3',props.data.search.mainleveeVo)
     //   console.log('construc',this.props.data.search.mainleveeVo)
        this.state ={
                        bureau: '',
                        regime: '001',
                        delivrerMainleveeVO:this.props.data.search.mainleveeVo,
                        annee: '',
                        serie: '',
                        cle: '',
                        validCleDum: '',
                        generateurNumScelleAu: '',
                        generateurNumScelleDu: '',
                        listeNombreDeScelles:[],
                        typeRechercheEtatChargement: '',
                        typeMoyenTransport: '',
                        numeroImmatriculation: '',
                        showErrorMessage: false,
                    };
        this.initDropdowns();
    }
  genererNumeroScelle = () => {
    var {
      generateurNumScelleDu,
      generateurNumScelleAu,
      listeNombreDeScelles,
    } = this.state;
    if (generateurNumScelleDu && generateurNumScelleAu) {
      if (
        generateurNumScelleDu.length === 8 &&
        generateurNumScelleAu.length === 8
      ) {
        var du = Number(generateurNumScelleDu);
        var au = Number(generateurNumScelleAu);
        if (au > du) {
          if (au - du <= 100) {
            //$scope.listeNombreDeScelles = $scope.listeNombreDeScelles ? $scope.listeNombreDeScelles : [];
            var nbScelle = du;

            for (var i = du; i <= au; i++) {
              listeNombreDeScelles.push(('00000000' + nbScelle).slice(-8));
              this.setState({listeNombreDeScelles: listeNombreDeScelles});
              nbScelle += 1;
            }
            this.setState({
              generateurNumScelleDu: '',
              generateurNumScelleAu: '',
            });
            this.generateurNumScelleDu.clear();
            this.generateurNumScelleAu.clear();
          } else {
            this.showMessages('warn', translate('errors.maxNombreScelle'));
          }
        } else {
          this.showMessages('warn', translate('errors.numScelleInferieur'));
        }
      } else {
        this.showMessages('warn', translate('errors.numScelleLongueur'));
      }
    }
  };

  addNumeroScelle = () => {
    var {listeNombreDeScelles} = this.state;
    let numeroScelle = this.numeroScelle;
    if (numeroScelle) {
      if (numeroScelle.length === 8) {
        if (listeNombreDeScelles.length < 100) {
          if (_.indexOf(listeNombreDeScelles, numeroScelle) === -1) {
            listeNombreDeScelles.push(numeroScelle);
            this.setState({
              listeNombreDeScelles: listeNombreDeScelles,
            });
            this.numeroScelleInput.clear();
          } else {
            this.showMessages('warn', translate('errors.numScelleExisteDeja'));
          }
        } else {
          this.showMessages('warn', translate('errors.maxNombreScelle'));
        }
      } else {
        this.showMessages('warn', translate('errors.numScelleLongueur'));
      }
    }
  };

  deleteNumeroScelle = () => {
    var {selectedItemListScelle, listeNombreDeScelles} = this.state;
    if (
      selectedItemListScelle !== '' &&
      listeNombreDeScelles[selectedItemListScelle]
    ) {
      listeNombreDeScelles.splice(selectedItemListScelle, 1);
      this.setState({
        listeNombreDeScelles: listeNombreDeScelles,
      });
    }
  };

		buildEtatChargementTableColumns = () => {
    return [
      {
        code: 'referenceEnregistrement',
        libelle: translate('mainlevee.delivrerMainlevee.etatChargement.reference'),
        width: 180,
      },
      {
              code: 'numeroVersion',
              libelle: translate('mainlevee.delivrerMainlevee.etatChargement.numeroVersion'),
              width: 120,
        },
      {
        code: 'dateEnregistrement',
        libelle: translate('mainlevee.delivrerMainlevee.etatChargement.dateEnregistrement'),
        width: 140,
         render: (row) => {
                            return formatCustomized(row.dateEnregistrement, FORMAT_DDMMYYYY_HHMM);
                        }
      },
       {
              code: 'operateurDeclarant',
              libelle: translate('mainlevee.delivrerMainlevee.etatChargement.operateur'),
              width: 180,
            },

    ];
  };
    initDropdowns = () => {
        let action = MLVEtatChargementInitAction.request(
            {
                type: Constants.INIT_ETAT_CHARGEMENT_REQUEST,
                value: {},
            },
            this.props.navigation,
        );
        this.props.actions.dispatch(action);
    };

    typeList = () => {
        return [
            {
                code: '1',
                libelle: 'Référence de l\'état de chargement',
            },
            {
                code: '2',
                libelle: 'Moyen de transport',
            },
        ];
    };

    confirm = () => {
        this.displayErrorMessage();

        this.completeWithZeros({
            bureau: this.state.bureau,
            maxLength: 3,
        });

        this.completeWithZeros({
            regime: this.state.regime,
            maxLength: 3,
        });

        this.completeWithZeros({
            annee: this.state.annee,
            maxLength: 4,
        });

        this.completeWithZeros({
            serie: this.state.serie,
            maxLength: 7,
        });

        let reference = this.state.regime + this.state.serie + this.state.annee;
        let referenceEC = this.state.bureau + this.state.regime + this.state.annee + this.state.serie ;
        console.log('reference', reference);
        if (this.state.typeRechercheEtatChargement === '1') {
            if (reference && reference.length === 14) {
             console.log('before send request')
                let validCleDum = this.cleDum(reference);
                if (validCleDum === this.state.cle) {
                console.log('send request')
                    let action = this.searchAction(referenceEC);
                    this.props.actions.dispatch(action);
                } else {
                    this.setState({
                        ...this.state,
                        validCleDum: validCleDum,
                        showErrorMessage: true
                    });
                }
            }
        } else if (this.state.typeRechercheEtatChargement === '2') {
            let action = this.searchAction(reference);
            this.props.actions.dispatch(action);
        } else {
            // Do nothing
        }
    };

    searchAction = (reference) => {
        return MLVEtatChargementSearchAction.request(
            {
                type: Constants.SEARCH_ETAT_CHARGEMENT_REQUEST,
                value: {

                    reference: reference,

                    typeRechercheEtatChargement: this.state.typeRechercheEtatChargement,

                    typeMoyenTransport: this.state.typeMoyenTransport,
                    numeroImmatriculation: this.state.numeroImmatriculation,
                    bureauAgentConnecte: ComSessionService.getInstance().getCodeBureau(),
                },
            },
            this.props.navigation,
        );
    };
    validateAction = () => {
   // console.log('delivermainlevee',this.state)
    //this.props.data.search.mainleveeVo=this.state.delivrerMainleveeVO;
        return MLVValidateListMlvAction.request(
            {
                type: Constants.VALIDATE_ETAT_CHARGEMENT_REQUEST,
                value: this.props.data.search,
            },
            this.props.navigation,
        );
    };
    deliverAction = () => {
         return MLVDeliverListMlvAction.request(
             {
                 type: Constants.DELIVER_ETAT_CHARGEMENT_REQUEST,
                 value: this.props.data.search
                 ,
             },
             this.props.navigation,
         );
     };




    reset = () => {
        this.setState(initialState);
    };

    displayErrorMessage = () => {
        this.setState({
            ...this.state,
            showErrorMessage: true,
        });
    };

    onChangeSearchInput = (searchInput, isNumeric) => {
        let inputKey = _.keys(searchInput)[0];
        this.setState({[inputKey]: isNumeric ? searchInput[inputKey].replace(/[^0-9]/g, '') : searchInput[inputKey].replace(/[^A-Za-z]/g, '').toUpperCase()});
    };

    completeWithZeros = (searchInput) => {
        let inputKey = _.keys(searchInput)[0];
        if (searchInput[inputKey] !== '') {
            this.setState({
                [inputKey]: _.padStart(searchInput[inputKey], searchInput.maxLength, '0'),
            });
        }
    };

    hasErrors = (searchField) => {
        return this.state.showErrorMessage && _.isEmpty(this.state[searchField]);
    };

    hasInvalidCleDum = () => {
        return this.state.showErrorMessage
            && ((!_.isEmpty(this.state.bureau) && !_.isEmpty(this.state.regime) && !_.isEmpty(this.state.annee) && !_.isEmpty(this.state.serie)))
            && (!_.isEmpty(this.state.validCleDum) && this.state.cle !== this.state.validCleDum);
    };

    cleDum = function (reference) {
        let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
        let RS = reference % 23;
        return alpha.charAt(RS);
    };

    render() {

    const {
    listeNombreDeScelles,
          delivrerMainleveeVO,
           generateurNumScelleDu,
                generateurNumScelleAu,

        } = this.state;
        return (
            <ScrollView style={style.innerContainer}
                        keyboardShouldPersistTaps={(this.state.autocompleteDropdownOpen || Platform.OS === 'android') ? 'always' : 'never'}>
                {this.props.showProgress && (
                    <ComBadrProgressBarComp/>
                )}

                {this.props.infoMessage != null && (
                    <ComBadrInfoMessageComp message={this.props.infoMessage}/>
                )}

                {this.props.errorMessage != null && (
                    <ComBadrErrorMessageComp message={this.props.errorMessage}/>
                )}

                {!this.props.showProgress && (
                    <Grid>
                        <Row size={100}>
                            <Col size={40}>
                                <Row>
                                    <Col style={style.labelContainer}>
                                        <Text style={style.labelTextStyle}>
                                            {translate('controleApresScanner.search.etatChargement.typeListe')}
                                        </Text>
                                    </Col>

                                    <Col style={style.labelContainer}>
                                        <Text style={style.labelRequiredStyle}>
                                            *
                                        </Text>
                                    </Col>
                                </Row>
                            </Col>

                            <Col size={60} style={style.labelContainer}>
                                <ComBadrItemsPickerComp
                                    label={translate('controleApresScanner.search.etatChargement.typeListe')}
                                    selectedValue={this.state.typeRechercheEtatChargement ? this.state.typeRechercheEtatChargement : ''}
                                    items={this.typeList()}
                                    onValueChanged={(value, index) => this.setState({
                                        ...this.state,
                                        typeRechercheEtatChargement: value.code,
                                    })}
                                />
                            </Col>
                        </Row>

                        {this.state.typeRechercheEtatChargement === '1' && (
                            <ComContainerComp noPadding={true}>
                                                                         <ComAccordionComp
                                                                           title={translate(
                                                                             'mainlevee.delivrerMainlevee.etatChargement.reference',
                                                                           )}>
                                    <Grid>
                                <Row>
                                    <Col style={style.searchInputContainer}>
                                        <TextInput
                                            label={translate('controleApresScanner.search.etatChargement.referenceEtatChargement.bureau')}
                                            value={this.state.bureau}
                                            keyboardType={'number-pad'}
                                            maxLength={3}
                                            onChangeText={(val) => this.onChangeSearchInput({bureau: val}, true)}
                                            onEndEditing={(event) =>
                                                this.completeWithZeros({
                                                    bureau: event.nativeEvent.text,
                                                    maxLength: 3,
                                                })
                                            }
                                            error={this.hasErrors('bureau')}
                                            style={style.searchInput}
                                        />

                                        <HelperText
                                            type="error"
                                            padding="none"
                                            visible={this.hasErrors('bureau')}>
                                            {translate('errors.donneeObligatoire', {champ: translate('controleApresScanner.search.etatChargement.referenceEtatChargement.bureau')})}
                                        </HelperText>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col style={style.searchInputContainer}>
                                        <TextInput
                                            label={translate('controleApresScanner.search.etatChargement.referenceEtatChargement.regime')}
                                            value={this.state.regime}
                                            keyboardType={'number-pad'}
                                            maxLength={3}
                                            onChangeText={(val) => this.onChangeSearchInput({ regime: val }, true)}
                                            onEndEditing={(event) =>
                                                this.completeWithZeros({
                                                    regime: event.nativeEvent.text,
                                                    maxLength: 3,
                                                })
                                            }
                                            error={this.hasErrors('regime')}
                                            style={style.searchInput}
                                            disabled={true}
                                        />

                                        <HelperText
                                            type="error"
                                            padding="none"
                                            visible={this.hasErrors('regime')}>
                                            {translate('errors.donneeObligatoire', {champ: translate('controleApresScanner.search.etatChargement.referenceEtatChargement.regime')})}
                                        </HelperText>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col style={style.searchInputContainer}>
                                        <TextInput
                                            label={translate('controleApresScanner.search.etatChargement.referenceEtatChargement.annee')}
                                            value={this.state.annee}
                                            keyboardType={'number-pad'}
                                            maxLength={4}
                                            onChangeText={(val) => this.onChangeSearchInput({annee: val}, true)}
                                            onEndEditing={(event) =>
                                                this.completeWithZeros({
                                                    annee: event.nativeEvent.text,
                                                    maxLength: 4,
                                                })
                                            }
                                            error={this.hasErrors('annee')}
                                            style={style.searchInput}
                                        />

                                        <HelperText
                                            type="error"
                                            padding="none"
                                            visible={this.hasErrors('annee')}>
                                            {translate('errors.donneeObligatoire', {champ: translate('controleApresScanner.search.etatChargement.referenceEtatChargement.annee')})}
                                        </HelperText>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col style={style.searchInputContainer}>
                                        <TextInput
                                            label={translate('controleApresScanner.search.etatChargement.referenceEtatChargement.serie')}
                                            value={this.state.serie}
                                            keyboardType={'number-pad'}
                                            maxLength={7}
                                            onChangeText={(val) => this.onChangeSearchInput({serie: val}, true)}
                                            onEndEditing={(event) =>
                                                this.completeWithZeros({
                                                    serie: event.nativeEvent.text,
                                                    maxLength: 7,
                                                })
                                            }
                                            error={this.hasErrors('serie')}
                                            style={style.searchInput}
                                        />

                                        <HelperText
                                            type="error"
                                            padding="none"
                                            visible={this.hasErrors('serie')}>
                                            {translate('errors.donneeObligatoire', {champ: translate('controleApresScanner.search.etatChargement.referenceEtatChargement.serie')})}
                                        </HelperText>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col style={style.searchInputContainer}>
                                        <TextInput
                                            label={translate('controleApresScanner.search.etatChargement.referenceEtatChargement.cle')}
                                            value={this.state.cle}
                                            keyboardType={''}
                                            maxLength={1}
                                            onChangeText={(val) => this.onChangeSearchInput({cle: val}, false)}
                                            style={style.searchInput}
                                        />

                                        <HelperText
                                            type="error"
                                            padding="none"
                                            visible={this.hasInvalidCleDum()}>
                                            {translate('errors.cleNotValid', {cle: this.state.validCleDum})}
                                        </HelperText>
                                    </Col>
                                </Row>
                                 </Grid>


                                             </ComAccordionComp>
                                              </ComContainerComp>
                        )}

                        {this.state.typeRechercheEtatChargement === '2' && (
                            <View>
                                <Row size={100}>
                                    <Col size={40}>
                                        <Row>
                                            <Col style={style.labelContainer}>
                                                <Text style={style.labelTextStyle}>
                                                    {translate('controleApresScanner.search.etatChargement.typeMoyen')}
                                                </Text>
                                            </Col>

                                            <Col style={style.labelContainer}>
                                                <Text style={style.labelRequiredStyle}>
                                                    *
                                                </Text>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col size={60} style={style.labelContainer}>
                                        <ComBadrItemsPickerComp
                                            label={translate('controleApresScanner.search.etatChargement.typeMoyen')}
                                            selectedValue={this.state.typeMoyenTransport ? this.state.typeMoyenTransport : ''}
                                            items={this.props.data.init.moyensTransport}
                                            onValueChanged={(value, index) => this.setState({
                                                ...this.state,
                                                typeMoyenTransport: value.code,
                                            })}
                                        />
                                    </Col>
                                </Row>

                                <Row size={100}>
                                    <Col size={40}>
                                        <Row>
                                            <Col style={style.labelContainer}>
                                                <Text style={style.labelTextStyle}>
                                                    {translate('controleApresScanner.search.etatChargement.immatriculation')}
                                                </Text>
                                            </Col>

                                            <Col style={style.labelContainer}>
                                                <Text style={style.labelRequiredStyle}>
                                                    *
                                                </Text>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col size={60} style={style.labelContainer}>
                                        <TextInput
                                            ref={(ref) => (this.immatriculation = ref)}
                                            key="immatriculation"
                                            mode="outlined"
                                            label={translate('controleApresScanner.search.etatChargement.immatriculation')}
                                            value={this.state.numeroImmatriculation}
                                            onChangeText={(text) => this.setState({
                                                ...this.state,
                                                numeroImmatriculation: text,
                                            })}
                                        />
                                    </Col>
                                </Row>






                            </View>

                        )}

                        <Row size={100}>
                            <Col size={10}/>

                            <Col size={35}>
                                <Button
                                    title={translate('transverse.rechercher')}
                                    type={'solid'}
                                    buttonStyle={style.buttonAction}
                                    onPress={() => this.confirm()}/>
                            </Col>

                            <Col size={2}/>

                            <Col size={30}>
                                <Button
                                    title={translate('transverse.retablir')}
                                    type={'solid'}
                                    buttonStyle={style.buttonAction}
                                    onPress={() => this.reset()}/>
                            </Col>

                            <Col size={13}/>
                        </Row>
                        {this.props.data?.search?.listDed && this.props.data?.search?.listDed.length>0 &&
                        <View>
                         <ComBadrCardBoxComp noPadding={true}>
                                                                            <ComAccordionComp
                                                                                title={translate('mainlevee.delivrerMainlevee.etatChargement.title')}>
                                                                              <Grid>
                                                                                <Row style={CustomStyleSheet.lightBlueRow} size={100}>
                                                                                  <Col size={100}>
                                                                                    <ComBasicDataTableComp
                                                                                        onRef={(ref) => (this.etatChargementTable = ref)}
                                                                                        id="etatChargementTable"
                                                                                        hasId={false}
                                                                                        rows={this.props.data.search.listDed}
                                                                                        cols={this.buildEtatChargementTableColumns()}
                                                                                        totalElements={this.props.data.search.listDed ? this.props.data.search.listDed.length : 0}
                                                                                        maxResultsPerPage={5}
                                                                                        paginate={true}
                                                                                    />
                                                                                  </Col>
                                                                                </Row>
                                                                              </Grid>
                                                                            </ComAccordionComp>
                                                                          </ComBadrCardBoxComp>

                                  {/* Informations ECOR */}
                                           <ComBadrCardBoxComp noPadding={true}>
                                             <ComAccordionComp
                                               title={translate(
                                                 'mainlevee.delivrerMainlevee.informationsEcor.title',
                                               )}>
                                               <Grid>
                                                 <Row style={CustomStyleSheet.lightBlueRow}>
                                                   <Col size={30}>
                                                     <ComBadrLibelleComp withColor={true}>
                                                       {translate('mainlevee.delivrerMainlevee.informationsEcor.scellesConfirmationEntree',)}
                                                     </ComBadrLibelleComp>
                                                   </Col>

                                                   <Col size={70} style={styles.boxContainer}>
                                                     <SafeAreaView style={styles.boxSafeArea}>
                                                       {(delivrerMainleveeVO?.scellesConfirmationEntree == null || delivrerMainleveeVO?.scellesConfirmationEntree?.size === 0) && (
                                                           <Text style={styles.boxItemText}>Aucun élément</Text>
                                                       )}

                                                       {(delivrerMainleveeVO?.scellesConfirmationEntree != null && delivrerMainleveeVO?.scellesConfirmationEntree?.size !== 0) && (
                                                           <FlatList
                                                               data={Object.values(delivrerMainleveeVO?.scellesConfirmationEntree)}
                                                               renderItem={(item) => this.renderBoxItem(item)}
                                                               keyExtractor={item => item}
                                                               nestedScrollEnabled={true}
                                                           />
                                                       )}
                                                     </SafeAreaView>
                                                   </Col>
                                                 </Row>

                                                 <Row style={CustomStyleSheet.whiteRow}>
                                                   <Col size={30}>
                                                     <ComBadrLibelleComp withColor={true}>
                                                       {translate('mainlevee.delivrerMainlevee.informationsEcor.nouveauxScelles',)}
                                                     </ComBadrLibelleComp>
                                                   </Col>

                                                   <Col size={3}>
                                                     <RadioButton
                                                         value={this.state.includeScelles === true ? 'true' : 'false'}
                                                         status={this.state.includeScelles === true ? 'checked' : 'unchecked'}
                                                         onPress={() => this.setState({
                                                           ...this.state,
                                                           includeScelles: true,
                                                         })}/>
                                                   </Col>

                                                   <Col size={10} style={style.labelContainer}>
                                                     <Text style={style.labelTextStyle}>
                                                       {translate('mainlevee.delivrerMainlevee.informationsEcor.oui')}
                                                     </Text>
                                                   </Col>

                                                   <Col size={3}>
                                                     <RadioButton
                                                         value={this.state.includeScelles === false ? 'true' : 'false'}
                                                         status={this.state.includeScelles === false ? 'checked' : 'unchecked'}
                                                         onPress={() => this.setState({
                                                           ...this.state,
                                                           includeScelles: false,
                                                         })}/>
                                                   </Col>

                                                   <Col size={10} style={style.labelContainer}>
                                                     <Text style={style.labelTextStyle}>
                                                       {translate('mainlevee.delivrerMainlevee.informationsEcor.non')}
                                                     </Text>
                                                   </Col>

                                                   <Col size={40}/>
                                                 </Row>


                                                     <View>
                                                       <Row style={CustomStyleSheet.whiteRow}>
                                                         <Col size={1}>
                                                           <TextInput
                                                               mode={'outlined'}
                                                               maxLength={8}
                                                               value={delivrerMainleveeVO?.numeroPince}
                                                               label={translate(
                                                                   'mainlevee.delivrerMainlevee.informationsEcor.numeroPince',
                                                               )}
                                                               style={CustomStyleSheet.badrInputHeight}
                                                               onChangeText={(text) =>
                                                                   this.setState({
                                                                     delivrerMainleveeVO: {
                                                                       ...this.state.delivrerMainleveeVO,
                                                                       numeroPince: text,
                                                                     },
                                                                   })
                                                               }
                                                           />
                                                         </Col>
                                                         <Col size={1} />
                                                         <Col size={1}>
                                                           <ComBadrNumericTextInputComp
                                                               maxLength={8}
                                                               value={delivrerMainleveeVO?.nombreDeScelles}
                                                               label={translate(
                                                                   'mainlevee.delivrerMainlevee.informationsEcor.nombreScelles',
                                                               )}
                                                               onChangeBadrInput={(text) =>
                                                                   this.setState({
                                                                     delivrerMainleveeVO: {
                                                                       ...this.state.delivrerMainleveeVO,
                                                                       nombreDeScelles: text,
                                                                     },
                                                                   })
                                                               }
                                                           />
                                                         </Col>
                                                       </Row>
                                                       <Row style={CustomStyleSheet.lightBlueRow}>
                                                         <Col size={5}>
                                                           <ComBadrLibelleComp withColor={true}>
                                                             {translate(
                                                                 'mainlevee.delivrerMainlevee.informationsEcor.generateurScelle',
                                                             )}
                                                           </ComBadrLibelleComp>
                                                         </Col>
                                                         <Col size={2}>
                                                           <ComBadrNumericTextInputComp
                                                               onRef={(input) => {
                                                                 this.generateurNumScelleDu = input;
                                                               }}
                                                               maxLength={8}
                                                               value={this.state.generateurNumScelleDu}
                                                               label={translate('transverse.du')}
                                                               onChangeBadrInput={(text) =>
                                                                   this.setState({
                                                                     generateurNumScelleDu: text,
                                                                   })
                                                               }
                                                           />
                                                         </Col>
                                                         <Col size={1} />
                                                         <Col size={2}>
                                                           <ComBadrNumericTextInputComp
                                                               onRef={(input) => {
                                                                 this.generateurNumScelleAu = input;
                                                               }}
                                                               maxLength={8}
                                                               value={generateurNumScelleAu}
                                                               label={translate('transverse.au')}
                                                               onChangeBadrInput={(text) =>
                                                                   this.setState({
                                                                     generateurNumScelleAu: text,
                                                                   })
                                                               }
                                                           />
                                                         </Col>
                                                         <Col size={2} />
                                                         <Col size={1}>
                                                           <Button
                                                               mode="contained"
                                                               compact="true"
                                                               onPress={this.genererNumeroScelle}>
                                                             {translate('transverse.Ok')}
                                                           </Button>
                                                         </Col>
                                                         <Col size={2} />
                                                       </Row>
                                                       <Row
                                                           style={[CustomStyleSheet.whiteRow, styles.rowListNumScelle]}>
                                                         <Col size={5}>
                                                           <ComBadrNumericTextInputComp
                                                               onRef={(input) => {
                                                                 this.numeroScelleInput = input;
                                                               }}
                                                               maxLength={8}
                                                               value={this.numeroScelle}
                                                               label={translate(
                                                                   'mainlevee.delivrerMainlevee.informationsEcor.numeroScelle',
                                                               )}
                                                               onChangeBadrInput={(text) => {
                                                                 this.numeroScelle = text;
                                                               }}
                                                           />
                                                         </Col>
                                                         <Col size={2} />

                                                         <Col size={1}>
                                                           <Button
                                                               onPress={this.addNumeroScelle}
                                                               icon="plus-box"
                                                               mode="contained"
                                                               compact="true"
                                                           />
                                                           <Button
                                                               onPress={this.deleteNumeroScelle}
                                                               icon="delete"
                                                               mode="contained"
                                                               compact="true"
                                                           />
                                                         </Col>
                                                         <Col size={2} />
                                                         <Col size={5}>
                                                           <ComBadrListComp
                                                               data={listeNombreDeScelles}
                                                               onPressListItem={(index) =>
                                                                   this.setState({selectedItemListScelle: index})
                                                               }
                                                           />
                                                         </Col>
                                                       </Row>
                                                     </View>

                                               </Grid>
                                             </ComAccordionComp>
                                           </ComBadrCardBoxComp>

<View
            style={styles.containerActionBtn}
            pointerEvents={this.state.isConsultation ? 'none' : 'auto'}>
            <ComBadrButtonComp
              style={styles.actionBtn}
              onPress={() => {

                 let action = this.validateAction();
                            this.props.actions.dispatch(action);
              }}
              text={translate('mainlevee.validerMainlevee')}

            />
            <ComBadrButtonComp
              style={styles.actionBtn}
              onPress={() => {
                let action =  this.deliverAction();
				 this.props.actions.dispatch(action);
              }}
              text={translate('mainlevee.delivrerMainlevee.title')}

            />
          </View>
 </View>}
                    </Grid>

                )}

            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
//console.log('state mlv',state)
    return {...state.mlvRechercheReducer};
}

function mapDispatchToProps(dispatch) {
    let actions = {dispatch};
    return {
        actions,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EtatChargementBlock);

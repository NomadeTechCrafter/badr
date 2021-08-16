import React from 'react';

import {ScrollView, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {HelperText, TextInput} from 'react-native-paper';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {
    ComBadrErrorMessageComp,
    ComBadrInfoMessageComp,
    ComBadrItemsPickerComp,
    ComBadrProgressBarComp,
} from '../../../../../commons/component';

import {connect} from 'react-redux';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import style from '../../style/ctrlControleApresScannerStyle';
import _ from 'lodash';

import * as Constants from '../../state/ctrlControleApresScannerConstants';

import * as CtrlControleApresScannerInitAction from '../../state/actions/ctrlControleApresScannerInitAction';
import * as CtrlControleApresScannerSearchAction from '../../state/actions/ctrlControleApresScannerSearchAction';

import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';

const initialState = {
    bureau: '',
    regime: '001',
    annee: '',
    serie: '',
    cle: '',
    validCleDum: '',
    numeroVoyage: '',
    typeRechercheEtatChargement: '',
    moyenTransport: '',
    numeroImmatriculation: '',
    showErrorMessage: false,
};

class EtatChargementTabSearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;

        this.initDropdowns();
    }

    initDropdowns = () => {
        let action = CtrlControleApresScannerInitAction.request(
            {
                type: Constants.INIT_CONTROLE_APRES_SCANNER_REQUEST,
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
                let validCleDum = this.cleDum(reference);
                if (validCleDum === this.state.cle) {
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
        return CtrlControleApresScannerSearchAction.request(
            {
                type: Constants.SEARCH_CONTROLE_APRES_SCANNER_REQUEST,
                value: {
                    typeRecherche: '2',
                    reference: reference,
                    numeroVoyage: this.state.numeroVoyage,
                    typeRechercheEtatChargement: this.state.typeRechercheEtatChargement,
                    referenceDed: {
                        codeBureauDouane: this.state.bureau,
                        regime: this.state.regime,
                        anneeEnregistrement: this.state.annee,
                        numeroSerieEnregistrement: this.state.serie,
                        numeroOrdreVoyage: this.state.numeroVoyage,
                        cle: this.state.cle,
                    },
                    moyenTransport: this.state.moyenTransport,
                    numeroImmatriculation: this.state.numeroImmatriculation,
                    bureauAgentConnecte: ComSessionService.getInstance().getCodeBureau(),
                },
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

                {!this.props.showProgress && this.props.searchMode && (
                    <Grid>
                        <Row size={100}>
                            <Col size={30}>
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

                            <Col size={70} style={style.labelContainer}>
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
                            <View>
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
                            </View>
                        )}

                        {this.state.typeRechercheEtatChargement === '2' && (
                            <View>
                                <Row size={100}>
                                    <Col size={30}>
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

                                    <Col size={70} style={style.labelContainer}>
                                        <ComBadrItemsPickerComp
                                            label={translate('controleApresScanner.search.etatChargement.typeMoyen')}
                                            selectedValue={this.state.moyenTransport ? this.state.moyenTransport : ''}
                                            items={this.props.data.init.moyensTransport}
                                            onValueChanged={(value, index) => this.setState({
                                                ...this.state,
                                                moyenTransport: value.code,
                                            })}
                                        />
                                    </Col>
                                </Row>

                                <Row size={100}>
                                    <Col size={30}>
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

                                    <Col size={70} style={style.labelContainer}>
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
                            <Col size={25}/>

                            <Col size={20}>
                                <Button
                                    title={translate('transverse.rechercher')}
                                    type={'solid'}
                                    buttonStyle={style.buttonAction}
                                    onPress={() => this.confirm()}/>
                            </Col>

                            <Col size={2}/>

                            <Col size={20}>
                                <Button
                                    title={translate('transverse.retablir')}
                                    type={'solid'}
                                    buttonStyle={style.buttonAction}
                                    onPress={() => this.reset()}/>
                            </Col>

                            <Col size={25}/>
                        </Row>
                    </Grid>
                )}
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {...state.ctrlControleApresScannerReducer};
}

function mapDispatchToProps(dispatch) {
    let actions = {dispatch};
    return {
        actions,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EtatChargementTabSearchComponent);

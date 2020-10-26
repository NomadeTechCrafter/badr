import React from 'react';

import {ScrollView, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {HelperText, TextInput} from 'react-native-paper';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {
    ComBadrErrorMessageComp,
    ComBadrInfoMessageComp,
    ComBadrProgressBarComp,
    ComBasicDataTableComp,
} from '../../../../commons/component';

import {connect} from 'react-redux';
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import style from '../style/enqCompteRenduStyle';
import _ from 'lodash';

import * as Constants from '../state/enqCompteRenduConstants';

import * as EnqCompteRenduSearchAction from '../state/actions/enqCompteRenduSearchAction';

const initialState = {
    uor: '',
    annee: '',
    serie: '',
    showErrorMessage: false,
};

class EnqCompteRenduSearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    buildTableColumns = () => {
        return [
            {
                code: '',
                value: this.props.data.search.results.referenceEnquete,
                libelle: translate('enquetes.compteRenduMission.search.table.reference'),
                width: 290,
            },
            {
                code: 'etat',
                libelle: translate('enquetes.compteRenduMission.search.table.statut'),
                width: 290,
            },
            {
                code: '',
                value: this.props.data.search.results.dateCreation,
                libelle: translate('enquetes.compteRenduMission.search.table.dateEnregistrement'),
                width: 290,
            },
            {
                code: 'numOrdre',
                libelle: translate('enquetes.compteRenduMission.search.table.numeroMission'),
                width: 290,
            },
        ];
    };

    confirm = () => {
        this.displayErrorMessage();

        this.completeWithZeros({
            uor: this.state.uor,
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

        let reference = this.state.uor + this.state.annee + this.state.serie;
        if (reference && reference.length === 14) {
            let action = EnqCompteRenduSearchAction.request(
                {
                    type: Constants.SEARCH_COMPTE_RENDU_REQUEST,
                    value: {
                        reference: reference,
                        isMissionLookup: false,
                        selectedMissionId: '',
                        selectedMissionNumero: '',
                        isCrMissionCreation: this.props.mode === 'add',
                        isCrMissionModification: this.props.mode === 'edit',
                        isCrMissionValidation: this.props.mode === 'validate',
                    },
                },
                this.props.navigation,
            );
            this.props.actions.dispatch(action);
        }
    };

    reset = () => {
        this.setState(initialState);

        let action = EnqCompteRenduSearchAction.init(
            {
                type: Constants.SEARCH_COMPTE_RENDU_INIT,
                value: {},
            },
            this.props.navigation,
        );
        this.props.actions.dispatch(action);
    };

    onCompteRenduMissionSelected = (row) => {
        let reference = this.state.uor + this.state.annee + this.state.serie;
        if (reference && reference.length === 14) {
            let action = EnqCompteRenduSearchAction.request(
                {
                    type: Constants.SEARCH_COMPTE_RENDU_REQUEST,
                    value: {
                        reference: reference,
                        isMissionLookup: true,
                        selectedMissionId: row.id,
                        selectedMissionNumero: row.numOrdre,
                        isCrMissionCreation: this.props.mode === 'add',
                        isCrMissionModification: this.props.mode === 'edit',
                        isCrMissionValidation: this.props.mode === 'validate',
                    },
                },
                this.props.navigation,
            );
            this.props.actions.dispatch(action);
        }
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
                        <Row>
                            <Col style={style.searchInputContainer}>
                                <TextInput
                                    label={translate('enquetes.compteRenduMission.search.uor')}
                                    value={this.state.uor}
                                    keyboardType={'number-pad'}
                                    maxLength={3}
                                    onChangeText={(val) => this.onChangeSearchInput({uor: val}, true)}
                                    onEndEditing={(event) =>
                                        this.completeWithZeros({
                                            uor: event.nativeEvent.text,
                                            maxLength: 3,
                                        })
                                    }
                                    error={this.hasErrors('uor')}
                                    style={style.searchInput}
                                />

                                <HelperText
                                    type="error"
                                    padding="none"
                                    visible={this.hasErrors('uor')}>
                                    {translate('errors.donneeObligatoire', {champ: translate('enquetes.compteRenduMission.search.uor')})}
                                </HelperText>
                            </Col>
                        </Row>

                        <Row>
                            <Col style={style.searchInputContainer}>
                                <TextInput
                                    label={translate('enquetes.compteRenduMission.search.annee')}
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
                                    {translate('errors.donneeObligatoire', {champ: translate('enquetes.compteRenduMission.search.annee')})}
                                </HelperText>
                            </Col>
                        </Row>

                        <Row>
                            <Col style={style.searchInputContainer}>
                                <TextInput
                                    label={translate('enquetes.compteRenduMission.search.serie')}
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
                                    {translate('errors.donneeObligatoire', {champ: translate('enquetes.compteRenduMission.search.serie')})}
                                </HelperText>
                            </Col>
                        </Row>

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

                        {this.props.showResults && (
                            <Row size={100}>
                                <Col size={100}>
                                    <ComBasicDataTableComp
                                        onRef={(ref) => (this.missionTable = ref)}
                                        id="missionTable"
                                        hasId={false}
                                        rows={this.props.data.search.results.missionVOList ? this.props.data.search.results.missionVOList : []}
                                        cols={this.buildTableColumns()}
                                        onItemSelected={(row) => this.onCompteRenduMissionSelected(row)}
                                        totalElements={this.props.data.search.results.missionVOList ? this.props.data.search.results.missionVOList.length : 0}
                                        maxResultsPerPage={5}
                                        paginate={true}
                                    />
                                </Col>
                            </Row>
                        )}
                    </Grid>
                )}
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {...state.enqCompteRenduReducer};
}

function mapDispatchToProps(dispatch) {
    let actions = {dispatch};
    return {
        actions,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EnqCompteRenduSearchComponent);

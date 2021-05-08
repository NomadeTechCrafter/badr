import React from 'react';

import { ScrollView, View } from 'react-native';
import { Button } from 'react-native-elements';
import { HelperText, TextInput } from 'react-native-paper';
import { Col, Grid, Row } from 'react-native-easy-grid';
import {
    ComBadrErrorMessageComp,
    ComBadrInfoMessageComp,
    ComBadrProgressBarComp,
} from '../../../../commons/component';

import { connect } from 'react-redux';
import { translate } from '../../../../commons/i18n/ComI18nHelper';
import style from '../style/pecEtatChargementStyle';
import _ from 'lodash';

import * as Constants from '../state/pecEtatChargementConstants';

import * as EtatChargementAction from '../state/actions/pecEtatChargementAction';
import * as HistEtatChargementAction from '../state/actions/pecHistoriqueEtatChargementAction';
import * as VersionsEtatChargementAction from '../state/actions/pecVersionsEtatChargementAction';
import * as ScannerEtatChargementAction from '../state/actions/pecScannerEtatChargementAction';

const initialState = {
    bureau: '',
    regime: '',
    annee: '',
    serie: '',
    cle: '',
    validCleDum: '',
    showErrorMessage: false,
};

class PecEtatChargementSearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            let initAction1 = EtatChargementAction.init(
                {
                    type: Constants.ETAT_CHARGEMENT_INIT,
                }
            );
            let initAction2 = HistEtatChargementAction.init(
                {
                    type: Constants.HISTORIQUE_ETAT_CHARGEMENT_INIT
                }
            );
            let initAction3 = VersionsEtatChargementAction.init(
                {
                    type: Constants.VERSIONS_ETAT_CHARGEMENT_INIT
                }
            );
            let initAction4 = ScannerEtatChargementAction.init(
                {
                    type: Constants.SCANNER_ETAT_CHARGEMENT_INIT
                }
            );
            this.props.actions.dispatch(initAction1);
            this.props.actions.dispatch(initAction2);
            this.props.actions.dispatch(initAction3);
            this.props.actions.dispatch(initAction4);
            this.reset();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

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

        let reference = this.state.bureau + this.state.regime + this.state.annee + this.state.serie;

        if (reference && reference.length === 17) {
            let lValidCleDum = this.cleDum(reference);
            if (lValidCleDum === this.state.cle) {
                const actionSearch = this.searchAction();
                const actionHistorique = this.searchHistorique();
                const actionVersions = this.searchVersions();
                const actionScanner = this.searchScanner();

                this.props.actions.dispatch(actionSearch);
                this.props.actions.dispatch(actionHistorique);
                this.props.actions.dispatch(actionVersions);
                this.props.actions.dispatch(actionScanner);
            } else {
                this.setState({
                    ...this.state,
                    validCleDum: lValidCleDum,
                });
            }
        }
    };

    searchAction = () => {
        let action = EtatChargementAction.request(
            {
                type: Constants.ETAT_CHARGEMENT_REQUEST,
                value: {
                    codeBureau: this.state.bureau,
                    regime: this.state.regime,
                    anneeEnregistrement: this.state.annee,
                    numeroSerieEnregistrement: this.state.serie,
                    cleIHM: this.state.cle,
                },
            },
            this.props.navigation,
        );
        return action
    };

    searchHistorique = () => {
        let action = HistEtatChargementAction.request(
            {
                type: Constants.HISTORIQUE_ETAT_CHARGEMENT_REQUEST,
                value: {
                    bureau: this.state.bureau,
                    regime: this.state.regime,
                    annee: this.state.annee,
                    serie: this.state.serie,
                },
            },
            this.props.navigation,
        );
        return action
    };

    searchVersions = () => {
        let action = VersionsEtatChargementAction.request(
            {
                type: Constants.VERSIONS_ETAT_CHARGEMENT_REQUEST,
                value: {
                    bureau: this.state.bureau,
                    regime: this.state.regime,
                    annee: this.state.annee,
                    serie: this.state.serie,
                },
            },
            this.props.navigation,
        );
        return action
    };

    searchScanner = () => {
        let action = ScannerEtatChargementAction.request(
            {
                type: Constants.SCANNER_ETAT_CHARGEMENT_REQUEST,
                value: this.state.bureau + this.state.regime + this.state.annee + this.state.serie

            },
            this.props.navigation,
        );
        return action
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
        this.setState({ [inputKey]: isNumeric ? searchInput[inputKey].replace(/[^0-9]/g, '') : searchInput[inputKey].replace(/[^A-Za-z]/g, '').toUpperCase() });
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
                    <ComBadrProgressBarComp />
                )}

                {this.props.infoMessage != null && (
                    <ComBadrInfoMessageComp message={this.props.infoMessage} />
                )}

                {this.props.errorMessage != null && (
                    <ComBadrErrorMessageComp message={this.props.errorMessage} />
                )}

                {!this.props.showProgress && (
                    <Grid>
                        <View>
                            <Row>
                                <Col style={style.searchInputContainer}>
                                    <TextInput
                                        label={translate('controleApresScanner.search.etatChargement.referenceEtatChargement.bureau')}
                                        value={this.state.bureau}
                                        keyboardType={'number-pad'}
                                        maxLength={3}
                                        onChangeText={(val) => this.onChangeSearchInput({ bureau: val }, true)}
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
                                        {translate('errors.donneeObligatoire', { champ: translate('controleApresScanner.search.etatChargement.referenceEtatChargement.bureau') })}
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
                                    />

                                    <HelperText
                                        type="error"
                                        padding="none"
                                        visible={this.hasErrors('regime')}>
                                        {translate('errors.donneeObligatoire', { champ: translate('controleApresScanner.search.etatChargement.referenceEtatChargement.regime') })}
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
                                        onChangeText={(val) => this.onChangeSearchInput({ annee: val }, true)}
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
                                        {translate('errors.donneeObligatoire', { champ: translate('controleApresScanner.search.etatChargement.referenceEtatChargement.annee') })}
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
                                        onChangeText={(val) => this.onChangeSearchInput({ serie: val }, true)}
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
                                        {translate('errors.donneeObligatoire', { champ: translate('controleApresScanner.search.etatChargement.referenceEtatChargement.serie') })}
                                    </HelperText>
                                </Col>
                            </Row>

                            <Row>
                                <Col style={style.searchInputContainer}>
                                    <TextInput
                                        label={translate('controleApresScanner.search.etatChargement.referenceEtatChargement.cle')}
                                        value={this.state.cle}
                                        keyboardType={'default'}
                                        maxLength={1}
                                        onChangeText={(val) => this.onChangeSearchInput({ cle: val }, false)}
                                        style={style.searchInput}
                                    />

                                    <HelperText
                                        type="error"
                                        padding="none"
                                        visible={this.hasInvalidCleDum()}>
                                        {translate('errors.cleNotValid', { cle: this.state.validCleDum })}
                                    </HelperText>
                                </Col>
                            </Row>
                        </View>

                        <Row size={100}>
                            <Col size={15} />

                            <Col size={20}>
                                <Button
                                    title={translate('transverse.rechercher')}
                                    type={'solid'}
                                    buttonStyle={style.buttonAction}
                                    onPress={() => this.confirm()} />
                            </Col>

                            <Col size={2} />

                            <Col size={20}>
                                <Button
                                    title={translate('transverse.retablir')}
                                    type={'solid'}
                                    buttonStyle={style.buttonAction}
                                    onPress={() => this.reset()} />
                            </Col>

                            <Col size={15} />
                        </Row>
                    </Grid>
                )}
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.pecEtatChargementReducer };
}

function mapDispatchToProps(dispatch) {
    let actions = { dispatch };
    return {
        actions,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PecEtatChargementSearchScreen);

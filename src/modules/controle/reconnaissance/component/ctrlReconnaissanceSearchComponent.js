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
import style from '../style/ctrlReconnaissanceStyle';
import _ from 'lodash';

import * as Constants from '../state/ctrlReconnaissanceConstants';

import * as CtrlReconnaissanceSearchAction from '../state/actions/ctrlReconnaissanceSearchAction';
import * as CtrlReconnaissanceDetailAction from '../state/actions/ctrlReconnaissanceDetailAction';
import * as ctrlInitAffecterAgentVisiteurAction from '../state/actions/ctrlInitAffecterAgentVisiteurAction';

const initialState = {
    bureau: '',
    regime: '',
    annee: '',
    serie: '',
    cle: '',
    validCleDum: '',
    numeroVoyage: '',
    showErrorMessage: false,
};

class CtrlReconnaissanceSearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;

        this.declarationTableColumns = this.buildTableColumns();
    }

    buildTableColumns = () => {
        return [
            {
                code: 'reference',
                libelle: translate('transverse.declaration'),
                width: 230,
            },
            {
                code: 'numVoyage',
                libelle: translate('transverse.nVoyage'),
                width: 230,
            },
            {
                code: 'numeroVersion',
                libelle: translate('transverse.version'),
                width: 230,
            },
            {
                code: 'dateCreationVersion',
                libelle: translate('transverse.dateCreation'),
                width: 230,
            },
            {
                code: 'dateEnregVersion',
                libelle: translate('transverse.dateEnregistrement'),
                width: 230,
            },
            {
                code: 'decision',
                libelle: translate('transverse.decision'),
                width: 230,
            },
            {
                code: 'immatAmp',
                libelle: translate('transverse.amp'),
                width: 230,
            },
            {
                code: 'immatEc',
                libelle: translate('transverse.ec'),
                width: 230,
            },
            {
                code: 'immatTryptique',
                libelle: translate('transverse.tryptique'),
                width: 230,
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

        let reference = this.state.bureau + this.state.regime + this.state.annee + this.state.serie;
        if (reference && reference.length === 17) {
            let validCleDum = this.cleDum(this.state.regime, this.state.serie);
            if (validCleDum === this.state.cle) {
                this.lancerInitAction(reference, this.state.numeroVoyage);
            } else {
                this.setState({
                    ...this.state,
                    validCleDum: validCleDum,
                    showErrorMessage: true,
                });
            }
        }
    };

    reset = () => {
        this.setState(initialState);
    };

    back = () => {
        this.reset();
        this.props.onReset();
    };

    declarations = () => {
        let typeControle;
        switch (this.props.mode) {
            case 'add':
                typeControle = 'AR';
                break;
            case 'edit':
                typeControle = 'MR';
                break;
            case 'cancel':
                typeControle = 'SR';
                break;
            case 'aav':
                typeControle = 'AAV';
                break;
            default:
                typeControle = '';
                break;
        }

        let action = CtrlReconnaissanceSearchAction.request(
            {
                type: Constants.SEARCH_RECONNAISSANCE_REQUEST,
                value: typeControle,
            },
            this.props.navigation,
        );
        this.props.actions.dispatch(action);
    };

    onReconnaissanceSelected = (row) => {
        this.lancerInitAction(row.reference, row.numVoyage);
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

    cleDum = function (regime, serie) {
        let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';

        if (serie.length > 6) {
            if (serie.substring(0, 1) === '0') {
                serie = serie.substring(1, 7);
            }
        }

        let RS = (regime + serie) % 23;
        return alpha.charAt(RS);
    };

    lancerInitAction(reference, numeroVoyage) {
        if (this.props.mode != 'aav') {
            let action = CtrlReconnaissanceDetailAction.request(
                {
                    type: Constants.DETAIL_RECONNAISSANCE_REQUEST,
                    value: {
                        creation: this.props.mode === 'add',
                        modification: this.props.mode === 'edit',
                        annulation: this.props.mode === 'cancel',
                        referenceDed: reference,
                        numeroVoyage: numeroVoyage,
                    },
                },
                this.props.navigation
            );
            this.props.actions.dispatch(action);
        } else {
            let action = ctrlInitAffecterAgentVisiteurAction.request(
                {
                    type: Constants.INIT_AFFECTER_AGENT_VISITEUR_REQUEST,
                    value: {
                        referenceDed: reference,
                        numeroVoyage: numeroVoyage,
                    },
                },
                this.props.navigation
            );
            this.props.actions.dispatch(action);
        }
    }

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
                                    label={translate('transverse.bureau')}
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
                                    {translate('errors.donneeObligatoire', {champ: translate('transverse.bureau')})}
                                </HelperText>
                            </Col>
                        </Row>

                        <Row>
                            <Col style={style.searchInputContainer}>
                                <TextInput
                                    label={translate('transverse.regime')}
                                    value={this.state.regime}
                                    keyboardType={'number-pad'}
                                    maxLength={3}
                                    onChangeText={(val) => this.onChangeSearchInput({regime: val}, true)}
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
                                    {translate('errors.donneeObligatoire', {champ: translate('transverse.regime')})}
                                </HelperText>
                            </Col>
                        </Row>

                        <Row>
                            <Col style={style.searchInputContainer}>
                                <TextInput
                                    label={translate('transverse.annee')}
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
                                    {translate('errors.donneeObligatoire', {champ: translate('transverse.annee')})}
                                </HelperText>
                            </Col>
                        </Row>

                        <Row>
                            <Col style={style.searchInputContainer}>
                                <TextInput
                                    label={translate('transverse.serie')}
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
                                    {translate('errors.donneeObligatoire', {champ: translate('transverse.serie')})}
                                </HelperText>
                            </Col>
                        </Row>

                        <Row>
                            <Col style={style.searchInputContainer}>
                                <TextInput
                                    label={translate('transverse.cle')}
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

                        <Row>
                            <Col style={style.searchInputContainer}>
                                <TextInput
                                    label={translate('transverse.nVoyage')}
                                    value={this.state.numeroVoyage}
                                    keyboardType={'number-pad'}
                                    maxLength={1}
                                    onChangeText={(val) => this.onChangeSearchInput({numeroVoyage: val}, true)}
                                    style={style.searchInput}
                                />

                                <HelperText
                                    type="error"
                                    padding="none"
                                    visible={false}/>
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

                        <Row size={100}>
                            <Col size={40}/>

                            <Col size={20}>
                                <Button
                                    title={translate('transverse.declarations')}
                                    type={'solid'}
                                    buttonStyle={style.buttonAction}
                                    onPress={() => this.declarations()}/>
                            </Col>

                            <Col size={40}/>
                        </Row>
                    </Grid>
                )}

                {!this.props.showProgress && this.props.resultsMode && (
                    <Grid>
                        <Row size={100}>
                            <Col size={20}>
                                <Text style={style.labelTextStyle}>
                                    {translate('transverse.totalEnregistrements') + (this.props.data.search ? this.props.data.search.length : 0)}
                                </Text>
                            </Col>
                        </Row>

                        <Row size={100}>
                            <Col size={100}>
                                <ComBasicDataTableComp
                                    onRef={(ref) => (this.declarationTable = ref)}
                                    id="declarationTable"
                                    hasId={false}
                                    rows={this.props.data.search}
                                    cols={this.declarationTableColumns}
                                    onItemSelected={(row) => this.onReconnaissanceSelected(row)}
                                    totalElements={this.props.data.search ? this.props.data.search.length : 0}
                                    maxResultsPerPage={5}
                                    paginate={true}
                                />
                            </Col>
                        </Row>
                        <Row size={100}>
                            <Col size={40} />

                            <Col size={20}>
                                <Button
                                    title={translate('transverse.back')}
                                    type={'solid'}
                                    buttonStyle={style.buttonAction}
                                    onPress={() => this.back()} />
                            </Col>

                            <Col size={40} />
                        </Row>
                    </Grid>
                )}
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {...state.ctrlReconnaissanceReducer};
}

function mapDispatchToProps(dispatch) {
    let actions = {dispatch};
    return {
        actions,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CtrlReconnaissanceSearchComponent);

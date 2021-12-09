import React from 'react';

import { ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { HelperText, TextInput } from 'react-native-paper';
import { Col, Grid, Row } from 'react-native-easy-grid';
import {
    ComBadrErrorMessageComp,
    ComBadrInfoMessageComp,
    ComBadrItemsPickerComp,
    ComBadrLibelleComp,
    ComBadrProgressBarComp,
} from '../../../../../commons/component';

import { connect } from 'react-redux';
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import style from '../../style/ctrlControleApresScannerStyle';
import _ from 'lodash';

import * as Constants from '../../state/ctrlControleApresScannerConstants';

import * as CtrlControleApresScannerInitAction from '../../state/actions/ctrlControleApresScannerInitAction';
import * as CtrlControleApresScannerSearchAction from '../../state/actions/ctrlControleApresScannerSearchAction';

import { ComSessionService } from '../../../../../commons/services/session/ComSessionService';
import { CustomStyleSheet } from '../../../../../commons/styles/ComThemeStyle';

const initialState = {
    numeroImmatriculation: '',
    showErrorMessage: false,
};

class ImmatriculationTabSearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    confirm = () => {
        this.displayErrorMessage();

        if (this.state.numeroImmatriculation) {
            let action = this.searchAction();
            this.props.actions.dispatch(action);
        } else {
            // Do nothing
        }
    };

    searchAction = () => {
        return CtrlControleApresScannerSearchAction.request(
            {
                type: Constants.SEARCH_CONTROLE_APRES_SCANNER_REQUEST,
                value: {
                    typeRecherche: '2',
                    typeRechercheEtatChargement: '3',
                    reference: '',
                    numeroImmatriculation: this.state.numeroImmatriculation,
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

    hasErrors = (searchField) => {
        return this.state.showErrorMessage && _.isEmpty(this.state[searchField]);
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

                <Row style={CustomStyleSheet.whiteRow}>
                    <Col size={2}>
                        <ComBadrLibelleComp withColor={true} isRequired={true}>
                            {translate('confirmationArrivee.immatriculation')}
                        </ComBadrLibelleComp>
                    </Col>
                    <Col size={4}>
                        <TextInput
                            mode="outlined"
                            value={this.state.numeroImmatriculation}
                            onChangeText={(text) =>
                                this.setState({ numeroImmatriculation: text })
                            }
                        />
                        <HelperText
                            type="error"
                            padding="none"
                            visible={this.hasErrors('numeroImmatriculation')}>
                            {translate('errors.donneeObligatoire', { champ: translate('confirmationArrivee.immatriculation') })}
                        </HelperText>
                    </Col>
                    <Col size={2} />
                </Row>

                <Row size={100}>
                    <Col size={25} />

                    <Col size={20}>
                        <Button
                            title={translate('transverse.valider')}
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

                    <Col size={25} />
                </Row>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.ctrlControleApresScannerReducer };
}

function mapDispatchToProps(dispatch) {
    let actions = { dispatch };
    return {
        actions,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImmatriculationTabSearchComponent);

import React from 'react';

import {ScrollView, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {
    ComBadrAutoCompleteComp,
    ComBadrCheckboxTreeComp,
    ComBadrDatePickerComp,
    ComBadrDualListBoxComp,
    ComBadrErrorMessageComp,
    ComBadrInfoMessageComp,
    ComBadrProgressBarComp,
} from '../../../../commons/component';

import {connect} from 'react-redux';
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import style from '../style/refOperateursEconomiquesStyle';

import moment from 'moment';

import * as Constants from '../state/refOperateursEconomiquesConstants';

import * as RefOperateursEconomiquesConfirmAction from '../state/actions/refOperateursEconomiquesConfirmAction';

const initialState = {
    blocageVo: {},
};

class RefOperateursEconomiquesCoreComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;

        this.prepareState();
    }

    prepareState = () => {
        this.state = {
            ...this.state,
            readonly: this.props.mode === 'consult',
            dateDebut: this.props.blocageVo.dateDebut ? this.props.blocageVo.dateDebut.split(' ')[0] : null,
            heureDebut: this.props.blocageVo.dateDebut ? this.props.blocageVo.dateDebut.split(' ')[1] : null,
            dateFin: this.props.blocageVo.dateFin ? this.props.blocageVo.dateFin.split(' ')[0] : null,
            heureFin: this.props.blocageVo.dateFin ? this.props.blocageVo.dateFin.split(' ')[1] : null,
            blocageVo: {
                ...this.state.blocageVo,
                idBlocage: this.props.blocageVo.idBlocage,
                operateur: this.props.blocageVo.operateur,
                commentaire: this.props.blocageVo.commentaire,
            },
        };
    };

    confirm = () => {
        this.setState({
            ...this.state,
            blocageVo: {
                ...this.state.blocageVo,
                motifsBlocageSource: this.props.blocageVo.motifsBlocageSource,
                motifsBlocageTarget: this.props.blocageVo.motifsBlocageTarget,
                typesBlocageSource: this.props.blocageVo.typesBlocageSource,
                typesBlocageTarget: this.props.blocageVo.typesBlocageTarget,
                dateDebut: this.state.dateDebut && this.state.heureDebut ? (this.state.dateDebut + ' ' + this.state.heureDebut) : '',
                dateFin: this.state.dateFin && this.state.heureFin ? this.state.dateFin + ' ' + this.state.heureFin : '',
                regimesTree: this.props.blocageVo.regimesTree,
            },
        }, () => {
            let action = RefOperateursEconomiquesConfirmAction.request(
                {
                    type: Constants.CONFIRM_OPERATEURS_ECONOMIQUES_REQUEST,
                    value: this.state.blocageVo,
                    mode: this.props.mode,
                },
                this.props.navigation,
            );
            this.props.actions.dispatch(action);
        });
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

                {!this.props.showProgress && (
                    <Grid>
                        <Row size={100}>
                            <Col size={30}>
                                <Row>
                                    <Col style={style.labelContainer}>
                                        <Text style={style.labelTextStyle}>
                                            {translate('referentiel.operateursEconomiques.core.operateur')}
                                        </Text>
                                    </Col>

                                    <Col style={style.labelContainer}>
                                        <Text style={style.labelRequiredStyle}>
                                            *
                                        </Text>
                                    </Col>
                                </Row>
                            </Col>

                            <Col size={70}>
                                <ComBadrAutoCompleteComp
                                    onRef={ref => (this.cmbOperateur = ref)}
                                    key="cmbOperateur"
                                    placeholder={translate('referentiel.operateursEconomiques.core.operateur')}
                                    initialValue={this.state.blocageVo.operateur ? this.state.blocageVo.operateur.libelle : ''}
                                    handleSelectItem={(item, id) =>
                                        this.setState({
                                            ...this.state,
                                            blocageVo: {
                                                ...this.state.blocageVo,
                                                operateur: {
                                                    code: item.code,
                                                    libelle: item.libelle,
                                                },
                                            },
                                        })
                                    }
                                    command="getCmbOperateur"
                                />
                            </Col>
                        </Row>

                        <Row size={100}>
                            <Col size={30}>
                                <Row>
                                    <Col style={style.labelContainer}>
                                        <Text style={style.labelTextStyle}>
                                            {translate('referentiel.operateursEconomiques.core.motifBlocage')}
                                        </Text>
                                    </Col>

                                    <Col style={style.labelContainer}>
                                        <Text style={style.labelRequiredStyle}>
                                            *
                                        </Text>
                                    </Col>
                                </Row>
                            </Col>

                            <Col size={70}>
                                <ComBadrDualListBoxComp style={style.textInputContainer}
                                                        available={this.props.blocageVo.motifsBlocageSource}
                                                        selected={this.props.blocageVo.motifsBlocageTarget}
                                                        readonly={this.state.readonly}/>
                            </Col>
                        </Row>

                        <Row size={100}>
                            <Col size={30}>
                                <Row>
                                    <Col style={style.labelContainer}>
                                        <Text style={style.labelTextStyle}>
                                            {translate('referentiel.operateursEconomiques.core.typeBlocage')}
                                        </Text>
                                    </Col>

                                    <Col style={style.labelContainer}>
                                        <Text style={style.labelRequiredStyle}>
                                            *
                                        </Text>
                                    </Col>
                                </Row>
                            </Col>

                            <Col size={70}>
                                <ComBadrDualListBoxComp style={style.textInputContainer}
                                                        available={this.props.blocageVo.typesBlocageSource}
                                                        selected={this.props.blocageVo.typesBlocageTarget}
                                                        readonly={this.state.readonly}/>
                            </Col>
                        </Row>

                        <Row size={100}>
                            <Col size={30} style={style.labelContainer}>
                                <Text style={style.labelTextStyle}>
                                    {translate('referentiel.operateursEconomiques.core.dateDebut')}
                                </Text>
                            </Col>

                            <Col size={70}>
                                <ComBadrDatePickerComp
                                    dateFormat="DD/MM/yyyy"
                                    heureFormat="HH:mm:ss"
                                    value={this.state.dateDebut ? moment(this.state.dateDebut, 'DD/MM/yyyy', true) : ''}
                                    timeValue={this.state.heureDebut ? moment(this.state.heureDebut, 'HH:mm:ss', true) : ''}
                                    onDateChanged={(date) =>
                                        this.setState({
                                            ...this.state,
                                            dateDebut: date,
                                        })}
                                    onTimeChanged={(time) =>
                                        this.setState({
                                            ...this.state,
                                            heureDebut: time,
                                        })}
                                    labelDate={translate('referentiel.operateursEconomiques.core.dateDebut')}
                                    labelHeure={translate('referentiel.operateursEconomiques.core.heureDebut')}
                                    inputStyle={style.dateInputStyle}
                                    readonly={this.state.readonly}
                                />
                            </Col>
                        </Row>

                        <Row size={100}>
                            <Col size={30} style={style.labelContainer}>
                                <Text style={style.labelTextStyle}>
                                    {translate('referentiel.operateursEconomiques.core.dateFin')}
                                </Text>
                            </Col>

                            <Col size={70}>
                                <ComBadrDatePickerComp
                                    dateFormat="DD/MM/yyyy"
                                    heureFormat="HH:mm:ss"
                                    value={this.state.dateFin ? moment(this.state.dateFin, 'DD/MM/yyyy', true) : ''}
                                    timeValue={this.state.heureFin ? moment(this.state.heureFin, 'HH:mm:ss', true) : ''}
                                    onDateChanged={(date) =>
                                        this.setState({
                                            ...this.state,
                                            dateFin: date,
                                        })}
                                    onTimeChanged={(time) =>
                                        this.setState({
                                            ...this.state,
                                            heureFin: time,
                                        })}
                                    labelDate={translate('referentiel.operateursEconomiques.core.dateFin')}
                                    labelHeure={translate('referentiel.operateursEconomiques.core.heureFin')}
                                    inputStyle={style.dateInputStyle}
                                    readonly={this.state.readonly}
                                />
                            </Col>
                        </Row>

                        <Row size={100}>
                            <Col size={30} style={style.labelContainer}>
                                <Text style={style.labelTextStyle}>
                                    {translate('referentiel.operateursEconomiques.core.commentaire')}
                                </Text>
                            </Col>

                            <Col size={70}>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={4}
                                    mode="outlined"
                                    label={translate('referentiel.operateursEconomiques.core.commentaire')}
                                    value={this.state.blocageVo.commentaire}
                                    onChangeText={(text) => this.setState({
                                        ...this.state,
                                        blocageVo: {
                                            ...this.state.blocageVo,
                                            commentaire: text,
                                        },
                                    })}
                                    disabled={this.state.readonly}
                                />
                            </Col>
                        </Row>

                        <Row size={100}>
                            <Col size={30}>
                                <Row>
                                    <Col style={style.labelContainer}>
                                        <Text style={style.labelTextStyle}>
                                            {translate('referentiel.operateursEconomiques.core.regimesABloquer')}
                                        </Text>
                                    </Col>

                                    <Col style={style.labelContainer}>
                                        <Text style={style.labelRequiredStyle}>
                                            *
                                        </Text>
                                    </Col>
                                </Row>
                            </Col>

                            <Col size={70}>
                                <ComBadrCheckboxTreeComp
                                    tree={this.props.blocageVo.regimesTree ? [this.props.blocageVo.regimesTree] : []}
                                    readonly={this.state.readonly}/>
                            </Col>
                        </Row>

                        {!this.state.readonly && (
                            <Row size={100}>
                                <Col size={25}/>

                                <Col size={20}>
                                    <Button
                                        title={translate('transverse.confirmer')}
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
                                        onPress={() => this.props.onReset()}/>
                                </Col>

                                <Col size={25}/>
                            </Row>
                        )}
                    </Grid>
                )}
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {...state.refOperateursEconomiquesReducer};
}

function mapDispatchToProps(dispatch) {
    let actions = {dispatch};
    return {
        actions,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RefOperateursEconomiquesCoreComponent);

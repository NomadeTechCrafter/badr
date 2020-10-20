import React from 'react';

import {ScrollView, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {
    ComBadrAutoCompleteComp,
    ComBadrErrorMessageComp,
    ComBadrInfoMessageComp,
    ComBadrProgressBarComp,
    ComBasicDataTableComp,
} from '../../../../commons/component';

import {connect} from 'react-redux';
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import style from '../style/refOperateursEconomiquesStyle';

import * as Constants from '../state/refOperateursEconomiquesConstants';

import * as RefOperateursEconomiquesSearchAction from '../state/actions/refOperateursEconomiquesSearchAction';
import * as RefOperateursEconomiquesDetailAction from '../state/actions/refOperateursEconomiquesDetailAction';
import CheckBox from '@react-native-community/checkbox';

const initialState = {
    blocageVo: {},
};

class RefOperateursEconomiquesSearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;

        this.blocageTableColumns = this.buildTableColumns();
    }

    buildTableColumns = () => {
        let tableColumns = [
            {
                code: 'idBlocage',
                libelle: translate('referentiel.operateursEconomiques.search.table.idBlocage'),
                width: 150,
            },
            {
                code: 'operateur.libelle',
                libelle: translate('referentiel.operateursEconomiques.search.table.operateur'),
                width: 200,
            },
            {
                code: 'acteurBloquant.libelle',
                libelle: translate('referentiel.operateursEconomiques.search.table.acteurBloquant'),
                width: 200,
            },
            {
                code: 'acteurDebloquant.libelle',
                libelle: translate('referentiel.operateursEconomiques.search.table.acteurDebloquant'),
                width: 200,
            },
            {
                code: 'dateDebut',
                libelle: translate('referentiel.operateursEconomiques.search.table.dateDebut'),
                width: 200,
            },
            {
                code: 'dateFin',
                libelle: translate('referentiel.operateursEconomiques.search.table.dateFin'),
                width: 200,
            },
        ];

        if (this.props.onAction) {
            tableColumns.push({
                code: '',
                libelle: '',
                width: 50,
                component: 'button',
                icon: 'delete-outline',
                action: (row, index) => {
                    this.props.onAction(row);
                },
            });
        }

        return tableColumns;
    };

    confirm = () => {
        let action = RefOperateursEconomiquesSearchAction.request(
            {
                type: Constants.SEARCH_OPERATEURS_ECONOMIQUES_REQUEST,
                value: this.state.blocageVo,
            },
            this.props.navigation,
        );
        this.props.actions.dispatch(action);
    };

    reset = () => {
        this.cmbOperateur.clearInput();
        this.setState(initialState);

        let action = RefOperateursEconomiquesSearchAction.init(
            {
                type: Constants.SEARCH_OPERATEURS_ECONOMIQUES_INIT,
                value: {},
            },
            this.props.navigation,
        );
        this.props.actions.dispatch(action);
    };

    onBlocageSelected = (row) => {
        if (this.props.onAction) {
            // Do nothing
        } else {
            let action = RefOperateursEconomiquesDetailAction.request(
                {
                    type: Constants.DETAIL_OPERATEURS_ECONOMIQUES_REQUEST,
                    value: row.idBlocage,
                },
                this.props.navigation,
            );
            this.props.actions.dispatch(action);
        }
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
                                            {translate('referentiel.operateursEconomiques.search.operateur')}
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
                                    placeholder={translate('referentiel.operateursEconomiques.search.operateur')}
                                    initialValue={this.state.blocageVo.operateur}
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

                        {this.props.includeInvalid && (
                            <Row size={100}>
                                <Col size={30}>
                                    <Row>
                                        <Col style={style.labelContainer}>
                                            <Text style={style.labelTextStyle}>
                                                {translate('referentiel.operateursEconomiques.search.afficherBlocagesInvalides')}
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
                                    <CheckBox
                                        disabled={false}
                                        value={this.state.blocageVo.isAnnule}
                                        onValueChange={(check) => this.setState({
                                            ...this.state,
                                            blocageVo: {
                                                ...this.state.blocageVo,
                                                isAnnule: check,
                                            },
                                        })}
                                    />
                                </Col>
                            </Row>
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

                        {this.props.showResults && (
                            <Row size={100}>
                                <Col size={100}>
                                    <ComBasicDataTableComp
                                        onRef={(ref) => (this.blocageTable = ref)}
                                        id="blocageTable"
                                        hasId={false}
                                        rows={this.props.data.search}
                                        cols={this.blocageTableColumns}
                                        onItemSelected={(row) => this.onBlocageSelected(row)}
                                        totalElements={this.props.data.search ? this.props.data.search.length : 0}
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
    return {...state.refOperateursEconomiquesReducer};
}

function mapDispatchToProps(dispatch) {
    let actions = {dispatch};
    return {
        actions,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RefOperateursEconomiquesSearchComponent);
import React from 'react';
import { ScrollView, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Col, Grid, Row } from 'react-native-easy-grid';
import moment from 'moment';
import { connect } from "react-redux";
import { ComSessionService } from "../../../../commons/services/session/ComSessionService";
import { init, request } from "../state/actions/dtpsConsultationAction";
import {
    DTPS_CONSULTATION_REQUEST,
} from '../state/dtpsConsultationConstants';
/**Custom Components */
import {
    ComBadrAutoCompleteChipsComp,
    ComBadrButtonIconComp,
    ComBadrDatePickerComp,
    ComBadrErrorMessageComp,
} from '../../../../commons/component';
import translate from '../../../../commons/i18n/ComI18nHelper';
/**Styling */
import { CustomStyleSheet } from '../../../../commons/styles/ComThemeStyle';
import style from '../style/dtpsConsultationStyle';

const initialState = {
    login: ComSessionService.getInstance().getLogin(),
    dateDu: '',
    dateAu: '',
    matricule: '',
    referenceDS: '',
    referenceLot: '',
    codeLieuChargement: '',
    errorMessage: '',
    lieuChargement: {},
};

class dtpsConsultationRechercheScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState
    }

    handleSearch = () => {
        if (this.state.codeLieuChargement || this.state.referenceLot) {
            if (this.state.codeLieuChargement && this.state.referenceLot && this.state.referenceDS) {
                let action = this.buildSearchDTPSConsultationAction(this.state.login);
                this.props.actions.dispatch(action);
            } else {
                this.setState({
                    errorMessage: 'Merci de saisire les 3 criteres de recherche d\'un lot(Réference DS/ Réference Lot / Lieu de Chargement).',
                })
            }
        } else {
            let action = this.buildSearchDTPSConsultationAction(this.state.login);
            this.props.actions.dispatch(action);
        }
    };

    handleClear = () => {
        this.setState(initialState);
    };

    buildInitConsultationBLSAction = () => {
        let action = init({ value: {} });
        return action;
    };

    buildSearchDTPSConsultationAction = (login) => {
        let action = request({
            type: DTPS_CONSULTATION_REQUEST,
            value: {
                dateDebut: this.state.dateDu,
                dateFin: this.state.dateAu,
                matricule: this.state.matricule,
                referenceDs: this.state.referenceDS,
                refLot: this.state.referenceLot,
                codeLieuChargement: this.state.codeLieuChargement
            },
        });
        this.props.navigation.navigate('Resultat', {
            login: this.state.login,
            first: true,
        });
        return action;
    };

    componentDidMount() {
        let action = this.buildInitConsultationBLSAction();
        this.props.actions.dispatch(action);
    }

    handleLieuChargementChanged = (localLieuChargement) => {
        this.setState({
            lieuChargement: localLieuChargement,
            codeLieuChargement: localLieuChargement?.code
        });
    };

    render() {
        return (
            <ScrollView>
                <View style={CustomStyleSheet.verticalContainer20}>
                    <Row>
                        <Col>
                            {this.state?.errorMessage != null && (
                                <ComBadrErrorMessageComp message={this.state?.errorMessage} />
                            )}
                        </Col>
                    </Row>
                    <View style={CustomStyleSheet.row}>

                        <Row>
                            <Col>
                                <ComBadrDatePickerComp
                                    dateFormat="DD/MM/YYYY"
                                    value={this.state.dateDu ? moment(this.state.dateDu, 'DD/MM/yyyy', true) : ''}
                                    labelDate={translate('consultationBLS.startDate')}
                                    inputStyle={style.textInputsStyle}
                                    onDateChanged={(date) =>
                                        this.setState({
                                            ...this.state,
                                            dateDu: date,
                                        })
                                    }
                                />
                            </Col>
                            <Col>
                                <ComBadrDatePickerComp
                                    dateFormat="DD/MM/YYYY"
                                    value={this.state.dateAu ? moment(this.state.dateAu, 'DD/MM/yyyy', true) : ''}
                                    labelDate={translate('consultationBLS.endDate')}
                                    inputStyle={style.textInputsStyle}
                                    onDateChanged={(date) =>
                                        this.setState({
                                            ...this.state,
                                            dateAu: date,
                                        })
                                    }
                                />
                            </Col>
                        </Row>
                    </View>
                    <View style={CustomStyleSheet.row}>
                        <TextInput
                            style={CustomStyleSheet.column}
                            mode="outlined"
                            keyboardType={'number-pad'}
                            label={translate('dtps.filtreRecherche.matricule')}
                            value={this.state.matricule}
                            onChangeText={(text) => this.setState({ matricule: text })}
                        />
                    </View>
                    <View style={CustomStyleSheet.row}>
                        <TextInput
                            style={CustomStyleSheet.column}
                            mode="outlined"
                            keyboardType={'number-pad'}
                            label={translate('dtps.filtreRecherche.refDS')}
                            value={this.state.referenceDS}
                            onChangeText={(text) => this.setState({ referenceDS: text })}
                        />
                        <TextInput
                            style={CustomStyleSheet.column}
                            mode="outlined"
                            keyboardType={'number-pad'}
                            label={translate('dtps.filtreRecherche.refLot')}
                            value={this.state.referenceLot}
                            onChangeText={(text) => this.setState({ referenceLot: text })}
                        />
                    </View>
                    <View style={CustomStyleSheet.row}>
                        <ComBadrAutoCompleteChipsComp
                            code="code"
                            placeholder={translate(
                                'dtps.filtreRecherche.lieuChargement'
                            )}
                            selected={this.state.lieuChargement?.libelle}
                            maxItems={3}
                            libelle="libelle"
                            command="getCmbLieuChargement"
                            onDemand={true}
                            searchZoneFirst={false}
                            onValueChange={this.handleLieuChargementChanged}
                        />
                    </View>
                </View>
                <Grid>
                    <Row>
                        <Col size={20} />
                        <Col size={30}>
                            <ComBadrButtonIconComp
                                onPress={() => this.handleSearch()}
                                icon="magnify"
                                style={style.buttonIcon}
                                loading={this.props.showProgress}
                                text={translate('transverse.rechercher')}
                            />
                        </Col>
                        <Col size={30}>
                            <ComBadrButtonIconComp
                                onPress={() => this.handleClear()}
                                icon="autorenew"
                                style={style.buttonIcon}
                                text={translate('transverse.retablir')}
                            />
                        </Col>
                        <Col size={20} />
                    </Row>
                </Grid>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.dtpsConsultationReducer };
}

function mapDispatchToProps(dispatch) {
    let actions = { dispatch };
    return {
        actions,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(dtpsConsultationRechercheScreen);

import React from 'react';
import { connect } from 'react-redux';
import { ComAccordionComp, ComBadrButtonIconComp, ComBadrCardBoxComp, ComBadrDatePickerComp, ComBadrLibelleComp, ComBasicDataTableComp } from '../../../../../../commons/component';
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import style from '../../style/actifsCreationStyle';
import { Col, Grid, Row } from 'react-native-easy-grid';
import moment from 'moment';
import { ScrollView, View } from 'react-native';
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';
import { TextInput } from 'react-native-paper';


class ActifsRapportCreationRondesApparitionsTab extends React.Component {


    constructor(props) {
        super(props);
        this.colsEdition = [
            {
                code: 'dateHeureDebut',
                libelle: translate('actifsCreation.rondesApparitions.dateDebut'),
                width: 150,
            },
            {
                code: 'dateHeureFin',
                libelle: translate('actifsCreation.rondesApparitions.dateFin'),
                width: 150,
            },
            {
                code: 'pointsControle',
                libelle: translate('actifsCreation.rondesApparitions.pointsServiceControles'),
                width: 250,
            },
            {
                code: 'resultatControle',
                libelle: translate('actifsCreation.rondesApparitions.resContrRapService'),
                width: 250,
            },
            {
                code: 'choix',
                libelle: translate('actifsCreation.rondesApparitions.choix'),
                width: 120,
            },
            {
                code: 'isNew',
                libelle: '',
                width: 50,
                component: 'button',
                icon: 'delete-outline',
                action: (row, index) =>
                    this.deleteRow(row, index)
            }
        ];
        this.colsConsultation = [
            {
                code: 'dateDebut',
                libelle: translate('actifsCreation.rondesApparitions.dateDebut'),
                width: 150,
            },
            {
                code: 'dateFin',
                libelle: translate('actifsCreation.rondesApparitions.dateFin'),
                width: 150,
            },
            {
                code: 'pointsControle',
                libelle: translate('actifsCreation.rondesApparitions.pointsServiceControles'),
                width: 250,
            },
            {
                code: 'resultatControle',
                libelle: translate('actifsCreation.rondesApparitions.resContrRapService'),
                width: 250,
            }
        ];
        this.state = {
            currentRondeApparition: {
                dateDebut: '',
                heureDebut: '',
                dateFin: '',
                heureFin: '',
                pointsControle: '',
                resultatControle: '',
                dateHeureDebut: '',
                dateHeureFin: '',
            },
            rondesApparitions: [],
            modeConsultation: false,
        };
    }

    componentDidMount = () => {
        console.log('=================================================================================');
        console.log('=================================================================================');
        console.log('=================================================================================');
        console.log(JSON.stringify(this.props.value?.rondesApparition));
        console.log(JSON.stringify(this.props.rondesApparition));
        console.log(JSON.stringify(this.props.consultation));
        console.log('=================================================================================');
        console.log('=================================================================================');
        console.log('=================================================================================');

        this.setState({
            rondesApparitions: this.props.value?.rondesApparition ? this.props.value?.rondesApparition : [],
            modeConsultation: this.props.consultation,
        });
    }

    deleteRow = (row, index) => {
        console.log(JSON.stringify(row));
        console.log(JSON.stringify(index));
        let rondesApparitions = this.state.rondesApparitions;
        rondesApparitions.splice(index, 1);
        this.setState({ myArray: [...this.state.rondesApparitions, rondesApparitions] });


    };

    handleClear = () => {
        console.log(JSON.stringify(this.state));
        this.setState(prevState => ({

            currentRondeApparition: {                   // object that we want to update
                ...prevState.currentRondeApparition,    // keep all other key-value pairs
                dateDebut: '',
                heureDebut: '',
                dateFin: '',
                heureFin: '',
                pointsControle: '',
                resultatControle: '',
                dateHeureDebut: '',
                dateHeureFin: '',
            },
            modeConsultation: false,
        }))
    };

    addRondeApparition = () => {
        // console.log(JSON.stringify(this.state));
        let rondesApparitions = this.state.rondesApparitions;

        let currentRondeApparition = this.state.currentRondeApparition;
        currentRondeApparition.dateHeureDebut = this.state.currentRondeApparition.dateDebut + ' ' + this.state.currentRondeApparition.heureDebut;
        currentRondeApparition.dateHeureFin = this.state.currentRondeApparition.dateFin + ' ' + this.state.currentRondeApparition.heureFin;
        rondesApparitions.push(currentRondeApparition);
        this.setState({ myArray: [...this.state.rondesApparitions, rondesApparitions] });
        this.handleClear();
    };

    render() {
        return (
            <ScrollView >
                <View style={CustomStyleSheet.verticalContainer20}>
                    <ComAccordionComp title={translate('actifsCreation.rondesApparitions.title')} expanded={true}>
                        {!this.state.modeConsultation && (
                            <View>
                                <View style={CustomStyleSheet.row}>
                                    <Row style={CustomStyleSheet.whiteRow}>
                                        <Col size={3}>
                                            <ComBadrLibelleComp withColor={false}>
                                                {translate('actifsCreation.rondesApparitions.dateHeureDebut')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={7}>
                                            <ComBadrDatePickerComp
                                                dateFormat="DD/MM/YYYY"
                                                heureFormat="HH:mm"
                                                value={this.state.currentRondeApparition.dateDebut ? moment(this.state.currentRondeApparition.dateDebut, 'DD/MM/YYYY', true) : ''}
                                                timeValue={this.state.currentRondeApparition.heureDebut ? moment(this.state.currentRondeApparition.heureDebut, 'HH:mm', true) : ''}
                                                onDateChanged={(date) => this.setState(prevState => ({
                                                    currentRondeApparition: {
                                                        ...prevState.currentRondeApparition,
                                                        dateDebut: date,
                                                    }
                                                }))}
                                                onTimeChanged={(time) => this.setState(prevState => ({
                                                    currentRondeApparition: {
                                                        ...prevState.currentRondeApparition,
                                                        heureDebut: time,
                                                    }
                                                }))}
                                                inputStyle={style.dateInputStyle}
                                            />
                                        </Col>
                                    </Row>
                                </View>
                                <View style={CustomStyleSheet.row}>
                                    <Row style={CustomStyleSheet.whiteRow}>
                                        <Col size={3}>
                                            <ComBadrLibelleComp withColor={false}>
                                                {translate('actifsCreation.rondesApparitions.dateHeureFin')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={7}>
                                            <ComBadrDatePickerComp
                                                dateFormat="DD/MM/YYYY"
                                                heureFormat="HH:mm"
                                                value={this.state.currentRondeApparition.dateFin ? moment(this.state.currentRondeApparition.dateFin, 'DD/MM/YYYY', true) : ''}
                                                timeValue={this.state.currentRondeApparition.heureFin ? moment(this.state.currentRondeApparition.heureFin, 'HH:mm', true) : ''}
                                                onDateChanged={(date) => this.setState(prevState => ({
                                                    currentRondeApparition: {
                                                        ...prevState.currentRondeApparition,
                                                        dateFin: date,
                                                    }
                                                }))}
                                                onTimeChanged={(time) => this.setState(prevState => ({
                                                    currentRondeApparition: {
                                                        ...prevState.currentRondeApparition,
                                                        heureFin: time,
                                                    }
                                                }))}

                                                inputStyle={style.dateInputStyle}
                                            />
                                        </Col>
                                    </Row>
                                </View>
                                <View style={CustomStyleSheet.row}>
                                    <Row style={CustomStyleSheet.whiteRow}>
                                        <Col size={3}>
                                            <ComBadrLibelleComp withColor={false}>
                                                {translate('actifsCreation.rondesApparitions.pointsServiceControles')} *
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={7}>
                                            <TextInput
                                                maxLength={250}
                                                multiline
                                                numberOfLines={4}
                                                value={this.state.currentRondeApparition.pointsControle}
                                                onChangeText={(text) => this.setState(prevState => ({
                                                    currentRondeApparition: {
                                                        ...prevState.currentRondeApparition,
                                                        pointsControle: text,
                                                    }
                                                }))}
                                            />
                                        </Col>
                                    </Row>
                                </View>
                                <View style={CustomStyleSheet.row}>
                                    <Row style={CustomStyleSheet.whiteRow}>
                                        <Col size={3}>
                                            <ComBadrLibelleComp withColor={false}>
                                                {translate('actifsCreation.rondesApparitions.resContrRapService')} *
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={7}>
                                            <TextInput
                                                maxLength={250}
                                                multiline
                                                numberOfLines={8}
                                                value={this.state.currentRondeApparition.resultatControle}

                                                onChangeText={(text) => this.setState(prevState => ({
                                                    currentRondeApparition: {
                                                        ...prevState.currentRondeApparition,
                                                        resultatControle: text,
                                                    }
                                                }))}
                                            />
                                        </Col>
                                    </Row>
                                </View>
                                <View style={CustomStyleSheet.row}>
                                    <Row>
                                        <Col size={10} />
                                        <Col size={50}>
                                            <ComBadrButtonIconComp
                                                onPress={() => this.addRondeApparition()}
                                                icon="check"
                                                style={style.buttonIcon}
                                                loading={this.props.showProgress}
                                                text={translate('transverse.confirmer')}
                                                compact={this.state.modeConsultation}
                                            />
                                        </Col>
                                        <Col size={50}>
                                            <ComBadrButtonIconComp
                                                onPress={() => this.handleClear()}
                                                icon="autorenew"
                                                style={style.buttonIcon}
                                                text={translate('transverse.retablir')}
                                            />
                                        </Col>
                                        <Col size={10} />
                                    </Row>
                                </View>
                            </View>
                        )}
                        <View style={CustomStyleSheet.row}>
                            <ComBasicDataTableComp
                                // ref="_badrTable_789"
                                id="RondesApparitionsTable"
                                rows={this.state.rondesApparitions}
                                //resultArrayMapping={this.props.data}
                                //data={this.props}
                                cols={this.props.consultation ? this.colsConsultation : this.colsEdition}
                                totalElements={this.state.rondesApparitions?.length}
                                maxResultsPerPage={10}
                                paginate={true}
                                showProgress={this.props.showProgress}

                            />
                        </View>
                    </ComAccordionComp>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => ({ ...state.creationActifsReducer });

export default connect(mapStateToProps, null)(ActifsRapportCreationRondesApparitionsTab);





import React from 'react';
import { connect } from 'react-redux';
import { ComAccordionComp, ComBadrButtonIconComp, ComBadrButtonRadioComp, ComBadrCardBoxComp, ComBadrDatePickerComp, ComBadrLibelleComp, ComBasicDataTableComp } from '../../../../../../commons/component';
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import style from '../../style/actifsCreationStyle';
import { Col, Grid, Row } from 'react-native-easy-grid';
import moment from 'moment';
import { ScrollView, Text, View } from 'react-native';
import { CustomStyleSheet, primaryColor } from '../../../../../../commons/styles/ComThemeStyle';
import { Checkbox, RadioButton, TextInput } from 'react-native-paper';


class ActifsRapportCreationPerquisitionTab extends React.Component {

    constructor(props) {
        super(props);

        this.cols = [
            {
                code: 'intervenant.numeroDocumentIndentite',
                libelle: translate('actifsCreation.perquisition.identifiant'),
                width: 200,
            },
            {
                code: 'intervenant.nomIntervenant',
                libelle: translate('actifsCreation.perquisition.nom'),
                width: 200,
            },
            {
                code: 'intervenant.prenomIntervenant',
                libelle: translate('actifsCreation.perquisition.prenom'),
                width: 200,
            },
            {
                code: 'consentement',
                libelle: translate('actifsCreation.perquisition.consentement'),
                width: 200,
            },
        ];
        this.state = {
            gibPerquisition: {},
            modeConsultation: false,
        };
    }

    componentDidMount = () => {
        console.log('********************************************************************************');
        console.log('********************************************************************************');
        console.log(JSON.stringify(this.props.value?.gibPerquisition));
        console.log(JSON.stringify(this.props.consultation));
        console.log('********************************************************************************');
        console.log('********************************************************************************');

        this.setState({
            gibPerquisition: this.props.value?.gibPerquisition,
            modeConsultation: this.props.consultation,
        });
    }

    render() {
        return (
            <ScrollView >
                <View style={CustomStyleSheet.verticalContainer20}>
                    <ComAccordionComp title={translate('actifsCreation.perquisition.title')} expanded={true}>
                        <View>
                            <View style={CustomStyleSheet.row}>
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={false}>
                                            {translate('actifsCreation.perquisition.dateHeureDebut')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={7}>
                                        <ComBadrDatePickerComp
                                            dateFormat="DD/MM/YYYY"
                                            heureFormat="HH:mm"
                                            value={this.state.gibPerquisition?.datePerquisition ? moment(this.state.gibPerquisition?.datePerquisition, 'DD/MM/YYYY', true) : ''}
                                            timeValue={this.state.gibPerquisition?.heurePerquisition ? moment(this.state.gibPerquisition?.heurePerquisition, 'HH:mm', true) : ''}
                                            onDateChanged={(date) => this.setState(prevState => ({
                                                gibPerquisition: {
                                                    ...prevState.gibPerquisition,
                                                    dateDebut: date,
                                                }
                                            }))}
                                            onTimeChanged={(time) => this.setState(prevState => ({
                                                gibPerquisition: {
                                                    ...prevState.gibPerquisition,
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
                                            {translate('actifsCreation.perquisition.lieuPerquisition')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={7}>
                                        <TextInput
                                            disabled={this.props?.consultation}
                                            maxLength={250}
                                            multiline
                                            numberOfLines={2}
                                            value={this.state.gibPerquisition?.lieuPerquisition}
                                            onChangeText={(text) => this.setState(prevState => ({
                                                gibPerquisition: {
                                                    ...prevState.gibPerquisition,
                                                    lieuPerquisition: text,
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
                                            {translate('actifsCreation.perquisition.autoritePerquisition')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={7}>

                                    </Col>
                                </Row>
                            </View>
                            <View style={CustomStyleSheet.row}>
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={false}>
                                            {translate('actifsCreation.perquisition.officierPJ')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={7}>
                                        <Checkbox
                                            color={primaryColor}
                                            status={
                                                this.state.gibPerquisition?.opj
                                                    ? 'checked'
                                                    : 'unchecked'
                                            }
                                            disabled={this.props.consultation}
                                        />
                                    </Col>
                                </Row>
                            </View>
                        </View>
                    </ComAccordionComp>
                    <ComAccordionComp title={translate('actifsCreation.perquisition.personnesConcernees')} expanded={true}>
                        <View style={CustomStyleSheet.row}>
                            <ComBasicDataTableComp
                                id="PerquiTable"
                                rows={this.state.gibPerquisition?.intervenantsVO}
                                cols={this.cols}
                                totalElements={this.state.gibPerquisition?.intervenantsVO?.length}
                                maxResultsPerPage={10}
                                paginate={true}
                                showProgress={this.props.showProgress}

                            />
                        </View>
                    </ComAccordionComp>
                    <ComAccordionComp title={translate('actifsCreation.perquisition.resultatPerquisition')} expanded={true}>
                        <View style={CustomStyleSheet.row}>

                            <RadioButton.Group onValueChange={(text) => this.setState(prevState => ({
                                gibPerquisition: {
                                    ...prevState.gibPerquisition,
                                    resultatPerquisition: text,
                                }
                            }))} value={this.state.gibPerquisition?.resultatPerquisition}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text>{translate('actifsCreation.perquisition.positif')}</Text>
                                        <RadioButton value={true} color={primaryColor} disabled={this.props.consultation} />
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text>{translate('actifsCreation.perquisition.negatif')}</Text>
                                        <RadioButton value={false}  color={primaryColor} disabled={this.props.consultation} />
                                    </View>
                                </View>
                            </RadioButton.Group>
                        </View>
                    </ComAccordionComp>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => ({ ...state.creationActifsReducer });

export default connect(mapStateToProps, null)(ActifsRapportCreationPerquisitionTab);
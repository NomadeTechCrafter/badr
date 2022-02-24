import DateTimePicker from '@react-native-community/datetimepicker';
import _ from 'lodash';
import moment from 'moment';
import { default as React } from 'react';
import { Text, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { IconButton, TextInput } from 'react-native-paper';
import {
    ComBadrPickerCheckerComp, ComBadrAutoCompleteChipsComp, ComBadrCardBoxComp, ComBadrErrorMessageComp, ComBadrInfoMessageComp, ComBadrLibelleComp, ComBadrProgressBarComp, ComContainerComp, ComBadrDatePickerComp, ComBadrItemsPickerComp
} from '../../../../../../commons/component';
import translate from "../../../../../../commons/i18n/ComI18nHelper";
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';
import { unitesMesure } from '../../state/actifsRapportCreationConstants';


class ActifsRapportAvitaillementEntreeMainBlockTodelete extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationAvitaillementEntreeModel: {}// this.props.navigationAvitaillementEntreeModel
        };

    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    reset = () => {
    };

    calculerValeurEcart = () => {
        if (!_.isEmpty(this.state.navigationAvitaillementEntreeModel?.volumeAppReceptionne)
            && !_.isEmpty(this.state.navigationAvitaillementEntreeModel?.volumeAppEnvoye)) {
            const volumeAppEnvoye = _.parseInt(this.state.navigationAvitaillementEntreeModel?.volumeAppEnvoye);
            const volumeAppReceptionne = _.parseInt(this.state.navigationAvitaillementEntreeModel?.volumeAppReceptionne);
            if (volumeAppEnvoye > volumeAppReceptionne) {
                const calculatedEcart = volumeAppEnvoye - volumeAppReceptionne;
                this.state.navigationAvitaillementEntreeModel.valeurEcart = calculatedEcart;
            } else {
                this.state.navigationAvitaillementEntreeModel.valeurEcart = '';
            }
        } else {
            this.state.navigationAvitaillementEntreeModel.valeurEcart = '';
        }
        this.update();
    };

    calculerVolume15Recep = () => {
        if (!_.isEmpty(this.state.navigationAvitaillementEntreeModel?.coeffConvert)
            && !_.isEmpty(this.state.navigationAvitaillementEntreeModel?.volumeAppReceptionne)) {
            const coeffConvert = _.parseInt(this.state.navigationAvitaillementEntreeModel?.coeffConvert);
            const volumeAppReceptionne = _.parseInt(this.state.navigationAvitaillementEntreeModel?.volumeAppReceptionne);
            const calculatedVolume15Recep = coeffConvert * volumeAppReceptionne;
            this.state.navigationAvitaillementEntreeModel.volume15Recep = calculatedVolume15Recep;
        } else {
            this.state.navigationAvitaillementEntreeModel.volume15Recep = '';
        }
        this.update();
    };

    calculerPoidRecep = () => {
        if (!_.isEmpty(this.state.navigationAvitaillementEntreeModel?.densite15)
            && !_.isEmpty(this.state.navigationAvitaillementEntreeModel?.coeffConvert)
            && !_.isEmpty(this.state.navigationAvitaillementEntreeModel?.volumeAppReceptionne)) {
            const coeffConvert = _.parseInt(this.state.navigationAvitaillementEntreeModel?.coeffConvert);
            const densite15 = _.parseInt(this.state.navigationAvitaillementEntreeModel?.densite15);
            const volumeAppReceptionne = _.parseInt(this.state.navigationAvitaillementEntreeModel?.volumeAppReceptionne);
            const calculatedPoidsReceptionne = coeffConvert * densite15 * volumeAppReceptionne;
            this.state.navigationAvitaillementEntreeModel.poidsReceptionne = calculatedPoidsReceptionne;
        } else {
            this.state.navigationAvitaillementEntreeModel.poidsReceptionne = '';
        }
        this.update();
    };

    chercherPersonneConcernee = () => {
        if (!_.isEmpty(this.state.navigationAvitaillementEntreeModel?.numRCFourn)
            && !_.isEmpty(this.state.navigationAvitaillementEntreeModel?.centreRCFourn)) {
            const centreRCFourn = this.state.navigationAvitaillementEntreeModel?.centreRCFourn;
            const numRCFourn = this.state.navigationAvitaillementEntreeModel?.numRCFourn;
            const raisonSocialeFourn = centreRCFourn + ' test ' + numRCFourn;
            this.state.navigationAvitaillementEntreeModel.raisonSocialeFourn = raisonSocialeFourn;
        } else {
            this.state.navigationAvitaillementEntreeModel.raisonSocialeFourn = '';
        }
        this.update();
    };


    update() {
        // if (this.state.navigationAvitaillementEntreeModel && this.props.update) {
            this.props.update(this.state.navigationAvitaillementEntreeModel);
        // }
    }

    


    render() {
        return (
            // <ComAccordionComp title={translate('actifsCreation.avitaillementEntree.main.title')} expanded={true}>
            <View style={[CustomStyleSheet.fullContainer, { marginTop: -60 }]}>
                <ComContainerComp>
                    {this.props.showProgress && (
                        <ComBadrProgressBarComp width={screenHeight} />
                    )}
                    {this.props.errorMessage != null && (
                        <ComBadrErrorMessageComp message={this.props.errorMessage} />
                    )}
                    {this.props.successMessage != null && (
                        <ComBadrInfoMessageComp message={this.props.successMessage} />
                    )}
                    {/* Référence déclaration */}
                    <ComBadrCardBoxComp noPadding={true}>
                        <Grid>
                            { /*first Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={4}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.refDum')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={6}>
                                    <ComBadrLibelleComp>
                                        3090102021000015
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={2} />
                                <Col size={4}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.dateEnregistrementDum')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={4}>
                                    <ComBadrLibelleComp>
                                        11/10/2021 10:00
                                    </ComBadrLibelleComp>
                                </Col>
                            </Row>


                            {/*second Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={1} style={{ padding: 5 }}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.numeroAquis')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={1}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                        placeholder={translate('actifsCreation.avitaillementEntree.DUM.bureau')}
                                    // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    // this.setState({
                                    //     navigationAvitaillementEntreeModel: {
                                    //         ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                    //     }
                                    // });
                                    // this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
                                    // this.props.update(this.state.navigationAvitaillementEntreeModel);
                                    // }}
                                    />
                                </Col>
                                <Col size={1}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                        placeholder={translate('actifsCreation.avitaillementEntree.DUM.regime')}
                                    // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementEntreeModel: {
                                    //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
                                    //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                    // }}
                                    />
                                </Col>
                                <Col size={1}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                        placeholder={translate('actifsCreation.avitaillementEntree.DUM.annee')}
                                    // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementEntreeModel: {
                                    //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
                                    //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                    // }}
                                    />
                                </Col>
                                <Col size={2}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                        placeholder={translate('actifsCreation.avitaillementEntree.DUM.serie')}
                                    // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementEntreeModel: {
                                    //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
                                    //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                    // }}
                                    />
                                </Col>
                                <Col size={1}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                        placeholder={translate('actifsCreation.avitaillementEntree.DUM.cle')}
                                    // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementEntreeModel: {
                                    //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
                                    //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                    // }}
                                    />
                                </Col>
                            </Row>

                            {/*third Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.dateEnregistrementAcquis')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={6}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={true}
                                        style={{ height: 20, fontSize: 12 }}
                                        // value={moment(this.state.navigationMaritimeModel.dateEntree).format('DD/MM/YYYY')}
                                        multiline={true}
                                        numberOfLines={1}
                                    />
                                    {this.state.showDateEntree && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            // value={this.state.navigationMaritimeModel.dateEntree}
                                            mode="date"
                                            is24Hour={true}
                                            display="default"
                                        // onChange={this.onDateEntreeChange}
                                        />
                                    )}
                                </Col>
                                <Col size={2} style={{ paddingTop: 5 }}>
                                    {!this.props.readOnly && (<IconButton
                                        icon="calendar"
                                    // onPress={() => {
                                    //     this.setState({ showDateEntree: true });
                                    // }}
                                    />)}
                                </Col>
                            </Row>

                            {/*fourth Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.bonLivraison')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                        value={this.state.navigationAvitaillementEntreeModel.numBonLivraison}
                                        onChangeText={(text) => {
                                            this.setState({
                                                navigationAvitaillementEntreeModel: {
                                                    ...this.state.navigationAvitaillementEntreeModel, numBonLivraison: text
                                                }
                                            });
                                            this.update();
                                        }}
                                    />
                                </Col>
                                <Col size={2}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.dateLivraison')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={4}>
                                    <ComBadrDatePickerComp
                                        dateFormat="DD/MM/YYYY"
                                        heureFormat="HH:mm"
                                        value={this.state.navigationAvitaillementEntreeModel.dateLivraison ? moment(this.state.navigationAvitaillementEntreeModel.dateLivraison, 'DD/MM/YYYY', true) : ''}
                                        timeValue={this.state.navigationAvitaillementEntreeModel.heureLivraison ? moment(this.state.navigationAvitaillementEntreeModel.heureLivraison, 'HH:mm', true) : ''}

                                        onDateChanged={(date) => {
                                            this.setState({
                                                navigationAvitaillementEntreeModel: {
                                                    ...this.state.navigationAvitaillementEntreeModel, dateLivraison: date
                                                }
                                            });
                                            this.update();
                                        }}

                                        onTimeChanged={(time) => {
                                            this.setState({
                                                navigationAvitaillementEntreeModel: {
                                                    ...this.state.navigationAvitaillementEntreeModel, heureLivraison: time
                                                }
                                            });
                                            this.update();
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.immatriculationCamion')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                        value={this.state.navigationAvitaillementEntreeModel.immatriculationCamion}
                                        onChangeText={(text) => {
                                            this.setState({
                                                navigationAvitaillementEntreeModel: {
                                                    ...this.state.navigationAvitaillementEntreeModel, immatriculationCamion: text
                                                }
                                            });
                                            this.update();
                                        }}
                                    />
                                </Col>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.immatriculationCiterne')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                        value={this.state.navigationAvitaillementEntreeModel.immatriculationCiterne}
                                        onChangeText={(text) => {
                                            this.setState({
                                                navigationAvitaillementEntreeModel: {
                                                    ...this.state.navigationAvitaillementEntreeModel, immatriculationCiterne: text
                                                }
                                            });
                                            this.update();
                                        }}
                                    />
                                </Col>
                            </Row>

                            {/*seventh Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.numeroRCFournisseur')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                        value={this.state.navigationAvitaillementEntreeModel.numRCFourn}
                                        onChangeText={(text) => {
                                            this.setState({
                                                navigationAvitaillementEntreeModel: {
                                                    ...this.state.navigationAvitaillementEntreeModel, numRCFourn: text
                                                }
                                            });
                                            this.update();
                                        }}
                                        onEndEditing={(event) => {
                                            this.chercherPersonneConcernee();
                                        }}
                                    />
                                </Col>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.centreRCFournisseur')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                        value={this.state.navigationAvitaillementEntreeModel.centreRCFourn}
                                        onChangeText={(text) => {
                                            this.setState({
                                                navigationAvitaillementEntreeModel: {
                                                    ...this.state.navigationAvitaillementEntreeModel, centreRCFourn: text
                                                }
                                            });
                                            this.update();
                                        }}
                                        onEndEditing={(event) => {
                                            this.chercherPersonneConcernee();
                                        }}
                                    />
                                </Col>
                            </Row>

                            {/*eight Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <Row>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.raisonSocialeFournisseur')}
                                        </ComBadrLibelleComp>
                                    </Row>
                                </Col>
                                <Col size={9}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={true}
                                        style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                                        value={this.state.navigationAvitaillementEntreeModel.raisonSocialeFourn}
                                        multiline={true}
                                        numberOfLines={10}
                                    />
                                </Col>
                            </Row>

                            {/*nine Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.natureProduit')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3} style={{ paddingRight: 5 }}>
                                    <ComBadrCardBoxComp>
                                        <ComBadrPickerCheckerComp
                                            onRef={(ref) => (this.refTypesIncidents = ref)}
                                            key={'code'}
                                            title={translate('actifsCreation.avitaillementEntree.main.natureProduit')}
                                            titleStyle={CustomStyleSheet.badrPickerTitle}
                                            style={{ flex: 1 }}
                                            cle="code"
                                            libelle="libelle"
                                            module="GIB"
                                            command={'getTypesIncident'}
                                            onValueChange={(selectedValue, selectedIndex) => {
                                                console.log("selectedValue", selectedValue);
                                                this.setState({ typeIncident: selectedValue }, () => this.updateModele());
                                            }}
                                            param={this.state.natureIncident}
                                            typeService="SP"
                                            onConfirm={this.handleOnConfirmIncidentType}
                                            onSelectedItemObjectsChange={
                                                this.handleOnIncidentItemsChanged
                                            }
                                        />
                                    </ComBadrCardBoxComp>
                                </Col>
                                <Col size={3} />
                                <Col size={3} />
                            </Row>

                            {/*ten Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.dateReception')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={4} >
                                    <ComBadrDatePickerComp
                                        dateFormat="DD/MM/YYYY"
                                        heureFormat="HH:mm"
                                        value={this.state.navigationAvitaillementEntreeModel.dateReception ? moment(this.state.navigationAvitaillementEntreeModel.dateReception, 'DD/MM/YYYY', true) : ''}
                                        timeValue={this.state.navigationAvitaillementEntreeModel.heureReception ? moment(this.state.navigationAvitaillementEntreeModel.heureReception, 'HH:mm', true) : ''}

                                        onDateChanged={(date) => {
                                            this.setState({
                                                navigationAvitaillementEntreeModel: {
                                                    ...this.state.navigationAvitaillementEntreeModel, dateReception: date
                                                }
                                            });
                                            this.update();
                                        }}

                                        onTimeChanged={(time) => {
                                            this.setState({
                                                navigationAvitaillementEntreeModel: {
                                                    ...this.state.navigationAvitaillementEntreeModel, heureReception: time
                                                }
                                            });
                                            this.update();
                                        }}
                                    />
                                </Col>
                                <Col size={5} />
                            </Row>

                            {/*eleven Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.quantiteReceptionne')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                        value={this.state.navigationAvitaillementEntreeModel.quantiteReceptionne}
                                        keyboardType={'number-pad'}
                                        onChangeText={(text) => {
                                            this.setState({
                                                navigationAvitaillementEntreeModel: {
                                                    ...this.state.navigationAvitaillementEntreeModel, quantiteReceptionne: text
                                                }
                                            });
                                            this.update();
                                        }}
                                    />
                                </Col>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.uniteMesure')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3} style={{ paddingRight: 5 }}>
                                    <ComBadrItemsPickerComp
                                        // style={CustomStyleSheet.column}
                                        label={translate('actifsCreation.avitaillementEntree.main.uniteMesure')}
                                        disabled={this.props.readOnly}
                                        selectedValue={this.state.navigationAvitaillementEntreeModel.uniteMesure ? this.state.navigationAvitaillementEntreeModel.uniteMesure : ''}
                                        items={unitesMesure}
                                        onValueChanged={(selectedValue) => {
                                            this.setState({
                                                navigationAvitaillementEntreeModel: {
                                                    ...this.state.navigationAvitaillementEntreeModel, uniteMesure: selectedValue
                                                }
                                            });
                                            this.update();
                                        }}
                                    />
                                </Col>
                            </Row>

                            {/*thirteen Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.volumentApparentEnvoye')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                        keyboardType={'number-pad'}
                                        onEndEditing={(event) => this.calculerValeurEcart()}
                                        value={this.state.navigationAvitaillementEntreeModel.volumeAppEnvoye}
                                        onChangeText={(text) => {
                                            this.setState({
                                                navigationAvitaillementEntreeModel: {
                                                    ...this.state.navigationAvitaillementEntreeModel, volumeAppEnvoye: text
                                                }
                                            });
                                            this.update();
                                        }}
                                    />
                                </Col>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.volumentApparentReceptionne')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                        keyboardType={'number-pad'}
                                        onEndEditing={(event) => {
                                            this.calculerValeurEcart();
                                            this.calculerVolume15Recep();
                                            this.calculerPoidRecep();
                                        }}
                                        value={this.state.navigationAvitaillementEntreeModel.volumeAppReceptionne}
                                        onChangeText={(text) => {
                                            this.setState({
                                                navigationAvitaillementEntreeModel: {
                                                    ...this.state.navigationAvitaillementEntreeModel, volumeAppReceptionne: text
                                                }
                                            });
                                            this.update();
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.coefficientConvertion')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                        value={this.state.navigationAvitaillementEntreeModel.coeffConvert}
                                        keyboardType={'number-pad'}
                                        onChangeText={(text) => {
                                            this.setState({
                                                navigationAvitaillementEntreeModel: {
                                                    ...this.state.navigationAvitaillementEntreeModel, coeffConvert: text
                                                }
                                            });
                                            this.update();
                                        }}
                                        onEndEditing={(event) => {
                                            this.calculerVolume15Recep();
                                            this.calculerPoidRecep();
                                        }}
                                    />
                                </Col>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.volumeA15')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3}>
                                    <ComBadrLibelleComp >
                                        {this.state.navigationAvitaillementEntreeModel?.volume15Recep}
                                    </ComBadrLibelleComp>
                                    {/* <TextInput
                                        mode={'outlined'}
                                        disabled={true}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                        value={this.state.navigationAvitaillementEntreeModel?.volume15Recep}
                                    /> */}
                                </Col>
                            </Row>

                            {/*fifteen Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.densiteA15')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                        keyboardType={'number-pad'}
                                        value={this.state.navigationAvitaillementEntreeModel.densite15}
                                        onChangeText={(text) => {
                                            this.setState({
                                                navigationAvitaillementEntreeModel: {
                                                    ...this.state.navigationAvitaillementEntreeModel, densite15: text
                                                }
                                            });
                                            this.update();
                                        }}
                                        onEndEditing={(event) => {
                                            this.calculerPoidRecep();
                                        }}
                                    />
                                </Col>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.poidsReceptione')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3}>
                                    <ComBadrLibelleComp >
                                        {this.state.navigationAvitaillementEntreeModel?.poidsReceptionne}
                                    </ComBadrLibelleComp>
                                    {/* <TextInput
                                        mode={'outlined'}
                                        disabled={true}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                        value={this.state.navigationAvitaillementEntreeModel.poidsReceptione}
                                    /> */}
                                </Col>
                            </Row>

                            {/*sixteen Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.temperature')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                        value={this.state.navigationAvitaillementEntreeModel.temperature}
                                        onChangeText={(text) => {
                                            this.setState({
                                                navigationAvitaillementEntreeModel: {
                                                    ...this.state.navigationAvitaillementEntreeModel, temperature: text
                                                }
                                            });
                                            this.update();
                                        }}
                                    />
                                </Col>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.ecart')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3}>
                                    <ComBadrLibelleComp>
                                        {this.state.navigationAvitaillementEntreeModel?.valeurEcart}
                                    </ComBadrLibelleComp>
                                    {/* <TextInput
                                        mode={'outlined'}
                                        disabled={true}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                        value={this.state.navigationAvitaillementEntreeModel?.valeurEcart ? this.state.navigationAvitaillementEntreeModel?.valeurEcart : '35'}
                                    /> */}
                                </Col>
                            </Row>


                            {/*seventeen Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <Row>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.observations')}
                                        </ComBadrLibelleComp>
                                    </Row>
                                </Col>
                                <Col size={9}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                                        value={this.state.navigationAvitaillementEntreeModel?.observations}
                                        multiline={true}
                                        numberOfLines={10}
                                        onChangeText={(text) => {
                                            this.setState({
                                                navigationAvitaillementEntreeModel: {
                                                    ...this.state.navigationAvitaillementEntreeModel, observations: text
                                                }
                                            });
                                            this.update();
                                        }}
                                    />
                                </Col>
                            </Row>

                        </Grid>
                    </ComBadrCardBoxComp>


                </ComContainerComp>
            </View>


            // </ComAccordionComp>

        );
    }
}






export default ActifsRapportAvitaillementEntreeMainBlockTodelete;




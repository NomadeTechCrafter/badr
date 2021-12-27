import DateTimePicker from '@react-native-community/datetimepicker';
import _ from 'lodash';
import moment from 'moment';
import { default as React } from 'react';
import { Text, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { IconButton, TextInput } from 'react-native-paper';
import {
    ComBadrPickerCheckerComp, ComBadrAutoCompleteChipsComp, ComBadrCardBoxComp, ComBadrErrorMessageComp, ComBadrInfoMessageComp, ComBadrLibelleComp, ComBadrProgressBarComp, ComContainerComp
} from '../../../../../../commons/component';
import translate from "../../../../../../commons/i18n/ComI18nHelper";
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';






class ActifsRapportAvitaillementEntreeMainBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationAvitaillementEntreeModel: this.props.navigationAvitaillementEntreeModel,
            index: this.props.index,
            showDateEntree: false,
            showHeureEntree: false,
            heureEntreeTech: this.props.navigationAvitaillementEntreeModel ? this.props.navigationAvitaillementEntreeModel.heureEntree : new Date(),
            acProvenance: this.props.navigationAvitaillementEntreeModel ? this.props.navigationAvitaillementEntreeModel.provenance.nomPays : '',
            showDateDepart: false,
            showHeureDepart: false,
            heureDepartTech: this.props.navigationAvitaillementEntreeModel ? this.props.navigationAvitaillementEntreeModel.heureDepart : new Date(),
            acDestination: this.props.navigationAvitaillementEntreeModel ? this.props.navigationAvitaillementEntreeModel.destination.nomPays : '',

        };

    }


    componentDidMount() {

    }



    componentWillUnmount() {
    }



    reset = () => {
    };




   static getDerivedStateFromProps(props, state) {

        if (
            props.navigationAvitaillementEntreeModel && props.index !== state.index
        ) {
            return {
                navigationAvitaillementEntreeModel: props.navigationAvitaillementEntreeModel,// update the value of specific key
                index: props.index,
                heureEntreeTech: props.navigationAvitaillementEntreeModel.heureEntree
            };
        }
        // Return null to indicate no change to state.
        return null;
    }
 





    onDateEntreeChange = (event, selectedDate) => {
        this.setState({
            navigationAvitaillementEntreeModel: {
                ...this.state.navigationAvitaillementEntreeModel,
                dateEntree: event.nativeEvent.timestamp,
            }, showDateEntree: false


        },);
        this.state.navigationAvitaillementEntreeModel.dateEntree = event.nativeEvent.timestamp;
        this.props.update(this.state.navigationAvitaillementEntreeModel);
    }
    onHeureEntreeChange = (event, selectedHeure) => {
        this.setState({
            navigationAvitaillementEntreeModel: {
                ...this.state.navigationAvitaillementEntreeModel,
                heureEntree: moment(selectedHeure).format('HH:mm').toString(),
            }, showHeureEntree: false, heureEntreeTech: event.nativeEvent.timestamp


        });
        this.state.navigationAvitaillementEntreeModel.heureEntree = moment(selectedHeure).format('HH:mm').toString();
        this.props.update(this.state.navigationAvitaillementEntreeModel);
        
    }

    onDateDepartChange = (event, selectedDate) => {
        this.setState({
            navigationAvitaillementEntreeModel: {
                ...this.state.navigationAvitaillementEntreeModel,
                dateDepart: event.nativeEvent.timestamp,
            }, showDateDepart: false


        });
        this.state.navigationAvitaillementEntreeModel.dateDepart = event.nativeEvent.timestamp;
        this.props.update(this.state.navigationAvitaillementEntreeModel);
    }
    onHeureDepartChange = (event, selectedHeure) => {
        this.setState({
            navigationAvitaillementEntreeModel: {
                ...this.state.navigationAvitaillementEntreeModel,
                heureDepart: moment(selectedHeure).format('HH:mm').toString(),
            }, showHeureDepart: false, heureDepartTech: event.nativeEvent.timestamp
        });
        this.state.navigationAvitaillementEntreeModel.heureDepart = moment(selectedHeure).format('HH:mm').toString();
        this.props.update(this.state.navigationAvitaillementEntreeModel);
       
    }





    showMode = (currentMode) => {
        this.setState({ show: true, mode: currentMode });
    };

    showDatepicker = () => {
        this.showMode('date');
    };

    showTimepicker = () => {
        this.showMode('time');
    };

    handleProvenanceChanged = (pays) => {
        this.setState({
            acProvenance: pays.libelle, navigationAvitaillementEntreeModel: {
                ...this.state.navigationAvitaillementEntreeModel,
                provenance: { codePays: pays.code, nomPays: pays.libelle }
            }
        });
        this.state.navigationAvitaillementEntreeModel.provenance = { codePays: pays.code, nomPays: pays.libelle };
        this.props.update(this.state.navigationAvitaillementEntreeModel)
    }

    handleDestinationChanged = (pays) => {
        this.setState({
            acDestination: pays.libelle, navigationAvitaillementEntreeModel: {
                ...this.state.navigationAvitaillementEntreeModel,
                destination: { codePays: pays.code, nomPays: pays.libelle }
            }
        });
        this.state.navigationAvitaillementEntreeModel.destination = { codePays: pays.code, nomPays: pays.libelle };
        this.props.update(this.state.navigationAvitaillementEntreeModel)


    }




    render() {
    
        return (

            // <ComAccordionComp title={translate('actifsCreation.avitaillementEntree.main.title')} expanded={true}>

                <View style={[CustomStyleSheet.fullContainer, {marginTop : -60}]}>
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
                                <Col size={8}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
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
                            
                            {/*fifth Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.dateLivraison')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={4}>
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
                                <Col size={1} style={{ paddingTop: 5 }}>
                                    {!this.props.readOnly && (<IconButton
                                        icon="calendar"
                                        // onPress={() => {
                                        //     this.setState({ showDateEntree: true });

                                        // }}
                                    />)}
                                </Col>
                                <Col size={2}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, alignSelf: 'center', padding: 15 }}
                                        // value={this.state.navigationMaritimeModel.heureEntree}
                                        // onFocus={() => {
                                        //     this.setState({ showHeureEntree: true });
                                        // }}
                                        multiline={false}
                                        numberOfLines={1}
                                        // onChangeText={(text) => {
                                        //     this.setState({
                                        //         navigationMaritimeModel: {
                                        //             ...this.state.navigationMaritimeModel,
                                        //             heureEntree: text,
                                        //         }
                                        //     });
                                        //     this.state.navigationMaritimeModel.heureEntree = text;
                                        //     this.props.update(this.state.navigationMaritimeModel);
                                        // }}
                                    />
                                    {this.state.showHeureEntree && (
                                        <DateTimePicker
                                            style={{ width: '100%' }}
                                            // value={this.state.heureEntreeTech}
                                            mode="time"
                                            is24Hour={true}
                                            display="default"
                                            // onChange={this.onHeureEntreeChange}
                                        />
                                    )}
                                </Col>
                                <Col size={1} style={{ paddingTop: 5 }}>
                                    <Text style={{ fontSize: 12 }}>
                                        {translate('actifsCreation.entete.uniteHeure')}
                                    </Text>
                                </Col>
                            </Row>


                            {/*sixth Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.immatriculationCamion')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={2}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
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
                                <Col size={4}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.immatriculationCiterne')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={2}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
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

                            {/*seventh Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.numeroRCFournisseur')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={2}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
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
                                <Col size={4}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.centreRCFournisseur')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={2}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
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

                            {/*eight Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <Row>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.raisonSocialeFournisseur')}
                                        </ComBadrLibelleComp>
                                    </Row>
                                </Col>
                                <Col size={8}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                                        // value={this.state.navigationAvitaillementEntreeModel.portEntree}
                                        multiline={true}
                                        numberOfLines={10}
                                        // onChangeText={(text) => {
                                        //     this.setState({
                                        //         navigationAvitaillementEntreeModel: {
                                        //             ...this.state.navigationAvitaillementEntreeModel, portEntree: text
                                        //         }
                                        //     });
                                        //     this.state.navigationAvitaillementEntreeModel.portEntree = text;
                                        //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                        // }}
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
                                <Col size={8} style={{ paddingRight: 5 }}>
                                    <Row>
                                        <Col size={10}>
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
                                    </Row>
                                </Col>
                            </Row>

                            {/*ten Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.dateReception')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={1}>
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
                                <Col size={1} style={{ paddingTop: 5 }}>
                                    {!this.props.readOnly && (<IconButton
                                        icon="calendar"
                                        // onPress={() => {
                                        //     this.setState({ showDateEntree: true });

                                        // }}
                                    />)}
                                </Col>
                                <Col size={2}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.heureReception')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, alignSelf: 'center', padding: 15 }}
                                        // value={this.state.navigationMaritimeModel.heureEntree}
                                        // onFocus={() => {
                                        //     this.setState({ showHeureEntree: true });
                                        // }}
                                        multiline={false}
                                        numberOfLines={1}
                                        // onChangeText={(text) => {
                                        //     this.setState({
                                        //         navigationMaritimeModel: {
                                        //             ...this.state.navigationMaritimeModel,
                                        //             heureEntree: text,
                                        //         }
                                        //     });
                                        //     this.state.navigationMaritimeModel.heureEntree = text;
                                        //     this.props.update(this.state.navigationMaritimeModel);
                                        // }}
                                    />
                                    {this.state.showHeureEntree && (
                                        <DateTimePicker
                                            style={{ width: '100%' }}
                                            // value={this.state.heureEntreeTech}
                                            mode="time"
                                            is24Hour={true}
                                            display="default"
                                            // onChange={this.onHeureEntreeChange}
                                        />
                                    )}
                                </Col>
                                <Col size={1} style={{ paddingTop: 5 }}>
                                    <Text style={{ fontSize: 12 }}>
                                        {translate('actifsCreation.entete.uniteHeure')}
                                    </Text>
                                </Col>
                            </Row>

                            {/*eleven Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.quantiteReceptione')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={8}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
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

                            {/*twelve Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.uniteMesure')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={8} style={{ paddingRight: 5 }}>
                                    <Row>
                                        <Col size={10}>
                                            <ComBadrCardBoxComp>
                                                <ComBadrPickerCheckerComp
                                                    onRef={(ref) => (this.refTypesIncidents = ref)}
                                                    key={'code'}
                                                    title={translate('actifsCreation.avitaillementEntree.main.uniteMesure')}
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
                                    </Row>
                                </Col>
                            </Row>

                            {/*thirteen Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.volumentApparentEnvoye')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={2}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
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
                                <Col size={4}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.volumentApparentReceptionne')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={2}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
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

                            {/*fourteen Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.coefficientConvertion')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={2}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
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
                                <Col size={4}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.volumeA15')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={2}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
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

                            {/*fifteen Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.densiteA15')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={2}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
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
                                <Col size={4}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.poidsReceptione')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={2}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
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

                            {/*sixteen Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.temperature')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={2}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
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
                                <Col size={4}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.ecart')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={2}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
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


                            {/*seventeen Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <Row>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.observations')}
                                        </ComBadrLibelleComp>
                                    </Row>
                                </Col>
                                <Col size={8}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                                        // value={this.state.navigationAvitaillementEntreeModel.portEntree}
                                        multiline={true}
                                        numberOfLines={10}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementEntreeModel: {
                                    //             ...this.state.navigationAvitaillementEntreeModel, portEntree: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementEntreeModel.portEntree = text;
                                    //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                    // }}
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






export default ActifsRapportAvitaillementEntreeMainBlock;




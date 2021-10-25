import DateTimePicker from '@react-native-community/datetimepicker';
import _ from 'lodash';
import moment from 'moment';
import { default as React } from 'react';
import { Text, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { IconButton, TextInput, RadioButton } from 'react-native-paper';
import {
    ComBadrPickerCheckerComp, ComBadrAutoCompleteChipsComp, ComBadrCardBoxComp, ComBadrErrorMessageComp, ComBadrInfoMessageComp, ComBadrLibelleComp, ComBadrProgressBarComp, ComContainerComp
} from '../../../../../../commons/component';
import translate from "../../../../../../commons/i18n/ComI18nHelper";
import { CustomStyleSheet, primaryColor } from '../../../../../../commons/styles/ComThemeStyle';






class ActifsRapportAvitaillementSortieMainBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationAvitaillementSortieModel: this.props.navigationAvitaillementSortieModel,
            index: this.props.index,
            showDateSortie: false,
            showHeureSortie: false,
            heureSortieTech: this.props.navigationAvitaillementSortieModel ? this.props.navigationAvitaillementSortieModel.heureSortie : new Date(),
            acProvenance: this.props.navigationAvitaillementSortieModel ? this.props.navigationAvitaillementSortieModel.provenance.nomPays : '',
            showDateDepart: false,
            showHeureDepart: false,
            heureDepartTech: this.props.navigationAvitaillementSortieModel ? this.props.navigationAvitaillementSortieModel.heureDepart : new Date(),
            acDestination: this.props.navigationAvitaillementSortieModel ? this.props.navigationAvitaillementSortieModel.destination.nomPays : '',
            typeAvitaillement : '01'
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
            props.navigationAvitaillementSortieModel && props.index !== state.index
        ) {
            return {
                navigationAvitaillementSortieModel: props.navigationAvitaillementSortieModel,// update the value of specific key
                index: props.index,
                heureSortieTech: props.navigationAvitaillementSortieModel.heureSortie
            };
        }
        // Return null to indicate no change to state.
        return null;
    }
 





    onDateSortieChange = (event, selectedDate) => {
        this.setState({
            navigationAvitaillementSortieModel: {
                ...this.state.navigationAvitaillementSortieModel,
                dateSortie: event.nativeEvent.timestamp,
            }, showDateSortie: false


        },);
        this.state.navigationAvitaillementSortieModel.dateSortie = event.nativeEvent.timestamp;
        this.props.update(this.state.navigationAvitaillementSortieModel);
    }
    onHeureSortieChange = (event, selectedHeure) => {
        this.setState({
            navigationAvitaillementSortieModel: {
                ...this.state.navigationAvitaillementSortieModel,
                heureSortie: moment(selectedHeure).format('HH:mm').toString(),
            }, showHeureSortie: false, heureSortieTech: event.nativeEvent.timestamp


        });
        this.state.navigationAvitaillementSortieModel.heureSortie = moment(selectedHeure).format('HH:mm').toString();
        this.props.update(this.state.navigationAvitaillementSortieModel);
        
    }

    onDateDepartChange = (event, selectedDate) => {
        this.setState({
            navigationAvitaillementSortieModel: {
                ...this.state.navigationAvitaillementSortieModel,
                dateDepart: event.nativeEvent.timestamp,
            }, showDateDepart: false


        });
        this.state.navigationAvitaillementSortieModel.dateDepart = event.nativeEvent.timestamp;
        this.props.update(this.state.navigationAvitaillementSortieModel);
    }
    onHeureDepartChange = (event, selectedHeure) => {
        this.setState({
            navigationAvitaillementSortieModel: {
                ...this.state.navigationAvitaillementSortieModel,
                heureDepart: moment(selectedHeure).format('HH:mm').toString(),
            }, showHeureDepart: false, heureDepartTech: event.nativeEvent.timestamp


        });
        this.state.navigationAvitaillementSortieModel.heureDepart = moment(selectedHeure).format('HH:mm').toString();
        this.props.update(this.state.navigationAvitaillementSortieModel);
       
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
            acProvenance: pays.libelle, navigationAvitaillementSortieModel: {
                ...this.state.navigationAvitaillementSortieModel,
                provenance: { codePays: pays.code, nomPays: pays.libelle }
            }
        });
        this.state.navigationAvitaillementSortieModel.provenance = { codePays: pays.code, nomPays: pays.libelle };
        this.props.update(this.state.navigationAvitaillementSortieModel)
    }

    handleDestinationChanged = (pays) => {
        this.setState({
            acDestination: pays.libelle, navigationAvitaillementSortieModel: {
                ...this.state.navigationAvitaillementSortieModel,
                destination: { codePays: pays.code, nomPays: pays.libelle }
            }
        });
        this.state.navigationAvitaillementSortieModel.destination = { codePays: pays.code, nomPays: pays.libelle };
        this.props.update(this.state.navigationAvitaillementSortieModel)


    }




    render() {
    
        return (

            // <ComAccordionComp title={translate('actifsCreation.avitaillementSortie.main.title')} expanded={true}>

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
                            {/*first Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementSortie.main.bonLivraison')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={8}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                        // value={this.state.navigationAvitaillementSortieModel.villeProvenance}
                                        // onChangeText={(text) => {
                                        //     this.setState({
                                        //         navigationAvitaillementSortieModel: {
                                        //             ...this.state.navigationAvitaillementSortieModel, villeProvenance: text
                                        //         }
                                        //     });
                                        //     this.state.navigationAvitaillementSortieModel.villeProvenance = text;
                                        //     this.props.update(this.state.navigationAvitaillementSortieModel);
                                        // }}
                                    />
                                </Col>
                            </Row>
                            
                            {/*second Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementSortie.main.dateLivraison')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={4}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={true}
                                        style={{ height: 20, fontSize: 12 }}
                                        // value={moment(this.state.navigationMaritimeModel.dateSortie).format('DD/MM/YYYY')}
                                        multiline={true}
                                        numberOfLines={1}
                                    />
                                    {this.state.showDateSortie && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            // value={this.state.navigationMaritimeModel.dateSortie}
                                            mode="date"
                                            is24Hour={true}
                                            display="default"
                                            // onChange={this.onDateSortieChange}
                                        />
                                    )}
                                </Col>
                                <Col size={1} style={{ paddingTop: 5 }}>
                                    {!this.props.readOnly && (<IconButton
                                        icon="calendar"
                                        // onPress={() => {
                                        //     this.setState({ showDateSortie: true });

                                        // }}
                                    />)}
                                </Col>
                                <Col size={2}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, alignSelf: 'center', padding: 15 }}
                                        // value={this.state.navigationMaritimeModel.heureSortie}
                                        // onFocus={() => {
                                        //     this.setState({ showHeureSortie: true });
                                        // }}
                                        multiline={false}
                                        numberOfLines={1}
                                        // onChangeText={(text) => {
                                        //     this.setState({
                                        //         navigationMaritimeModel: {
                                        //             ...this.state.navigationMaritimeModel,
                                        //             heureSortie: text,
                                        //         }
                                        //     });
                                        //     this.state.navigationMaritimeModel.heureSortie = text;
                                        //     this.props.update(this.state.navigationMaritimeModel);
                                        // }}
                                    />
                                    {this.state.showHeureSortie && (
                                        <DateTimePicker
                                            style={{ width: '100%' }}
                                            // value={this.state.heureSortieTech}
                                            mode="time"
                                            is24Hour={true}
                                            display="default"
                                            // onChange={this.onHeureSortieChange}
                                        />
                                    )}
                                </Col>
                                <Col size={1} style={{ paddingTop: 5 }}>
                                    <Text style={{ fontSize: 12 }}>
                                        {translate('actifsCreation.entete.uniteHeure')}
                                    </Text>
                                </Col>
                            </Row>

                            {/*third Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={1} style={{ padding: 5 }}>
                                </Col>
                                <Col size={6}>
                                    <RadioButton.Group onValueChange={newValue => this.setState({ typeAvitaillement: newValue })} value={this.state.typeAvitaillement}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text>{translate('actifsCreation.avitaillementSortie.embarcations')}</Text>
                                                <RadioButton value="01" color={primaryColor} />
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text>{translate('actifsCreation.avitaillementSortie.aeronefs')}</Text>
                                                <RadioButton value="02" color={primaryColor} />
                                            </View>
                                        </View>
                                    </RadioButton.Group>
                                </Col>
                            </Row>

                            {/*fourth Row*/}
                            {(this.state.typeAvitaillement == '01') &&
                                (<Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementSortie.main.compagnieAerienne')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={8} style={{ paddingRight: 5 }}>
                                        <Row>
                                            <Col size={10}>
                                                <ComBadrCardBoxComp>
                                                    <ComBadrPickerCheckerComp
                                                        onRef={(ref) => (this.refTypesIncidents = ref)}
                                                        key={'code'}
                                                        title={translate('actifsCreation.avitaillementSortie.main.compagnieAerienne')}
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
                                </Row>)}
                            
                            {(this.state.typeAvitaillement == '02') &&
                                (<Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementSortie.main.bateau')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={8} style={{ paddingRight: 5 }}>
                                        <Row>
                                            <Col size={10}>
                                                <ComBadrCardBoxComp>
                                                    <ComBadrPickerCheckerComp
                                                        onRef={(ref) => (this.refTypesIncidents = ref)}
                                                        key={'code'}
                                                        title={translate('actifsCreation.avitaillementSortie.main.bateau')}
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
                                </Row>)}
                            
                            {/*fifth Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementSortie.main.natureProduit')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={8} style={{ paddingRight: 5 }}>
                                    <Row>
                                        <Col size={10}>
                                            <ComBadrCardBoxComp>
                                                <ComBadrPickerCheckerComp
                                                    onRef={(ref) => (this.refTypesIncidents = ref)}
                                                    key={'code'}
                                                    title={translate('actifsCreation.avitaillementSortie.main.natureProduit')}
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


                            {/*sixth Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementSortie.main.numCarte')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={8}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                    // value={this.state.navigationAvitaillementSortieModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementSortieModel: {
                                    //             ...this.state.navigationAvitaillementSortieModel, villeProvenance: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementSortieModel.villeProvenance = text;
                                    //     this.props.update(this.state.navigationAvitaillementSortieModel);
                                    // }}
                                    />
                                </Col>
                            </Row>

                            {/*seventh Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementSortie.main.compteurAvant')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={8}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                    // value={this.state.navigationAvitaillementSortieModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementSortieModel: {
                                    //             ...this.state.navigationAvitaillementSortieModel, villeProvenance: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementSortieModel.villeProvenance = text;
                                    //     this.props.update(this.state.navigationAvitaillementSortieModel);
                                    // }}
                                    />
                                </Col>
                            </Row>

                            {/*eight Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementSortie.main.compteurApres')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={8}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                    // value={this.state.navigationAvitaillementSortieModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementSortieModel: {
                                    //             ...this.state.navigationAvitaillementSortieModel, villeProvenance: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementSortieModel.villeProvenance = text;
                                    //     this.props.update(this.state.navigationAvitaillementSortieModel);
                                    // }}
                                    />
                                </Col>
                            </Row>

                            {/*nine Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementSortie.main.quantiteLivree')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={8}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                    // value={this.state.navigationAvitaillementSortieModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementSortieModel: {
                                    //             ...this.state.navigationAvitaillementSortieModel, villeProvenance: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementSortieModel.villeProvenance = text;
                                    //     this.props.update(this.state.navigationAvitaillementSortieModel);
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






export default ActifsRapportAvitaillementSortieMainBlock;




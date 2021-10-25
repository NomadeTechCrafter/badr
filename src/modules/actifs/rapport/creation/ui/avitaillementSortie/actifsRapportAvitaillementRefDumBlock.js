import DateTimePicker from '@react-native-community/datetimepicker';
import _ from 'lodash';
import moment from 'moment';
import { default as React } from 'react';
import { Text, View} from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { IconButton, TextInput, RadioButton } from 'react-native-paper';
import {
    ComBadrItemsPickerComp, ComBadrAutoCompleteChipsComp, ComBadrCardBoxComp, ComBadrErrorMessageComp, ComBadrInfoMessageComp, ComBadrLibelleComp, ComBadrProgressBarComp, ComContainerComp
} from '../../../../../../commons/component';
import translate from "../../../../../../commons/i18n/ComI18nHelper";
import { CustomStyleSheet, primaryColor } from '../../../../../../commons/styles/ComThemeStyle';







class ActifsRapportAvitaillementRefDumBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationAvitaillementSortieModel: this.props.navigationAvitaillementSortieModel,
            index: this.props.index,
            typeDUM: '01'
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
    onChangeTypeDUM = (value) => {
        console.log('onChangeTypeDUM : ' + value);
        this.setState({ typeDUM: value });
    }




    render() {
    
        return (

            // <ComAccordionComp title={translate('actifsCreation.embarcations.navigMaritime.title')} expanded={true}>

                <View style={CustomStyleSheet.fullContainer}>
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
                            {/*First Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={1} style={{ padding: 5 }}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementSortie.typeDum')}
                                    </ComBadrLibelleComp>
                                </Col>
                                    <Col size={6}>
                                        <RadioButton.Group onValueChange={this.onChangeTypeDUM} value={this.state.typeDUM}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text>{translate('actifsCreation.avitaillementSortie.dumProvNormale')}</Text>
                                                    <RadioButton value="01" color={primaryColor} />
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text>{translate('actifsCreation.avitaillementSortie.dumSimplifie')}</Text>
                                                    <RadioButton value="02" color={primaryColor} />
                                                </View>
                                            </View>
                                        </RadioButton.Group>
                                    </Col>
                                </Row>
                            
                            {/*Second Row*/}
                            {(this.state.typeDUM == '01') &&
                                (<Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={1} style={{ padding: 5 }}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementSortie.DUM.label')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={1}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementSortie.DUM.bureau')}
                                        // value={this.state.navigationAvitaillementSortieModel.villeProvenance}
                                        // onChangeText={(text) => {
                                        // this.setState({
                                        //     navigationAvitaillementSortieModel: {
                                        //         ...this.state.navigationAvitaillementSortieModel, villeProvenance: text
                                        //     }
                                        // });
                                        // this.state.navigationAvitaillementSortieModel.villeProvenance = text;
                                        // this.props.update(this.state.navigationAvitaillementSortieModel);
                                        // }}
                                        />
                                    </Col>
                                    <Col size={1}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementSortie.DUM.regime')}
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
                                    <Col size={1}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementSortie.DUM.annee')}
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
                                    <Col size={2}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementSortie.DUM.serie')}
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
                                    <Col size={1}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementSortie.DUM.cle')}
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
                                </Row>)}
                            </Grid>
                        </ComBadrCardBoxComp>


                    </ComContainerComp>
                </View>


            // </ComAccordionComp>

        );
    }
}






export default ActifsRapportAvitaillementRefDumBlock;




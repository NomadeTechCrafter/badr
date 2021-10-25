import DateTimePicker from '@react-native-community/datetimepicker';
import _ from 'lodash';
import moment from 'moment';
import { default as React } from 'react';
import { Text, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { IconButton, TextInput } from 'react-native-paper';
import {
    ComAccordionComp, ComBadrAutoCompleteChipsComp, ComBadrCardBoxComp, ComBadrErrorMessageComp, ComBadrInfoMessageComp, ComBadrLibelleComp, ComBadrProgressBarComp, ComContainerComp
} from '../../../../../../commons/component';
import translate from "../../../../../../commons/i18n/ComI18nHelper";
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';






class ActifsRapportAvitaillementRefDumBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationAvitaillementEntreeModel: this.props.navigationAvitaillementEntreeModel,
            index: this.props.index
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
                                        {translate('actifsCreation.avitaillementEntree.DUM.label')}
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
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12  }}
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
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12  }}
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
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12  }}
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
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12  }}
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
                            </Grid>
                        </ComBadrCardBoxComp>


                    </ComContainerComp>
                </View>


            // </ComAccordionComp>

        );
    }
}






export default ActifsRapportAvitaillementRefDumBlock;




import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { default as React } from 'react';
import { View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { IconButton, TextInput } from 'react-native-paper';
import {
    ComAccordionComp, ComBadrAutoCompleteChipsComp, ComBadrCardBoxComp,
    ComBadrErrorMessageComp, ComBadrInfoMessageComp, ComBadrLibelleComp, ComBadrProgressBarComp, ComContainerComp
} from '../../../../../../commons/component';
import translate from "../../../../../../commons/i18n/ComI18nHelper";
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';
import { getNavigationMaritimeModelInitial } from '../../../utils/actifsUtils';






class ActifsRapportCaracteristiquesBateauBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationMaritimeModel: this.props.navigationMaritimeModel ? this.props.navigationMaritimeModel : getNavigationMaritimeModelInitial(),
            acDelivreePar: this.props.navigationMaritimeModel ? this.props.navigationMaritimeModel.delivreePar.libelle : '',
            showDateDeclaration: false,
            acDestination: this.props.navigationMaritimeModel ? this.props.navigationMaritimeModel.destination.nomPays : '',
            
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
            props.navigationMaritimeModel && props.index !== state.index
        ) {
            return {
                navigationMaritimeModel: props.navigationMaritimeModel,// update the value of specific key
                index: props.index
            };
        }
        // Return null to indicate no change to state.
        return null;
    }


    onDateDeclarationChange = (event, selectedDate) => {
        this.setState({
            navigationMaritimeModel: {
                ...this.state.navigationMaritimeModel,
                dateDeclaration: event.nativeEvent.timestamp,
            }, showDateDeclaration: false


        });
        this.state.navigationMaritimeModel.dateDeclaration = event.nativeEvent.timestamp;
        this.props.update(this.state.navigationMaritimeModel);
    }
   





   
    

    handleDelivreeParChanged = (agent) => {
        console.log(agent);
        this.setState({
            acDelivreePar: agent.libelle, navigationMaritimeModel: {
                ...this.state.navigationMaritimeModel,
                delivreePar: { idActeur: agent.code, nom: agent.libelle }
            }
        });
        this.state.navigationMaritimeModel.delivreePar = { idActeur: agent.code, nom: agent.libelle };
        this.props.update(this.state.navigationMaritimeModel);


    }




    render() {
        return (

            <ComAccordionComp title={translate('actifsCreation.embarcations.caracteristiques.title')} expanded={true}>

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
                                { /*first Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={6}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.embarcations.caracteristiques.typeBateau')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={this.state.navigationMaritimeModel.typeBateau}
                                            multiline={true}
                                            numberOfLines={1}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationMaritimeModel: {
                                                        ...this.state.navigationMaritimeModel, typeBateau: text
                                                    }
                                                });
                                                this.state.navigationMaritimeModel.typeBateau = text;
                                                this.props.update(this.state.navigationMaritimeModel);
                                            }}
                                        />
                                        
                                    </Col>
                                    
                                    <Col size={11} />
                                    
                                </Row>


                                {/*second Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={6}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.embarcations.caracteristiques.nomBateau')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={this.state.navigationMaritimeModel.nomBateau}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationMaritimeModel: {
                                                        ...this.state.navigationMaritimeModel, nomBateau: text
                                                    }
                                                });
                                                this.state.navigationMaritimeModel.nomBateau = text;
                                                this.props.update(this.state.navigationMaritimeModel);
                                            }}
                                        />
                                    </Col>
                                    <Col size={1}/>
                                    <Col size={4}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.embarcations.caracteristiques.immatriculation')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            style={{ height: 20, fontSize: 12 }}
                                            disabled={this.props.readOnly}
                                            value={this.state.navigationMaritimeModel.immatriculation}
                                            onChangeText={(text) => {this.setState({
                                                navigationMaritimeModel: {
                                                    ...this.state.navigationMaritimeModel, immatriculation: text
                                                }
                                            });
                                                this.state.navigationMaritimeModel.immatriculation = text;
                                                this.props.update(this.state.navigationMaritimeModel);
                                            }}
                                        />
                                    </Col>
                                </Row>

                                {/*third Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={6}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.embarcations.caracteristiques.couleur')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={this.state.navigationMaritimeModel.couleur}
                                            onChangeText={(text) => {this.setState({
                                                navigationMaritimeModel: {
                                                    ...this.state.navigationMaritimeModel, couleur: text
                                                }
                                            });
                                                this.state.navigationMaritimeModel.couleur = text;
                                                this.props.update(this.state.navigationMaritimeModel);
                                            }}
                                        />
                                    </Col>
                                    <Col size={1} />
                                    <Col size={4}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.embarcations.caracteristiques.longueur')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            keyboardType={'number-pad'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={this.state.navigationMaritimeModel.longueur}
                                            onChangeText={(text) => {this.setState({
                                                navigationMaritimeModel: {
                                                    ...this.state.navigationMaritimeModel, longueur: text
                                                }
                                            });
                                                this.state.navigationMaritimeModel.longueur = text;
                                                this.props.update(this.state.navigationMaritimeModel);
                                            }}
                                        />
                                    </Col>
                                </Row>
                                {/*fourth Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={6}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.embarcations.caracteristiques.profondeur')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            keyboardType={'number-pad'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={this.state.navigationMaritimeModel.profondeur}
                                            onChangeText={(text) => {this.setState({
                                                navigationMaritimeModel: {
                                                    ...this.state.navigationMaritimeModel, profondeur: text
                                                }
                                            });
                                                this.state.navigationMaritimeModel.profondeur = text;
                                                this.props.update(this.state.navigationMaritimeModel);
                                            }}
                                        />
                                    </Col>
                                    <Col size={1} />
                                    <Col size={4}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.embarcations.caracteristiques.tonnage')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            keyboardType={'number-pad'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={this.state.navigationMaritimeModel.tonnage}
                                            onChangeText={(text) => {this.setState({
                                                navigationMaritimeModel: {
                                                    ...this.state.navigationMaritimeModel, tonnage: text
                                                }
                                            });
                                                this.state.navigationMaritimeModel.tonnage = text;
                                                this.props.update(this.state.navigationMaritimeModel);
                                            }}
                                        />
                                    </Col>
                                </Row>

                                {/*fifth Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={6} style={{ paddingTop: 40 }}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.embarcations.caracteristiques.numDeclaration')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={this.state.navigationMaritimeModel.numDeclaration}
                                            onChangeText={(text) => {this.setState({
                                                navigationMaritimeModel: {
                                                    ...this.state.navigationMaritimeModel, numDeclaration: text
                                                }
                                            });
                                                this.state.navigationMaritimeModel.numDeclaration = text;
                                                this.props.update(this.state.navigationMaritimeModel);
                                            }}
                                        />
                                    </Col>
                                    <Col size={1} />
                                    <Col size={4} style={{ paddingTop: 40 }}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.embarcations.caracteristiques.delivreePar')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={6} style={{  padding: 5 }}>
                                          <ComBadrAutoCompleteChipsComp
                                            code="code"
                                            disabled={this.props.readOnly}
                                            placeholder={translate(
                                                'actifsCreation.embarcations.caracteristiques.delivreePar'
                                            )}
                                            selected={this.state.navigationMaritimeModel.delivreePar.nom}
                                            maxItems={3}
                                            libelle="libelle"
                                            command="getCmbActeurs"
                                            paramName=""
                                            onDemand={true}
                                            searchZoneFirst={false}
                                            onValueChange={this.handleDelivreeParChanged}
                                        />  
                                    </Col>
                                </Row>
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={6}>
                                        <ComBadrLibelleComp withColor={true}>
                                            Du
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={4}>
                                        <TextInput
                                            disabled={true}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={moment(this.state.navigationMaritimeModel.dateDeclaration).format('DD/MM/YYYY')}
                                        />
                                        {this.state.showDateDeclaration && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={this.state.navigationMaritimeModel.dateDeclaration}
                                                mode="date"
                                                is24Hour={true}
                                                display="default"
                                                onChange={this.onDateDeclarationChange}
                                            />
                                        )}
                                    </Col>
                                    <Col size={2} style={{ paddingTop: 5 }}>
                                        {!this.props.readOnly && (<IconButton
                                            icon="calendar"
                                            onPress={() => {
                                                this.setState({ showDateDeclaration: true });

                                            }}
                                        />)}
                                    </Col>
                                    <Col size={12}/>
                                    </Row>
                                
                            </Grid>
                        </ComBadrCardBoxComp>


                    </ComContainerComp>
                </View>


            </ComAccordionComp>

        );
    }
}






export default ActifsRapportCaracteristiquesBateauBlock;




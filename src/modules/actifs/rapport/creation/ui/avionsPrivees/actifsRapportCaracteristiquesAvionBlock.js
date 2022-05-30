import { default as React } from 'react';
import { View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { TextInput } from 'react-native-paper';
import {
    ComAccordionComp, ComBadrCardBoxComp,
    ComBadrErrorMessageComp, ComBadrInfoMessageComp, ComBadrLibelleComp, ComBadrProgressBarComp, ComContainerComp
} from '../../../../../../commons/component';
import translate from "../../../../../../commons/i18n/ComI18nHelper";
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';
import { getNavigationAerienneModelInitial } from '../../../utils/actifsUtils';






class ActifsRapportCaracteristiquesAvionBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationAerienneModel: this.props.navigationAerienneModel ? this.props.navigationAerienneModel : getNavigationAerienneModelInitial()
            
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
            props.navigationAerienneModel && props.index !== state.index
        ) {
            return {
                navigationAerienneModel: props.navigationAerienneModel,// update the value of specific key
                index: props.index
            };
        }
        // Return null to indicate no change to state.
        return null;
    }


   
   





   
    

   




    render() {
        return (

            <ComAccordionComp title={translate('actifsCreation.avionsPrivees.caracteristiques.title')} expanded={true}>

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
                                            {translate('actifsCreation.avionsPrivees.caracteristiques.nomAvion')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={this.state.navigationAerienneModel.nomAvion}
                                            multiline={true}
                                            numberOfLines={1}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAerienneModel: {
                                                        ...this.state.navigationAerienneModel, nomAvion: text
                                                    }
                                                });
                                                this.state.navigationAerienneModel.nomAvion = text;
                                                this.props.update(this.state.navigationAerienneModel);
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
                                                {translate('actifsCreation.avionsPrivees.caracteristiques.typeAvion')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={this.state.navigationAerienneModel.typeAvion}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAerienneModel: {
                                                        ...this.state.navigationAerienneModel, typeAvion: text
                                                    }
                                                });
                                                this.state.navigationAerienneModel.typeAvion = text;
                                                this.props.update(this.state.navigationAerienneModel);
                                            }}
                                        />
                                    </Col>
                                    <Col size={1}/>
                                    <Col size={4}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avionsPrivees.caracteristiques.immatriculation')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            style={{ height: 20, fontSize: 12 }}
                                            disabled={this.props.readOnly}
                                            value={this.state.navigationAerienneModel.immatriculation}
                                            onChangeText={(text) => {this.setState({
                                                navigationAerienneModel: {
                                                    ...this.state.navigationAerienneModel, immatriculation: text
                                                }
                                            });
                                                this.state.navigationAerienneModel.immatriculation = text;
                                                this.props.update(this.state.navigationAerienneModel);
                                            }}
                                        />
                                    </Col>
                                </Row>

                                {/*third Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={6}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avionsPrivees.caracteristiques.couleur')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={this.state.navigationAerienneModel.couleur}
                                            onChangeText={(text) => {this.setState({
                                                navigationAerienneModel: {
                                                    ...this.state.navigationAerienneModel, couleur: text
                                                }
                                            });
                                                this.state.navigationAerienneModel.couleur = text;
                                                this.props.update(this.state.navigationAerienneModel);
                                            }}
                                        />
                                    </Col>
                                    <Col size={1} />
                                    <Col size={4}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avionsPrivees.caracteristiques.nbPlaces')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            keyboardType={'number-pad'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={this.state.navigationAerienneModel.nbPlaces}
                                            onChangeText={(text) => {this.setState({
                                                navigationAerienneModel: {
                                                    ...this.state.navigationAerienneModel, nbPlaces: text
                                                }
                                            });
                                                this.state.navigationAerienneModel.nbPlaces = text;
                                                this.props.update(this.state.navigationAerienneModel);
                                            }}
                                        />
                                    </Col>
                                </Row>
                                {/*fourth Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={6}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avionsPrivees.caracteristiques.nbMoteurs')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            keyboardType={'number-pad'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={this.state.navigationAerienneModel.nbMoteurs}
                                            onChangeText={(text) => {this.setState({
                                                navigationAerienneModel: {
                                                    ...this.state.navigationAerienneModel, nbMoteurs: text
                                                }
                                            });
                                                this.state.navigationAerienneModel.nbMoteurs = text;
                                                this.props.update(this.state.navigationAerienneModel);
                                            }}
                                        />
                                    </Col>
                                    <Col size={1} />
                                    <Col size={4}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avionsPrivees.caracteristiques.tonnage')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            keyboardType={'number-pad'}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={this.state.navigationAerienneModel.tonnage}
                                            onChangeText={(text) => {this.setState({
                                                navigationAerienneModel: {
                                                    ...this.state.navigationAerienneModel, tonnage: text
                                                }
                                            });
                                                this.state.navigationAerienneModel.tonnage = text;
                                                this.props.update(this.state.navigationAerienneModel);
                                            }}
                                        />
                                    </Col>
                                </Row>

                               
                            </Grid>
                        </ComBadrCardBoxComp>


                    </ComContainerComp>
                </View>


            </ComAccordionComp>

        );
    }
}






export default ActifsRapportCaracteristiquesAvionBlock;




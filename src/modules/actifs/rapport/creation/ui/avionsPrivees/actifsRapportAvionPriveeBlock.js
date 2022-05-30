import _ from 'lodash';
import moment from 'moment';
import { default as React } from 'react';
import { ScrollView, View } from 'react-native';
import { Row } from 'react-native-easy-grid';
import { ComBadrButtonComp, ComBadrErrorMessageComp, ComContainerComp } from '../../../../../../commons/component';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import { FORMAT_DDMMYYYY, FORMAT_DDMMYYYY_HHMM, RESET_AVION_PRIVEE_TASK } from '../../../utils/actifsConstants';
import { formatCustomized } from '../../../utils/actifsUtils';
import ActifsRapportNavigationAerienneBlock from './actifsRapportNavigationAerienneBlock';
import ActifsRapportProprietairesPersonnesConcerneesBlock from './actifsRapportProprietairesPersonnesConcerneesBlock';
import ActifsRapportResultatControleBlock from './actifsRapportResultatControleBlock';
import ActifsRapportCaracteristiquesAvionBlock from './actifsRapportCaracteristiquesAvionBlock';





class ActifsRapportAvionPriveeBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationAerienneModel: this.props.navigationAerienneModel,
            errorMessage: null
        };

    }


    componentDidMount() {

    }



    componentWillUnmount() {
    }



    reset = () => {
    };

    confirmer = () => {
        if (!this.checkRequiredFields()) {
            if (!this.checkDatesAtterissageDepartInformations()) {
                if (!this.checkDatesDebutFinControleInformations()) {
                    console.log(' confirmation ActifsRapportAvionPriveeBlock this.props.navigationAerienneModel : ', this.state.navigationAerienneModel);
                    this.props.push(this.state.navigationAerienneModel);
                }
            }
        }
    }


    retablir = () => {
        this.props.callbackHandler(RESET_AVION_PRIVEE_TASK);
    }

    checkRequiredFields = () => {

        let params = { msg: '', required: false }
        this.checkRequiredFieldsnavigAerienne(params);
        this.checkRequiredFieldsCaracteristiquesAvion(params);
        this.checkRequiredFieldsResultatCtrl(params); 
        if (params.required) {
            let message = translate('actifsCreation.avionsPrivees.champsObligatoires') + params.msg;
            this.setState({
                errorMessage: message
            });
        } else {
            this.setState({
                errorMessage: null
            });

        }
        return params.required;


    }

    checkDatesAtterissageDepartInformations = () => {
        let modele = this.state.navigationAerienneModel;
        let dateAtterissage = formatCustomized(modele.dateAtterissage, FORMAT_DDMMYYYY);

        moment.suppressDeprecationWarnings = true;
        let dateHeureAtterissage = moment(dateAtterissage + ' ' + modele.heureAtterissage, FORMAT_DDMMYYYY_HHMM);
        console.log(dateAtterissage);
        console.log(modele.heureAtterissage);
        console.log(dateAtterissage + ' ' + modele.heureAtterissage);
        console.log(dateHeureAtterissage);
        let dateDepart = formatCustomized(modele.dateDepart, FORMAT_DDMMYYYY);

        let dateHeureDepart = moment(dateDepart + ' ' + modele.heureDepart, FORMAT_DDMMYYYY_HHMM);
        console.log(dateDepart);
        console.log(modele.heureDepart);
        console.log(dateDepart + ' ' + modele.heureDepart);
        console.log(dateHeureDepart);

        if (dateHeureDepart < dateHeureAtterissage) {
            let message = translate('actifsCreation.avionsPrivees.navigAerienne.msgErrorOrdreDateAtterissageDepart');
            this.setState({
                errorMessage: message
            });
            return true;
        } else {
            this.setState({
                errorMessage: null
            });
            return false
        }



    }

    checkDatesDebutFinControleInformations = () => {
        let modele = this.state.navigationAerienneModel;
        let dateDebutControle = formatCustomized(modele.dateDebutControle, FORMAT_DDMMYYYY);

        moment.suppressDeprecationWarnings = true;
        let dateHeureDebutControle = moment(dateDebutControle + ' ' + modele.heureDebutControle, FORMAT_DDMMYYYY_HHMM);
        console.log(dateDebutControle);
        console.log(modele.heureDebutControle);
        console.log(dateDebutControle + ' ' + modele.heureDebutControle);
        console.log(dateHeureDebutControle);
        let dateFinControle = formatCustomized(modele.dateFinControle, FORMAT_DDMMYYYY);

        let dateHeureFinControle = moment(dateFinControle + ' ' + modele.heureFinControle, FORMAT_DDMMYYYY_HHMM);
        console.log(dateFinControle);
        console.log(modele.heureFinControle);
        console.log(dateFinControle + ' ' + modele.heureFinControle);
        console.log(dateHeureFinControle);

        if (dateHeureFinControle < dateHeureDebutControle) {
            let message = translate('actifsCreation.avionsPrivees.resultatCtrl.msgErrorOrdreDateDebutFinControle');
            this.setState({
                errorMessage: message
            });
            return true;
        } else {
            this.setState({
                errorMessage: null
            });
            return false
        }



    }

    checkRequiredFieldsnavigAerienne = (params) => {
        let modele = this.state.navigationAerienneModel;
        if (_.isEmpty(modele.dateAtterissage.toString())) {
            params.required = true;
            params.msg += translate('actifsCreation.avionsPrivees.navigAerienne.dateAtterissage');
        }
        if (_.isEmpty(modele.motifAtterissage)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avionsPrivees.navigAerienne.motifAtterissage');
        }
        if (_.isEmpty(modele.aeroportEntree)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avionsPrivees.navigAerienne.aeroportEntree');
        }
        if (_.isEmpty(modele.provenance?.codePays)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avionsPrivees.navigAerienne.provenance');
        }
        if (_.isEmpty(modele.villeProvenance)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avionsPrivees.navigAerienne.villeProvenance');
        }
        if (_.isEmpty(modele.aeroportAttache)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avionsPrivees.navigAerienne.aeroportAttache');
        }
        if (_.isEmpty(modele.pavillon)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avionsPrivees.navigAerienne.pavillon');
        }
        if (_.isEmpty(modele.dateDepart.toString())) {
            params.required = true;
            params.msg += translate('actifsCreation.avionsPrivees.navigAerienne.dateDepart');
        }
        if (_.isEmpty(modele.destination?.codePays)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avionsPrivees.navigAerienne.destination');
        }
        if (_.isEmpty(modele.villeDestination)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avionsPrivees.navigAerienne.villeDestination');
        }



    }
    checkRequiredFieldsCaracteristiquesAvion = (params) => {
        let modele = this.state.navigationAerienneModel;
        
        if (_.isEmpty(modele.typeAvion)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avionsPrivees.caracteristiques.typeAvion');
        }
        if (_.isEmpty(modele.immatriculation)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avionsPrivees.caracteristiques.immatriculation');
        }
        
        if (_.isEmpty(modele.nbPlaces)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avionsPrivees.caracteristiques.nbPlaces');
        }
       
       



    }
    checkRequiredFieldsResultatCtrl = (params) => {
        let modele = this.state.navigationAerienneModel;
        if (_.isEmpty(modele.dateDebutControle.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avionsPrivees.resultatCtrl.dateDebutControle');
        }
        if (_.isEmpty(modele.dateFinControle.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avionsPrivees.resultatCtrl.dateFinControle');
        }
        if (_.isEmpty(modele.documentsVerifies)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avionsPrivees.resultatCtrl.documentsVerifies');
        }
        if (_.isEmpty(modele.resultatControle)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avionsPrivees.resultatCtrl.resultatControle');
        }




    }

    updateModelNavigationAerienne = (modele) => {
        this.state.navigationAerienneModel.dateAtterissage = modele.dateAtterissage;
        this.state.navigationAerienneModel.heureAtterissage = modele.heureAtterissage;
        this.state.navigationAerienneModel.motifAtterissage = modele.motifAtterissage;
        this.state.navigationAerienneModel.aeroportEntree = modele.aeroportEntree;
        this.state.navigationAerienneModel.provenance = modele.provenance;
        this.state.navigationAerienneModel.villeProvenance = modele.villeProvenance;
        this.state.navigationAerienneModel.aeroportAttache = modele.aeroportAttache;
        this.state.navigationAerienneModel.pavillon = modele.pavillon;
        this.state.navigationAerienneModel.dateDepart = modele.dateDepart;
        this.state.navigationAerienneModel.heureDepart = modele.heureDepart;
        this.state.navigationAerienneModel.destination = modele.destination;
        this.state.navigationAerienneModel.villeDestination = modele.villeDestination;


        //this.state.navigationAerienneModel = model;
    }

    updateModelCaracteristiquesBateau = (modele) => {
        this.state.navigationAerienneModel.nomAvion = modele.nomAvion;
        this.state.navigationAerienneModel.typeAvion = modele.typeAvion;
        this.state.navigationAerienneModel.immatriculation = modele.immatriculation;
        this.state.navigationAerienneModel.couleur = modele.couleur;
        this.state.navigationAerienneModel.nbPlaces = modele.nbPlaces;
        this.state.navigationAerienneModel.nbMoteurs = modele.nbMoteurs;
        this.state.navigationAerienneModel.tonnage = modele.tonnage;


    }
    updateModelResultatCtrl = (modele) => {
        this.state.navigationAerienneModel.dateDebutControle = modele.dateDebutControle;
        this.state.navigationAerienneModel.heureDebutControle = modele.heureDebutControle;
        this.state.navigationAerienneModel.dateFinControle = modele.dateFinControle;
        this.state.navigationAerienneModel.heureFinControle = modele.heureFinControle;
        this.state.navigationAerienneModel.documentsVerifies = modele.documentsVerifies;
        this.state.navigationAerienneModel.observations = modele.observations;
        this.state.navigationAerienneModel.resultatControle = modele.resultatControle;
    }

    updateModelProprietairesPersonnesConcernees = (modele) => {
        this.state.navigationAerienneModel.proprietaires = modele.proprietaires;
        this.state.navigationAerienneModel.intervenants = modele.intervenants;
    }


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
            <ScrollView>
                <ComContainerComp>
                    {this.state.errorMessage != null && (

                        <ComBadrErrorMessageComp message={this.state.errorMessage} />
                    )}

                </ComContainerComp>
                <ActifsRapportNavigationAerienneBlock index={this.props.index} navigationAerienneModel={this.state.navigationAerienneModel} readOnly={this.props.readOnly} update={this.updateModelNavigationAerienne} />
                <ActifsRapportCaracteristiquesAvionBlock index={this.props.index} navigationAerienneModel={this.state.navigationAerienneModel} readOnly={this.props.readOnly} update={this.updateModelCaracteristiquesBateau} />
                <ActifsRapportProprietairesPersonnesConcerneesBlock index={this.props.index} navigationAerienneModel={this.state.navigationAerienneModel} readOnly={this.props.readOnly} update={this.updateModelProprietairesPersonnesConcernees} />
                <ActifsRapportResultatControleBlock index={this.props.index} navigationAerienneModel={this.state.navigationAerienneModel} readOnly={this.props.readOnly} update={this.updateModelResultatCtrl} />
                {(!this.props.readOnly) && (<View>
                    <Row style={{ justifyContent: 'center', paddingTop: 20 }}>
                        <ComBadrButtonComp
                            style={{ width: 100 }}
                            onPress={() => (this.confirmer())}
                            text={translate('transverse.confirmer')}
                        />
                        <View style={{ width: 10 }} />
                        <ComBadrButtonComp
                            style={{ width: 100 }}
                            onPress={() => {
                                this.retablir()
                            }}
                            text={translate('transverse.retablir')}
                        />
                        <View style={{ width: 10 }} />
                    </Row>
                </View>)}

            </ScrollView>

        );
    }
}






export default ActifsRapportAvionPriveeBlock;




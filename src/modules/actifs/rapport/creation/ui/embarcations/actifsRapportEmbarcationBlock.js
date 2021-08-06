import _ from 'lodash';
import moment from 'moment';
import { default as React } from 'react';
import { ScrollView, View } from 'react-native';
import { Row } from 'react-native-easy-grid';
import { ComBadrButtonComp, ComBadrErrorMessageComp, ComContainerComp } from '../../../../../../commons/component';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import { FORMAT_DDMMYYYY, FORMAT_DDMMYYYY_HHMM, RESET_EMBARCATION_TASK } from '../../../utils/actifsConstants';
import { formatCustomized } from '../../../utils/actifsUtils';
import ActifsRapportCaracteristiquesBateauBlock from './actifsRapportCaracteristiquesBateauBlock';
import ActifsRapportNavigationMaritimeBlock from './actifsRapportNavigationMaritimeBlock';
import ActifsRapportProprietairesPersonnesConcerneesBlock from './actifsRapportProprietairesPersonnesConcerneesBlock';
import ActifsRapportResultatControleBlock from './actifsRapportResultatControleBlock';





class ActifsRapportEmbarcationBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationMaritimeModel: this.props.navigationMaritimeModel,
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
            if (!this.checkDatesEntreeDepartInformations()) {
                if (!this.checkDatesDebutFinControleInformations()) {
                    this.props.push(this.state.navigationMaritimeModel);
                }
            }
        }
    }


    retablir = () => {
        this.props.callbackHandler(RESET_EMBARCATION_TASK);
    }

    checkRequiredFields = () => {

        let params = { msg: '', required: false }
        this.checkRequiredFieldsNavigMaritime(params);
        this.checkRequiredFieldsCaracteristiquesBateau(params);
        this.checkRequiredFieldsResultatCtrl(params);

        if (params.required) {
            let message = translate('actifsCreation.embarcations.champsObligatoires') + params.msg;
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

    checkDatesEntreeDepartInformations = () => {
        let modele = this.state.navigationMaritimeModel;
        let dateEntree = formatCustomized(modele.dateEntree, FORMAT_DDMMYYYY);

        moment.suppressDeprecationWarnings = true;
        let dateHeureEntree = moment(dateEntree + ' ' + modele.heureEntree, FORMAT_DDMMYYYY_HHMM);
        let dateDepart = formatCustomized(modele.dateDepart, FORMAT_DDMMYYYY);

        let dateHeureDepart = moment(dateDepart + ' ' + modele.heureDepart, FORMAT_DDMMYYYY_HHMM);

        if (dateHeureDepart < dateHeureEntree) {
            let message = translate('actifsCreation.embarcations.navigMaritime.msgErrorOrdreDateEntreeDepart');
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
        let modele = this.state.navigationMaritimeModel;
        let dateDebutControle = formatCustomized(modele.dateDebutControle, FORMAT_DDMMYYYY);

        moment.suppressDeprecationWarnings = true;
        let dateHeureDebutControle = moment(dateDebutControle + ' ' + modele.heureDebutControle, FORMAT_DDMMYYYY_HHMM);
        let dateFinControle = formatCustomized(modele.dateFinControle, FORMAT_DDMMYYYY);

        let dateHeureFinControle = moment(dateFinControle + ' ' + modele.heureFinControle, FORMAT_DDMMYYYY_HHMM);

        if (dateHeureFinControle < dateHeureDebutControle) {
            let message = translate('actifsCreation.embarcations.resultatCtrl.msgErrorOrdreDateDebutFinControle');
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

    checkRequiredFieldsNavigMaritime = (params) => {
        let modele = this.state.navigationMaritimeModel;
        if (_.isEmpty(modele.dateEntree.toString())) {
            params.required = true;
            params.msg += translate('actifsCreation.embarcations.navigMaritime.dateEntree');
        }
        if (_.isEmpty(modele.motifAccostage)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.navigMaritime.motifAccostage');
        }
        if (_.isEmpty(modele.portEntree)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.navigMaritime.portEntree');
        }
        if (_.isEmpty(modele.provenance?.codePays)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.navigMaritime.provenance');
        }
        if (_.isEmpty(modele.villeProvenance)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.navigMaritime.villeProvenance');
        }
        if (_.isEmpty(modele.portAttache)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.navigMaritime.portAttache');
        }
        if (_.isEmpty(modele.pavillon)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.navigMaritime.pavillon');
        }
        if (_.isEmpty(modele.dateDepart.toString())) {
            params.required = true;
            params.msg += translate('actifsCreation.embarcations.navigMaritime.dateDepart');
        }
        if (_.isEmpty(modele.destination?.codePays)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.navigMaritime.destination');
        }
        if (_.isEmpty(modele.villeDestination)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.navigMaritime.villeDestination');
        }



    }
    checkRequiredFieldsCaracteristiquesBateau = (params) => {
        let modele = this.state.navigationMaritimeModel;
        if (_.isEmpty(modele.typeBateau)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.caracteristiques.typeBateau');
        }
        if (_.isEmpty(modele.nomBateau)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.caracteristiques.nomBateau');
        }
        if (_.isEmpty(modele.immatriculation)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.caracteristiques.immatriculation');
        }
        if (_.isEmpty(modele.couleur)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.caracteristiques.couleur');
        }
        if (_.isEmpty(modele.longueur)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.caracteristiques.longueur');
        }
        if (_.isEmpty(modele.profondeur)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.caracteristiques.profondeur');
        }
        if (_.isEmpty(modele.tonnage)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.caracteristiques.tonnage');
        }
        if (_.isEmpty(modele.numDeclaration)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.caracteristiques.numDeclaration');
        }
        console.log('modele.delivreePar?.nom', modele.delivreePar?.idActeur);
        console.log('modele.delivreePar?.nom ', modele.delivreePar?.nom);
        if (_.isEmpty(modele.delivreePar?.nom)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.caracteristiques.delivreePar');
        }
        if (_.isEmpty(modele.dateDeclaration.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.caracteristiques.dateDeclaration');
        }



    }
    checkRequiredFieldsResultatCtrl = (params) => {
        let modele = this.state.navigationMaritimeModel;
        if (_.isEmpty(modele.dateDebutControle.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.resultatCtrl.dateDebutControle');
        }
        if (_.isEmpty(modele.dateFinControle.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.resultatCtrl.dateFinControle');
        }
        if (_.isEmpty(modele.documentsVerifies)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.resultatCtrl.documentsVerifies');
        }
        if (_.isEmpty(modele.observations)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.resultatCtrl.observations');
        }
        if (_.isEmpty(modele.resultatControle)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.embarcations.resultatCtrl.resultatControle');
        }




    }

    updateModelNavigationMaritime = (modele) => {
        this.state.navigationMaritimeModel.dateEntree = modele.dateEntree;
        this.state.navigationMaritimeModel.heureEntree = modele.heureEntree;
        this.state.navigationMaritimeModel.motifAccostage = modele.motifAccostage;
        this.state.navigationMaritimeModel.portEntree = modele.portEntree;
        this.state.navigationMaritimeModel.provenance = modele.provenance;
        this.state.navigationMaritimeModel.villeProvenance = modele.villeProvenance;
        this.state.navigationMaritimeModel.portAttache = modele.portAttache;
        this.state.navigationMaritimeModel.pavillon = modele.pavillon;
        this.state.navigationMaritimeModel.dateDepart = modele.dateDepart;
        this.state.navigationMaritimeModel.heureDepart = modele.heureDepart;
        this.state.navigationMaritimeModel.destination = modele.destination;
        this.state.navigationMaritimeModel.villeDestination = modele.villeDestination;


        //this.state.navigationMaritimeModel = model;
    }

    updateModelCaracteristiquesBateau = (modele) => {
        this.state.navigationMaritimeModel.typeBateau = modele.typeBateau;
        this.state.navigationMaritimeModel.nomBateau = modele.nomBateau;
        this.state.navigationMaritimeModel.immatriculation = modele.immatriculation;
        this.state.navigationMaritimeModel.couleur = modele.couleur;
        this.state.navigationMaritimeModel.longueur = modele.longueur;
        this.state.navigationMaritimeModel.profondeur = modele.profondeur;
        this.state.navigationMaritimeModel.tonnage = modele.tonnage;
        this.state.navigationMaritimeModel.numDeclaration = modele.numDeclaration;
        this.state.navigationMaritimeModel.delivreePar = modele.delivreePar;
        this.state.navigationMaritimeModel.dateDeclaration = modele.dateDeclaration;
    }
    updateModelResultatCtrl = (modele) => {
        this.state.navigationMaritimeModel.dateDebutControle = modele.dateDebutControle;
        this.state.navigationMaritimeModel.heureDebutControle = modele.heureDebutControle;
        this.state.navigationMaritimeModel.dateFinControle = modele.dateFinControle;
        this.state.navigationMaritimeModel.heureFinControle = modele.heureFinControle;
        this.state.navigationMaritimeModel.documentsVerifies = modele.documentsVerifies;
        this.state.navigationMaritimeModel.observations = modele.observations;
        this.state.navigationMaritimeModel.resultatControle = modele.resultatControle;


    }

    updateModelProprietairesPersonnesConcernees = (modele) => {
        this.state.navigationMaritimeModel.proprietaires = modele.proprietaires;
        this.state.navigationMaritimeModel.intervenants = modele.intervenants;
    }


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
    render() {
        return (
            <ScrollView>
                <ComContainerComp>
                    {this.state.errorMessage != null && (

                        <ComBadrErrorMessageComp message={this.state.errorMessage} />
                    )}

                </ComContainerComp>
                <ActifsRapportNavigationMaritimeBlock index={this.props.index} navigationMaritimeModel={this.state.navigationMaritimeModel} readOnly={this.props.readOnly} update={this.updateModelNavigationMaritime} />
                <ActifsRapportCaracteristiquesBateauBlock index={this.props.index} navigationMaritimeModel={this.state.navigationMaritimeModel} readOnly={this.props.readOnly} update={this.updateModelCaracteristiquesBateau} />
                <ActifsRapportProprietairesPersonnesConcerneesBlock index={this.props.index} navigationMaritimeModel={this.state.navigationMaritimeModel} readOnly={this.props.readOnly} update={this.updateModelProprietairesPersonnesConcernees} />
                <ActifsRapportResultatControleBlock index={this.props.index} navigationMaritimeModel={this.state.navigationMaritimeModel} readOnly={this.props.readOnly} update={this.updateModelResultatCtrl} />
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






export default ActifsRapportEmbarcationBlock;




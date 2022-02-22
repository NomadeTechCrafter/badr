import _ from 'lodash';
import moment from 'moment';
import { default as React } from 'react';
import { ScrollView, View } from 'react-native';
import { Row } from 'react-native-easy-grid';
import { ComBadrButtonComp, ComBadrErrorMessageComp, ComContainerComp } from '../../../../../../commons/component';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import { FORMAT_DDMMYYYY, FORMAT_DDMMYYYY_HHMM, RESET_AVITAILLEMENTENTREE_TASK } from '../../../utils/actifsConstants';
import { formatCustomized, getNavigationAvitaillementEntreeModelInitial } from '../../../utils/actifsUtils';
import ActifsRapportAvitaillementEntreeMainBlock from './actifsRapportAvitaillementEntreeMainBlock';





class ActifsRapportAvitaillementEntreeBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationAvitaillementEntreeModel: {},
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
                    this.props.push(this.state.navigationAvitaillementEntreeModel);
                }
            }
        }
    }


    retablir = () => {
        this.props.callbackHandler(RESET_AVITAILLEMENTENTREE_TASK);
    }

    checkRequiredFields = () => {

        let params = { msg: '', required: false }
        this.checkRequiredFieldsNavigAvitaillementEntree(params);
        // this.checkRequiredFieldsCaracteristiquesBateau(params);
        // this.checkRequiredFieldsResultatCtrl(params);

        if (params.required) {
            let message = translate('actifsCreation.avitaillementEntree.champsObligatoires') + params.msg;
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
        let modele = this.state.navigationAvitaillementEntreeModel;
        let dateEntree = formatCustomized(modele.dateEntree, FORMAT_DDMMYYYY);

        moment.suppressDeprecationWarnings = true;
        let dateHeureEntree = moment(dateEntree + ' ' + modele.heureEntree, FORMAT_DDMMYYYY_HHMM);
        let dateDepart = formatCustomized(modele.dateDepart, FORMAT_DDMMYYYY);

        let dateHeureDepart = moment(dateDepart + ' ' + modele.heureDepart, FORMAT_DDMMYYYY_HHMM);

        if (dateHeureDepart < dateHeureEntree) {
            let message = translate('actifsCreation.avitaillementEntree.msgErrorOrdreDateEntreeDepart');
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
        let modele = this.state.navigationAvitaillementEntreeModel;
        let dateDebutControle = formatCustomized(modele.dateDebutControle, FORMAT_DDMMYYYY);

        moment.suppressDeprecationWarnings = true;
        let dateHeureDebutControle = moment(dateDebutControle + ' ' + modele.heureDebutControle, FORMAT_DDMMYYYY_HHMM);
        let dateFinControle = formatCustomized(modele.dateFinControle, FORMAT_DDMMYYYY);

        let dateHeureFinControle = moment(dateFinControle + ' ' + modele.heureFinControle, FORMAT_DDMMYYYY_HHMM);

        if (dateHeureFinControle < dateHeureDebutControle) {
            let message = translate('actifsCreation.avitaillementEntree.resultatCtrl.msgErrorOrdreDateDebutFinControle');
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

    checkRequiredFieldsNavigAvitaillementEntree = (params) => {
        let modele = this.state.navigationAvitaillementEntreeModel;
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log(JSON.stringify(modele));
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        if (_.isEmpty(modele.bonLivraison)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.bonLivraison');
        }

        if (_.isEmpty(modele.dateLivraison)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.dateLivraison');
        }

        if (_.isEmpty(modele.heureLivraison)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.heureLivraison');
        }

        if (_.isEmpty(modele.immatriculationCamion)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.immatriculationCamion');
        }

        if (_.isEmpty(modele.immatriculationCiterne)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.immatriculationCiterne');
        }

        if (_.isEmpty(modele.raisonSocialeFournisseur)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.raisonSocialeFournisseur');
        }

        if (_.isEmpty(modele.natureProduit)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.natureProduit');
        }

        if (_.isEmpty(modele.dateReception?.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.dateReception');
        }

        if (_.isEmpty(modele.heureReception?.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.heureReception');
        }

        if (_.isEmpty(modele.uniteMesure)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.uniteMesure');
        }

        if (_.isEmpty(modele.volumentApparentEnvoye)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.volumentApparentEnvoye');
        }

        if (_.isEmpty(modele.volumentApparentReceptionne)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.volumentApparentReceptionne');
        }

        if (_.isEmpty(modele.coefficientConvertion)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.coefficientConvertion');
        }

        if (_.isEmpty(modele.volumeA15)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.volumeA15');
        }

        if (_.isEmpty(modele.densiteA15)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.densiteA15');
        }

        if (_.isEmpty(modele.poidsReceptione)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.poidsReceptione');
        }

        if (_.isEmpty(modele.temperature)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.temperature');
        }

        if (_.isEmpty(modele.ecart)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.ecart');
        }

        if (_.isEmpty(modele.observations)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.observations');
        }

    }

    checkRequiredFieldsCaracteristiquesBateau = (params) => {
        let modele = this.state?.navigationAvitaillementEntreeModel;
        if (_.isEmpty(modele?.typeBateau)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.caracteristiques.typeBateau');
        }
        if (_.isEmpty(modele?.nomBateau)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.caracteristiques.nomBateau');
        }
        if (_.isEmpty(modele?.immatriculation)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.caracteristiques.immatriculation');
        }
        if (_.isEmpty(modele?.couleur)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.caracteristiques.couleur');
        }
        if (_.isEmpty(modele?.longueur)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.caracteristiques.longueur');
        }
        if (_.isEmpty(modele?.profondeur)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.caracteristiques.profondeur');
        }
        if (_.isEmpty(modele?.tonnage)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.caracteristiques.tonnage');
        }
        if (_.isEmpty(modele?.numDeclaration)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.caracteristiques.numDeclaration');
        }
        console.log('modele.delivreePar?.nom', modele.delivreePar?.idActeur);
        console.log('modele.delivreePar?.nom ', modele.delivreePar?.nom);
        if (_.isEmpty(modele?.delivreePar?.nom)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.caracteristiques.delivreePar');
        }
        if (_.isEmpty(modele?.dateDeclaration?.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.caracteristiques.dateDeclaration');
        }

    }

    checkRequiredFieldsResultatCtrl = (params) => {
        let modele = this.state.navigationAvitaillementEntreeModel;
        if (_.isEmpty(modele.dateDebutControle.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.resultatCtrl.dateDebutControle');
        }
        if (_.isEmpty(modele.dateFinControle.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.resultatCtrl.dateFinControle');
        }
        if (_.isEmpty(modele.documentsVerifies)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.resultatCtrl.documentsVerifies');
        }
        if (_.isEmpty(modele.observations)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.resultatCtrl.observations');
        }
        if (_.isEmpty(modele.resultatControle)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.resultatCtrl.resultatControle');
        }




    }

    updateModelNavigationAvitaillementEntree = (modele) => {
        // console.log('*******************************************************');
        // console.log(JSON.stringify(modele));
        // console.log('*******************************************************');
        this.setState({
            navigationAvitaillementEntreeModel: modele
        });
    }

    updateModelCaracteristiquesBateau = (modele) => {
        this.state.navigationAvitaillementEntreeModel.typeBateau = modele.typeBateau;
        this.state.navigationAvitaillementEntreeModel.nomBateau = modele.nomBateau;
        this.state.navigationAvitaillementEntreeModel.immatriculation = modele.immatriculation;
        this.state.navigationAvitaillementEntreeModel.couleur = modele.couleur;
        this.state.navigationAvitaillementEntreeModel.longueur = modele.longueur;
        this.state.navigationAvitaillementEntreeModel.profondeur = modele.profondeur;
        this.state.navigationAvitaillementEntreeModel.tonnage = modele.tonnage;
        this.state.navigationAvitaillementEntreeModel.numDeclaration = modele.numDeclaration;
        this.state.navigationAvitaillementEntreeModel.delivreePar = modele.delivreePar;
        this.state.navigationAvitaillementEntreeModel.dateDeclaration = modele.dateDeclaration;
    }
    updateModelResultatCtrl = (modele) => {
        this.state.navigationAvitaillementEntreeModel.dateDebutControle = modele.dateDebutControle;
        this.state.navigationAvitaillementEntreeModel.heureDebutControle = modele.heureDebutControle;
        this.state.navigationAvitaillementEntreeModel.dateFinControle = modele.dateFinControle;
        this.state.navigationAvitaillementEntreeModel.heureFinControle = modele.heureFinControle;
        this.state.navigationAvitaillementEntreeModel.documentsVerifies = modele.documentsVerifies;
        this.state.navigationAvitaillementEntreeModel.observations = modele.observations;
        this.state.navigationAvitaillementEntreeModel.resultatControle = modele.resultatControle;


    }

    updateModelProprietairesPersonnesConcernees = (modele) => {
        this.state.navigationAvitaillementEntreeModel.proprietaires = modele.proprietaires;
        this.state.navigationAvitaillementEntreeModel.intervenants = modele.intervenants;
    }


    static getDerivedStateFromProps(props, state) {

        if (
            props.navigationAvitaillementEntreeModel && props.index !== state.index
        ) {
            return {
                navigationAvitaillementEntreeModel: props.navigationAvitaillementEntreeModel,// update the value of specific key
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
                <ActifsRapportAvitaillementEntreeMainBlock index={this.props.index} navigationAvitaillementEntreeModel={this.state.navigationAvitaillementEntreeModel} readOnly={this.props.readOnly} update={this.updateModelNavigationAvitaillementEntree} />
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






export default ActifsRapportAvitaillementEntreeBlock;




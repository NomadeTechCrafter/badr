import React from "react";
import { ScrollView, FlatList } from "react-native";
import { View } from "react-native";
import { Checkbox, TextInput, Text, RadioButton } from 'react-native-paper';
import { connect } from "react-redux";
/**Custom Components */
import {
    ComBadrCardBoxComp,
    ComAccordionComp,
    ComBasicDataTableComp,
    ComBadrListComp,
    ComBadrButtonIconComp,
} from '../../../../commons/component';
import translate from "../../../../commons/i18n/ComI18nHelper";
import style from '../style/dtpsSortieStyle';
import { Divider } from 'react-native-paper';
import { VALIDER_DTPS_SORTIE_REQUEST } from "../state/dtpsSortieConstants";
import { request } from "../state/actions/dtpsValiderSortieAction";

class dtpsSortieResultScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null
        };
        if (this.props.data && this.props.data?.listeNumScelle) {
            console.log(JSON.stringify(Object.values(this.props.data?.listeNumScelle)));
        }
        this.cols = [
            {
                code: 'numeroMessage',
                libelle: translate('dtps.numeroMessage'),
                width: 150,
            },
            {
                code: 'dateMessage',
                libelle: translate('dtps.dateMessage'),
                width: 180,
            },
            {
                code: 'dateCreation',
                libelle: translate('dtps.dateCreation'),
                width: 180,
            },
            {
                code: 'referenceDeclaration',
                libelle: translate('dtps.referenceDeclaration'),
                width: 180,
            },
            {
                code: 'nomOperateurAutorise',
                libelle: translate('dtps.nomOperateurAutorise'),
                width: 200,
            },
            {
                code: 'portSec',
                libelle: translate('dtps.portSec'),
                width: 150,
            },
            {
                code: 'referenceDs',
                libelle: translate('dtps.referenceDs'),
                width: 180,
            },
            {
                code: 'typeDs',
                libelle: translate('dtps.typeDs'),
                width: 150,
            },
        ];
        this.chauffeursCols = [
            {
                code: 'nomChauffeur',
                libelle: translate('dtps.nomChauffeur'),
                width: 150,
            },
            {
                code: 'prenomChauffeur',
                libelle: translate('dtps.prenomChauffeur'),
                width: 150,
            },
            {
                code: 'typeIdentifiantChauffeur',
                libelle: translate('dtps.typeIdentifiantChauffeur'),
                width: 150,
            },
            {
                code: 'identifiantChauffeur',
                libelle: translate('dtps.identifiantChauffeur'),
                width: 150,
            },
            {
                code: 'paysPasseportChauffeur',
                libelle: translate('dtps.paysPasseportChauffeur'),
                width: 150,
            },
        ];
        this.lotsCols = [
            {
                code: 'referenceLot',
                libelle: translate('dtps.referenceLot'),
                width: 150,
            },
            {
                code: 'codeLieuChargement',
                libelle: translate('dtps.codeLieuChargement'),
                width: 150,
            },
        ];
        this.scannerCols = [
            {
                code: 'dateScannage',
                libelle: translate('dtps.scanner.dateScannage'),
                width: 180,
            },
            {
                code: 'agent',
                libelle: translate('dtps.scanner.agent'),
                width: 200,
            },
            {
                code: 'resultat',
                libelle: translate('dtps.scanner.resultat'),
                width: 200,
            },
            {
                code: 'commentaire',
                libelle: translate('dtps.scanner.commentaire'),
                width: 300,
            },
        ];
    }
    
    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            // let action1 = this.buildInitConsultationTIActionInit();
            // this.props.actions.dispatch(action1);
            // let action = this.buildInitConsultationTIAction();
            // this.props.actions.dispatch(action);
            // this.setState({
            //     ...initialState,
            //     codeIG: '',
            //     libelleIG: '',
            //     positionTarifaire: '',
            //     errorMessage: '',
            //     date: moment(new Date()).format('DD/MM/YYYY')
            // });
            // this.positionTarifaireInput.clear();

            this.setState({
                selectedItem: null,
            });
        });
    }
    
    componentWillUnmount() {
        this.unsubscribe();
    }


    onItemSelected = (item) => {
        this.setState({
            selectedItem: item,
        });
        console.log(JSON.stringify(this.state.selectedItem));
        console.log(JSON.stringify(item));
    };

    vaiderSortie = () => {
        console.log(JSON.stringify(this.state.selectedItem));
        console.log(JSON.stringify(this.state.selectedItem?.id));
        let action = request({
            type: VALIDER_DTPS_SORTIE_REQUEST,
            value: {
                id: this.state.selectedItem?.id,
            },
        });
        this.props.navigation.navigate('Recherche', {
            login: this.state.login,
            first: true,
        });
        this.props.actions.dispatch(action);
    };

    render() {
        return (
            <View style={style.container}>
                <ScrollView>
                    <ComBasicDataTableComp
                        ref="_badrTable"
                        id="DtpsSortie"
                        rows={this.props.data}
                        cols={this.cols}
                        totalElements={this.props.data?.length}
                        maxResultsPerPage={10}
                        paginate={true}
                        showProgress={this.props.showProgress}
                        onItemSelected={(item) => this.onItemSelected(item)}
                    />
                    <Divider />

                    {(this.state.selectedItem) &&
                        <ComBadrCardBoxComp style={style.cardBox}>
                            <ComAccordionComp
                                badr
                                title={translate('dtps.scelles')}
                            // expanded={true}
                            >
                                <ComBadrListComp
                                    data={this.state.selectedItem?.listeNumScelle}
                                />
                            </ComAccordionComp>
                        </ComBadrCardBoxComp>
                    }

                    {(this.state.selectedItem) &&
                        <ComBadrCardBoxComp style={style.cardBox}>
                            <ComAccordionComp
                                badr
                                title={translate('dtps.matricules')}
                            // expanded={true}
                            >
                                <ComBadrListComp
                                    data={this.state.selectedItem?.listeMatricules}
                                />
                            </ComAccordionComp>
                        </ComBadrCardBoxComp>
                    }

                    {(this.state.selectedItem) &&
                        <ComBadrCardBoxComp style={style.cardBox}>
                            <ComAccordionComp
                                badr
                                title={translate('dtps.lots')}
                            // expanded={true}
                            >
                                <ComBasicDataTableComp
                                    ref="_badrTable"
                                    id="DtpsSortieLots"
                                    rows={this.state.selectedItem?.listLots}
                                    cols={this.lotsCols}
                                    totalElements={this.state.selectedItem?.listLots?.length}
                                    maxResultsPerPage={10}
                                    paginate={true}
                                    showProgress={this.props.showProgress}
                                    onItemSelected={(item) => this.onItemSelected(item)}
                                />
                            </ComAccordionComp>
                        </ComBadrCardBoxComp>
                    }

                    {(this.state.selectedItem) &&
                        <ComBadrCardBoxComp style={style.cardBox}>
                            <ComAccordionComp
                                badr
                                title={translate('dtps.chauffeurs')}
                            // expanded={true}
                            >
                                <ComBasicDataTableComp
                                    ref="_badrTable"
                                    id="DtpsSortieChauffeurs"
                                    rows={this.state.selectedItem?.listeChauffeurs}
                                    cols={this.chauffeursCols}
                                    totalElements={this.state.selectedItem?.listeChauffeurs?.length}
                                    maxResultsPerPage={10}
                                    paginate={true}
                                    showProgress={this.props.showProgress}
                                    onItemSelected={(item) => this.onItemSelected(item)}
                                />
                            </ComAccordionComp>
                        </ComBadrCardBoxComp>
                    }

                    {(this.state.selectedItem) &&
                        <ComBadrCardBoxComp style={style.cardBox}>
                            <ComAccordionComp
                                badr
                                title={translate('dtps.scannerTitle')}
                            // expanded={true}
                            >
                                <ComBasicDataTableComp
                                    ref="_badrTable"
                                id="DtpsSortieChauffeurs"
                                rows={this.state.selectedItem?.resultatsScanners ? this.state.selectedItem?.resultatsScanners : []}
                                    cols={this.scannerCols}
                                    totalElements={0}
                                    maxResultsPerPage={10}
                                    paginate={true}
                                    showProgress={this.props.showProgress}
                                    onItemSelected={(item) => this.onItemSelected(item)}
                                />
                            </ComAccordionComp>
                        </ComBadrCardBoxComp>
                    }

                    {(this.state.selectedItem) &&
                        <ComBadrCardBoxComp style={style.cardBox}>

                            <ComBadrButtonIconComp
                                onPress={() => this.vaiderSortie()}
                                icon="check"
                                style={style.buttonIcon}
                                loading={this.props.showProgress}
                                text={translate('transverse.valider')}
                            />
                        </ComBadrCardBoxComp>
                    }
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.dtpsSortieReducer };
}

function mapDispatchToProps(dispatch) {
    let actions = { dispatch };
    return {
        actions,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(dtpsSortieResultScreen);

import React from "react";
import { Col, Grid, Row } from "react-native-easy-grid";
import { Checkbox } from "react-native-paper";
import { connect } from "react-redux";
import { ComAccordionComp, ComBadrCardBoxComp, ComBadrLibelleComp, ComBasicDataTableComp } from "../../../../../../../commons/component";
import translate from "../../../../../../../commons/i18n/ComI18nHelper";
import { CustomStyleSheet } from "../../../../../../../commons/styles/ComThemeStyle";
import styles from '../../../../style/controleStyle';

class ControleListeDocsExigi extends React.Component {

    constructor(props) {
        super(props);
        this.composantTablesColsListeDocs = this.buildComposantsColumnsListeDocs();
    }

    buildComposantsColumnsListeDocs = () => {
        return [
            {
                code: 'documentAnnexe.numeroOrdreArticle',
                libelle: translate('controle.doc'),
                width: 180,
            },
            {
                code: 'documentAnnexe.portee',
                libelle: translate('controle.portee'),
                width: 180,
            },
            {
                code: 'documentAnnexe.numeroOrdreArticle',
                libelle: translate('controle.nArticle'),
                width: 180,
            },
            {
                code: 'documentAnnexe.reconnu',
                libelle: translate('controle.reconnu'),
                width: 180,
                render: (row) => {
                    return (<Checkbox
                        color={'#009ab2'}
                        status={
                            row.documentAnnexe.reconnu
                                ? 'checked'
                                : 'unchecked'
                        }
                        disabled={this.props.isConsultation || row.reconnuDisabled}
                        onPress={() => this.reconnuChange(row)}
                    />);
                }
            },
            {

                code: 'documentAnnexe.demandeConsignation',
                libelle: translate('controle.consignation'),
                width: 180,

                render: (row) => {
                    return (<Checkbox
                        color={'#009ab2'}
                        status={
                            row.documentAnnexe.demandeConsignation
                                ? 'checked'
                                : 'unchecked'
                        }
                        disabled={this.props.isConsultation || row.consignationDisabled}
                        onPress={() => this.demandeConsignationChange(row)}
                    />);
                }

                
            },
            {
                code: 'decisionMCI',
                libelle: translate('controle.decision'),
                width: 300,
            },
            {
                code: 'documentAnnexe.dateEffet',
                libelle: translate('controle.dateOperation'),
                width: 180,
            },
            {
                code: 'consignation',
                libelle: translate('controle.observation'),
                width: 180,
            }
        ];
    };

    reconnuChange = (row) => {
        
        row.documentAnnexe.reconnu = !row
                .documentAnnexe.reconnu;
        
        
        if (row.documentAnnexe.reconnu) {
            row.documentAnnexe.demandeConsignation=false;
            row.consignationDisabled=true;
        } else {
            if (!row.documentAnnexe.impactFiscal && (!this.props.isRegimeSuspensif || this.props.isRegimeSuspensif==='0')) {
                row.consignationDisabled=false;
            } else {
                row.consignationDisabled =true;
                row.documentAnnexe.demandeConsignation = false;
            }
        }
        this.props.updateControle();
        this.setState({etat:true});
    };

    demandeConsignationChange = (row) => {
        
        row.documentAnnexe.demandeConsignation = !row.documentAnnexe.demandeConsignation;

        if (!row.documentAnnexe.demandeConsignation) {
            if (row.documentAnnexe.impactFiscal && (!this.props.isRegimeSuspensif || this.props.isRegimeSuspensif === '0')) {
                row.consignationDisabled = false;
                row.reconnuDisabled = false;

            } else {

                row.consignationDisabled = true;
                row.reconnuDisabled = false;
            }
        } else {
            row.reconnuDisabled = true;
        } 
        this.props.updateControle();
        this.setState({ etat: true });

    };

    render() {
        console.log(JSON.stringify(this.props?.listeDocs));
        let listeDocs = this.props?.listeDocs ? this.props?.listeDocs : [];
        return (
            < ComBadrCardBoxComp style={styles.cardBox} >
                <ComAccordionComp title={translate('controle.listDocExigible')} expanded={true}>
                    <ComBasicDataTableComp
                        badr
                        onRef={(ref) => (this.badrComposantsTable = ref)}
                        ref="_badrTable"
                        hasId={false}
                        id="idComposant"
                        rows={listeDocs}
                        cols={this.composantTablesColsListeDocs}
                        totalElements={
                            listeDocs?.length
                                ? listeDocs?.length
                                : 0
                        }
                        maxResultsPerPage={5}
                        paginate={true}
                    />
                </ComAccordionComp>
            </ComBadrCardBoxComp >
        );
    }
}

function mapStateToProps(state) {
    return { ...state.controleCommonReducer };
}

export default connect(mapStateToProps, null)(ControleListeDocsExigi);
import React from "react";
import { Col, Grid, Row } from "react-native-easy-grid";
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
                code: 'numeroVersion',
                libelle: translate('controle.doc'),
                width: 180,
            },
            {
                code: 'intervention',
                libelle: translate('controle.portee'),
                width: 180,
            },
            {
                code: 'nArticle',
                libelle: translate('controle.nArticle'),
                width: 180,
            },
            {
                code: 'reconnu',
                libelle: translate('controle.reconnu'),
                width: 180,
            },
            {
                code: 'consignation',
                libelle: translate('controle.consignation'),
                width: 180,
            },
            {
                code: 'consignation',
                libelle: translate('controle.decision'),
                width: 300,
            },
            {
                code: 'consignation',
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

    render() {
        let listeDocs = this.state?.declaration?.documentAnnexeResultVOs ? this.state?.declaration?.documentAnnexeResultVOs : [];
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
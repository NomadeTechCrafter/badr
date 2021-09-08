import React from "react";
import { ComBadrCardBoxComp, ComBadrLibelleComp } from "../../../../../../../commons/component";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from "react-redux";
import { CustomStyleSheet } from "../../../../../../../commons/styles/ComThemeStyle";
import translate from "../../../../../../../commons/i18n/ComI18nHelper";


class ControleRefDeclarationBlock extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <ComBadrCardBoxComp noPadding={true}>
                <Grid>
                    <Row style={CustomStyleSheet.whiteRow}>
                        <Col size={2}>
                            <ComBadrLibelleComp withColor={true}>
                                {translate('transverse.bureau')}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                            <ComBadrLibelleComp withColor={true}>
                                {translate('transverse.regime')}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                            <ComBadrLibelleComp withColor={true}>
                                {translate('transverse.annee')}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                            <ComBadrLibelleComp withColor={true}>
                                {translate('transverse.serie')}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={1}>
                            <ComBadrLibelleComp withColor={true}>
                                {translate('transverse.cle')}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                            <ComBadrLibelleComp withColor={true}>
                                {translate('mainlevee.numVoyage')}
                            </ComBadrLibelleComp>
                        </Col>
                    </Row>
                    <Row style={CustomStyleSheet.lightBlueRow}>
                        <Col size={2}>
                            <ComBadrLibelleComp withColor={false}>
                                {this.state?.refDeclaration?.slice(0, 3)}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                            <ComBadrLibelleComp withColor={false}>
                                {this.state?.refDeclaration?.slice(3, 6)}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                            <ComBadrLibelleComp withColor={false}>
                                {this.state?.refDeclaration?.slice(6, 10)}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                            <ComBadrLibelleComp withColor={false}>
                                {this.state?.refDeclaration?.slice(10, 17)}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={1}>
                            <ComBadrLibelleComp withColor={false}>
                                {this.state?.cle}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                            <ComBadrLibelleComp withColor={false}>
                                {this.state?.numeroVoyage}
                            </ComBadrLibelleComp>
                        </Col>
                    </Row>
                </Grid>
            </ComBadrCardBoxComp>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.controleCommonReducer };
}

export default connect(mapStateToProps, null)(ControleRefDeclarationBlock);
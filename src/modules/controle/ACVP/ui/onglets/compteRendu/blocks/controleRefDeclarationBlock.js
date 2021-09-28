import React from "react";
import { ComBadrCardBoxComp, ComBadrLibelleComp } from "../../../../../../../commons/component";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from "react-redux";
import { CustomStyleSheet } from "../../../../../../../commons/styles/ComThemeStyle";
import translate from "../../../../../../../commons/i18n/ComI18nHelper";
import { StyleSheet } from "react-native";


class ControleRefDeclarationBlock extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    cleDUM = function (regime, serie) {
        let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
        /*while (serie.length < 6) {
            serie = '0' + serie;
          }*/
        if (serie?.length > 6) {
            let firstSerie = serie?.substring(0, 1);
            if (firstSerie == '0') {
                serie = serie?.substring(1, 7);
            }
        }
        let obj = regime + serie;
        let RS = obj % 23;
        alpha = alpha.charAt(RS);
        return alpha;
    };

    render() {
        const styles = StyleSheet.create({
            container: {
                marginTop: 50,
            },
            bigBlue: {
                color: 'blue',
                fontWeight: 'bold',
                fontSize: 30,
            },
            red: {
                backgroundColor: 'red',
            },
        });
        // const cle = this.cleDUM(this.props?.refDeclaration?.refDeclaration?.slice(3, 6), this.props?.refDeclaration?.refDeclaration?.slice(10, 17));
        return (
            <ComBadrCardBoxComp noPadding={true} style={styles.red}>
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
                                {this.props?.refDeclaration?.refDeclaration?.slice(0, 3)}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                            <ComBadrLibelleComp withColor={false}>
                                {this.props?.refDeclaration?.refDeclaration?.slice(3, 6)}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                            <ComBadrLibelleComp withColor={false}>
                                {this.props?.refDeclaration?.refDeclaration?.slice(6, 10)}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                            <ComBadrLibelleComp withColor={false}>
                                {this.props?.refDeclaration?.refDeclaration?.slice(10, 17)}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={1}>
                            <ComBadrLibelleComp withColor={false}>
                                {this.cleDUM(this.props?.refDeclaration?.refDeclaration?.slice(3, 6), this.props?.refDeclaration?.refDeclaration?.slice(10, 17))}
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

// function mapStateToProps(state) {
//     return { ...state.controleCommonReducer };
// }

export default connect(null, null)(ControleRefDeclarationBlock);
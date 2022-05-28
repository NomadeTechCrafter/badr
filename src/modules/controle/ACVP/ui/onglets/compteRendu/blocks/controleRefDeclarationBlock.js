import React from "react";
import { ComBadrCardBoxComp, ComBadrLibelleComp } from "../../../../../../../commons/component";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from "react-redux";
import { CustomStyleSheet } from "../../../../../../../commons/styles/ComThemeStyle";
import translate from "../../../../../../../commons/i18n/ComI18nHelper";
import { ScrollView, StyleSheet, Text, View } from "react-native";


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
        const libelle = {
            fontSize: 14,
            color: '#006acd',
            fontWeight: 'bold',
        };
        const value = {
            fontSize: 14,
            fontWeight: 'bold',
        };
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
                paddingHorizontal: 10,
                paddingVertical: 10,
                width: '100%'
            },
            orange: {
                backgroundColor: 'orange',
                paddingHorizontal: 10,
                paddingVertical: 10,
                width: '100%'
            },
            
            marg: {
                // margin: 10,
                // marginBottom: 10,
                // marginRight: 15
                width: 75,
            },
            leftMargin: {
                // margin: 10,
                // marginBottom: 10,
                marginLeft: 35,
                // width: 75,
                color: 'white',
            },
            whiteTextColor: {
                color: 'white',
            },
            whiteTextColorBold: {
                color: 'white',
                fontWeight: 'bold',
            },
            bold: {
                fontWeight: 'bold',
            },
            width100: { width: '100%' },
            cardBoxInfoDum: {
                flexDirection: 'column',
                margin: 10,
            },
            flexDirectionRow: {
                flexDirection: 'row',
            },
            margtb: {
                marginBottom: 10,
            },
            libelleS: {
                ...libelle,
                flex: 1,
            },
            libelleL: {
                ...libelle,
                flex: 3,
            },
            libelleM: {
                ...libelle,
                flex: 2,
            },
            valueS: {
                ...value,
                flex: 1,
            },
            valueM: {
                ...value,
                flex: 2,
            },
            valueL: {
                ...value,
                flex: 3,
            },
        });

        let circuit = ''
        let styleCircuit = '';
        switch (this.props?.declaration?.decision) {
            case 'AC':
                circuit = 'Circuit Orange';
                styleCircuit = styles.orange;
                break;
            case 'VP':
                circuit = 'Circuit Rouge Partiel';
                styleCircuit = styles.red;
                break;
            case 'VI':
                circuit = 'Circuit Rouge Intégral';
                styleCircuit = styles.red;
                break;

            default:
                break;
        }
        let decisionCircuit = this.props?.declaration?.refDecisionSelectivite?.libelle + ' (' + this.props?.declaration?.decisionScanner + ')';

        return (
            <View style={styles.width100}>
                <ScrollView
                    style={styles.width100}
                    ref={(node) => {
                        this.horizontalScrollView = node;
                    }}
                    key="horizontalScrollView"
                    horizontal={true}>
                    <ScrollView key="verticalScrollView" style={styles.width100}>
                        <View style={[styles.flexDirectionRow, styles.margtb]}>
                            <ComBadrCardBoxComp noPadding={true} style={styleCircuit}>
                                <Grid>
                                    <Col>
                                        <Row style={CustomStyleSheet.whiteRow}>
                                            <Col>
                                                <ComBadrLibelleComp withColor={true} style={styles.marg}>
                                                    {translate('transverse.bureau')}
                                                </ComBadrLibelleComp>
                                            </Col>
                                            <Col>
                                                <ComBadrLibelleComp withColor={true} style={styles.marg}>
                                                    {translate('transverse.regime')}
                                                </ComBadrLibelleComp>
                                            </Col>
                                            <Col>
                                                <ComBadrLibelleComp withColor={true} style={styles.marg}>
                                                    {translate('transverse.annee')}
                                                </ComBadrLibelleComp>
                                            </Col>
                                            <Col>
                                                <ComBadrLibelleComp withColor={true} style={styles.marg}>
                                                    {translate('transverse.serie')}
                                                </ComBadrLibelleComp>
                                            </Col>
                                            <Col>
                                                <ComBadrLibelleComp withColor={true} style={styles.marg}>
                                                    {translate('transverse.cle')}
                                                </ComBadrLibelleComp>
                                            </Col>
                                            <Col>
                                                <ComBadrLibelleComp withColor={true} style={styles.marg}>
                                                    {translate('dedouanement.info.numVoyage')}
                                                </ComBadrLibelleComp>
                                            </Col>
                                        </Row>
                                        <Row style={CustomStyleSheet.lightBlueRow}>
                                            <Col>
                                                <ComBadrLibelleComp withColor={false} style={styles.marg}>
                                                    {this.props?.refDeclaration?.slice(0, 3)}
                                                </ComBadrLibelleComp>
                                            </Col>
                                            <Col>
                                                <ComBadrLibelleComp withColor={false} style={styles.marg}>
                                                    {this.props?.refDeclaration?.slice(3, 6)}
                                                </ComBadrLibelleComp>
                                            </Col>
                                            <Col>
                                                <ComBadrLibelleComp withColor={false} style={styles.marg}>
                                                    {this.props?.refDeclaration?.slice(6, 10)}
                                                </ComBadrLibelleComp>
                                            </Col>
                                            <Col>
                                                <ComBadrLibelleComp withColor={false} style={styles.marg}>
                                                    {this.props?.refDeclaration?.slice(10, 17)}
                                                </ComBadrLibelleComp>
                                            </Col>
                                            <Col>
                                                <ComBadrLibelleComp withColor={false} style={styles.marg}>
                                                    {this.cleDUM(this.props?.refDeclaration?.slice(3, 6), this.props?.refDeclaration?.slice(10, 17))}
                                                </ComBadrLibelleComp>
                                            </Col>
                                            <Col>
                                                <ComBadrLibelleComp withColor={false} style={styles.marg}>
                                                    {this.props?.declaration?.numeroVoyage}
                                                </ComBadrLibelleComp>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col style={styles.leftMargin} >
                                        <Row>
                                        </Row>
                                        <Row>
                                            <Col><Text style={styles.valueL, styles.whiteTextColor}>{circuit} </Text></Col>
                                        </Row>
                                        <Row>
                                        </Row>
                                    </Col>
                                    <Col style={styles.leftMargin} >
                                        <Row>
                                        </Row>
                                        <Row>
                                            <Col><Text style={styles.whiteTextColorBold}>Décision de sélectivité : {decisionCircuit}</Text></Col>
                                        </Row>
                                        <Row>
                                        </Row>
                                    </Col>
                                </Grid>
                            </ComBadrCardBoxComp>
                        </View >
                    </ScrollView>
                </ScrollView>
            </View >
        );
    }
}


export default connect(null, null)(ControleRefDeclarationBlock);
import React from 'react';
import { StyleSheet } from 'react-native';
import {
    ComBadrCardBoxComp,
    ComBadrLibelleComp,
} from '../../../../../../commons/component';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';

export default class LiqManuelleOperationLiqBlock extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { liquidationVO } = this.props;
        return (
            <ComBadrCardBoxComp>
                {/* Bloc opération de Liquidation*/}
                <Grid>
                    <Row style={{ flex: 1, justifyContent: 'center' }}>
                        <ComBadrLibelleComp
                            withColor={true}
                            style={{ fontSize: 14, color: 'grey' }}>
                            {translate('liq.recapitulation.operationsLiquidationEC')}
                        </ComBadrLibelleComp>
                    </Row>
                    <Row style={styles.whiteRow}>
                        <Col size={2}>
                            <ComBadrLibelleComp withColor={true}>
                                {translate('liq.natureOperationPrincipale')}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                            <ComBadrLibelleComp>
                                {liquidationVO.refNatureOperationLibelle}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={1}>
                            <ComBadrLibelleComp withColor={true}>
                                {translate('liq.numeroOperation')}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={1}>
                            <ComBadrLibelleComp>
                                {liquidationVO.numOrdreOperation}
                            </ComBadrLibelleComp>
                        </Col>
                    </Row>
                    {liquidationVO.refOperationSimultanee &&
                        <Row style={styles.whiteRow}>
                            <Col size={2}>
                                <ComBadrLibelleComp withColor={true}>
                                    {translate('liq.natureOperationSimultane')}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={2}>
                                <ComBadrLibelleComp>
                                    {liquidationVO.refOperationSimultanee.refNatureOperationLibelle}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={1}>
                                <ComBadrLibelleComp withColor={true}>
                                    {translate('liq.numeroOperation')}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={1}>
                                <ComBadrLibelleComp>
                                    {liquidationVO.refOperationSimultanee.numOrdreOperation}
                                </ComBadrLibelleComp>
                            </Col>
                        </Row>
                    }
                    <Row style={styles.whiteRow}>
                        <Col size={2}>
                            <ComBadrLibelleComp withColor={true}>
                                {translate('liq.typeRecette')}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                            <ComBadrLibelleComp>
                                {liquidationVO.refTypeRecetteLibelle}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={2} />
                    </Row>
                </Grid>
            </ComBadrCardBoxComp>
        );
    }
}


const styles = StyleSheet.create({
    whiteRow: {
        paddingVertical: 12,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
});

import React from 'react';
import {
    ComBadrCardBoxComp,
    ComBadrLibelleComp,
} from '../../../../../../commons/component';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';

export default class LiqArticleOperationLiqBlock extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { liquidationVO } = this.props;
        return (
            <ComBadrCardBoxComp>
                {/* Bloc opération de Liquidation*/}
                <Grid>
                    <Row style={CustomStyleSheet.center}>
                        <ComBadrLibelleComp withColor={true}>
                            {translate('liq.recapitulation.operationsLiquidationEC')}
                        </ComBadrLibelleComp>
                    </Row>
                    <Row style={CustomStyleSheet.whiteRow}>
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
                        <Row style={CustomStyleSheet.whiteRow}>
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
                    <Row style={CustomStyleSheet.whiteRow}>
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

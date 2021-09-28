import React from 'react';

import {
    ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';

import _ from 'lodash';
import { ComAccordionComp, ComBadrKeyValueComp, ComBasicDataTableComp } from '../../../../../../commons/component';
import ControleRefDeclarationBlock from '../compteRendu/blocks/controleRefDeclarationBlock';

class ControleReconnaissanceScreen extends React.Component {
    constructor(props) {
        super(props);
        this.cols = [
            {
                code: 'vo.typeDS',
                libelle: translate('transverse.typeDS'),
                width: 180,
            },
            {
                code: 'referenceDS',
                libelle: translate('transverse.refDS'),
                width: 180,
            },
            {
                code: 'vo.lieuChargement',
                libelle: translate('transverse.lieuChargement'),
                width: 180,
            },
            {
                code: 'vo.referenceLot',
                libelle: translate('transverse.referenceLot'),
                width: 180,
            },
            {
                code: 'vo.poidsLot',
                libelle: translate('transverse.poidsBrut'),
                width: 180,
            },
            {
                code: 'vo.nombreContenant',
                libelle: translate('transverse.nbreContenant'),
                width: 180,
            },
            {
                code: 'bad',
                libelle: translate('transverse.bad'),
                width: 180,
            },
        ];
    }
    render() {
        const refDeclaration = this.props?.data ? this.props?.data : '';
        const preapurements = this.props?.data?.init?.listDedDumPreapVOs ? this.props?.data?.init?.listDedDumPreapVOs : [];
        return (
            <ScrollView>
                <ControleRefDeclarationBlock refDeclaration={refDeclaration} />
                <ComBasicDataTableComp
                    badr
                    onRef={(ref) => (this.badrComposantsTable = ref)}
                    ref="_badrTable"
                    hasId={false}
                    id="idComposant"
                    rows={preapurements}
                    cols={this.cols}
                    totalElements={
                        preapurements?.length
                            ? preapurements?.length
                            : 0
                    }
                    maxResultsPerPage={5}
                    paginate={true}
                />

            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.controleCommonReducer };
}

export default connect(mapStateToProps, null)(ControleReconnaissanceScreen);
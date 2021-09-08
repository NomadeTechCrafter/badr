import React from 'react';

import {
    ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';

import _ from 'lodash';
import { ComAccordionComp, ComBadrKeyValueComp } from '../../../../../../commons/component';
import ControleRefDeclarationBlock from '../compteRendu/blocks/controleRefDeclarationBlock';

class ControleBonDelivrerScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ScrollView>
                <ControleRefDeclarationBlock />
                <ComAccordionComp title={'Informations de la reconnaissance'} expanded={true}>
                    <ComBadrKeyValueComp
                        libelle={translate('reconnaissance.core.nature')}
                        libelleSize={3}
                        value={'test'}
                    />
                    <ComBadrKeyValueComp
                        libelle={translate('reconnaissance.core.marque')}
                        libelleSize={3}
                        value={'test'}
                    />
                    <ComBadrKeyValueComp
                        libelle={translate('reconnaissance.core.poids')}
                        libelleSize={3}
                        value={'test'}
                    />
                    <ComBadrKeyValueComp
                        libelle={translate('reconnaissance.core.nombreColisIdentifies')}
                        libelleSize={3}
                        value={'test'}
                    />
                    <ComBadrKeyValueComp
                        libelle={translate('reconnaissance.core.nombreColisVisites')}
                        libelleSize={3}
                        value={'test'}
                    />
                    <ComBadrKeyValueComp
                        libelle={translate('reconnaissance.core.description')}
                        libelleSize={3}
                        value={'test'}
                    />
                    <ComBadrKeyValueComp
                        libelle='CIN agent visiteur'
                        libelleSize={3}
                        value={'test'}
                    />
                    <ComBadrKeyValueComp
                        libelle="Date d'affectation"
                        libelleSize={3}
                        value={'test'}
                    />
                </ComAccordionComp>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.controleCommonReducer };
}

export default connect(mapStateToProps, null)(ControleBonDelivrerScreen);
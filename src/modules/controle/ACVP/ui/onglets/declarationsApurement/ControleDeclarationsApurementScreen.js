import React from 'react';
import { View, Dimensions } from 'react-native';
import { Checkbox, TextInput, Text, RadioButton } from 'react-native-paper';

import {
    ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';

import _ from 'lodash';
import { ComAccordionComp, ComBadrCardBoxComp, ComBadrKeyValueComp, ComBasicDataTableComp } from '../../../../../../commons/component';
import ControleRefDeclarationBlock from '../compteRendu/blocks/controleRefDeclarationBlock';
import styles from '../../../style/controleStyle';
import DedRedressementRow from '../../../../../dedouanement/redressement/ui/common/DedRedressementRow';

class ControleDeclarationsApurementScreen extends React.Component {
    constructor(props) {
        super(props);
        this.cols = [
            {
                code: 'referenceEnregistrement',
                libelle: translate('newmlv.delivrerMainlevee.listeD17D20.reference'),
                width: 180,
            },
            {
                code: 'dateCreation',
                libelle: translate('newmlv.delivrerMainlevee.listeD17D20.dateCreation'),
                width: 180,
            },
            {
                code: 'numeroVersionCourante',
                libelle: translate('newmlv.delivrerMainlevee.listeD17D20.numeroVersion'),
                width: 180,
            },
        ];
    }

    render() {
        const listD17D20 = this.props?.data?.init?.declarationsApurementTryptique ? this.props?.data?.init?.declarationsApurementTryptique : [];
        return (
            <ScrollView>
                <ComBadrCardBoxComp style={styles.cardBox}>
                    <ComAccordionComp title="Liste des déclarations d'apurement D17/D20" expanded={true}>
                        <View style={styles.container}>
                            <Text style={styles.nombreResult, styles.libelle}>
                                {translate('etatChargement.nombreD17D20')} :
                                <Text style={styles.libelle}>
                                    {'    ' + listD17D20?.length}
                                </Text>
                            </Text>
                            <DedRedressementRow zebra={true}>
                                <ComBasicDataTableComp
                                    badr
                                    onRef={(ref) => (this.badrComposantsTable = ref)}
                                    ref="_badrTable"
                                    hasId={false}
                                    id="idComposant"
                                    rows={listD17D20}
                                    cols={this.cols}
                                    totalElements={
                                        listD17D20?.length
                                            ? listD17D20?.length
                                            : 0
                                    }
                                    maxResultsPerPage={5}
                                    paginate={true}
                                />
                            </DedRedressementRow>
                        </View>
                    </ComAccordionComp>
                </ComBadrCardBoxComp>

            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.controleCommonReducer };
}

export default connect(mapStateToProps, null)(ControleDeclarationsApurementScreen);
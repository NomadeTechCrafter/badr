import {
    ComContainerComp,
    ComBadrCardBoxComp,
    ComAccordionComp,
    ComBadrButtonComp,
    ComBadrErrorMessageComp,
    ComBadrInfoMessageComp,
    ComBadrProgressBarComp,
    ComBadrToolbarComp,
    ComBadrLibelleComp,
    ComBadrButtonIconComp,
    ComBasicDataTableComp,
} from '../../../../../../commons/component';
import React from 'react';

import { Checkbox, TextInput, Text, RadioButton } from 'react-native-paper';
/**i18n */
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import _ from 'lodash';
import { connect } from 'react-redux';

import { ScrollView, View } from 'react-native';
import styles from '../../../style/controleStyle';
import ControleRefDeclarationBlock from '../compteRendu/blocks/controleRefDeclarationBlock';
import DedRedressementRow from '../../../../../dedouanement/redressement/ui/common/DedRedressementRow';

class ControleInfoScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log(JSON.stringify(this.props));
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        return (
            <ScrollView>
                <ControleRefDeclarationBlock />
                {/* Historique des comptes rendu de contrôle */}
                <ComBadrCardBoxComp style={styles.cardBox}>
                    <ComAccordionComp expanded={true}
                        disable={
                            !(this.props?.data?.init.historiqueCompte?.length > 0)
                        }
                        title={translate('controle.historiqueCompteRendu')}>
                        
                        <DedRedressementRow>
                            {/* <Text>{this.state?.declaration.redressement}</Text> */}
                            <TextInput
                                style={styles.flexDirectionRow, styles.libelleM}
                                value={this.props?.data?.init.historiqueCompte}
                                multiline={true}
                                numberOfLines={10}
                                disabled={true}
                            // onChangeText={(text) =>
                            //     this.setState({ annotation: text })
                            // }
                            />
                        </DedRedressementRow>

                        {/* {this.state?.declaration?.historiqueCompte?.length > 0 && (
                            <View>
                                <Text>{this.state?.declaration?.historiqueCompte}</Text>
                            </View>
                        )} */}
                    </ComAccordionComp>
                </ComBadrCardBoxComp>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.controleCommonReducer };
}

export default connect(mapStateToProps, null)(ControleInfoScreen);
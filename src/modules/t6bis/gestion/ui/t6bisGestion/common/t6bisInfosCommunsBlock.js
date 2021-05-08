import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ComAccordionComp, ComBadrCardSectionComp } from '../../../../../../commons/component';
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import { ComSessionService } from '../../../../../../commons/services/session/ComSessionService';
import { accentColor, atShadowColor, blueLabelColor, darkGrayColor, lightWhiteColor } from '../../../../../../commons/styles/ComThemeStyle';
import { getValueByPath, getSerie, getValueByPaths, format, getState} from "../../../../utils/t6bisUtils";







class T6bisInfosCommunsBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };
    }



    componentDidMount = async () => {


    }

    componentWillUnmount() {
        console.log('6bisInfosCommunsBlock componentWillUnmount');
    }



    reset = () => {
        console.log('reset');
    };



    render() {

        let t6bis = this.props.t6bis;
        let fieldsetcontext = this.props.fieldsetcontext;
        let remplace6bis = getValueByPath('referenceT6BisRemplacee', t6bis);
        let title = this.props.mode + '  ' + translate('t6bisGestion.tabs.entete.informationsCommunes');
        const userObject = ComSessionService.getInstance().getUserObject();
        let userName = userObject.prenomAgent + " " + userObject.nomAgent;
        let dateCreation = getValueByPath('dateCreation', t6bis);
        title += '  ' + format(dateCreation);
        let nomIntervenant = (t6bis?.intervenantVO?.nomIntervenant) ? t6bis?.intervenantVO?.nomIntervenant:'';
        let prenomIntervenant = (t6bis?.intervenantVO?.prenomIntervenant) ? t6bis?.intervenantVO?.prenomIntervenant: '';
        let numeroDocumentIdentite = (t6bis?.intervenantVO?.numeroDocumentIndentite) ? t6bis?.intervenantVO?.numeroDocumentIndentite : '';
        return (

            <View>
                <ComAccordionComp title={title} expanded={false}>
                    <ComBadrCardSectionComp style={styles.CardSectionInfo}>
                        <View style={styles.containerLibRow}>
                            <Text style={styles.libelleTitleM}>
                                {translate('t6bisGestion.tabs.entete.bureau')}
                            </Text>
                            <Text style={styles.libelleTitleM}>
                                {translate('t6bisGestion.tabs.entete.annee')}
                            </Text>
                            <Text style={styles.libelleTitleL}>
                                {translate('t6bisGestion.tabs.entete.serie')}
                            </Text>
                        </View>


                        <View style={styles.containerLibRow}>
                            <Text style={styles.libelleValM}>
                                {ComSessionService.getInstance().getCodeBureau()}
                            </Text>
                            <Text style={styles.libelleValM}>
                                {getValueByPath('annee', t6bis)}
                            </Text>
                            <Text style={styles.libelleValL}>
                                {getSerie(getValueByPaths('referenceEnregistrement', 'referenceProvisoire', t6bis))}
                            </Text>
                        </View>
                        <View style={styles.containerLibRow}>
                            <Text style={styles.libelleTitleL}>
                                {translate('t6bisGestion.tabs.entete.type')}
                            </Text>
                            <Text style={styles.libelleTitleM}>
                                {translate('t6bisGestion.tabs.entete.statut')}
                            </Text>
                            <Text style={styles.libelleTitleL}>
                                {translate('t6bisGestion.tabs.entete.date.creation')}
                            </Text>
                            <Text style={styles.libelleTitleL}>
                                {translate('t6bisGestion.tabs.entete.date.enregistrement')}
                            </Text>

                        </View>
                        <View style={styles.containerLibRow}>
                            <Text style={styles.libelleValL}>
                                {
                                    getValueByPath('libelleTypeT6Bis', t6bis)
                                }
                            </Text>
                            <Text style={styles.libelleValM}>
                                {getState(getValueByPath('etat', t6bis))}
                                {(remplace6bis) ? translate('t6bisGestion.tabs.entete.remplace6bis') + remplace6bis:'' }
                            </Text>
                            <Text style={styles.libelleValL}>
                                {format(getValueByPath('dateCreation', t6bis))}
                            </Text>
                            <Text style={styles.libelleValL}>
                                {format(getValueByPath(
                                    'dateEnregistrement',
                                    t6bis
                                ))}
                            </Text>

                        </View>
                        <View style={styles.containerLibRow}>
                            <Text style={styles.libelleTitleM}>
                                {translate('t6bisGestion.tabs.entete.bureauDouane')}
                            </Text>
                            <Text style={styles.libelleTitleL}>
                                {translate('t6bisGestion.tabs.entete.agentDouanier')}
                            </Text>
                            <Text style={styles.libelleTitleL}>
                                {translate('t6bisGestion.tabs.entete.codeAgent')}
                            </Text>
                            <Text style={styles.libelleTitleL}>
                                {translate('t6bisGestion.tabs.entete.redevable')}
                            </Text>
                            <Text style={styles.libelleTitleL}>
                                {translate('t6bisGestion.tabs.entete.codeRedevable')}
                            </Text>
                        </View>


                        <View style={styles.containerLibRow}>
                            <Text style={styles.libelleValM}>
                                {ComSessionService.getInstance().getCodeBureau()}
                            </Text>
                            <Text style={styles.libelleValL}>
                                {userName}
                            </Text>
                            <Text style={styles.libelleValL}>
                                {ComSessionService.getInstance().getLogin()}
                            </Text>
                            <Text style={styles.libelleValL}>
                                {(fieldsetcontext && fieldsetcontext?.operateur) ? fieldsetcontext?.operateur?.libelle : ''}
                                {(!fieldsetcontext || !fieldsetcontext?.operateur) ? nomIntervenant + '  ' + prenomIntervenant : ''}
                            </Text>
                            <Text style={styles.libelleValL}>
                                {(fieldsetcontext && fieldsetcontext?.operateur) ? fieldsetcontext?.operateur?.code : ''}
                                {(!fieldsetcontext || !fieldsetcontext?.operateur) ? numeroDocumentIdentite : ''}
                            </Text>
                        </View>
                    </ComBadrCardSectionComp>



                </ComAccordionComp>

            </View>









        );
    }
}


const libelleTitle = {
    fontSize: 14,
    color: blueLabelColor,
};

const libelleVal = {
    fontSize: 14,
    color: darkGrayColor,
};

const containerRow = {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 6,
    shadowColor: atShadowColor,
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 1,
    elevation: 2,
};

const styles = StyleSheet.create({
    CardSectionInfo: {
        flexDirection: 'column',
        borderRadius: 6,
        padding: 0,
        marginBottom: 10,
    },
    CardSectionValInfoAt: {
        flexDirection: 'column',
        backgroundColor: lightWhiteColor,
    },
    containerLibRow: {
        ...containerRow,
        marginBottom: 5,
        backgroundColor: accentColor,
    },
    containerValRow: {
        ...containerRow,
        backgroundColor: lightWhiteColor,
    },
    libelleTitleS: {
        ...libelleTitle,
        flex: 1,
    },
    libelleTitleM: {
        ...libelleTitle,
        flex: 2,
    },
    libelleTitleL: {
        ...libelleTitle,
        flex: 3,
    },
    libelleValS: {
        ...libelleVal,
        flex: 1,
    },
    libelleValM: {
        ...libelleVal,
        flex: 2,
    },
    libelleValL: {
        ...libelleVal,
        flex: 3,
    },
});


export default T6bisInfosCommunsBlock;
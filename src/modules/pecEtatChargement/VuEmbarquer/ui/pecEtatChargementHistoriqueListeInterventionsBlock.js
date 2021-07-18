import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { ComAccordionComp, ComBasicDataTableComp } from '../../../../commons/component';
import translate from "../../../../commons/i18n/ComI18nHelper";
import styles from '../../../t6bis/gestion/style/t6bisGestionStyle';

class EtatChargementHistoriqueListeInterventionsBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {

        };
        this.cols = [
            {
                code: 'dateOperation',
                libelle: translate('t6bisGestion.tabs.historique.tableauIntervention.date'),
                width: 200,
            },
            {
                code: 'version',
                libelle: translate('etatChargement.version'),
                width: 100,
            },
            {
                code: 'intervention',
                libelle: translate('t6bisGestion.tabs.historique.tableauIntervention.intervention'),
                width: 250,
            },
            {
                code: 'resultatOperation',
                libelle: translate('t6bisGestion.tabs.historique.tableauIntervention.etatResultat'),
                width: 250,
            },

            {
                code: 'intervenant',
                libelle: translate('t6bisGestion.tabs.historique.tableauIntervention.utilisateur'),
                width: 250,
            }, {
                code: 'commentaire',
                libelle: translate('t6bisGestion.tabs.historique.tableauIntervention.commentaire'),
                width: 350,
            }
        ];
    }

    onItemSelected = (row) => {

    };



    componentDidMount() {

    }

    componentDidUpdate() {

    }


    componentWillUnmount() {
    }

    reset = () => {
    };

    render() {
        return (
            <View>
                <Row size={200}>
                    <Col size={200} style={{ ...styles.labelContainer, padding: 10 }}>
                        <View>
                            <ComBasicDataTableComp
                                ref="_badrTable"
                                id="articlesTable"
                                rows={this.props.interventions}
                                cols={this.cols}
                                onItemSelected={this.onItemSelected}
                                totalElements={this.props.interventions?.length}
                                maxResultsPerPage={10}
                                paginate={true}
                                showProgress={this.props.showProgress}
                                withId={false}
                            />
                        </View>
                    </Col>
                </Row>
            </View>
        );
    }
}

export default EtatChargementHistoriqueListeInterventionsBlock;




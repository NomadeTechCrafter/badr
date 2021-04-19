import React from 'react';
import { View } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { ComAccordionComp, ComBasicDataTableComp } from '../../../../../../../commons/component';
import translate from "../../../../../../../commons/i18n/ComI18nHelper";
import styles from "../../../../style/t6bisGestionStyle";





class T6bisHistoriqueListeInterventionsBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {

        };
        this.cols = [
            {
                code: 'dateOperation',
                libelle: translate('t6bisGestion.tabs.historique.tableauIntervention.date'),
                width: 100,
            },

            {
                code: 'intervention',
                libelle: translate('t6bisGestion.tabs.historique.tableauIntervention.intervention'),
                width: 100,
            },
            {
                code: 'etatResultat',
                libelle: translate('t6bisGestion.tabs.historique.tableauIntervention.etatResultat'),
                width: 100,
            },

            {
                code: 'utilisateur',
                libelle: translate('t6bisGestion.tabs.historique.tableauIntervention.utilisateur'),
                width: 100,
            }, {
                code: 'commentaire',
                libelle: translate('t6bisGestion.tabs.historique.tableauIntervention.commentaire'),
                width: 300,
            }



        ];
    }










    onItemSelected = (row) => {

        console.log('T6bisTaxationGlobaleListeTaxationBlock row : ', row);
    };



    componentDidMount() {

        console.log('T6bisArticlesListArticlesBlock componentWillmount');
    }

    componentDidUpdate() {

        /*  if (this.props.route.params?.first) {
             this.refs._badrTable.reset();
         } */
    }


    componentWillUnmount() {
        console.log('T6bisArticlesListArticlesBlock componentWillUnmount');
    }



    reset = () => {
        console.log('T6bisArticlesListArticlesBlock reset');
    };





    render() {
        let taille = (this.props.t6bis.interventions) ? this.props.t6bis.interventions.length : 0;
        console.log('this.props.t6bis.interventions----------------------------------------------', this.props.t6bis.interventions)
        return (

            <ComAccordionComp title={translate('t6bisGestion.tabs.historique.tableauIntervention.nombreInterventions') + taille} expanded={true}>


                <View>




                    <Row size={200}>
                        <Col size={200} style={{ ...styles.labelContainer, padding: 10 }}>

                            <View>
                                <ComBasicDataTableComp
                                    ref="_badrTable"
                                    id="articlesTable"
                                    rows={this.props.t6bis.interventions}
                                    cols={this.cols}
                                    onItemSelected={this.onItemSelected}
                                    totalElements={this.props.t6bis.interventions?.length}
                                    maxResultsPerPage={10}
                                    paginate={true}
                                    showProgress={this.props.showProgress}
                                    withId={false}
                                />
                            </View>
                        </Col>
                    </Row>


                </View>





            </ComAccordionComp>

        );
    }
}






export default T6bisHistoriqueListeInterventionsBlock;




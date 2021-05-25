import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native-animatable';
import { ComAccordionComp, ComBasicDataTableComp } from '../../../../../../../commons/component';
import translate from "../../../../../../../commons/i18n/ComI18nHelper";
import { calculateTotalT6bis, groupLignesByRubrique } from '../../../../../utils/t6bisUtils';
import styles from '../../../../style/t6bisGestionStyle';






class T6bisRecapTaxationGlobaleBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            t6bis: this.props.t6bis

        };
        this.cols = [
            {
                code: 'rubrique',
                libelle: translate('t6bisGestion.tabs.entete.recapList.rubrique'),
                width: 150,
            },
            {
                code: 'designation',
                libelle: translate('t6bisGestion.tabs.entete.recapList.designation'),
                width: 300,
            },
            {
                code: 'montant',
                libelle: translate('t6bisGestion.tabs.entete.recapList.montant'),
                width: 200,
            }


        ];
    }




    onItemSelected = (row) => { };



    componentDidMount() {

    }

    componentDidUpdate() {




    }


    componentWillUnmount() {
        console.log('T6bisArticlesListArticlesBlock componentWillUnmount');
    }



    reset = () => {
        console.log('T6bisArticlesListArticlesBlock reset');
    };



    render() {
        console.log("T6bisArticlesListArticlesBlock--------------------------------------------------- this.props", this.props);
        console.log("T6bisArticlesListArticlesBlock--------------------------------------------------- this.props", this.props.t6bis);
        console.log("T6bisArticlesListArticlesBlock--------------------------------------------------- this.props", this.props.t6bis?.listeRecap);
        console.log("T6bisArticlesListArticlesBlock--------------------------------------------------- this.props", this.props.t6bis?.montantGlobal);
        return (

            <ComAccordionComp title={translate('t6bisGestion.tabs.entete.recapList.title')} expanded={true}>
                <View style={styles.ComContainer}>
                    <ComBasicDataTableComp
                        ref="_badrTable"
                        id="articlesTable"
                        rows={this.props.listeRecap}
                        cols={this.cols}
                        onItemSelected={this.onItemSelected}
                        totalElements={this.props.listeRecap?.length}
                        maxResultsPerPage={10}
                        paginate={true}
                        showProgress={this.props.showProgress}
                        withId={false}
                    />

                </View>
                <View style={styles.ComContainer}>
                    <Text style={styles.MontantLabel}>
                        {translate('t6bisGestion.tabs.entete.recapList.totalTaxationArticle')}{this.props.t6bis.montantGlobal}
                    </Text>
                </View>

            </ComAccordionComp>

        );
    }
}






export default T6bisRecapTaxationGlobaleBlock;




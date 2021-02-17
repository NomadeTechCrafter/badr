import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native-animatable';
import { ComAccordionComp, ComBasicDataTableComp } from '../../../../../../../commons/component';
import translate from "../../../../../../../commons/i18n/ComI18nHelper";
import styles from '../../../../style/t6bisGestionStyle';






class T6bisArticlesRecapTaxationBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };
        this.cols = [
            {
                code: 'rubrique',
                libelle: translate('t6bisGestion.tabs.articles.recapCurrentArticleList.rubrique'),
                width: 150,
            },
            {
                code: 'designation',
                libelle: translate('t6bisGestion.tabs.articles.recapCurrentArticleList.designation'),
                width: 300,
            },
            {
                code: 'montant',
                libelle: translate('t6bisGestion.tabs.articles.recapCurrentArticleList.montant'),
                width: 200,
            }


        ];
    }




    onItemSelected = (row) => { };



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
        console.log("T6bisArticlesListArticlesBlock this.props", this.props);
        return (

            <ComAccordionComp title={translate('t6bisGestion.tabs.articles.recapCurrentArticleList.title')} expanded={true}>
                <View style={styles.ComContainer}>
                    <ComBasicDataTableComp
                        ref="_badrTable"
                        id="articlesTable"
                        rows={this.props.recapCurrentArticleList}
                        cols={this.cols}
                        onItemSelected={this.onItemSelected}
                        totalElements={this.props.recapCurrentArticleList?.length}
                        maxResultsPerPage={10}
                        paginate={true}
                        showProgress={this.props.showProgress}
                        withId={false}
                    />
                </View>
                <View style={styles.ComContainer}>
                    <Text style={styles.MontantLabel}>
                        {translate('t6bisGestion.tabs.articles.recapCurrentArticleList.totalTaxationArticle')}{this.props.montantGlobalByArticle}
                    </Text>
                </View>


            </ComAccordionComp>

        );
    }
}






export default T6bisArticlesRecapTaxationBlock;




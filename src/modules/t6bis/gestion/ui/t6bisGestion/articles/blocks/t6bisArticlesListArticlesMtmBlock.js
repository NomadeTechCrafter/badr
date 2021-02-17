import React from 'react';
import { ComAccordionComp, ComBasicDataTableComp } from '../../../../../../../commons/component';
import translate from "../../../../../../../commons/i18n/ComI18nHelper";
import * as T6BISConstantes from "../../../../../utils/t6bisConstants";






class T6bisArticlesListArticlesMtmBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };
        this.cols = [
            {
                code: 'numArticle',
                libelle: translate('t6bisGestion.tabs.articles.listeArticlesBlock.mtm.numeroArticle'),
                width: 100,
            },
            {
                code: 'codeNomenclature',
                libelle: translate('t6bisGestion.tabs.articles.listeArticlesBlock.mtm.codeNomenclature'),
                width: 150,
            },
            {
                code: 'valeurTaxable',
                libelle: translate('t6bisGestion.tabs.articles.listeArticlesBlock.mtm.valeurTaxable'),
                width: 120,
            },
            {
                code: 'quantite',
                libelle: translate('t6bisGestion.tabs.articles.listeArticlesBlock.mtm.quantite'),
                width: 120,
            },
            {
                code: 'uniteQuantite',
                libelle: translate('t6bisGestion.tabs.articles.listeArticlesBlock.mtm.unite'),
                width: 120,
            },
            {
                code: 'isNew',
                libelle: '',
                width: 50,
                component: 'button',
                icon: 'pencil',
                action: (row, index) =>
                    this.updateItem(row, index)
            }
            
            /* , {
                code: '',
                libelle: '',
                width: 50,
                component: 'button',
                icon: 'delete-outline',
                action: (row, index) =>
                   this.removeItem(row, index)
            }
 */

        ];
    }




    onItemSelected = (row) => { };

    updateItem = (row, index) => {
        console.log('updateItem row : ', row);
        console.log('updateItem index : ', index);
        this.props.callbackHandler(T6BISConstantes.EDIT_ARTCLE_MTM_TASK, row);

    }
    removeItem = (row, index) => {
        console.log('removeItem row : ', row);
        console.log('removeItem index : ', index);
        this.props.callbackHandler(T6BISConstantes.DELETE_ARTCLE_MTM_TASK, index);
        

    }

    componentDidMount() {

        if (!this.props.readOnly) {
            this.cols.push( {
                code: '',
                libelle: '',
                width: 50,
                component: 'button',
                icon: 'delete-outline',
                action: (row, index) =>
                    this.removeItem(row, index)
            }
);
        }
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

            <ComAccordionComp title={translate('t6bisGestion.tabs.articles.listeArticlesBlock.title')} expanded={true}>
                <ComBasicDataTableComp
                    ref="_badrTable"
                    id="articlesTable"
                    rows={this.props.listeArticles}
                    cols={this.cols}
                    onItemSelected={this.onItemSelected}
                    totalElements={this.props.listeArticles?.length}
                    maxResultsPerPage={10}
                    paginate={true}
                    showProgress={this.props.showProgress}
                    withId={false}
                />


            </ComAccordionComp>

        );
    }
}






export default T6bisArticlesListArticlesMtmBlock;




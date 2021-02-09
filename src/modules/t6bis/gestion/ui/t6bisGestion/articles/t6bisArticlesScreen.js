import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as T6BISConstantes from "../../../../utils/t6bisConstants";
import * as t6bisUtils from '../../../../utils/t6bisUtils';
import t6bisUpdatePropsAction from '../../../state/actions/t6bisUpdatePropsAction';
import T6bisArticlesListBlocks from './blocks/t6bisArticlesListBlocks';
import * as Constantes from '../../../state/t6bisGestionConstants';







class T6bisArticlesTab extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            listeArticles: (this.props.t6bis.listeArticleT6bis) ? this.props.t6bis.listeArticleT6bis : [],
            currentArticle: this.props.currentArticle
        };
    }


    getCurrentArticle = () => {
        let codeTypeT6bis = this.props.t6bis?.codeTypeT6bis;
        let num = this.getMaxNumArticle();
        return t6bisUtils.getCurrentArticle(codeTypeT6bis, num);
    }


    callbackHandler = (type, data) => {
        console.log('T6bisGestion callbackHandler type :', data);
        console.log('T6bisGestion callbackHandler type :', type);
        let article;
        switch (type) {
            case T6BISConstantes.ADD_ARTCLE_MTM_TASK:
                data.isNew = false;
                this.state.listeArticles.push(data);
                article = this.getCurrentArticle();
                this.setState({
                    currentArticle: article
                });
                this.launchUpdateProps(this.state.listeArticles, article);
                break;
            case T6BISConstantes.EDIT_ARTCLE_MTM_TASK:
            case T6BISConstantes.EDIT_ARTCLE_CM_TASK:
                this.setState({
                    currentArticle: data
                });
                this.launchUpdateProps(this.state.listeArticles, data);
                break;
            case T6BISConstantes.NEW_ARTCLE_MTM_TASK:
                article = this.getCurrentArticle();
                this.setState({
                    currentArticle: article
                });
                this.launchUpdateProps(this.state.listeArticles, article);
                break;
            case T6BISConstantes.DELETE_ARTCLE_MTM_TASK:
                let idx = data;
                let list = this.state.listeArticles;
                let articleToDelete = list.splice(idx, 1);
                this.setState({
                    listeArticles:  list
                });

                if (articleToDelete[0].numArticle === this.state.currentArticle.numArticle) {
                    article = this.getCurrentArticle();
                    this.setState({
                        currentArticle: article
                    });
                    this.launchUpdateProps(list, article);
                } else {
                    this.launchUpdateProps(list, this.state.currentArticle);
                 }
                break;
            case T6BISConstantes.MODIFY_ARTCLE_MTM_TASK:
                let articleModified = data;
                let indexModified = 0;
                let listeArticlesOriginal = this.state.listeArticles;
                listeArticlesOriginal.forEach((element, index) => {
                    if (element.numArticle === articleModified.numArticle) {
                        indexModified = index;
                    }
                });
                listeArticlesOriginal.splice(indexModified, 1, articleModified);
                this.setState({
                    listeArticles: listeArticlesOriginal
                    
                });

                article = this.getCurrentArticle();
                this.setState({
                    currentArticle: article
                });
                this.launchUpdateProps(listeArticlesOriginal, article);
                break;
            case T6BISConstantes.ADD_ARTCLE_CM_TASK:
                data.isNew = false;
                list = this.state.listeArticles;
                list.push(data);
                this.setState({
                    currentArticle: data
                });
                this.launchUpdateProps(list, data);
                break;
            case T6BISConstantes.DELETE_ARTCLE_CM_TASK:
                list = this.state.listeArticles;
                list.splice(0, 1);
                this.setState({
                    listeArticles: listeArticlesOriginal
                });
                article = this.getCurrentArticle();
                this.setState({
                    currentArticle: article
                });
                this.launchUpdateProps(listeArticlesOriginal, article);
                break;
            case T6BISConstantes.MODIFY_ARTCLE_CM_TASK:
                let articleModifiedCM = data;
                let listeArticlesOriginalCM = this.state.listeArticles;
                listeArticlesOriginalCM.splice(0, 1, articleModifiedCM);
                this.setState({
                    listeArticles: listeArticlesOriginal
                });
                this.launchUpdateProps(listeArticlesOriginal, data);
                break;
        }
        
        
        
    }

    launchUpdateProps(listeArticles, currentArticle) {
        console.log("-----------------------------------------------------------------start------------------------------------------------------------------------------------------------");
        console.log("this.props               ", currentArticle);
        console.log("-----------------------------------------------------------------end------------------------------------------------------------------------------------------------");
        let dataToAction = {
            type: Constantes.T6BIS_UPDATE_PROPS_REQUEST,
            value: {
                listeArticleT6bis: listeArticles,
                currentArticle: currentArticle
            }
        };

        this.props.dispatch(t6bisUpdatePropsAction.request(dataToAction));
    }

    getMaxNumArticle() {
        let num = 0;
        if ((this.state) && (this.state.listeArticles) && (this.state.listeArticles.length !== 0)) {
            this.state.listeArticles?.forEach(element => {
                if (element.numArticle > num) {
                    num = element.numArticle;
                }

            });
        }
        return num
    }



    componentDidMount = async () => {


    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }



    reset = () => {
        console.log('reset');
    };




    render() {

        console.log('this.state T6bisArticlesScreen  *******************jkjkjd ', this.state);
        let mode = (this.props.t6bisEnteteData) ? this.props.t6bisEnteteData.mode : '';
        return (

            <ScrollView>
                <T6bisArticlesListBlocks t6bis={this.props.t6bis} mode={mode}
                    identifiants={this.props.identifiants}
                    listmoyenpaiement={this.props.listmoyenpaiement}
                    fieldsetcontext={this.props.fieldsetcontext}
                    listeArticles={this.state.listeArticles}
                    currentArticle={this.state.currentArticle}
                    recapCurrentArticleList={this.state.currentArticle?.recapCurrentArticleList}
                    montantGlobalByArticle={this.state.currentArticle?.montantGlobalByArticle}
                    callbackHandler={this.callbackHandler} />
            </ScrollView>

        );
    }
}

function mapStateToProps(state) {
    return { ...state.t6bisGestionReducer };
}




export default connect(
    mapStateToProps,
    null,
)(T6bisArticlesTab);

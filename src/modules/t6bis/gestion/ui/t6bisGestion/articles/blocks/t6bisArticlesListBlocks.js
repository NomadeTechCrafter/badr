import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import { isMtm,isCm } from '../../../../../utils/t6bisUtils';
import T6bisInfosCommunsBlock from '../../common/t6bisInfosCommunsBlock';
import T6bisArticlesCurrentArticleCmBlock from './t6bisArticlesCurrentArticleCmBlock';
import T6bisArticlesCurrentArticleMtmBlock from './t6bisArticlesCurrentArticleMtmBlock';
import T6bisArticlesListArticlesCmBlock from './t6bisArticlesListArticlesCmBlock';
import T6bisArticlesListArticlesMtmBlock from './t6bisArticlesListArticlesMtmBlock';
import T6bisArticlesRecapTaxationBlock from './t6bisArticlesRecapTaxationBlock';








class T6bisArticlesListBlocks extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };
    }

    viewCallBackHandler = (type, data) => {


        console.log(' viewCallBackHandler type :', type);
        console.log(' viewCallBackHandler data :', data);

        // manipulate data if required, we have just one case, in case of many actions, we will use switch case
        this.props.callbackHandler(type, data);


    };



    componentDidMount() {

        console.log('T6bisArticlesListBlocks componentWillmount');
    }

    componentWillUnmount() {
        console.log('T6bisArticlesListBlocks componentWillUnmount');
    }



    reset = () => {
        console.log('T6bisArticlesListBlocks reset');
    };



    render() {
        console.log("T6bisArticlesListBlocks this.props---------------------------15022021----------------------------", this.props);
        let codeTypeT6bis = this.props.t6bis?.codeTypeT6bis;
        let montantGlobalByArticle = this.props.t6bis?.montantGlobalByArticle;
        console.log("T6bisArticlesListBlocks montantGlobalByArticle---------------------------15022021----------------------------", montantGlobalByArticle);
        return (

            <ScrollView>

                <View style={{ flex: 1 }}>
                    <T6bisInfosCommunsBlock t6bis={this.props.t6bis} mode={this.props.mode} fieldsetcontext={this.props.fieldsetcontext} />
                    {isMtm(codeTypeT6bis) && (
                        <T6bisArticlesListArticlesMtmBlock listeArticles={this.props.listeArticles} callbackHandler={this.viewCallBackHandler} readOnly={this.props.readOnly} />
                    )}
                    {isMtm(codeTypeT6bis) && (
                        <T6bisArticlesCurrentArticleMtmBlock currentArticle={this.props.currentArticle} acUniteValue={this.props.acUniteValue} callbackHandler={this.viewCallBackHandler} readOnly={this.props.readOnly}  />
                    )}
                    {isCm(codeTypeT6bis) && (
                        <T6bisArticlesListArticlesCmBlock listeArticles={this.props.listeArticles} callbackHandler={this.viewCallBackHandler} readOnly={this.props.readOnly} />
                    )}
                    {isCm(codeTypeT6bis) && (
                        <T6bisArticlesCurrentArticleCmBlock currentArticle={this.props.currentArticle} acUniteValue={this.props.acUniteValue} callbackHandler={this.viewCallBackHandler} readOnly={this.props.readOnly} />
                    )}
                    {(this.props.recapCurrentArticleList && this.props.recapCurrentArticleList.length!=0) && (
                        <T6bisArticlesRecapTaxationBlock currentArticle={this.props.currentArticle} recapCurrentArticleList={this.props.recapCurrentArticleList} montantGlobalByArticle={this.props?.montantGlobalByArticle}/>)}
                </View>

            </ScrollView>

        );
    }
}


export default T6bisArticlesListBlocks;




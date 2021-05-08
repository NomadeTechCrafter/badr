import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import T6bisTaxationManuelleListBlocks from './blocks/t6bisTaxationManuelleListBlocks';
import * as T6BISConstantes from "../../../../utils/t6bisConstants";
import * as Constantes from '../../../state/t6bisGestionConstants';
import t6bisAddTaxationArticleAction from '../../../state/actions/t6bisAddTaxationArticleAction';
import { isRecherche } from '../../../../utils/t6bisUtils';






class T6bisTaxationManuelleTab extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };
    }



    callbackHandler = (type, data) => {
        console.log('T6bisGestion callbackHandler type :', data);
        console.log('T6bisGestion callbackHandler type :', type);
        switch (type) {
            case T6BISConstantes.ADD_TAXATION_ARTICLE_TASK:
                let dataToAction = {
                    type: Constantes.T6BIS_ADD_TAXATION_ARTICLE_REQUEST,
                    value: {
                        currentArticle: data
                    }
                };

                this.props.dispatch(t6bisAddTaxationArticleAction.request(dataToAction));
                break;
        }



    }





    componentDidMount = async () => {
        console.log('TAXATIONMANUELLE IS LOADING...');
    }

    componentWillUnmount() {
        console.log('TAXATIONMANUELLE componentWillUnmount');
    }



    reset = () => {
        console.log('reset');
    };



    render() {



        return (

            <ScrollView>
                <T6bisTaxationManuelleListBlocks t6bis={this.props.t6bis} mode={this.props.mode}
                    identifiants={this.props.identifiants}
                    listmoyenpaiement={this.props.listmoyenpaiement}
                    fieldsetcontext={this.props?.fieldsetcontext}
                    currentArticle={this.props.currentArticle}
                    readOnly={isRecherche()}
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
)(T6bisTaxationManuelleTab);
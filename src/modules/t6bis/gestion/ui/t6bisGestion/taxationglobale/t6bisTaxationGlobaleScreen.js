import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import T6bisTaxationGlobaleListBlocks from './blocks/t6bisTaxationGlobaleListBlocks';
import * as T6BISConstantes from "../../../../utils/t6bisConstants";
import * as Constantes from '../../../state/t6bisGestionConstants';
import t6bisAddTaxationArticleAction from '../../../state/actions/t6bisAddTaxationArticleAction';
import t6bisAddTaxationGlobaleAction from '../../../state/actions/t6bisAddTaxationGlobaleAction';
import { isRecherche } from '../../../../utils/t6bisUtils';







class T6bisTaxationGlobaleTab extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };
    }



    callbackHandler = (type, data) => {
        console.log('T6bisGestion callbackHandler type :', data);
        console.log('T6bisGestion callbackHandler type :', type);
        switch (type) {
            case T6BISConstantes.ADD_TAXATION_GLOBALE_TASK:
                let dataToAction = {
                    type: Constantes.T6BIS_ADD_TAXATION_GLOBALE_REQUEST,
                    value: {
                        
                    }
                };

                this.props.dispatch(t6bisAddTaxationGlobaleAction.request(dataToAction));
                break;
        }



    }




    componentDidMount = async () => {
        console.log('TAXATIONGLOBALE IS LOADING...');
    }

    componentWillUnmount() {
        console.log('TAXATIONGLOBALE componentWillUnmount');
    }



    reset = () => {
        console.log('reset');
    };




    render() {

        

        return (

            <ScrollView>
                <T6bisTaxationGlobaleListBlocks t6bis={this.props.t6bis} mode={this.props.mode}
                    fieldsetcontext={this.props?.fieldsetcontext}
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
)(T6bisTaxationGlobaleTab);

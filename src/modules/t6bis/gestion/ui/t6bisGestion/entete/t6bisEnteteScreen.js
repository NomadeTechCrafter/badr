import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import t6bisFindIntervenantAction from '../../../state/actions/t6bisFindIntervenantAction';
import T6bisEnteteListBlocks from './blocks/t6bisEnteteListBlocks';
import * as T6BISConstantes from "../../../../utils/t6bisConstants";
import * as Constantes from '../../../state/t6bisGestionConstants';








class T6bisEnteteTab extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };
    }

    

    callbackHandler = (type, data) => {
        console.log(data);
        console.log(type);
    switch (type) {
        case T6BISConstantes.FIND_INTERVENANT_TASK: 
            this.props.dispatch(t6bisFindIntervenantAction.request(data));
            break;
        case T6BISConstantes.UPDATE_INTERVENANT_TASK:
            let dataToAction = {
                type: Constantes.T6BIS_UPDATE_INTERVENANT_REQUEST,
                value: {
                    fieldsetcontext: data.fieldsetcontext
                }
            };

            this.props.dispatch(t6bisUpdatePropsAction.request(dataToAction));
            this.setState({ fieldsetcontext: data.fieldsetcontext});
            break;


    } 
}



    componentDidMount = async () => {
        console.log('ENTETE IS LOADING...');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }



    reset = () => {
        console.log('reset');
    };



    render() {
        
        let mode = (this.props.t6bisEnteteData) ? this.props.t6bisEnteteData.mode : '';

        console.log('fieldsetcontext ', this.state?.fieldsetcontext);
        console.log("this.props               ", this.props);  
        return (

            <ScrollView>
                <T6bisEnteteListBlocks t6bis={this.props.t6bis} mode={mode}
                    identifiants={this.props.identifiants}
                    listmoyenpaiement={this.props.listmoyenpaiement}
                    fieldsetcontext={this.state?.fieldsetcontext}
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
)(T6bisEnteteTab);

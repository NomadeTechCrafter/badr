import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import T6bisTaxationManuelleListBlocks from './blocks/t6bisTaxationManuelleListBlocks';







class T6bisTaxationManuelleTab extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };
    }



    callbackHandler = (type, data) => {
       
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

        let mode = (this.props.t6bisEnteteData) ? this.props.t6bisEnteteData.mode : '';

        return (

            <ScrollView>
                <T6bisTaxationManuelleListBlocks t6bis={this.props.t6bis} mode={mode}
                    identifiants={this.props.identifiants}
                    listmoyenpaiement={this.props.listmoyenpaiement}
                    fieldsetcontext={this.props?.fieldsetcontext}
                    currentArticle={this.props.currentArticle}
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

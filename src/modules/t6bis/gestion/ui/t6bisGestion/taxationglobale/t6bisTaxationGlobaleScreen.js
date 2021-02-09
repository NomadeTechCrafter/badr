import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import T6bisTaxationGlobaleListBlocks from './blocks/t6bisTaxationGlobaleListBlocks';







class T6bisTaxationGlobaleTab extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };
    }



    callbackHandler = (type, data) => {

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

        let mode = (this.props.t6bisEnteteData) ? this.props.t6bisEnteteData.mode : '';

        return (

            <ScrollView>
                <T6bisTaxationGlobaleListBlocks t6bis={this.props.t6bis} mode={mode}
                    fieldsetcontext={this.props?.fieldsetcontext}
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

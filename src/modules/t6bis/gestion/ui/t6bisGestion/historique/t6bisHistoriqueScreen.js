import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import T6bisHistoriqueListBlocks from './blocks/t6bisHistoriqueListBlocks';







class T6bisHistoriqueTab extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };
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
                <T6bisHistoriqueListBlocks t6bis={this.props.t6bis} mode={this.props.mode}
                    fieldsetcontext={this.props?.fieldsetcontext}
                />
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
)(T6bisHistoriqueTab);

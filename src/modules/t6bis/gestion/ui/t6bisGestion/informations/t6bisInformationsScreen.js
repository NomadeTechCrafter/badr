import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import T6bisInfosCommunsBlock from '../common/t6bisInfosCommunsBlock';







class T6bisInformationsTab extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };
    }



    componentDidMount = async () => {
        console.log('T6BISINFORMATIONSTAB componentDidMount');
    }

    componentWillUnmount() {
        console.log('T6BISINFORMATIONSTAB componentWillUnmount');
    }



    reset = () => {
        console.log('reset');
    };



    render() {

        

        console.log('T6BISINFORMATIONSTAB    fieldsetcontext ', this.props?.fieldsetcontext);
        console.log("this.props               ", this.props);
        return (

            <ScrollView>
                <T6bisInfosCommunsBlock t6bis={this.props.t6bis} mode={this.props.mode}
                    identifiants={this.props.identifiants}
                    
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
)(T6bisInformationsTab);

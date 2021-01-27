import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import t6bisFindIntervenantAction from '../../../state/actions/t6bisFindIntervenantAction';
import T6bisEnteteListBlocks from './blocks/t6bisEnteteListBlocks';
import { CALLBACK_ENUMS } from './blocks/t6bisEnteteListBlocks';








class T6bisEnteteTab extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };
    }

    

callbackHandler = (type, data) => {
    switch (type) {
        case CALLBACK_ENUMS.FIND_INTERVENANT_TASK: 
            this.props.dispatch(t6bisFindIntervenantAction.request(data));
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
        console.log('this.callbackHandler   ', this.callbackHandler);
        console.log('this.state entet screen', this.state);
        console.log('this.props entet screen', this.props);
        console.log('this.route entet screen', this.route);
        console.log('this.value entet screen', this.value);
        console.log('this.props.t6bis entet screen', this.props.t6bis);
        console.log('this.props.intervenants entet screen//////////////////////////////////////////////////////', this.props.identifiants);
        console.log('this.props.t6bisEnteteData.mode entet screen***********************************************************', (this.props.t6bisEnteteData) ? this.props.t6bisEnteteData.mode : '');
        let mode = (this.props.t6bisEnteteData) ? this.props.t6bisEnteteData.mode : '';

        

        return (

            <ScrollView>
                <T6bisEnteteListBlocks t6bis={this.props.t6bis} mode={mode} identifiants={this.props.identifiants} callbackHandler={this.callbackHandler}/>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    console.log('state.t6bisGestionReducer', state.t6bisGestionReducer  );
    return { ...state.t6bisGestionReducer };
}





export default connect(
    mapStateToProps,
    null,
)(T6bisEnteteTab);

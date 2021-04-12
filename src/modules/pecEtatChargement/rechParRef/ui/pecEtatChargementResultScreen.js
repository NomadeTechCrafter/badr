import React from 'react';
import { View } from 'react-native';

/**Custom Components */
/** REDUX **/
import { connect } from 'react-redux';
import { Text } from 'react-native';

class PecEtatChargementResultScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    onItemSelected = (row) => { };

    componentDidMount() { 
    }

    componentDidUpdate() {
        console.log('-------------------------3-------------------------');
        console.log(this.props);
        console.log('--------------------------3------------------------');
        if (this.props.route.params.first) {
            // this.refs._badrTable.reset();
        }
    }

    render() {
        return (
            <View>
            <Text>Merci de patienter un moment...</Text>
            <Text>{this.props.data.numVoyage}</Text>
                {/* <ComBasicDataTableComp

                    ref="_badrTable"
                    id="ConsBLS"
                    rows={this.props.data}
                    cols={this.cols}
                    totalElements={this.props.data.length}
                    maxResultsPerPage={10}
                    paginate={true}
                    showProgress={this.props.showProgress}
                    
                /> */}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.pecEtatChargementReducer };
}

function mapDispatchToProps(dispatch) {
    let actions = { dispatch };
    return {
        actions,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PecEtatChargementResultScreen);
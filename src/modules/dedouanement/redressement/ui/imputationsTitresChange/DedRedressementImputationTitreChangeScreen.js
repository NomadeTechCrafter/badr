import React from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import DedRedressementListImputationTitreChangePortnetBlock from './blocks/DedRedressementListImputationTitreChangePortnetBlock';
import DedRedressementListImputationTitreChangeManuelleBlock from './blocks/DedRedressementListImputationTitreChangeManuelleBlock';
import dedUpdateRedressementImputationAction from '../../state/actions/dedUpdateRedressementImutationAction';
import {REDRESSEMENT_IMPUTATION_UPDATE} from '../../state/DedRedressementConstants';

class DedRedressementImputationTitreChangeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  updateRedressementImputation = (data) => {
    let action = dedUpdateRedressementImputationAction.update({
      type: REDRESSEMENT_IMPUTATION_UPDATE,
      value: data,
    });
    console.log('action dispatched')
    this.props.actions.dispatch(action);
  };
  render() {
    console.log('data titre change', JSON.stringify(this.props.data));
    return (
      <ScrollView>
        <DedRedressementListImputationTitreChangePortnetBlock
          data={this.props.data}
          updateRedressementScreen={this.updateRedressementImputation}
        />
        <DedRedressementListImputationTitreChangeManuelleBlock
          data={this.props.data}
          updateRedressementScreen={this.updateRedressementImputation}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {...state.consulterDumReducer};
}
function mapDispatchToProps(dispatch) {
    let actions = {dispatch};
    return {
        actions,
    };
}
export default connect(
  mapStateToProps,
    mapDispatchToProps,
)(DedRedressementImputationTitreChangeScreen);

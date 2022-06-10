import React from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import DedRedressementListImputationCompteREDBlock from './blocks/DedRedressementListImputationCompteREDBlock';
import dedUpdateRedressementAction from "../../state/actions/dedUpdateRedressementAction";
import {REDRESSEMENT_UPDATE} from "../../state/DedRedressementConstants";

class DedRedressementImputationCompteREDScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  updateRedressement = (data) => {
    let action = dedUpdateRedressementAction.update({
      type: REDRESSEMENT_UPDATE,
      value: data,
    });

    this.props.dispatch(action);
  };
  componentDidMount() {}

  render() {
    return (
      <ScrollView>
        <DedRedressementListImputationCompteREDBlock data={this.props.data} update={this.updateRedressement} />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {...state.consulterDumReducer};
}

export default connect(
  mapStateToProps,
  null,
)(DedRedressementImputationCompteREDScreen);

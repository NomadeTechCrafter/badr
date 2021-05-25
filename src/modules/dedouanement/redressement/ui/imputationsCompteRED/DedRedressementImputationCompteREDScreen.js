import React from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import DedRedressementListImputationCompteREDBlock from './blocks/DedRedressementListImputationCompteREDBlock';

class DedRedressementImputationCompteREDScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <ScrollView>
        <DedRedressementListImputationCompteREDBlock data={this.props.data} />
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

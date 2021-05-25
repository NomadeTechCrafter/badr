import React from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import DedRedressementListsPreapBlock from './blocks/DedRedressementListsPreapBlock';

class DedRedressementPreapurementDsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <ScrollView>
        <DedRedressementListsPreapBlock data={this.props.data} />
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
)(DedRedressementPreapurementDsScreen);

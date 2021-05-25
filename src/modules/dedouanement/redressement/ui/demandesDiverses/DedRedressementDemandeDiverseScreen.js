import React from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import DedRedressementListDemandeDiverseBlock from './blocks/DedRedressementListDemandeDiverseBlock';

class DedRedressementDemandeDiverseScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <ScrollView>
        <DedRedressementListDemandeDiverseBlock data={this.props.data} />
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
)(DedRedressementDemandeDiverseScreen);

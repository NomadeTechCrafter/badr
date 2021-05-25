import React from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import DedRedressementListsBlock from './blocks/DedRedressementListsBlock';

class DedRedressementArticlesScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <ScrollView>
        <DedRedressementListsBlock data={this.props.data} />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {...state.consulterDumReducer};
}

export default connect(mapStateToProps, null)(DedRedressementArticlesScreen);

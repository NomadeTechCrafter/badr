import React from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import DedRedressementListImputationTitreChangePortnetBlock from './blocks/DedRedressementListImputationTitreChangePortnetBlock';
import DedRedressementListImputationTitreChangeManuelleBlock from './blocks/DedRedressementListImputationTitreChangeManuelleBlock';

class DedRedressementImputationTitreChangeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <ScrollView>
        <DedRedressementListImputationTitreChangePortnetBlock
          data={this.props.data}
        />
        <DedRedressementListImputationTitreChangeManuelleBlock
          data={this.props.data}
        />
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
)(DedRedressementImputationTitreChangeScreen);

import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import dedUpdateRedressementAction from '../../state/actions/dedUpdateRedressementAction';
import { REDRESSEMENT_UPDATE } from '../../state/DedRedressementConstants';
import DedRedressementListsPreapBlock from './blocks/DedRedressementListsPreapBlock';

class DedRedressementPreapurementDsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      dedDumVo: this.props.data

    };
  }

  updateRedressement = (data) => {
    let action = dedUpdateRedressementAction.update(
      {
        type: REDRESSEMENT_UPDATE,
        value: data,


      },

    );

    this.props.dispatch(action);


  }

  componentDidMount() { }

  render() {
    return (
      <ScrollView>
        <DedRedressementListsPreapBlock data={this.state.dedDumVo} update={this.updateRedressement} readOnly={!this.props.isRedressementDUM} />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.consulterDumReducer };
}

export default connect(
  mapStateToProps,
  null,
)(DedRedressementPreapurementDsScreen);

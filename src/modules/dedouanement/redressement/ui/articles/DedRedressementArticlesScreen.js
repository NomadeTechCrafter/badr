import React from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import dedUpdateRedressementAction from '../../state/actions/dedUpdateRedressementAction';
import { REDRESSEMENT_UPDATE } from '../../state/DedRedressementConstants';
import DedRedressementListsBlock from './blocks/DedRedressementListsBlock';

class DedRedressementArticlesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dedDumVo: this.props.data
    };
  }

  componentDidMount() { }
  
  updateRedressement = (data) => {
    let action = dedUpdateRedressementAction.update(
      {
        type: REDRESSEMENT_UPDATE,
        value: data,
      },
    );
    this.props.dispatch(action);
  }

  render() {
    return (
      <ScrollView>
        <DedRedressementListsBlock
          data={this.props.data}
          edition={this.props.isRedressementDUM}
          update={this.updateRedressement}
          navigation={this.props.navigation}
          fromLiquidation={this.props.fromLiquidation}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {...state.consulterDumReducer};
}

export default connect(mapStateToProps, null)(DedRedressementArticlesScreen);

import React from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import DedRedressementCautionBlock from './blocks/DedRedressementCautionBlock';
import DedRedressementInfoCommon from '../common/DedRedressementInfoCommon';

class DedRedressementCautionScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <ScrollView>
        {this.props.data && (
          <View style={{flex: 1}}>
            <DedRedressementInfoCommon
              searchData={this.props.searchData}
              data={this.props.data}
            />
            <DedRedressementCautionBlock data={this.props.data} />
          </View>
        )}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {...state.consulterDumReducer};
}

export default connect(mapStateToProps, null)(DedRedressementCautionScreen);

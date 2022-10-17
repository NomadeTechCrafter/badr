import React from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import DedRedressementCautionBlock from './blocks/DedRedressementCautionBlock';
import DedRedressementInfoCommon from '../common/DedRedressementInfoCommon';
import { getValueByPath } from '../../utils/DedUtils';
import dedInitCautionSectionAction from '../../state/actions/dedInitCautionSectionAction';
import { INIT_CAUTION_SECTION_REQUEST, REDRESSEMENT_UPDATE } from '../../state/DedRedressementConstants';
import dedUpdateRedressementAction from '../../state/actions/dedUpdateRedressementAction';

class DedRedressementCautionScreen extends React.Component {
  constructor(props) {
    super(props);
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
    console.log('this.props.data : ----------------------------------------------------');
    console.log('this.props.data : ', this.props.data);
    console.log('this.props.data : ----------------------------------------------------');
    return (
      <ScrollView>
        {this.props.data && (
          <View style={{flex: 1}}>
            <DedRedressementInfoCommon
              searchData={getValueByPath(
                'dedReferenceVO',
                this.props.data,
              )}
              data={this.props.data}
             
            />
            <DedRedressementCautionBlock
              
              data={this.props.data}
              update={this.updateRedressement}
              readOnly={!this.props.isRedressementDUM}
              initCautionSection={this.initCautionSection}
            />
          </View>
        )}
      </ScrollView>
    );
  }
  initCautionSection = (data,callback) => {
    let action = dedInitCautionSectionAction.request(
      {
        type: INIT_CAUTION_SECTION_REQUEST,
        value: data,
        


      }, callback

    );

    this.props.dispatch(action);


  }
}




function mapStateToProps(state) {
  return {...state.consulterDumReducer};
}



export default connect(mapStateToProps, null)(DedRedressementCautionScreen);

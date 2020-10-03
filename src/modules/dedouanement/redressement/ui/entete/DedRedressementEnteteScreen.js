import React from 'react';
import {ScrollView, View} from 'react-native';
import DedRedressementInfoCommon from '../common/DedRedressementInfoCommon';
import DedRedressementEnteteVersionBlock from './blocks/DedRedressementEnteteVersionBlock';
import DedRedressementEnteteInfoBlock from './blocks/DedRedressementEnteteInfoBlock';
import DedRedressementEnteteDeclarantOpeBlock from './blocks/DedRedressementEnteteDeclarantOpeBlock';
import DedRedressementEnteteFacturePaiementBlock from './blocks/DedRedressementEnteteFacturePaiementBlock';
import DedRedressementEnteteLocalisationMarchandiseBlock from './blocks/DedRedressementEnteteLocalisationMarchandiseBlock';
import DedRedressementEnteteDocumentPrecedentBlock from './blocks/DedRedressementEnteteDocumentPrecedentBlock';
import DedRedressementEnteteAccordFranchiseBlock from './blocks/DedRedressementEnteteAccordFranchiseBlock';
import DedRedressementEnteteTransbordementBlock from './blocks/DedRedressementEnteteTransbordementBlock';
import {connect} from 'react-redux';

class DedRedressementEnteteScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('******');
    //console.log(this.props.data.typeDeclarationParam);
    console.log(this.props.data.dedDumSectionEnteteVO);
    console.log('******');
  }

  render() {
    return (
      <ScrollView>
        {this.props.data && (
          <View style={{flex: 1}}>
            <DedRedressementInfoCommon
              data={this.props.searchData}
              type={this.props.data.typeDeclarationParam}
            />
            <DedRedressementEnteteVersionBlock data={this.props.data} />
            <DedRedressementEnteteInfoBlock data={this.props.data} />
            <DedRedressementEnteteDeclarantOpeBlock data={this.props.data} />
            <DedRedressementEnteteFacturePaiementBlock data={this.props.data} />
            <DedRedressementEnteteLocalisationMarchandiseBlock
              data={this.props.data}
            />
            <DedRedressementEnteteDocumentPrecedentBlock
              data={this.props.data}
            />
            <DedRedressementEnteteAccordFranchiseBlock data={this.props.data} />
            <DedRedressementEnteteTransbordementBlock data={this.props.data} />
          </View>
        )}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  console.log('receiving data ...');
  console.log(state.consulterDumReducer);
  return {...state.consulterDumReducer};
}

export default connect(mapStateToProps, null)(DedRedressementEnteteScreen);

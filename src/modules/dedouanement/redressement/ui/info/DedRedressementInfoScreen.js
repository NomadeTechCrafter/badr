import React from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import DedRedressementListeVersionBlock from './blocks/DedRedressementListeVersionBlock';
import DedRedressementHistoriqueDeclarationBlock from './blocks/DedRedressementHistoriqueDeclarationBlock';
import DedRedressementHistoriqueVersionBlock from './blocks/DedRedressementHistoriqueVersionBlock';
import DedRedressementListAnnotationBlock from './blocks/DedRedressementListAnnotationBlock';
import DedRedressementEstimationDroitsTaxeBlock from './blocks/DedRedressementEstimationDroitsTaxeBlock';
import DedRedressementDeclarationsCoupleeBlock from './blocks/DedRedressementDeclarationsCoupleeBlock';
import DedRedressementCertificatsDechargeBlock from './blocks/DedRedressementCertificatsDechargeBlock';

class DedRedressementDocumentsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <ScrollView>
        <DedRedressementListeVersionBlock data={this.props.data} />
        <DedRedressementHistoriqueDeclarationBlock data={this.props.data} />
        <DedRedressementHistoriqueVersionBlock data={this.props.data} />
        <DedRedressementListAnnotationBlock data={this.props.data} />
        <DedRedressementEstimationDroitsTaxeBlock data={this.props.data} />
        <DedRedressementDeclarationsCoupleeBlock data={this.props.data} />
        <DedRedressementCertificatsDechargeBlock data={this.props.data} />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {...state.consulterDumReducer};
}

export default connect(mapStateToProps, null)(DedRedressementDocumentsScreen);

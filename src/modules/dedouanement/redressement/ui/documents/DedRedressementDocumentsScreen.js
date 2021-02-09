import React from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import DedRedressementDocumentsExigiblesBlock from './blocks/DedRedressementDocumentsExigiblesBlock';
import DedRedressementDeclarationSigneeBlock from './blocks/DedRedressementDeclarationSigneeBlock';
import DedRedressementDocumentsAnnexesBlock from './blocks/DedRedressementDocumentsAnnexesBlock';
import DedRedressementdDemandeChargementBlock from './blocks/DedRedressementdDemandeChargementBlock';
import {getValueByPath, getCategorieDum} from '../../utils/DedUtils';

class DedRedressementDocumentsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  isSousDumOrDumNormale = () => {
    let categorieDum = getCategorieDum(
      getValueByPath(
        'dedDumSectionEnteteVO.typeDUM',
        this.props,
        'consulterDumReducer',
      ),
      getValueByPath('sousDum', this.props, 'consulterDumReducer'),
    );
    console.log('----is sous Dum -----', categorieDum);
    console.log(
      '----is sous Dum result-----',
      categorieDum === '4' || categorieDum === '1',
    );
    return categorieDum === '4' || categorieDum === '1';
  };

  render() {
    let dumSignee = getValueByPath(
      'dedDumSectionEnteteVO.dumSignee',
      this.props,
      'consulterDumReducer',
    );
    console.log(
      '----is render DedRedressementDocumentsScreen -----',
      dumSignee,
    );
    return (
      <ScrollView>
        {dumSignee === 'true' && (
          <DedRedressementDeclarationSigneeBlock data={this.props.data} />
        )}
        <DedRedressementDocumentsExigiblesBlock data={this.props.data} />
        <DedRedressementDocumentsAnnexesBlock data={this.props.data} />
        {this.isSousDumOrDumNormale() === true && (
          <DedRedressementdDemandeChargementBlock data={this.props.data} />
        )}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps, null)(DedRedressementDocumentsScreen);

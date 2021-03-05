import React from 'react';
import {View} from 'react-native';

/**Custom Components */
import {ComBasicDataTableComp} from '../../../../commons/component';
/** REDUX **/
import {connect} from 'react-redux';
import translate from '../../../../commons/i18n/ComI18nHelper';

class ConfirmationEntreeResultScreen extends React.Component {
  constructor(props) {
    super(props);

    this.cols = [
      {
        code: 'referenceEnregistrement',
        libelle: translate('confirmationEntree.ref'),
        width: 250,
      },
      {
        code: 'typeDeD',
        libelle: translate('confirmationEntree.typeDed'),
        width: 200,
      },
      {
        code: 'dateEnregistrement',
        libelle: translate('confirmationEntree.dateEnreg'),
        width: 200,
      },
      {
        code: 'operateurDeclarant',
        libelle: translate('confirmationEntree.operateurDeclarant'),
        width: 200,
      },
      {
        code: 'valeurDeclaree',
        libelle: translate('confirmationEntree.valeurDeclarant'),
        width: 200,
      },
    ];
  }

  onItemSelected = (row) => {};

  componentDidMount() {}

  componentDidUpdate() {
    if (this.props.route.params.first) {
      this.refs._badrTable.reset();
    }
  }

  render() {
    return (
      <View>
        <ComBasicDataTableComp
          ref="_badrTable"
          id="numeroChassis"
          rows={this.props.data}
          cols={this.cols}
          onItemSelected={this.onItemSelected}
          totalElements={this.props.data.length}
          maxResultsPerPage={10}
          paginate={true}
          showProgress={this.props.showProgress}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {...state.ecorExpConfirmationEntreeReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmationEntreeResultScreen);

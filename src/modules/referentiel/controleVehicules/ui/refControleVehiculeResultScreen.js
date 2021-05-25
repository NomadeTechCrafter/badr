import React from 'react';
import {View} from 'react-native';

/**Custom Components */
import {ComBasicDataTableComp} from '../../../../commons/component';
/** REDUX **/
import {connect} from 'react-redux';
import translate from '../../../../commons/i18n/ComI18nHelper';

class RefControleVehiculeResultScreen extends React.Component {
  constructor(props) {
    super(props);

    this.cols = [
      {
        code: 'numeroChassis',
        libelle: translate('controleVehicules.numeroChassis'),
        width: 250,
      },
      {
        code: 'numeroCarteGrise',
        libelle: translate('controleVehicules.numeroCarteGrise'),
        width: 200,
      },
      {
        code: 'matricule',
        libelle: translate('controleVehicules.matricule'),
        width: 200,
      },
      {
        code: 'message',
        libelle: translate('controleVehicules.message'),
        width: 200,
      },
      {
        code: 'status',
        libelle: translate('controleVehicules.statut'),
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
  return {...state.controleVehiculesReducer};
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
)(RefControleVehiculeResultScreen);

import React from 'react';
import {View, ScrollView} from 'react-native';

/**Custom Components */
import {ComBasicDataTableComp} from '../../../../commons/component';
import EcorExpInformationEcorComp from './../component/ecorExpInformationEcorComp';
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
        <ScrollView
          horizontal={false}
          ref={(ref) => {
            this.scrollViewRef = ref;
          }}
          onLayout={(event) => {
            this.layout = event.nativeEvent.layout;
          }}>
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
          <EcorExpInformationEcorComp ecorInfo={this.props.data} />
        </ScrollView>
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

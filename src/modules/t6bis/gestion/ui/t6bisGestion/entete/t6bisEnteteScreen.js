import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ComBadrProgressBarComp } from '../../../../../../commons/component';
import * as T6BISConstantes from '../../../../utils/t6bisConstants';
import { isRecherche } from '../../../../utils/t6bisUtils';
import t6bisFindIntervenantAction from '../../../state/actions/t6bisFindIntervenantAction';
import t6bisInitT6bisEnteteSectionAction from '../../../state/actions/t6bisInitT6bisEnteteSectionAction';
import t6bisUpdateIntervenantAction from '../../../state/actions/t6bisUpdateIntervenantAction';
import t6bisUpdateOperateurAction from '../../../state/actions/t6bisUpdateOperateurAction';
import * as Constantes from '../../../state/t6bisGestionConstants';
import T6bisEnteteListBlocks from './blocks/t6bisEnteteListBlocks';

class T6bisEnteteTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  callbackHandler = (type, data) => {
    console.log(data);
    console.log(type);
    switch (type) {
      case T6BISConstantes.FIND_INTERVENANT_TASK:
        this.props.actions.dispatch(t6bisFindIntervenantAction.request(data));
        break;
      case T6BISConstantes.UPDATE_INTERVENANT_TASK:
        let dataToAction = {
          type: Constantes.T6BIS_UPDATE_INTERVENANT_REQUEST,
          value: {
            intervenantVO: data.intervenantVO,
          },
        };
        this.props.actions.dispatch(
          t6bisUpdateIntervenantAction.request(dataToAction),
        );
        this.setState({ fieldsetcontext: data.fieldsetcontext });
        break;
      case T6BISConstantes.UPDATE_OPERATEUR_TASK:
        let dataToAction2 = {
          type: Constantes.T6BIS_UPDATE_OPERATEUR_REQUEST,
          value: {
            operateur: data.operateur,
          },
        };
 

        this.props.actions.dispatch(
          t6bisUpdateOperateurAction.request(dataToAction2),
        );
        this.setState({fieldsetcontext: data.fieldsetcontext});
        break;
       case T6BISConstantes.T6BIS_SELECT_TPE_TASK:
      // if(data=="03")
     //   this.props.navigation.navigate('T6bisGestion', {tpeSelected:true});
        //else
         this.props.navigation.navigate('T6bisGestion', {});
        break;
    }
  };

  componentDidMount = async () => {
    console.log('ENTETE IS LOADING...');
  };

  componentWillUnmount() {
    this.props.actions.dispatch(t6bisInitT6bisEnteteSectionAction.init());
    console.log('T6bisEnteteTab   componentWillUnmount');
  }

  reset = () => {
    console.log('reset');
  };

  static getDerivedStateFromProps(props, state) {
    console.log(
      'getDerivedStateFromProps----------15022021-----Yassine-----props ',
      props,
    );
    console.log(
      'getDerivedStateFromProps---------15022021-----yassine------state ',
      state,
    );

    if (props.fieldsetcontext) {
      return {
        fieldsetcontext: {...state.fieldsetcontext, ...props.fieldsetcontext}, // update the value of specific key
      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  render() {
    console.log('fieldsetcontext ', this.state?.fieldsetcontext);
    console.log('this.props               ', this.props);
    console.log('this.props.showProgress              ', this.props.showProgress);
    console.log('isRecherche()              ', isRecherche());
    return (
      <ScrollView>
        {this.props.showProgress && (
          <ComBadrProgressBarComp  />
        )}
        <T6bisEnteteListBlocks
          t6bis={this.props.t6bis}
          mode={this.props.mode}
          identifiants={this.props.identifiants}
          listmoyenpaiement={this.props.listmoyenpaiement}
		  listDesTpes={this.props.listDesTpes}
          fieldsetcontext={this.state?.fieldsetcontext}
          listeRecap={this.props?.listeRecap}
          readOnly={isRecherche()}
          actions={this.props?.actions}
          newIntervenant={this.props?.newIntervenant}
          retourFindIntervenant={this.props?.retourFindIntervenant}
          callbackHandler={this.callbackHandler}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {...state.t6bisGestionReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(T6bisEnteteTab);

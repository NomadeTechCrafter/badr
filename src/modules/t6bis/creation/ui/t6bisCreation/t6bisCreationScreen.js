import React from 'react';

import { View, Text } from 'react-native';

import { connect } from 'react-redux';

import { ComBadrCardBoxComp, ComBadrToolbarComp } from '../../../../../commons/component';
import { translate } from '../../../../../commons/i18n/ComI18nHelper';

import style from '../../style/t6bisCreationStyle';

import * as t6bisCreationSearchAction from '../../state/actions/t6bisCreationSearchAction';

import * as Constantes from '../../state/t6bisCreationConstants';

import { RadioButton } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
class T6bisCreation extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedType: null,
            listeType: []
        };
    }

    componentDidMount = async () => {
        let action = await t6bisCreationSearchAction.request({
            type: Constantes.CREATION_T6BIS_ALL_TYPE_REQUEST, value: null
        });
        let result = this.props.actions.dispatch(action);
        console.log(action, 'test');
        console.log(result);
        console.log('test', this.state);
        console.log('componentDidMount');

    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }



    reset = () => {
        console.log('reset');
    };

    render() {
        let rows = [];
        if (this.props.value) {
            rows = this.props.value  
        } 
        return (
            <View>

                <View style={style.container}>
                    <ComBadrToolbarComp
                        navigation={this.props.navigation}
                        icon="menu"
                        title={translate('t6bisCreation.t6bisCreation.title')}
                    />

                    {/* Décision */}
                    <ComBadrCardBoxComp style={style.cardBox}>

                        <View
                            style={style.flexColumn}
                            pointerEvents='auto'>
                            
                            <RadioButton.Group
                                onValueChange={(value) =>
                                    this.setState({ selectedType: value })
                                }
                                value={this.state.selectedType}>
                               

                                 {rows ? (
                                    rows.map((item) => (
                                        <View style={style.typeContainerRB}>
                                            <Text style={style.textRadio}>
                                                {item.libelle}
                                            </Text>
                                            <RadioButton
                                                color={style.textRadio.color}
                                                value={item.code}
                                            />
                                            </View>
                                    ))) : (<Text style={style.textRadio}>{translate('t6bisCreation.t6bisCreation.liste.vide')}</Text>)}  

                                 

                            </RadioButton.Group>
                        </View>
                    </ComBadrCardBoxComp>
                </View>


            </View>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.t6bisCreationReducer };
}

function mapDispatchToProps(dispatch) {
    let actions = { dispatch };
    return {
        actions,
    };
}


function getStateByMode(state) {
    return $scope.mode === "update" ? (state + "_update") : state;
}

function generateType(item) {
    var _item;
    if ("01" === item.code || "02" === item.code) {
        _item = {
            code: item.code,
            libelle: item.libelle,
            // checked: item.code === '01' ? true : false,
            tabs: [
                { state: getStateByMode("app2.ctrl_t6bis_entete"), libelle: "Entete" },
                { state: getStateByMode("app2.ctrl_t6bis_articles"), libelle: "Articles" },
                {
                    state: getStateByMode("app2.ctrl_t6bis_taxation_manuelle"),
                    libelle: "Taxation manuelle"
                },
                {
                    state: getStateByMode("app2.ctrl_t6bis_taxation_globale"),
                    libelle: "Taxation globale"
                },
                {
                    state: getStateByMode("app2.ctrl_t6bis_informations"),
                    libelle: "Informations"
                },
                { state: getStateByMode("app2.ctrl_t6bis_historique"), libelle: "Historique" },
                { state: "app2.ctrl_t6bis_type_chooser", libelle: "Quitter" }
            ]
        };
    } else if ("03" === item.code || "04" === item.code || "06" === item.code || "07" === item.code) {
        _item = {
            code: item.code,
            libelle: item.libelle,
            tabs: [
                { state: getStateByMode("app2.ctrl_t6bis_entete"), libelle: "Entete" },
                {
                    state: getStateByMode("app2.ctrl_t6bis_taxation_globale"),
                    libelle: "Taxation globale"
                },
                {
                    state: getStateByMode("app2.ctrl_t6bis_informations"),
                    libelle: "Informations"
                },
                { state: getStateByMode("app2.ctrl_t6bis_historique"), libelle: "Historique" },
                { state: "app2.ctrl_t6bis_type_chooser", libelle: "Quitter" }
            ]
        }
    }
    return _item;
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(T6bisCreation);

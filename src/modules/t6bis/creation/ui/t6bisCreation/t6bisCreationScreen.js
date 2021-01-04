import React from 'react';
import { Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { ComBadrButtonComp, ComBadrToolbarComp } from '../../../../../commons/component';
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet } from '../../../../../commons/styles/ComThemeStyle';
import * as t6bisCreationSearchAction from '../../state/actions/t6bisCreationSearchAction';
import * as Constantes from '../../state/t6bisCreationConstants';
import { ComSessionService } from '../../../../../commons/services/session/ComSessionService';
import styles from '../../style/t6bisCreationStyle';







class T6bisCreation extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedType: null,
            listeType: [],
            mode: null
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

    valider = () => {
        console.log('valider');

        var parameters = {
            "utilisateur": { "idActeur": ComSessionService.getInstance().getLogin(), "refBureau": { "codeBureau": ComSessionService.getInstance().getCodeBureau(), "refArrondissement": [] } },
            "codeTypeT6bis": this.state.selectedType.code,
            "bureauCourant": { "codeBureau": ComSessionService.getInstance().getCodeBureau(), "refArrondissement": [] }
        };
        console.log('parameters', parameters);
    }

    abandonner = () => {
        console.log('abandonner');
    }

    render() {
        let rows = [];
        let types = [];
        if (this.props.value) {
            rows = this.props.value;
            console.log('rows', rows);
            rows.forEach((item) => {
                console.log('item', item);
                const _item = generateType(item);
                if (_item) {
                    types.push(_item);
                }

            });
            console.log(types);


        }
        return (

            <View style={styles.container}>
                <ComBadrToolbarComp
                    navigation={this.props.navigation}
                    icon="menu"
                    title={translate('t6bisCreation.t6bisCreation.title')}
                />
                <Text style={CustomStyleSheet.centeredText}>
                    {translate('t6bisCreation.t6bisCreation.choixtype.title')}
                </Text>

                {/* Décision */}

                <View
                    style={styles.flexColumn}
                    pointerEvents='auto'>

                    <RadioButton.Group
                        onValueChange={(value) =>
                            this.setState({ selectedType: value })
                        }
                        value={this.state.selectedType}>


                        {types ? (
                            types.map((item) => (
                                <View style={styles.typeContainerRB}>
                                    <Text style={styles.textRadio}>
                                        {item.libelle}
                                    </Text>
                                    <RadioButton
                                        color={styles.textRadio.color}
                                        value={item.code}
                                    />
                                </View>
                            ))) : (<Text style={styles.textRadio}>{translate('t6bisCreation.t6bisCreation.liste.vide')}</Text>)}


                    </RadioButton.Group>
                </View>
                { (this.state.selectedType) && (
                    <View style={styles.ComContainerCompBtn}>


                        <ComBadrButtonComp
                            style={styles.actionBtn}
                            onPress={() => {
                                this.valider();
                            }}
                            text={translate('t6bisCreation.t6bisCreation.buttons.valider')}
                        />
                        <ComBadrButtonComp
                            style={styles.actionBtn}
                            onPress={() => {
                                this.abandonner();
                            }}
                            text={translate('t6bisCreation.t6bisCreation.buttons.abandonner')}
                        />
                    </View>)}
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
    let mode;
    return mode === "update" ? (state + "_update") : state;
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
    console.log(_item)
    return _item;
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(T6bisCreation);

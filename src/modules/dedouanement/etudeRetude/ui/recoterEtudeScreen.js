import {default as React} from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import {
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrItemsPickerComp,
  ComBadrKeyValueComp,
  ComBadrLibelleComp,
  ComBadrToolbarComp,
  ComBasicDataTableComp,
} from '../../../../commons/component';
import translate from '../../../../commons/i18n/ComI18nHelper';
import {Button, TextInput} from 'react-native-paper';
import styles from 'react-native-webview/lib/WebView.styles';
import DedInfosCommunsBlock from '../../initierControl/ui/dednfosCommunsBlock';
import DedRedressementRow from '../../redressement/ui/common/DedRedressementRow';
import ComBadrPickerComp from '../../../../commons/component/shared/pickers/ComBadrPickerComp';
import {CustomStyleSheet} from '../../../../commons/styles/ComThemeStyle';
import {Col, Row} from 'react-native-easy-grid';
import {LIST_TYPES_IDENTIFIANT} from '../../../actifs/rapport/utils/actifsConstants';
import {getValueByPath} from '../../redressement/utils/DedUtils';

class RecoterScreen extends React.Component {
  constructor(props) {
    super(props);

    console.log('recoter etude', JSON.stringify(this.props));
    this.cols = [
      {
        code: 'dateRecotation',
        libelle: translate('recoter.dateRecoter'),
        width: 150,
      },
      {
        code: 'agentRecoteur',
        libelle: translate('recoter.agentRecoteur'),
        width: 180,
      },
      {
        code: 'agentRecote',
        libelle: translate('recoter.agentRecote'),
        width: 180,
      },
      {
        code: 'motifRecotation',
        libelle: translate('recoter.motifRecotation'),
        width: 180,
      },
    ];
  }

  render() {
    return (
      <ScrollView>
        <View style={{flex: 1}}>
          <ComBadrToolbarComp
            navigation={this.props.navigation}
            title={translate('recoter.title')}
            subtitle={translate('recoter.historique')}
            icon="menu"
          />
          {this.props.errorMessage != null && (
            <ComBadrErrorMessageComp message={this.props.errorMessage} />
          )}
          {this.props.messageInfo != null && (
            <ComBadrInfoMessageComp message={this.props.messageInfo} />
          )}
          <DedInfosCommunsBlock
            dedRef={{
              reference: this.props?.route.params.searchData.reference,
              libelleRegime: '',
            }}
          />
          <ComBasicDataTableComp
            ref="_badrTable"
            id="resultatInitListCtrl"
            rows={this.props?.value?.data?.recotationsAffichables}
            cols={this.cols}
            totalElements={1}
            maxResultsPerPage={10}
            paginate={true}
            showProgress={this.props.showProgress}
          />
        </View>
        <View style={{flex: 1}}>
          <Row style={CustomStyleSheet.whiteRow}>
            <ComBadrKeyValueComp
              libelle="Actuellement coté à "
              libelleSize={1}
              children={
                <TextInput
                  type="flat"
                  label=""
                  disabled={true}
                  value={
                    this.props?.value?.data?.recotationsAffichables[
                      this.props?.value?.data?.recotationsAffichables.length - 1
                    ].agentRecote
                  }
                />
              }
            />
          </Row>
          <Row style={CustomStyleSheet.whiteRow}>
            <Col size={7}>
              <ComBadrLibelleComp withColor={true}>
                {translate('recoter.recoteA')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={10}>
              <ComBadrItemsPickerComp
                disabled={this.props.readOnly}
                style={{
                  borderWidth: 0,
                  borderColor: '#696969',
                  borderRadius: 4,
                  height: 40,
                  fontSize: 12,
                  paddingBottom: 45,
                }}
                label={translate('recoter.recoteA')}
                items={this.props?.value?.data?.comboBeansAgentsRecotes}
                onValueChanged={(value, index) =>
                  // value?.code ? this.onChangeTypeIdentifiant(value) :
                  {}
                }
              />
            </Col>
          </Row>

          <Row style={CustomStyleSheet.whiteRow}>
            <Col size={7}>
              <ComBadrLibelleComp withColor={true}>
                {translate('recoter.motifRecotation')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={10}>
              <ComBadrItemsPickerComp
                disabled={this.props.readOnly}
                style={{
                  borderWidth: 0,
                  borderColor: '#696969',
                  borderRadius: 4,
                  height: 40,
                  fontSize: 12,
                  paddingBottom: 45,
                }}
                label={translate('recoter.motifRecotation')}
                selectedValue={
                  this.props?.value?.data?.recotationsAffichables[
                    this.props?.value?.data?.recotationsAffichables.length - 1
                  ].motifRecotation.match('<<(.*)>>')[1]
                }
                items={this.props?.value?.data?.comboBeansMotifsRecotation}
                onValueChanged={(value, index) =>
                  // value?.code ? this.onChangeTypeIdentifiant(value) :
                  {}
                }
              />
            </Col>
          </Row>
        </View>
        <View style={{padding: 50}}>
          <Button
            onPress={this.confirmer}
            icon="check"
            compact="true"
            mode="contained"
            style={styles.btnConfirmer}
            loading={this.props.showProgress}>
            {translate('transverse.confirmer')}
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.initierControlReducer,
});

export default connect(mapStateToProps, null)(RecoterScreen);

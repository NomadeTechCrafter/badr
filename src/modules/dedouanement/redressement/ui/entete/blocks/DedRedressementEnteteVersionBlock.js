import React from 'react';
import {View} from 'react-native';
import {
  ComAccordionComp,
  ComBadrKeyValueComp,
  ComBadrTouchableButtonComp,
} from '../../../../../../commons/component';
import styles from '../../../style/DedRedressementStyle';
import ComBadrLibelleComp from '../../../../../../commons/component/shared/text/ComBadrLibelleComp';
import DedRedressementRow from '../../common/DedRedressementRow';
import {getValueByPath} from '../../../utils/DedUtils';

class DedRedressementEnteteVersionBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp title="Versions" expanded={true}>
          <DedRedressementRow zebra={true}>
            <ComBadrKeyValueComp
              libelle="Type : "
              value={getValueByPath('typeVersion', this.props.data)}
            />
            <ComBadrKeyValueComp
              libelle="N° : "
              value={getValueByPath('numeroVersion', this.props.data)}
            />
          </DedRedressementRow>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelleSize={4}
              libelle="Mode d'acquisition : "
              value={getValueByPath('modeAcquisition', this.props.data)}
            />
            <ComBadrKeyValueComp
              libelle="Statut : "
              children={
                <View>
                  <ComBadrLibelleComp style={{padding: 10}}>
                    {getValueByPath('statut', this.props.data)}
                  </ComBadrLibelleComp>
                  <ComBadrTouchableButtonComp
                    text="Commentaires"
                    style={styles.touchableButtonStyle}
                  />
                </View>
              }
            />
          </DedRedressementRow>
          <DedRedressementRow zebra={true}>
            <ComBadrKeyValueComp
              libelleSize={3}
              libelle="Code initiateur : "
              value={getValueByPath('codeInitiateur', this.props.data)}
            />
            <ComBadrKeyValueComp
              libelle="Nom : "
              value={getValueByPath('nomInitiateur', this.props.data)}
            />
          </DedRedressementRow>

          <DedRedressementRow>
            <ComBadrLibelleComp style={styles.versionInitialStyle} />
            <ComBadrLibelleComp style={styles.versionInitialStyle}>
              Version initiale
            </ComBadrLibelleComp>

            <ComBadrLibelleComp style={styles.versionEnCoursStyle}>
              Version en cours
            </ComBadrLibelleComp>
          </DedRedressementRow>

          <DedRedressementRow zebra={true}>
            <ComBadrLibelleComp withColor={true}>
              Date de création
            </ComBadrLibelleComp>
            <ComBadrLibelleComp style={styles.versionInitialStyle}>
              {getValueByPath('dateCreation_VI', this.props.data)}
            </ComBadrLibelleComp>
            <ComBadrLibelleComp style={styles.versionEnCoursStyle}>
              {getValueByPath('dateCreation_VC', this.props.data)}
            </ComBadrLibelleComp>
          </DedRedressementRow>

          <DedRedressementRow>
            <ComBadrLibelleComp withColor={true}>
              Date de d'enregistrement
            </ComBadrLibelleComp>
            <ComBadrLibelleComp style={styles.versionInitialStyle}>
              {getValueByPath('dateEnregistrement_VI', this.props.data)}
            </ComBadrLibelleComp>
            <ComBadrLibelleComp style={styles.versionEnCoursStyle}>
              {getValueByPath('dateEnregistrement_VC', this.props.data)}
            </ComBadrLibelleComp>
          </DedRedressementRow>

          <DedRedressementRow zebra={true}>
            <ComBadrLibelleComp withColor={true}>
              Date effective d'enregistrement
            </ComBadrLibelleComp>
            <ComBadrLibelleComp style={styles.versionInitialStyle} />
            <ComBadrLibelleComp style={styles.versionEnCoursStyle} />
          </DedRedressementRow>

          <DedRedressementRow>
            <ComBadrLibelleComp withColor={true}>
              Date de dépot
            </ComBadrLibelleComp>
            <ComBadrLibelleComp style={styles.versionInitialStyle} />
            <ComBadrLibelleComp style={styles.versionEnCoursStyle} />
          </DedRedressementRow>

          <ComBadrTouchableButtonComp
            text="Version courante"
            style={styles.touchableButtonStyle}
            onPress={this.props.onVersionCourantePressed}
          />
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementEnteteVersionBlock;

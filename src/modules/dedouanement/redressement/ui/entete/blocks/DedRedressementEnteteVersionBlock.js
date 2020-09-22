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

class DedRedressementEnteteVersionBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp title="Versions" expanded={false}>
          <DedRedressementRow zebra={true}>
            <ComBadrKeyValueComp libelle="Type : " value="" />
            <ComBadrKeyValueComp libelle="N° : " value="" />
          </DedRedressementRow>
          <DedRedressementRow>
            <ComBadrKeyValueComp libelle="Mode d'acquisition : " value="" />
            <ComBadrKeyValueComp
              libelle="Statut : "
              children={
                <ComBadrTouchableButtonComp
                  text="Commentaires"
                  style={styles.touchableButtonStyle}
                />
              }
            />
          </DedRedressementRow>
          <DedRedressementRow zebra={true}>
            <ComBadrKeyValueComp libelle="Code initiateur : " value="" />
            <ComBadrKeyValueComp libelle="Nom : " value="" />
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
            <ComBadrLibelleComp style={styles.versionInitialStyle} />
            <ComBadrLibelleComp style={styles.versionEnCoursStyle} />
          </DedRedressementRow>

          <DedRedressementRow>
            <ComBadrLibelleComp withColor={true}>
              Date de d'enregistrement
            </ComBadrLibelleComp>
            <ComBadrLibelleComp style={styles.versionInitialStyle} />
            <ComBadrLibelleComp style={styles.versionEnCoursStyle} />
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

import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrKeyValueComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {TextInput, Subheading} from 'react-native-paper';
import ComBadrLibelleComp from '../../../../../../commons/component/shared/text/ComBadrLibelleComp';
import {getValueByPath, getValueByPaths} from '../../../utils/DedUtils';
import {pre} from 'react-native-render-html/src/HTMLRenderers';

class DedRedressementEnteteDeclarantOpeBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp title="Déclarant (Opérateur)" expanded={true}>
          <View style={styles.container}>
            <DedRedressementRow zebra={true}>
              <Text style={styles.headingText}>Déclarant (Opérateur)</Text>
            </DedRedressementRow>
            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Code"
                value={getValueByPath(
                  'dedDumSectionEnteteVO.codeDeclarant',
                  this.props.data,
                )}
              />
              <ComBadrKeyValueComp
                libelleSize={3}
                libelle="N° Répertoire"
                children={
                  <TextInput
                    type="flat"
                    label=""
                    disabled={true}
                    value={getValueByPath(
                      'dedDumSectionEnteteVO.numeroRepertoire',
                      this.props.data,
                    )}
                  />
                }
              />
            </DedRedressementRow>

            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Nom ou raison sociale"
                value={getValueByPath(
                  'dedDumSectionEnteteVO.nomDeclarant',
                  this.props.data,
                )}
              />
            </DedRedressementRow>
          </View>

          {this.buildOperateurBlock(
            'Expediteur / Exportateur / Cédant',
            'dedDumSectionEnteteVO.codeCentreRCExpediteur',
            'dedDumSectionEnteteVO.nomCentreRC',
            'dedDumSectionEnteteVO.ifuExpediteur',
            'dedDumSectionEnteteVO.nomOperateurExpediteurR',
            'dedDumSectionEnteteVO.nomOperateurExpediteurS',
            'dedDumSectionEnteteVO.adresseOperateurExpediteurR',
            'dedDumSectionEnteteVO.adresseOperateurExpediteurS',
            'dedDumSectionEnteteVO.preIfuExpediteur',
          )}
          {this.buildOperateurBlock(
            'Destinataire, Importateur / Cessionaire',
            'dedDumSectionEnteteVO.codeCentreRCDestinataire',
            'dedDumSectionEnteteVO.nomCentreRCDestinataire',
            'dedDumSectionEnteteVO.ifuDestinataire',
            'dedDumSectionEnteteVO.nomOperateurDestinataireR',
            'dedDumSectionEnteteVO.nomOperateurDestinataireS',
            'dedDumSectionEnteteVO.adresseOperateurDestinataireR',
            'dedDumSectionEnteteVO.adresseOperateurDestinataireS',
            'dedDumSectionEnteteVO.preIfuDestinataire',
          )}
          {this.buildOperateurBlock(
            "Operateur pour lequel est engagé l'opération",
            'dedDumSectionEnteteVO.codeCentreRCOperateurPourLequel',
            'dedDumSectionEnteteVO.nomCentreRCOperateurPourLequel',
            'dedDumSectionEnteteVO.ifuOperateurPourLequel',
            'dedDumSectionEnteteVO.nomOperateurPourLequel',
            'dedDumSectionEnteteVO.nomOperateurPourLequel',
            'dedDumSectionEnteteVO.adresseOperateurPourLequel',
            'dedDumSectionEnteteVO.adresseOperateurPourLequel',
            'dedDumSectionEnteteVO.preIfuDestinataire',
          )}
        </ComAccordionComp>
      </View>
    );
  }

  buildOperateurBlock = (
    title,
    numRC,
    nomRC,
    ifu,
    nomOpeExpR,
    nomOpeExpS,
    adressOpeExpR,
    adressOpeExpS,
    preIfu,
  ) => {
    return (
      <View style={styles.container}>
        <DedRedressementRow zebra={true}>
          <Text style={styles.headingText}>{title}</Text>
        </DedRedressementRow>

        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelleSize={1}
            libelle="N° R.C"
            value={getValueByPath(numRC, this.props.data)}
          />
          <ComBadrKeyValueComp
            libelleSize={1}
            libelle="Centre R.C"
            value={getValueByPath(nomRC, this.props.data)}
          />
        </DedRedressementRow>

        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelleSize={1}
            libelle="IFU"
            value={
              getValueByPath(preIfu, this.props.data)
                ? getValueByPath(ifu, this.props.data)
                : ''
            }
          />
          <ComBadrKeyValueComp />
        </DedRedressementRow>

        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Nom ou raison sociale"
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPaths(nomOpeExpR, nomOpeExpS, this.props.data)}
              />
            }
          />
        </DedRedressementRow>

        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelle="Adresse complète"
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPaths(
                  adressOpeExpR,
                  adressOpeExpS,
                  this.props.data,
                )}
              />
            }
          />
        </DedRedressementRow>
      </View>
    );
  };
}

export default DedRedressementEnteteDeclarantOpeBlock;

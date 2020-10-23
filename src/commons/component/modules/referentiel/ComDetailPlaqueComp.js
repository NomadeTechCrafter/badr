import React from 'react';
import {Text, View} from 'react-native';

import {primaryColor} from '../../../styles/ComThemeStyle';
import {translate} from '../../../i18n/ComI18nHelper';
import {Caption, Paragraph} from 'react-native-paper';

import ComNumeroPlaqueComp from './ComNumeroPlaqueComp';
import ComNumeroPlaqueRemorqueDiploComp from './ComNumeroPlaqueRemorqueDiploComp';

export default class ComDetailPlaqueComp extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props.data);
  }

  render() {
    let data = this.props.data;
    console.log('-----> ------> -----> ');
    console.log(data.proprietaireCodeType?.toString());
    console.log('-----> ------> -----> ');
    return data ? (
      <View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.typeProprietaire')}
            </Text>
            <Text>{data.proprietaireCodeType?.toString()}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.typeIdentifiant')}
            </Text>
            <Text>
              {data.proprietaireCodeTypeDocumentIdentifiant?.toString()}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.identifiant')}
            </Text>
            <Text>{data.proprietaireNumeroIdentifiant?.toString()}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.nomRS')}
            </Text>
            <Text>{data.proprietaireNom?.toString()}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.prenom')}
            </Text>
            <Text>{data.proprietairePrenom?.toString()}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.adresse')}
            </Text>
            <Text>{data.proprietaireAdresse?.toString()}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.ville')}
            </Text>
            <Text>{data.proprietaireCodeVille?.toString()}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.nChassis')}
            </Text>
            <Text>{data.vehiculeNumChassis?.toString()}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.nImmNormale')}
            </Text>
            <ComNumeroPlaqueComp
              numero={data.vehiculeNumImmatComplet?.toString()}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.nImmDiplomatique')}
            </Text>
            <ComNumeroPlaqueRemorqueDiploComp
              numero1={data.vehiculeNumImmatDiplo1?.toString()}
              numero2={data.vehiculeNumImmatDiplo2?.toString()}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.vehiculeCodeTypeImmatDiplo')}
            </Text>
            <Text>{data.vehiculeCodeTypeImmatDiplo?.toString()}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.nImmremorque')}
            </Text>
            <ComNumeroPlaqueRemorqueDiploComp
              numero1={data.vehiculeNumImmatRem1?.toString()}
              numero2={data.vehiculeNumImmatRem2?.toString()}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.nImmAntetieur')}
            </Text>
            <Text>{data.vehiculeNumImmatAnterieur?.toString()}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.typeUsage')}
            </Text>
            <Text>{data.vehiculeCodeUsage?.toString()}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.genre')}
            </Text>
            <Text>{data.vehiculeCodeGenre?.toString()}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.marque')}
            </Text>
            <Text>{data.vehiculeCodeMarque?.toString()}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.TypeVehicule')}
            </Text>
            <Text>{data.vehiculeCodeType?.toString()}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.puissanceFiscale')}
            </Text>
            <Text>{data.vehiculePuissanceFiscale?.toString()}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.TypeCarburant')}
            </Text>
            <Text>{data.vehiculeCodeTypeCarburant?.toString()}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.poidsVide')}
            </Text>
            <Text>{data.vehiculePoidsVide?.toString()}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.poidsCharge')}
            </Text>
            <Text>{data.vehiculePoidsCharge?.toString()}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.dateMiseCirculation')}
            </Text>
            <Text>{data.vehiculeDatePremiereMiseEnCirc?.toString()}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.dateMiseCirculatioM')}
            </Text>
            <Text>{data.vehiculeDateMiseEnCircAuMaroc?.toString()}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.dateMutation')}
            </Text>
            <Text>{data.vehiculeDateMutation?.toString()}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.caption}>
              {translate('components.detailPlaque.dataDepot')}
            </Text>
            <Text>{data.vehiculeDateDepot?.toString()}</Text>
          </View>
        </View>
      </View>
    ) : (
      <></>
    );
  }
}

const styles = {
  row: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  column: {width: '50%', padding: 5, justifyContent: 'flex-start'},
  oneColumn: {width: '100%', padding: 5, justifyContent: 'flex-start'},
  caption: {color: primaryColor, fontWeight: 'bold'},
};

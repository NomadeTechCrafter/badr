import React from 'react';
import {View, Text} from 'react-native';

import {primaryColor} from '../../../styles/index';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Paragraph, Caption} from 'react-native-paper';

/** i18n **/
import {translate} from '../../../common/translations/i18n';

export default class DetailBAD extends React.Component {
  render() {
    let data = this.props.data;
    console.log(data);
    return (
      <View style={{padding: 30}}>
        <Grid>
          <Col size={20}>
            <Caption style={styles.caption}>
              {translate('controle.bad.numeroBAD')}
            </Caption>
          </Col>
          <Col size={30}>
            <Paragraph style={styles.paragraph}>{data.numeroBAD}</Paragraph>
          </Col>
          <Col size={20}>
            <Caption style={styles.caption}>
              {translate('controle.bad.statutBAD')}
            </Caption>
          </Col>
          <Col size={30}>
            <Paragraph style={styles.paragraph}>{data.statutBAD} </Paragraph>
          </Col>
        </Grid>

        <Grid>
          <Col size={20}>
            <Caption style={styles.caption}>
              {translate('controle.bad.nomImportateur')}
            </Caption>
          </Col>
          <Col size={30}>
            <Paragraph style={styles.paragraph}>
              {data.nomImportateur}
            </Paragraph>
          </Col>
          <Col size={20}>
            <Caption style={styles.caption}>
              {translate('controle.bad.nomTransportateur')}
            </Caption>
          </Col>
          <Col size={30}>
            <Paragraph style={styles.paragraph}>
              {data.nomTransportateur}
            </Paragraph>
          </Col>
        </Grid>

        <Grid>
          <Col size={20}>
            <Caption style={styles.caption}>
              {translate('controle.bad.nomConsignataire')}
            </Caption>
          </Col>
          <Col size={30}>
            <Paragraph style={styles.paragraph}>
              {data.nomConsignataire}
            </Paragraph>
          </Col>
          <Col size={20}>
            <Caption style={styles.caption}>
              {translate('controle.bad.dateBonADelivrerStr')}
            </Caption>
          </Col>
          <Col size={30}>
            <Paragraph style={styles.paragraph}>
              {data.dateBonADelivrerStr}
            </Paragraph>
          </Col>
        </Grid>

        <Grid>
          <Col size={20}>
            <Caption style={styles.caption}>
              {translate('controle.bad.descriptionMoyenTransport')}
            </Caption>
          </Col>
          <Col size={30}>
            <Paragraph style={styles.paragraph}>
              {data.descriptionMoyenTransport}
            </Paragraph>
          </Col>
          <Col size={20}>
            <Caption style={styles.caption}>
              {translate('controle.bad.numeroEscale')}
            </Caption>
          </Col>
          <Col size={30}>
            <Paragraph style={styles.paragraph}>{data.numeroEscale} </Paragraph>
          </Col>
        </Grid>

        <Grid>
          <Col size={20}>
            <Caption style={styles.caption}>
              {translate('controle.bad.lieuDechargement')}
            </Caption>
          </Col>
          <Col size={30}>
            <Paragraph style={styles.paragraph}>
              {data.lieuDechargement}
            </Paragraph>
          </Col>
          <Col size={20}>
            <Caption style={styles.caption}>
              {translate('controle.bad.lieuProvenance')}
            </Caption>
          </Col>
          <Col size={30}>
            <Paragraph style={styles.paragraph}>
              {data.lieuProvenance}
            </Paragraph>
          </Col>
        </Grid>

        <Grid>
          <Col size={20}>
            <Caption style={styles.caption}>
              {translate('controle.bad.dateArrivee')}
            </Caption>
          </Col>
          <Col size={30}>
            <Paragraph style={styles.paragraph}>
              {data.lieuDechargement}
            </Paragraph>
          </Col>
          <Col size={20}>
            <Caption style={styles.caption}>
              {translate('controle.bad.referenceDSBAD')}
            </Caption>
          </Col>
          <Col size={30}>
            <Paragraph style={styles.paragraph}>
              {data.lieuProvenance}
            </Paragraph>
          </Col>
        </Grid>

        <Grid>
          <Col size={20}>
            <Caption style={styles.caption}>
              {translate('controle.bad.descriptionTypeDSBAD')}
            </Caption>
          </Col>
          <Col size={30}>
            <Paragraph style={styles.paragraph}>
              {data.descriptionTypeDSBAD}
            </Paragraph>
          </Col>
          <Col size={20}>
            <Caption style={styles.caption}>
              {translate('controle.bad.referenceCNTBAD')}
            </Caption>
          </Col>
          <Col size={30}>
            <Paragraph style={styles.paragraph}>
              {data.referenceCNTBAD}
            </Paragraph>
          </Col>
        </Grid>
      </View>
    );
  }
}

const styles = {
  caption: {fontSize: 18, color: primaryColor, fontWeight: 'bold'},
  paragraph: {fontSize: 18},
};

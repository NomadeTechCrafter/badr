export default {
  menu: {
    arrondissement: 'Arrondissement : ',
    bureau: 'Bureau : ',
    logout_in_progress: 'Chargement...',
    logout: 'Se déconnecter',
    change_profile: 'Changer les profils',
  },
  annonce: {
    title: 'Accueil',
    annonces: 'Annonces',
    aucune_annonce: 'Aucune annonce pour le moment.',
  },
  login: {
    userName: "Nom d'utilisateur",
    password: 'Mot de pass',
    connexion: 'Connexion',
  },
  smsVerify: {
    message:
      'Veuillez saisir le code de vérification que vous avez reçu par SMS (compose de 6 chiffres)',
    confirm: 'Confirmer',
    codeCorrect: 'Code correct',
    codeIncorrect:
      'La vérification a échouée. Merci de vérifier le code introduit.',
    codePlaceholder: '6 chiffres reçus par SMS',
  },
  profile: {
    listeBureaux: 'Liste des bureaux',
    listeArrondissements: 'Liste des arrondissements',
    listeProfils: 'Liste des profils',
    submit: 'Valider',
    validation: {
      bureau_mandatory: 'Le choix du bureau est obligatoire',
      profil_mandatory: 'Le choix du profil est obligatoire',
    },
  },
  errors: {
    technicalIssue: "Erreur technique, contactez l''administratteur",
    donneeObligatoire: 'la saisie du champ "{{champ}}" est obligatoire !',
    cleNotValid: 'Vérifiez la référence de votre déclaration ({{cle}})',
    maxNombreScelle: 'Le maximum des scellés generés est 100',
    numScelleInferieur:
      'Le premier numéro de scellé du générateur doit être inférieur au dernier. ',
    numScelleLongueur:
      'Le nombre de scellé doit être numérique et de longueur 8! ',
    numScelleExisteDeja: 'Le nombre de scellé existe déjà',
  },
  info: {
    pleasewait: 'Veuillez pateinter...',
    welcome:
      'Nam ac tincidunt augue. Curabitur ultricies imperdiet nunc sed finibus. Praesent non semper tellus. Phasellus sagittis felis a dignissim pulvinar. Donec varius ornare malesuada. Vivamus euismod, ex nec mollis finibus, mauris metus porttitor turpis, vel fringilla dui turpis vel eros. Mauris vehicula et ante non elementum. Aliquam eget posuere enim. Sed eget lobortis eros, efficitur finibus augue.',
    smsVerify: {
      confirmConnexionPending:
        'Confirmation de la connexion avec le profil : [ALLPROFIL]',
    },
  },
  components: {
    pickerchecker: {
      default_value: 'Choisissez une valeur',
      selected: 'Sélectionnés',
      delete_all: 'Supprimer tous',
      search: 'Rechercher...',
      submit: 'Valider',
    },
    progressbar: {
      loading: 'Chargement en cours...',
    },
  },
  controle: {
    title: 'Contrôle',
    RI: 'Régimes internes',
    ACVP: 'ADMISSION POUR CONFORME / VISITE PHYSIQUE',
    annotations: 'Annotations',
    intervention: 'Interventions',
    version: 'Version',
    typeIntervention: 'Type d’intervention',
    date: 'Date',
    acteur: 'Acteur',
    commentaire: 'Commentaire',
    commentaires: 'Commentaires',
    listDocExigible: 'Liste des Docs exigibles',
    doc: 'Doc',
    portee: 'Portée',
    nArticle: "N° d'articles",
    reconnu: 'Reconnu',
    consignation: 'Consignation',
    decision: 'Décision',
    redressementOperes: 'Redressement opéré',
    genererCompte: 'Générer compte rendu des redressements',
    observation: 'Observation',
    votreObservation: 'Votre observation ...',
    historiqueCompteRendu: 'Historique des comptes rendu de contrôle',
    controleConforme: 'Contrôle conforme',
    redressementContentieux: 'Redressement avec contentieux',
    redressementSansContentieux: 'Redressement sans contentieux',
    sauvegarder: 'Sauvegarder',
    choisirAction: 'Choisir une action',
    validerControle: 'Valider le contrôle',
    redresserDeclaration: 'Redresser la déclaration',
    regimeInterne: 'Régime interne',
    declarationEnattenteControl: 'Déclarations en attente de contrôle',
    nbrEnregistrement: 'Nombre Enregistrements',
    declaration: 'Déclaration',
    dateCreation: 'Date Création',
    dateEnregistrement: 'Date Enregistrement',
    nVoyage: 'N°Voy',
    regimeTransite: 'Régime transit',
  },
  bad: {
    title: 'Bon à délivrer',
    numeroBAD: 'N° BAD',
    statutBAD: 'Statut BAD',
    nomImportateur: 'Nom importateur',
    nomTransportateur: 'Nom transportateur',
    nomConsignataire: 'Nom consignatiare',
    dateBonADelivrerStr: 'Date BAD',
    descriptionMoyenTransport: 'Moyen de transport',
    numeroEscale: 'N° escale',
    nombreContenant: 'Nombre contenants',
    lieuDechargement: 'Lieu de chargement',
    lieuProvenance: 'Lieu provenance',
    dateArrivee: 'Date arrivée',
    referenceDSBAD: 'Référence BAD',
    referenceDS: 'Reference DS',
    typeDS: 'Type DS',
    referenceLot: 'Référence lot',
    descriptionTypeDSBAD: 'Description type BAD',
    referenceCNTBAD: 'Référence CNT',
    numeroLigne: 'N° de ligne',
    natureMarchandise: 'Nature marchandise',
    poidbrut: 'Poids brut',
    tare: 'Tare',
    listEquipementsTitle: 'Liste des equipements',
    numeroEquipement: 'N° Equipement',
    tareEquipement: 'Tare equipement',
  },
  welcome: {
    title: 'Bienvenue',
    subTitle: "Écran D'accueil",
  },
  transverse: {
    bureau: 'Bureau',
    regime: 'Régime',
    annee: 'Année',
    serie: 'Série',
    numero: 'Numéro',
    cle: 'Clé',
    nVoyage: 'n°Voy',
    type: 'Type',
    Ok: 'Ok',
    confirmer: 'Confirmer',
    valider: 'Valider',
    retablir: 'Rétablir',
    enregistrer: 'Enregistrer',
    quitter: 'Quitter',
    fermer: 'Fermer',
    abandonner: 'Abandonner',
    rechercher: 'Rechercher',
    nouveau: 'Nouveau',
    du: 'Du',
    au: 'Au',
    noRowFound: 'Aucun enregistrement trouvé.',
    listDeclaration: 'Liste Declaclartion',
    poidsBrut: 'Poids brut',
    poidsNet: 'Poids net',
    refDS: 'Référence DS',
    typeDS: 'Type DS',
    total: 'Total',
    lieuChargement: 'Lieu de chargement',
    referenceLot: 'Référence Lot',
    nature: 'Nature',
  },
  referentiel: {
    plaquesImm: {
      title: "Plaques d'immatriculation",
      subTitle: 'écran de echerche',
      numeroChassis: 'N° de chassis : ',
      numeroIdentifiant: 'Numéro identifiant',
      nomProprietaire: 'Nom',
      proprietaire: 'Proprietaire',
      categoryDiplomatique: 'Catégorie diplomatique',
      choose_categoryDiplomatique: 'Choisissez une catégorie diplomatique',
      numeroPlaqueImmNormale: "N° d'immatriculation normale",
      numeroPlaqueImmDiplomatqiue: "N° d'immatriculation diplomatique",
      numeroPlaqueImmRemorque: "N° d'immatriculation remorque",
      prenomProprietaire: 'Prenom',
      raisonSociale: 'Raison sociale',
      searchByNumChassis: 'Par numéro de chassis',
      searchByNumImmNormal: "Par numéro d'immatriculation NORMALE",
      searchByNumImmDiplo: "Par numéro d'immatriculation DIPLOMATIQUE",
      searchByNumImmRemorque: 'Par numéro dimmatriculation REMORQUE',
      searchByIdentitePropr: 'Par identité du propriétaire',
      searchMandatoryFields:
        'Merci de saisir au moins un critère de recherche.',
    },
    controleVehicules: {
      title: 'Contrôle des véhicules volés',
      subTitle: 'écran de echerche',
      choose_status: 'Choisissez un statut',
      numeroChassis: 'N° chassis',
      matricule: 'Matricule',
      numeroCarteGrise: 'N° Carte grise',
    },
  },
  at: {
    verifierDepassementDelai: {
      message: 'Le délai est dépassé.',
    },
    title: 'Admission Temporaire',
    statut: 'Statut',
    dateCreation: 'Date création',
    dateEnregistrement: 'Date enregistrement',
    version: 'Version',
    apurementauto: {
      confirmDialog: {
        info: 'Admission temporaire automatique',
        oui: 'Oui',
        non: 'Non',
        confirmApurMessage: 'Voulez-vous apurer cette admission temporaire?',
      },
    },
    apurement: {
      actions: {
        apurer: 'APURER',
      },
      msg: {
        apurementOK: 'S40003 : AT Apurée avec succés',
      },
      mandatory: {
        fields:
          'Merci de saisir tous les champs obligatoires puis séléctionner au moins un composant à apurer.',
        dateApurement: 'La date apurement est une donnée obligatoire.',
      },
      title: 'Apurement',
      subTitleAction: 'Créer Apurement',
      manuelle: 'Manuelle',
      automatique: 'Automatique',
      titleTableau: 'Tableau des apurements AT',
      bureauApurement: 'Bureau Apurement',
      arrondApurement: 'Arrondissement Apurement',
      dateApurement: 'Date Apurement',
      mode: 'Mode',
      motif: 'Motif Apurement',
      exportateur: 'Exportateur',
      reexportation: 'Réexportation',
      titleTableauCompo: 'Liste des composants à apurer',
      typeComposant: 'Type composant',
      informationAffichee: 'Information affichée',
      modeApurement: 'Mode apurement',
      selectionner: 'Selectionner',
    },
  },
  loremIpsum1:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mi lectus, placerat mattis nulla ut, molestie consequat libero. Praesent ut dui ac elit pellentesque imperdiet eu a augue. Morbi ante velit, posuere sed orci ut, venenatis accumsan sapien. Vivamus sed luctus libero. Donec mattis condimentum turpis, sit amet consectetur ligula.',
  mainlevee: {
    title: 'MainLevée',
    operateur: 'Opérateur',
    Aucunenregistrementtrouve: 'Aucun enregistrement trouvé. ',
    Listedesdeclarations: ' Liste des déclarations ',
    refDroitTaxGaran: 'Droits et taxes payés ou garanties ',
    refPaiementAmend: "Paiement d'amendes ",
    sousReservePaiement: 'sous Réserve de Paiement ',
    mainleveeSousReservePaiement: 'Mainlevée Sous Réserve de Paiement ',
    validerMainlevee: 'Valider la mainlevée',
    referenceDeclaration: 'Référence déclaration',
    numVoyage: 'N° Voyage',
    numVersion: 'N° Version',
    dateCreation: 'Date création',
    dateEnregistrement: 'Date enreg.',
    operateurDeclarant: 'Opérateur déclarant (Nom)',
    listeLiquidations: {
      title: 'Liste des liquidations',
      numLiquidation: 'N° Liquidation',
    },
    delivrerMainlevee: {
      title: 'Délivrer la mainLevée',
      secondTitle: 'Compte rendu du contrôle immédiat',
      annotations: {
        title: 'Annotations',
        avecPesage: 'Avec pesage',
      },
      listeDocumentsExigibles: {
        title: 'Liste des documents exigibles',
        documentAnnexe: 'Document annexe',
        portee: 'Portée',
        numArticle: 'N° Article',
        reconnu: 'Reconnu',
        dConsignation: 'd. Consignation',
        laisserPasser: 'Laisser Passer',
        decisionOrganismeControle: 'Décision organisme de controle',
      },
      redressementOperes: {
        title: 'Redressements opérés',
        aucunRedressementEffectue: 'Aucun redressement effectué',
      },
      motivations: {
        title: 'Motivations',
      },
      decision: {
        title: 'Décision',
        redressementAvecContentieux: 'Redressement avec contentieux',
        redressementSansContentieux: 'Redressement sans contentieux',
        suggererVisitePhysique: 'Suggérer visite physique',
      },
      constationMarchandise: {
        title: 'Constation de la marchandise',
        numeroBulletinReception: 'Numéro du bulletin de réception',
        etatChargement: 'Etat de chargement',
      },
      informationsEcor: {
        title: 'Informations ECOR',
        numeroPince: 'Numéro Pince',
        nombreScelles: 'Nombre de Scellés',
        generateurScelle: 'Génerateur de numéros de scellés ',
        numeroScelle: 'Numéro scellé ',
      },
      dedouanementRemorque: {
        title: 'Dédouanement sur remorque',
        carnetTir: 'Carnet TIR',
        carnetAta: 'Carnet ATA',
        dechargeAquitCaution: "Décharge d'aquit à caution",
      },
      transit: {
        title: 'Transit',
        delaiAcheminement: "Délai d'acheminement",
        enHeure: 'h',
      },
    },
  },
  ecorimport: {
    title: 'Ecor Import',
    ouverture: 'Ouverture',
    cloture: 'Clôture',
    numLigne: 'N° Ligne',
    nbreContenant: 'Nombre contenant',
    agentEcoreur: 'Agent Ecoreur',
    aucunEquipEnleve: 'Aucun Equipement enlevé',
    declarationDetail: {
      title: 'Déclaration en détail',
      dateHeureEnreg: 'Date heure Enreg',
      typeDed: 'Type DeD',
      operateurDeclarant: 'Opérateur déclarant',
      valeurDeclaree: 'Valeur déclarée',
    },
    mainlevee: {
      title: 'MainLevée',
      dateValidationMainlevee: 'Date Validation',
      dateDelivranceMainlevee: 'Date Délivrance',
      agentValidationMainlevee: 'Agent Validation',
      agentDelivranceMainlevee: 'Agent Délivrance',
    },
    declarationSommaire: {
      title: 'Déclaration Sommaire',
      typeDeclaration: 'Type déclaration',
      choisirLotDedouanement: 'Choisir Lot dédouanement',
      referenceDeclaration: 'Référence déclaration',
    },
    lotDedouanement: {
      title: 'Lot de dédouanement',
      marque: 'Marque',
    },
    marchandisesEnlevees: {
      title: 'Marchandises Enlevées',
      lieuStockage: 'Lieu du stockage',
      delivrePar: 'Délivré par',
      immatriculationsVehicules: 'Immatriculations véhicules',
      dateHeureEffectiveEnlevement: 'Date heure Effective Enlèvement',
      heureEffectiveEnlevement: 'Heure Effective Enlèvement',
      dateEffectiveEnlevement: 'Date Effective Enlèvement',
    },
    listeEquipementsLot: {
      title: 'Liste des équipements du lot',
      refEquipement: 'Ref. équipement',
      typeEquipement: 'Type équipement',
      tareEquipement: 'Tare équipement',
      dateHeureEnlevement: 'Date Heure Enlèvement',
    },
    popUpListeLotApures: {
      title: 'Liste des lots apurés',
      natureMarchandise: 'Nature marchandise',
      marques: 'Marques',
    },
    enleverMarchandise: {
      title: 'Enlever marchandise',
      numBonSortie: 'Numéro Bon Sortie',
      nombreColis: 'Nombre colis',
      listeEnlevementsEffectues: {
        title: 'Liste des Enlèvements Effectués',
        colis: 'Nombre Colis',
        dateHeureEnlevement: 'Date Heure Enlèvement',
      },
    },
    peserMarchandise: {
      title: 'Peser marchandise',
      listePesagesEffectues: {
        title: 'Liste des Pesages Effectués',
        dateHeurePesage: 'Date Heure Pesage',
      },
      relevePesage: {
        title: 'Relevé de pesage',
        numPontBascule: 'N° Pont Bascule',
        tares: 'Tares',
      },
      errors: {
        poidsBrutIsSupTare: 'Le Poids brût doit être supérieure à la tares',
      },
    },
    enleverMarchandiseParPesage: {
      title: 'Enlever Marchandise par pesage',
    },
    verifierParContreEcor: {
      title: 'Vérifier par contre ecor',
      dateHeureContreEcor: 'Date Heure Contre Ecor',
      contreEcor: {
        title: 'Contre Ecor',
        dateContreEcor: 'Date contre Ecor',
        dateHeureSorti: 'Date Heure Sortie',
        heureContreEcor: 'Heure contre Ecor',
        numeroPorteSorti: 'Numéro Porte Sortie',
      },
    },
    messageConfirmation: {
      title: 'Confirmation',
      content: 'Etes vous sûr de vouloir quitter cette page?',
    },
  },
};

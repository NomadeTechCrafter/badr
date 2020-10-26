export default {
    enquetes: {
        compteRenduMission: {
            core: {
                generic: {
                    uor: 'UOR',
                    annee: 'Année',
                    serie: 'Série',
                    type: 'Type',
                    numeroMission: 'N° de mission',
                },
                codeInitiateur: 'Code de l\'initiateur',
                nomInitiateur: 'Nom de l\'initiateur',
                dateCreation: 'Date de création',
                libelle: 'Libellé',
                typeEnquete: 'Type d\'enquête',
                saisieDocuments: 'Saisie de documents',
                saisieMarchandises: {
                    radioButton: 'Saisie de marchandises',
                    title: 'Marchandises saisies',
                    natureMarchandise: 'Nature de marchandise',
                    uniteMesure: 'Unité de mesure',
                    uniteMesureList: 'Liste des unités de mesure',
                    quantite: 'Quantité',
                    valeur: 'Valeur (MAD)',
                },
                saisieVehicules: {
                    radioButton: 'Saisie de véhicules',
                    title: 'Moyens de transport saisis',
                    natureVehicule: 'Nature de véhicule',
                    natureVehiculeList: 'Liste des natures de véhicule',
                    libelle: 'Libellé',
                    valeur: 'Valeur (MAD)',
                },
                appositionScelles: {
                    radioButton: 'Apposition de scellés',
                    title: 'Scellés',
                    numerosScelles: 'Numéros des scellés',
                },
                oppositionFonctions: 'Opposition aux fonctions',
                recensement: 'Recensement',
                compteRendu: 'Compte rendu',
                commentaire: 'Commentaire',
                documentsAnnexes: {
                    title: 'Documents annexes',
                    numero: 'Numéro',
                    document: 'Document',
                },
            },
            search: {
                uor: 'UOR',
                annee: 'Année',
                serie: 'Série',
                table: {
                    reference: 'Référence',
                    statut: 'Statut',
                    dateEnregistrement: 'Date d\'enregistrement',
                    numeroMission: 'N° de mission',
                },
            },
            creerCompteRenduMission: {
                title: 'Créer CR de mission',
            },
            modifierCompteRenduMission: {
                title: 'Modifier CR de mission',
            },
            validerCompteRenduMission: {
                title: 'Valider CR de mission',
            },
        },
    },
};

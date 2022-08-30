export const champs_required_data = [
  { label: "Type", value: "type" },
  {
    label: "status",
    value: "status",
    options: [
      { label: "neuf", value: "new" },
      { label: "occasion", value: "used" },
    ],
  },
  { label: "couleur", value: "color" },
  { label: "Marque", value: "brand" },
  {
    label: "Année",
    value: "year",
  },
  {
    label: "Kilomètrage",
    value: "milage",
  },
  {
    label: "Licence",
    value: "licence",
  },
  {
    label: "Carburant",
    value: "fuel",
    options: [
      {
        label: "Essence",
        value: "essence",
      },
    ],
  },
  {
    label: "Platform",
    value: "platform",
  },
  {
    label: "Capacité de stockage",
    value: "storage_capacity",
    options: [
      { label: "2 GB", value: 2 },
      { label: "4 GB", value: 4 },
      { label: "8 GB", value: 8 },
      { label: "16 GB", value: 16 },
      { label: "32 GB", value: 32 },
    ],
  },
  {
    label: "Ages",
    value: "age",
    options: [
      {
        label: "1 ans",
        value: 2,
      },
      {
        label: "2 ans",
        value: 2,
      },
    ],
  },
];

export const status_repair: any = {
  pending: {
    label: "En attente",
    text: "En attente d'envoie du colis",
    value: 1,
  },
  send_dispached: {
    label: "Expedié",
    text: "Colis en cours d'envoie ...",
    value: 1,
  },
  checking: {
    label: "Verification",
    text: "Verification en cours ...",
    value: 2,
  },
  to_pay: {
    label: "A Payer",
    text: "En attente de paiement du facture ...",
    value: 3,
  },
  paid: {
    label: "Payée",
    text: "Facture payée",
    value: 4,
  },
  fixing: {
    label: "En reparation",
    text: "En cours de reparation ...",
    value: 5,
  },
  fixed: {
    label: "Reparation terminé",
    text: "Réparation terminé",
    value: 6,
  },
  return_dispached: {
    label: "Retour colis",
    text: "Envoie de colis de retour ...",
    value: 7,
  },
  finished: {
    label: "Terminé",
    text: "Terminé",
    value: 7,
  },
  total: 8,
};

export const status_purchase: any = {
  pending: {
    label: "En attente",
    text: "En attente de validation ",
    value: 1,
  },
  confirmed: {
    label: "Offre validée",
    text: "En attente d'éxpedition ",
    value: 2,
  },
  dispatched: {
    label: "Expedié",
    text: "Colis en cours d'envoie ...",
    value: 3,
  },
  received: {
    label: "colis réçu",
    text: "En atttente de verification",
    value: 4,
  },
  checked: {
    label: "produit validée",
    text: "En attente de paiement",
    value: 5,
  },
  total: 6,
};



export const status_exchange: any = {
  pending: {
      label: "En attente",
      text: "En attente de validation ",
      value: 1,
  },
  confirmed: {
      label: "Echange validée",
      text: "En attente d'éxpedition ",
      value: 2,
  },
  send_dispached: {
      label: "Expedié",
      text: "Colis en cours d'envoie ...",
      value: 3,
  },
  checking: {
      label: "colis réçu",
      text: "En atttente de verification",
      value: 4,
  },
  checked: {
      label: "produit validée",
      text: "En attente de paiement",
      value: 5
  },

  paid: {
      label: "Produit payée",
      text: "Colis en preparation d'envoie",
      value: 6,
  },
  return_dispatched: {
      label: "expedié",
      text: "Colis en cours d'envoie ...",
      value: 7,
  },
  cancelled: {
      label: "Annuler",
      text: "Echanger annuler par l'utilisateur",
      value: 8,
  }
  , total: 8
}


export const priority_data = [
  { label: "Haut", color: "red" },
  { label: "Haut", color: "red" },
  { label: "Moyenne", color: "yellow" },
  { label: "Bas", color: "green" },
];

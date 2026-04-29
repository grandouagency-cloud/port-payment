// ============================================================
// 🔧 PAYMENT METHODS CONFIGURATION
// ============================================================
// enabled: true  → méthode active (cliquable)
// enabled: false → méthode visible avec badge "OFF" (non cliquable)

export interface PaymentMethod {
  id: string
  name: string
  logo: string
  logoFallback: string
  color: string
  enabled: boolean
  type?: 'upload' | 'redirect'
  url?: string
  instructions: {
    en: string
    fr: string
  }
  account?: string
  note?: string
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  // ── ROW 1 : Méthodes actives ────────────────────────────────
  {
    id: 'moncash',
    name: 'MonCash',
    logo: '/assets/moncash.png',
    logoFallback: 'MC',
    color: '#E31837',
    enabled: true,
    type: 'upload',
    instructions: {
      en: 'Send the agreed amount to the MonCash number below, then upload your receipt.',
      fr: 'Envoyez le montant convenu au numéro MonCash ci-dessous, puis uploadez votre reçu.',
    },
    account: '📱 MonCash : +509 XX XX XX XX',
    note: 'Nom du compte : [NOM]',
  },
  {
    id: 'natcash',
    name: 'NatCash',
    logo: '/assets/natcash.png',
    logoFallback: 'NC',
    color: '#F28230',
    enabled: true,
    type: 'upload',
    instructions: {
      en: 'Transfer the agreed amount to the NatCash number below, then upload your receipt.',
      fr: 'Transférez le montant convenu au numéro NatCash ci-dessous, puis uploadez votre reçu.',
    },
    account: '📱 NatCash : +509 XX XX XX XX',
    note: 'Nom du compte : [NOM]',
  },
  {
    id: 'sogebank',
    name: 'Sogebank',
    logo: '/assets/sogebank.png',
    logoFallback: 'SG',
    color: '#1B3A8A',
    enabled: true,
    type: 'upload',
    instructions: {
      en: 'Transfer via Sogebank to the account below, then upload your receipt.',
      fr: 'Effectuez un virement Sogebank vers le compte ci-dessous, puis uploadez votre reçu.',
    },
    account: '🏦 Sogebank : XXX-XXXXXXX-X',
    note: 'Nom du compte : [NOM]',
  },
  {
    id: 'westernunion',
    name: 'Western Union',
    logo: '/assets/westernunion.png',
    logoFallback: 'WU',
    color: '#FFD700',
    enabled: true,
    type: 'upload',
    instructions: {
      en: 'Send the agreed amount via Western Union to the details below, then upload your receipt.',
      fr: 'Envoyez le montant convenu via Western Union aux coordonnées ci-dessous, puis uploadez votre reçu.',
    },
    account: '👤 Destinataire : [NOM]',
    note: 'Pays : [PAYS] — Contactez-nous pour les détails complets',
  },

  // ── ROW 2 : Bientôt disponible ──────────────────────────────
  {
    id: 'wise',
    name: 'Wise',
    logo: '/assets/wise.png',
    logoFallback: 'WS',
    color: '#00B9FF',
    enabled: true,
    type: 'upload',
    instructions: {
      en: 'Send the agreed amount via Wise to the details below, then upload your receipt.',
      fr: 'Envoyez le montant convenu via Wise aux coordonnées ci-dessous, puis uploadez votre reçu.',
    },
  },
  {
    id: 'stripe',
    name: 'Stripe',
    logo: '/assets/stripe.png',
    logoFallback: 'ST',
    color: '#635BFF',
    enabled: true,
    type: 'redirect',
    url: '',
    instructions: {
      en: 'You will be redirected to a secure Stripe payment page.',
      fr: 'Vous serez redirigé vers une page de paiement Stripe sécurisée.',
    },
  },
  {
    id: 'paypal',
    name: 'PayPal',
    logo: '/assets/paypal.png',
    logoFallback: 'PP',
    color: '#0070BA',
    enabled: true,
    type: 'redirect',
    url: '',
    instructions: {
      en: 'You will be redirected to a secure Paypal payment page.',
      fr: 'Vous serez redirigé vers une page de paiement Paypal sécurisée.',
    },
  },
  {
    id: 'mastercard',
    name: 'Mastercard',
    logo: '/assets/mastercard.png',
    logoFallback: 'MC',
    color: '#EB001B',
    enabled: true,
    type: 'upload',
    instructions: {
      en: 'Send the agreed amount via Mastercard to the details below, then upload your receipt.',
      fr: 'Envoyez le montant convenu via Mastercard aux coordonnées ci-dessous, puis uploadez votre reçu.',
    },
  },
]

// Toutes les méthodes (actives + bientôt) — pour affichage complet
export const getAllMethods = () => PAYMENT_METHODS

// Méthodes actives uniquement
export const getEnabledMethods = () => PAYMENT_METHODS.filter(m => m.enabled)

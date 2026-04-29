<div align="center">

<br/>

<img src="https://raw.githubusercontent.com/grandouagency-cloud/about-us/main/assets/hero.png" alt="port-payment" width="100%" style="border-radius: 20px"/>

<br/><br/>

# port-payment

<!-- Typing animation via readme-typing-svg -->
<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Orbitron&weight=600&size=22&pause=1800&color=FFFFFF&background=00000000&center=true&vCenter=true&multiline=false&width=600&height=50&lines=Open+Source+Payment+Portal;Secure+%26+Multilingual+Transactions;Modern+Payment+Solution;Built+with+React+%26+TypeScript;Portail+de+paiement+open+source" alt="Typing SVG" />
</a>

<br/><br/>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com)
![Status](https://img.shields.io/badge/Status-Active-00d4ff?style=for-the-badge)
[![GitHub stars](https://img.shields.io/github/stars/grandouagency-cloud/port-payment?style=for-the-badge&color=00d4ff&labelColor=0d1117&label=STARS)](https://github.com/grandouagency-cloud/port-payment)

<br/>

*Built by GRANDOU Agency — serving the world 🌍*

</div>

---


<details>
<summary><strong>🇬🇧 English</strong></summary>

<br/>

## About port-payment

**port-payment** is an open-source, secure, and multilingual payment portal built with modern technologies. Designed to simplify payment collection while maintaining the highest standards of security and user experience.

Perfect for businesses, freelancers, and organizations that need a lightweight, customizable payment solution.

---

## ✨ Features

- 🌐 **Multilingual Support** — Built-in support for multiple languages
- 🔒 **Secure Transactions** — Industry-standard security practices
- 🎨 **Modern UI/UX** — Beautiful, responsive design
- ⚡ **Fast & Lightweight** — Optimized performance with Vite
- 🧩 **Modular Architecture** — Easy to customize and extend
- 📱 **Mobile-Friendly** — Works seamlessly on all devices
- 🎯 **Easy Integration** — Simple API for payment integration
- 📊 **Floating Widget** — Elegant floating button interface

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/grandouagency-cloud/port-payment.git
cd port-payment

# Install dependencies
npm install

# Navigate to client
cd client
npm install

# Start development server
npm run dev
```

### Build

```bash
cd client
npm run build
```

---

## 🛠️ Tech Stack

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-EF0075?style=flat-square&logo=framer&logoColor=white)

</div>

<br>

<div align="center">

![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

</div>

---

## 📁 Project Structure

```
port-payment/
├── client/
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── config/           # Configuration files
│   │   ├── i18n/             # Internationalization
│   │   ├── styles/           # CSS stylesheets
│   │   ├── App.tsx           # Main app component
│   │   └── main.tsx          # Entry point
│   ├── public/               # Static assets
│   ├── index.html            # HTML template
│   ├── vite.config.ts        # Vite configuration
│   └── package.json
├── server/                    # Backend (optional)
├── README.md
├── package.json
└── tsconfig.json
```

---

## 🎨 Key Components

- **PaymentPortal** — Main payment processing interface
- **ContactForm** — Customer contact information form
- **FloatingButton** — Interactive floating button widget
- **SuccessModal** — Confirmation modal after payment
- **LanguageToggle** — Language switching functionality

---

## 🌍 Internationalization

Supports multiple languages with easy-to-extend translation system. Currently includes:
- French (FR)
- English (EN)

Add more languages in `src/i18n/translations.ts`

---

## 🎛️ Customization

### Payment Methods

You can easily add, remove, or modify payment methods by editing the configuration file:

**File**: `client/src/config/paymentMethods.ts`

#### Add a New Payment Method

```typescript
{
  id: 'stripe',
  name: 'Stripe',
  logo: '/assets/stripe.png',
  logoFallback: 'ST',
  color: '#635BFF',
  enabled: true,
  type: 'redirect',
  url: 'https://your-stripe-link.com',
  instructions: {
    en: 'Click to proceed with Stripe payment',
    fr: 'Cliquez pour procéder au paiement par Stripe',
  },
  account: '📧 Email: your-email@stripe.com',
}
```

#### Disable a Payment Method

Set `enabled: false` to hide the method or show it as "OFF":

```typescript
{
  id: 'bitcoin',
  enabled: false,  // ← Method will be hidden/disabled
  // ... rest of configuration
}
```

#### Customize Display

- **id**: Unique identifier for the method
- **name**: Display name
- **logo**: Path to logo image
- **logoFallback**: Text fallback if logo doesn't load
- **color**: Brand color (hex format)
- **type**: `'upload'` for receipt upload, `'redirect'` for external link
- **instructions**: Localized instructions for users
- **account**: Account details to display
- **note**: Additional notes

### Translations

Extend language support by editing `client/src/i18n/translations.ts`:

```typescript
export const translations = {
  en: {
    // English translations
  },
  fr: {
    // French translations
  },
  es: {
    // Add Spanish or any language
  },
}
```

Then update the language options in your components to include the new language.

### Styling

Customize the appearance:

- **Main styles**: `client/src/styles/main.css`
- **Colors**: Modify CSS variables in the stylesheet
- **Fonts**: Change Google Fonts import in `client/index.html`

### Adding Custom Components

To add new components:

1. Create a new file in `client/src/components/`
2. Import it in `client/src/App.tsx`
3. Add it to your layout

---

## 📝 License

This project is licensed under the **MIT License** — feel free to use it, modify it, and distribute it.

See [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

We welcome contributions! Please feel free to:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support & Contact

- **Website**: [GRANDOU Agency](https://www.grandouagency.com)
- **Email**: [grandouagency@gmail.com](mailto:grandouagency@gmail.com)
- **Issues**: [GitHub Issues](https://github.com/grandouagency-cloud/port-payment/issues)

---

## 🎯 Roadmap

- [ ] Enhanced payment method integrations
- [ ] Advanced analytics dashboard
- [ ] Webhook support
- [ ] Multi-currency support
- [ ] Server-side enhancements
- [ ] Admin panel

</details>

---

<details>
<summary><strong>🇫🇷 Français</strong></summary>

<br/>

## À propos de port-payment

**port-payment** est un portail de paiement open-source, sécurisé et multilingue construit avec des technologies modernes. Conçu pour simplifier la collecte de paiements tout en maintenant les plus hauts standards de sécurité et d'expérience utilisateur.

Parfait pour les entreprises, les freelancers et les organisations qui ont besoin d'une solution de paiement légère et personnalisable.

---

## ✨ Fonctionnalités

- 🌐 **Support Multilingue** — Support intégré pour plusieurs langues
- 🔒 **Transactions Sécurisées** — Pratiques de sécurité conformes aux normes industrielles
- 🎨 **Interface Moderne** — Design beau et réactif
- ⚡ **Rapide et Léger** — Performances optimisées avec Vite
- 🧩 **Architecture Modulaire** — Facile à personnaliser et étendre
- 📱 **Mobile-Friendly** — Fonctionne parfaitement sur tous les appareils
- 🎯 **Intégration Facile** — API simple pour l'intégration des paiements
- 📊 **Widget Flottant** — Interface bouton flottant élégant

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 16+
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/grandouagency-cloud/port-payment.git
cd port-payment

# Installer les dépendances
npm install

# Naviguer vers le client
cd client
npm install

# Démarrer le serveur de développement
npm run dev
```

### Build

```bash
cd client
npm run build
```

---

## 🛠️ Stack Technologique

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-EF0075?style=flat-square&logo=framer&logoColor=white)

</div>

<br>

<div align="center">

![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

</div>

---

## 📁 Structure du Projet

```
port-payment/
├── client/
│   ├── src/
│   │   ├── components/        # Composants React réutilisables
│   │   ├── config/           # Fichiers de configuration
│   │   ├── i18n/             # Internationalisation
│   │   ├── styles/           # Feuilles de style CSS
│   │   ├── App.tsx           # Composant principal
│   │   └── main.tsx          # Point d'entrée
│   ├── public/               # Ressources statiques
│   ├── index.html            # Template HTML
│   ├── vite.config.ts        # Configuration Vite
│   └── package.json
├── server/                    # Backend (optionnel)
├── README.md
├── package.json
└── tsconfig.json
```

---

## 🎨 Composants Clés

- **PaymentPortal** — Interface principale de traitement des paiements
- **ContactForm** — Formulaire d'informations client
- **FloatingButton** — Widget bouton flottant interactif
- **SuccessModal** — Modal de confirmation après paiement
- **LanguageToggle** — Fonction de changement de langue

---

## 🌍 Internationalisation

Supporte plusieurs langues avec un système de traduction facile à étendre. Inclut actuellement :
- Français (FR)
- Anglais (EN)

Ajoutez plus de langues dans `src/i18n/translations.ts`

---

## 🎛️ Personnalisation

### Méthodes de Paiement

Vous pouvez facilement ajouter, retirer ou modifier les méthodes de paiement en éditant le fichier de configuration :

**Fichier**: `client/src/config/paymentMethods.ts`

#### Ajouter une Nouvelle Méthode

```typescript
{
  id: 'stripe',
  name: 'Stripe',
  logo: '/assets/stripe.png',
  logoFallback: 'ST',
  color: '#635BFF',
  enabled: true,
  type: 'redirect',
  url: 'https://votre-lien-stripe.com',
  instructions: {
    en: 'Click to proceed with Stripe payment',
    fr: 'Cliquez pour procéder au paiement par Stripe',
  },
  account: '📧 Email: votre-email@stripe.com',
}
```

#### Désactiver une Méthode

Définissez `enabled: false` pour masquer ou désactiver la méthode :

```typescript
{
  id: 'bitcoin',
  enabled: false,  // ← La méthode sera masquée/désactivée
  // ... reste de la configuration
}
```

#### Personnaliser l'Affichage

- **id**: Identifiant unique de la méthode
- **name**: Nom d'affichage
- **logo**: Chemin vers l'image du logo
- **logoFallback**: Texte de secours si le logo ne charge pas
- **color**: Couleur de la marque (format hex)
- **type**: `'upload'` pour téléchargement de reçu, `'redirect'` pour lien externe
- **instructions**: Instructions localisées pour les utilisateurs
- **account**: Détails du compte à afficher
- **note**: Notes supplémentaires

### Traductions

Étendez le support linguistique en éditant `client/src/i18n/translations.ts` :

```typescript
export const translations = {
  en: {
    // Traductions anglaises
  },
  fr: {
    // Traductions françaises
  },
  es: {
    // Ajouter l'espagnol ou toute autre langue
  },
}
```

Mettez ensuite à jour les options de langue dans vos composants pour inclure la nouvelle langue.

### Styles et Apparence

Personnalisez l'apparence :

- **Styles principaux**: `client/src/styles/main.css`
- **Couleurs**: Modifiez les variables CSS dans la feuille de style
- **Polices**: Changez l'import Google Fonts dans `client/index.html`

### Ajouter des Composants Personnalisés

Pour ajouter de nouveaux composants :

1. Créez un nouveau fichier dans `client/src/components/`
2. Importez-le dans `client/src/App.tsx`
3. Ajoutez-le à votre mise en page

---

## 📝 Licence

Ce projet est sous license **MIT** — vous êtes libre de l'utiliser, le modifier et le distribuer.

Voir le fichier [LICENSE](LICENSE) pour les détails.

---

## 🤝 Contribution

Nous accueillons les contributions ! N'hésitez pas à :

1. Fork le repository
2. Créer votre branche feature (`git checkout -b feature/amazing-feature`)
3. Committer vos changements (`git commit -m 'Add some amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

---

## 📞 Support & Contact

- **Site Web**: [GRANDOU Agency](https://www.grandouagency.com)
- **Email**: [grandouagency@gmail.com](mailto:grandouagency@gmail.com)
- **Issues**: [GitHub Issues](https://github.com/grandouagency-cloud/port-payment/issues)

---

## 🎯 Feuille de Route

- [ ] Intégrations de méthodes de paiement améliorées
- [ ] Tableau de bord analytique avancé
- [ ] Support des webhooks
- [ ] Support multi-devises
- [ ] Améliorations côté serveur
- [ ] Panneau d'administration

</details>

---

<div align="center">

*© 2026 GRANDOU Agency — Worldwide* <br>
[![MIT License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Download Resume](https://img.shields.io/badge/Télécharger-Résumé-red?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)](https://raw.githubusercontent.com/grandouagency-cloud/about-us/main/docs/Grandou-resume.pdf)

</div>

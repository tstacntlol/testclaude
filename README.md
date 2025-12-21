# Hobby Finder - Website voor KMO

Een toegankelijke one-page website voor een Belgische KMO die kinderen met een beperking helpt om hun perfecte hobby te vinden.

## 📋 Overzicht

Deze website is speciaal ontworpen met toegankelijkheid als prioriteit, aangezien de doelgroep kinderen met verschillende soorten beperkingen betreft. De website bevat:

- **Header met navigatie** - Eenvoudige navigatie met grote, goed leesbare links
- **Hero sectie** - Aantrekkelijke introductie met call-to-action
- **Over Ons sectie** - Informatie over de missie en visie van de organisatie
- **Activiteiten sectie** - Overzicht van 6 verschillende hobby categorieën
- **Evenementen sectie** - Dynamische weergave van aankomende evenementen (beheerd via CMS)
- **Contact sectie** - Contactinformatie en contactformulier
- **Footer** - Locatie en standaard footer informatie
- **Content Management Systeem** - Decap CMS voor eenvoudig content beheer

## ✨ Toegankelijkheidskenmerken

- **Groot lettertype** (18px basis) voor betere leesbaarheid
- **Hoog contrast kleuren** voor mensen met visuele beperkingen
- **ARIA labels** voor schermlezers
- **Toetsenbord navigatie** volledig ondersteund
- **Focus indicatoren** voor alle interactieve elementen
- **Responsief ontwerp** voor alle schermformaten
- **Smooth scrolling** met toetsenbord ondersteuning
- **Reduced motion support** voor gebruikers die animaties uitschakelen

## 🎨 Kleurenschema

- Primair: #4A90E2 (Blauw)
- Secundair: #50C878 (Groen)
- Accent: #FF6B6B (Rood)
- Tekst: #2C3E50 (Donkergrijs)

Alle kleuren zijn gekozen met WCAG 2.1 AA contrast richtlijnen in gedachten.

## 🚀 Gebruik

Open simpelweg `index.html` in een moderne webbrowser. Geen server of build stappen nodig.

## 📝 Content Beheer met Decap CMS

Deze website gebruikt **Decap CMS** (voorheen Netlify CMS) voor eenvoudig content beheer zonder technische kennis.

### Toegang tot het CMS

1. Navigeer naar: `https://tstacntlol.github.io/testclaude/admin`
2. Klik op "Login with GitHub"
3. Authenticeer de applicatie met je GitHub account
4. Geef toegang tot de repository

**⚠️ Belangrijke opmerking over authenticatie:**

De CMS gebruikt momenteel een **publieke OAuth gateway** (`decapcms-oauth.netlify.app`) voor authenticatie. Dit werkt prima voor testen en kleine projecten.

Voor productie wordt aanbevolen om je eigen GitHub OAuth App te configureren:

<details>
<summary>📖 Klik hier voor instructies om je eigen OAuth App te maken (optioneel, voor productie)</summary>

1. Ga naar [GitHub Developer Settings](https://github.com/settings/developers)
2. Klik op "New OAuth App"
3. Vul in:
   - **Application name**: Hobby Finder CMS
   - **Homepage URL**: `https://tstacntlol.github.io/testclaude`
   - **Authorization callback URL**: `https://jouw-oauth-server.com/callback`
4. Kopieer de Client ID en Client Secret
5. Deploy een OAuth server (bijvoorbeeld met Vercel of Netlify)
6. Update `admin/config.yml` met je eigen `base_url` en `auth_endpoint`

Voor meer info: [Decap CMS Authentication Documentation](https://decapcms.org/docs/authentication-backends/)
</details>

### Wat kun je beheren?

#### 📅 Evenementen
- Voeg nieuwe evenementen toe
- Bewerk bestaande evenementen
- Verwijder of deactiveer oude evenementen
- Velden:
  - Titel
  - Datum & Tijd
  - Locatie
  - Beschrijving
  - Categorie (dropdown)
  - Max aantal deelnemers
  - Leeftijdsgroep
  - Afbeelding (optioneel)
  - Actief/Inactief toggle

#### 🎨 Activiteiten
- Beheer de activiteitenkaarten op de hoofdpagina
- Pas iconen (emoji's) aan
- Update beschrijvingen
- Wijzig volgorde

#### ⚙️ Website Instellingen
- **Contact Informatie**: Email, telefoon, adres, openingsuren
- **Social Media**: Facebook, Instagram, LinkedIn links
- **Over Ons**: Missie, visie en introducties

### Hoe werkt het?

1. **Maak wijzigingen** in het CMS admin panel
2. **Preview** je wijzigingen voordat je publiceert
3. **Publiceer** - wijzigingen worden automatisch naar GitHub gecommit
4. **GitHub Pages** bouwt de site opnieuw (duurt 1-2 minuten)
5. **Live** - je wijzigingen zijn zichtbaar op de website

### Evenementen Toevoegen

1. Ga naar "Evenementen" in het CMS
2. Klik op "New Evenement"
3. Vul alle velden in:
   ```
   Titel: Schilderworkshop voor Kinderen
   Datum: 2025-01-15 14:00
   Locatie: Hobbystraat 123, Brussel
   Beschrijving: Kom samen schilderen...
   Categorie: Creatieve Kunsten
   Max Deelnemers: 12
   Leeftijdsgroep: 6-12 jaar
   Actief: ✓
   ```
4. Klik "Publish" → "Publish now"
5. Wacht 1-2 minuten, ververs de website

### Tips
- Evenementen in het verleden worden **automatisch verborgen**
- Gebruik de "Actief" toggle om evenementen tijdelijk te verbergen
- Upload afbeeldingen in `/images/uploads/`
- Gebruik emoji's voor iconen (kopieer/plak van websites zoals emojipedia.org)

## 📁 Bestandsstructuur

```
.
├── index.html              # Hoofd HTML bestand
├── styles.css              # CSS styling
├── script.js               # JavaScript voor interactiviteit
├── README.md               # Deze documentatie
├── admin/                  # Decap CMS
│   ├── index.html         # CMS admin interface
│   └── config.yml         # CMS configuratie
├── content/               # CMS content (markdown & JSON)
│   ├── events/           # Evenementen (markdown files)
│   ├── activities/       # Activiteiten (markdown files)
│   └── settings/         # Website instellingen (JSON files)
│       ├── contact.json
│       └── about.json
└── images/
    └── uploads/          # Geüploade afbeeldingen via CMS
```

## 🛠️ Technologieën

- HTML5 (Semantisch)
- CSS3 (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (ES6+)
- **Decap CMS** - Git-based content management
- GitHub Pages - Hosting
- Markdown & JSON - Content opslag

## 📱 Browser Ondersteuning

- Chrome (laatste 2 versies)
- Firefox (laatste 2 versies)
- Safari (laatste 2 versies)
- Edge (laatste 2 versies)

## 🔄 Toekomstige Verbeteringen

- ✅ ~~Content Management Systeem~~ (Geïmplementeerd met Decap CMS)
- Backend integratie voor contactformulier (bijv. Formspree, EmailJS)
- Multi-taal ondersteuning (Nederlands, Frans, Engels)
- Online registratie systeem voor evenementen
- Galerij met foto's van activiteiten
- Email notificaties voor nieuwe evenementen
- Kalender integratie (Google Calendar, iCal)

## 📝 Licentie

Copyright © 2024 Hobby Finder. Alle rechten voorbehouden.

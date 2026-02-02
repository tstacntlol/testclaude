# Instructies voor het maken van Screenshots en Conversie naar PDF/Word

## Stap 1: Screenshots Maken en Toevoegen

### Benodigde Screenshots

De handleiding bevat 43 screenshot placeholders. Hier is wat u voor elke screenshot moet vastleggen:

#### **Inloggen (Screenshots 1-5)**
1. Browser iconen op desktop
2. Adresbalk met admin URL
3. Inlogscherm (leeg)
4. Inlogscherm met Log in knop gemarkeerd
5. Voorbeeld bevestigings e-mail

#### **Admin Paneel Overzicht (Screenshots 6-9)**
6. Volledig admin paneel met nummers
7. Linkermenu met PDF Secties gemarkeerd
8. Middenscherm met secties
9. Bovenbalk met tabs en uitlog knop

#### **PDF Uploaden (Screenshots 10-24)**
10. Klik op PDF Secties in linkermenu
11. De drie PDF sectie opties
12. Volledig bewerkingsscherm
13. Titel veld close-up
14. PDF Bestand veld leeg
15. Actief vinkje aangevinkt
16. Upload scherm met "Choose a file" knop
17. Klik op Choose a file
18. Windows verkenner / bestand kiezen venster
19. PDF bestand geselecteerd
20. Upload in uitvoering met laadbalk
21. Upload voltooid met bestandsnaam
22. Volledig ingevuld formulier
23. Save knop rechtsboven gemarkeerd
24. Bevestiging dat het opgeslagen is

#### **Publiceren (Screenshots 25-37)**
25. "Set to Ready" knop rechtsboven
26. Bevestiging pop-up voor Set to Ready
27. Workflow tab bovenaan gemarkeerd
28. Volledig workflow scherm met drie kolommen
29. Drafts kolom
30. In Review kolom
31. Ready kolom met een PDF item
32. PDF item in Ready kolom, cursor erop
33. Publish now knop rechtsboven
34. Bevestiging pop-up voor publiceren
35. Publicatie in uitvoering
36. Lege Ready kolom na succesvol publiceren
37. Website met de nieuwe PDF zichtbaar

#### **PDF Vervangen (Screenshots 38-42)**
38. PDF sectie kiezen
39. X knop naast bestandsnaam gemarkeerd
40. Leeg PDF veld na verwijderen
41. Nieuw bestand geselecteerd en geüpload
42. Publicatie proces voor vervangen PDF

#### **Uitloggen en FAQ (Screenshots 43-45)**
43. Uitlog menu met Log out optie
44. Inlogscherm na uitloggen
45. Forgot password link op inlogscherm

### Hoe Screenshots Maken

**Op Windows:**
- Druk op `Print Screen` voor volledig scherm
- Of gebruik `Windows + Shift + S` voor een selectie
- Of gebruik Snipping Tool

**Op Mac:**
- `Cmd + Shift + 3` voor volledig scherm
- `Cmd + Shift + 4` voor een selectie

### Screenshots Toevoegen aan de Handleiding

#### Optie A: In de HTML versie
1. Open `VINC_CMS_GEBRUIKERSHANDLEIDING.html` in een tekstverwerker
2. Zoek de screenshot placeholder (bijv: "📸 SCREENSHOT 1")
3. Vervang de placeholder `<div>` door:
```html
<div style="text-align: center; margin: 20px 0;">
    <img src="screenshots/screenshot_01.png" alt="Browser iconen" style="max-width: 100%; border: 2px solid #ddd;">
    <p style="font-size: 9pt; color: #666; margin-top: 5px;">Screenshot 1: Browser iconen op desktop</p>
</div>
```

#### Optie B: In Word
1. Open de HTML in Word (zie hieronder)
2. Klik op de screenshot placeholder
3. Ga naar Insert > Pictures
4. Selecteer uw screenshot
5. Verwijder de placeholder tekst

---

## Stap 2: HTML Converteren naar PDF

### Methode 1: Via Browser (Eenvoudigste)

1. Open `VINC_CMS_GEBRUIKERSHANDLEIDING.html` in Google Chrome of Edge
2. Druk op `Ctrl + P` (Windows) of `Cmd + P` (Mac)
3. Kies "Save as PDF" als printer
4. Stel pagina-instellingen in:
   - Papier formaat: A4
   - Marges: Normaal
   - Achtergrond graphics: AAN
5. Klik op "Save"
6. Geef het bestand een naam: `VINC_Website_Handleiding.pdf`

### Methode 2: Via Online Converter

1. Ga naar: https://www.sejda.com/html-to-pdf
2. Upload `VINC_CMS_GEBRUIKERSHANDLEIDING.html`
3. Klik op "Convert HTML to PDF"
4. Download het resultaat

### Methode 3: Via Pandoc (Voor gevorderde gebruikers)

```bash
pandoc VINC_CMS_GEBRUIKERSHANDLEIDING.md -o VINC_Website_Handleiding.pdf --pdf-engine=xelatex
```

---

## Stap 3: HTML Converteren naar Word

### Methode 1: Direct in Word openen

1. Open Microsoft Word
2. Ga naar File > Open
3. Selecteer `VINC_CMS_GEBRUIKERSHANDLEIDING.html`
4. Word opent het bestand en behoudt de opmaak
5. Ga naar File > Save As
6. Kies format: "Word Document (.docx)"
7. Geef het bestand een naam: `VINC_Website_Handleiding.docx`

### Methode 2: Via Online Converter

1. Ga naar: https://www.zamzar.com/convert/html-to-docx/
2. Upload `VINC_CMS_GEBRUIKERSHANDLEIDING.html`
3. Kies output format: DOCX
4. Klik op "Convert"
5. Download het resultaat

### Methode 3: Via Pandoc

```bash
pandoc VINC_CMS_GEBRUIKERSHANDLEIDING.md -o VINC_Website_Handleiding.docx
```

---

## Stap 4: Markdown Converteren naar PDF/Word

Als u liever de Markdown versie wilt gebruiken:

### Naar PDF:

**Via Pandoc:**
```bash
pandoc VINC_CMS_GEBRUIKERSHANDLEIDING.md -o output.pdf \
  --pdf-engine=xelatex \
  -V geometry:margin=2cm \
  -V fontsize=11pt
```

**Via Online Tool:**
- https://markdown-to-pdf.com/
- https://www.markdowntopdf.com/

### Naar Word:

**Via Pandoc:**
```bash
pandoc VINC_CMS_GEBRUIKERSHANDLEIDING.md -o output.docx
```

**Via Online Tool:**
- https://products.aspose.app/words/conversion/md-to-docx

---

## Stap 5: Screenshots Toevoegen in Word

1. Open het Word document
2. Zoek de tekst "📸 SCREENSHOT X"
3. Plaats de cursor onder deze tekst
4. Ga naar Insert > Pictures > This Device
5. Selecteer uw screenshot
6. Pas de grootte aan (rechtermuisknop > Size and Position)
   - Breedte: 15cm (laat hoogte automatisch schalen)
7. Centreer de afbeelding (Home > Center)
8. Voeg een tekstbijschrift toe onder de afbeelding
9. Herhaal voor alle screenshots

---

## Stap 6: Opmaak Verbeteren in Word

### Aanbevolen aanpassingen:

1. **Lettertype:**
   - Selecteer alles (Ctrl+A)
   - Kies een leesbaar lettertype (Calibri, Arial, of Segoe UI)
   - Lettergrootte: 11pt voor normale tekst

2. **Koppen:**
   - Gebruik ingebouwde stijlen (Heading 1, Heading 2, etc.)
   - Pas kleuren aan naar VINC kleuren:
     - Heading 1: Blauw (#018bb3)
     - Heading 2: Blauw-groen (#87bfb4)

3. **Pagina nummering:**
   - Insert > Page Number
   - Kies positie: Bottom of page, center

4. **Inhoudsopgave:**
   - Plaats cursor op de eerste pagina na de cover
   - References > Table of Contents
   - Kies een automatische inhoudsopgave

5. **Headers en Footers:**
   - Insert > Header
   - Voeg toe: "Vinc vzw - Website Beheer Handleiding"
   - Insert > Footer
   - Voeg toe: "Versie 1.0 | Januari 2025"

---

## Stap 7: Kwaliteitscontrole

Voordat u de handleiding aan clients geeft, controleer:

- [ ] Alle screenshots zijn toegevoegd
- [ ] Screenshots zijn duidelijk en goed leesbaar
- [ ] Alle links werken (in PDF testen)
- [ ] Paginanummering klopt
- [ ] Inhoudsopgave verwijst naar juiste pagina's
- [ ] Geen spel- of typefouten
- [ ] Opmaak is consistent door het hele document
- [ ] Document is getest: print een pagina om leesbaarheid te checken

---

## Tips voor Professionele Uitstraling

1. **Cover pagina:**
   - Voeg het Vinc vzw logo toe
   - Gebruik VINC kleuren
   - Houd het simpel en professioneel

2. **Markeringen in screenshots:**
   - Gebruik rode cirkels of pijlen om belangrijke elementen aan te wijzen
   - Gebruik tools zoals:
     - Windows: Snipping Tool met pen functie
     - Mac: Preview met markup tools
     - Online: Photopea.com

3. **Consistent maken:**
   - Gebruik altijd dezelfde kleur voor markeringen (bijv. rood)
   - Gebruik dezelfde lijndikte voor cirkels/pijlen
   - Houd afbeeldingsgroottes consistent

4. **Bestandsgrootte beperken:**
   - Comprimeer afbeeldingen voor ze toe te voegen
   - Gebruik JPG (80-90% kwaliteit) voor screenshots
   - Houd totale PDF onder 10 MB indien mogelijk

---

## Aanbevolen Tools

### Screenshot & Annotatie Tools:
- **Snagit** (betaald, zeer professioneel)
- **Greenshot** (gratis, Windows)
- **Skitch** (gratis, Mac)
- **ShareX** (gratis, Windows, gevorderd)

### PDF Bewerking:
- **Adobe Acrobat DC** (betaald)
- **Foxit PDF Editor** (betaald)
- **PDF-XChange Editor** (gratis versie beschikbaar)

### Markdown Editors:
- **Typora** (betaald, erg mooi)
- **Mark Text** (gratis)
- **Visual Studio Code** (gratis, met Markdown Preview)

---

## Troubleshooting

### "De opmaak ziet er raar uit in Word"
- Open het HTML bestand in een browser
- Print to PDF vanuit de browser
- Open de PDF in Word: File > Open

### "Screenshots zijn wazig"
- Maak screenshots in hoge resolutie
- Gebruik 100% zoom niveau in browser voordat u screenshot maakt
- Sla screenshots op als PNG (niet JPG) voor tekst

### "Het PDF bestand is te groot"
- Comprimeer afbeeldingen voordat u ze toevoegt
- Gebruik https://www.ilovepdf.com/compress_pdf
- Of sla screenshots op als JPG met 85% kwaliteit

### "Pagina breaks zijn verkeerd"
- In HTML: voeg `<div class="page-break"></div>` toe waar u een pagina break wilt
- In Word: Insert > Page Break op de gewenste locatie

---

## Snel Stappenplan

### Voor een snelle PDF met screenshots:

1. ✅ Maak alle 45 screenshots tijdens het doorlopen van het CMS
2. ✅ Bewaar ze in een map `screenshots/` met nummers (01.png, 02.png, etc.)
3. ✅ Open `VINC_CMS_GEBRUIKERSHANDLEIDING.html` in Chrome
4. ✅ Print to PDF (Ctrl+P > Save as PDF)
5. ✅ Open de PDF in Adobe Acrobat of PDF editor
6. ✅ Voeg screenshots toe op de juiste plaatsen
7. ✅ Sla op als `VINC_Website_Handleiding_FINAL.pdf`
8. ✅ Controleer het resultaat
9. ✅ Deel met uw clients!

---

Succes met het maken van de handleiding! 🎉

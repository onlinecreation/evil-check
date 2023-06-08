import { createApp } from 'vue'
import { Device } from '@capacitor/device';
import { createI18n } from 'vue-i18n';
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const messages: any = {
  'en': {
    'Search': 'Search',
    'Unknown': 'Unknown',
    'Animal exploitation': 'Animal exploitation',
    'Additives': 'Additives',
    'Palm oil': 'Palm oil',
    'Vegan': 'Vegan',
    'Vegetarian': 'Vegetarian',
    'Bad Nutriscore': 'Bad Nutriscore',
    'Unknown Nutriscore': 'Unknown Nutriscore',
    'Bad Ecoscore': 'Bad Ecoscore',
    'Unknown Ecoscore': 'Unknown Ecoscore',
    'Unknown ingredients origin': 'Unknown ingredients origin',
    'Organic': 'Organic',
    'Fair trade': 'Fair trade',
    'Good Nutriscore': 'Good Nutriscore',
    'Good Ecoscore': 'Good Ecoscore',
    'Yes': 'Yes',
    'No': 'No',
    'None found': 'None found',
    'May contain Palm oil': 'May contain Palm oil',
    'Not Explicitly': 'Not Explicitly',
    'Animal respect': 'Animal respect',
    'Animal killed': 'Animal killed',
    'Animal exploited': 'Animal exploited',
    'but not tested on animals': 'but not tested on animals',
    'Origin of the ingredients': 'Origin of the ingredients',
    'Carbon footprint': 'Carbon footprint',
    'Allergens': 'Allergens',
    'Photo': 'Photo',
    'Product data provided by': 'Product data provided by',
    'If you find an error, please contribute to Open Food Facts, it will help thousands of consumers.': 'If you find an error, please contribute to Open Food Facts, it will help thousands of consumers.',
    'Data source:': 'Data source:',
    'This list of allergens may not be exhaustive. Please double check on the product package if you have known allergies.': 'This list of allergens may not be exhaustive. Please double check on the product package if you have known allergies.',
    'Search for a product': 'Search for a product',
    'Product not found': 'Product not found',
    'None known': 'None known',
    'May contain:': 'May contain:',
    'Scan': 'Scan',
    'No permission to use the camera': 'No permission to use the camera',
    'Barcode': 'Barcode',
    'Unknown ingredients': 'Unknown ingredients',
    'No palm oil': 'No palm oil',
  },
  'fr': {
    'Search': 'Rechercher',
    'Unknown': 'Inconnu',
    'Animal exploitation': 'Exploitation animale',
    'Additives': 'Additifs',
    'Palm oil': 'Huile de palme',
    'Vegan': 'Végétalien / Végan',
    'Vegetarian': 'Végétarien',
    'Bad Nutriscore': 'Mauvais Nutriscore',
    'Unknown Nutriscore': 'Nutriscore inconnu',
    'Bad Ecoscore': 'Mauvais Ecoscore',
    'Unknown Ecoscore': 'Ecoscore inconnu',
    'Unknown ingredients origin': 'Origine des ingrédients inconnue',
    'Organic': 'Bio',
    'Fair trade': 'Commerce équitable',
    'Good Nutriscore': 'Bon Nutriscore',
    'Good Ecoscore': 'Bon Ecoscore',
    'Yes': 'Oui',
    'No': 'Non',
    'None found': 'Aucun trouvé',
    'May contain Palm oil': 'Huile de palme',
    'Not Explicitly': 'Pas explicite',
    'Animal respect': 'Respect des animaux',
    'Animal killed': 'Animaux tués',
    'Animal exploited': 'Animaux exploités',
    'but not tested on animals': 'mais pas testé sur les animaux',
    'Origin of the ingredients': 'Origine des ingrédients',
    'Carbon footprint': 'Empreinte carbone',
    'Allergens': 'Allergènes',
    'Photo': 'Photo',
    'Product data provided by': 'Données du produit fournies par',
    'If you find an error, please contribute to Open Food Facts, it will help thousands of consumers.': 'Si vous trouvez une erreur, veuillez contribuer à Open Food Facts, cela aidera des milliers de consommateurs.',
    'Data source:': 'Source de données :',
    'This list of allergens may not be exhaustive. Please double check on the product package if you have known allergies.': 'Cette liste d\'allergènes peut ne pas être exhaustive. Veuillez vérifier sur l\'emballage du produit si vous avez des allergies connues.',
    'Search for a product': 'Trouver un produit',
    'Product not found': 'Produit non trouvé',
    'None known': 'Aucun connu',
    'May contain:': 'Peut contenir :',
    'Scan': 'Scanner',
    'No permission to use the camera': 'Pas de permission pour utiliser la caméra',
    'Barcode': 'Code-barres',
    'Unknown ingredients': 'Ingrédients inconnus',
    'No palm oil': 'Pas d\'huile de palme',
  },
  'es': {
    'Search': 'Buscar',
    'Unknown': 'Desconocido',
    'Animal exploitation': 'Explotación animal',
    'Additives': 'Aditivos',
    'Palm oil': 'Aceite de palma',
    'Vegan': 'Vegano',
    'Vegetarian': 'Vegetariano',
    'Bad Nutriscore': 'Mal Nutriscore',
    'Unknown Nutriscore': 'Nutriscore desconocido',
    'Bad Ecoscore': 'Mal Ecoscore',
    'Unknown Ecoscore': 'Ecoscore desconocido',
    'Unknown ingredients origin': 'Origen desconocido de los ingredientes',
    'Organic': 'Orgánico',
    'Fair trade': 'Comercio justo',
    'Good Nutriscore': 'Buen Nutriscore',
    'Good Ecoscore': 'Buen Ecoscore',
    'Yes': 'Sí',
    'No': 'No',
    'None found': 'Ninguno encontrado',
    'May contain Palm oil': 'Aceite de palma',
    'Not Explicitly': 'No explícitamente',
    'Animal respect': 'Respeto animal',
    'Animal killed': 'Animales matados',
    'Animal exploited': 'Animales explotados',
    'but not tested on animals': 'pero no probado en animales',
    'Origin of the ingredients': 'Origen de los ingredientes',
    'Carbon footprint': 'Huella de carbono',
    'Allergens': 'Alergenos',
    'Photo': 'Foto',
    'Product data provided by': 'Datos del producto proporcionados por',
    'If you find an error, please contribute to Open Food Facts, it will help thousands of consumers.': 'Si encuentra un error, contribuya a Open Food Facts, ayudará a miles de consumidores.',
    'Data source:': 'Fuente de datos:',
    'This list of allergens may not be exhaustive. Please double check on the product package if you have known allergies.': 'Esta lista de alérgenos puede no ser exhaustiva. Por favor, verifique en el paquete del producto si tiene alergias conocidas.',
    'Search for a product': 'Buscar un producto',
    'Product not found': 'Producto no encontrado',
    'None known': 'Ninguno conocido',
    'May contain:': 'Puede contener:',
    'Scan': 'Escanear',
    'No permission to use the camera': 'No hay permiso para usar la cámara',
    'Barcode': 'Código de barras',
    'Unknown ingredients': 'Ingredientes desconocidos',
    'No palm oil': 'Sin aceite de palma',
  },
  'de': {
    'Search': 'Suche',
    'Unknown': 'Unbekannt',
    'Animal exploitation': 'Tierausbeutung',
    'Additives': 'Zusatzstoffe',
    'Palm oil': 'Palmöl',
    'Vegan': 'Vegan',
    'Vegetarian': 'Vegetarisch',
    'Bad Nutriscore': 'Schlechter Nutriscore',
    'Unknown Nutriscore': 'Unbekannter Nutriscore',
    'Bad Ecoscore': 'Schlechter Ecoscore',
    'Unknown Ecoscore': 'Unbekannter Ecoscore',
    'Unknown ingredients origin': 'Unbekannte Herkunft der Zutaten',
    'Organic': 'Bio',
    'Fair trade': 'Fairer Handel',
    'Good Nutriscore': 'Guter Nutriscore',
    'Good Ecoscore': 'Guter Ecoscore',
    'Yes': 'Ja',
    'No': 'Nein',
    'None found': 'Keine gefunden',
    'May contain Palm oil': 'Palmöl',
    'Not Explicitly': 'Nicht explizit',
    'Animal respect': 'Tierrespekt',
    'Animal killed': 'Getötete Tiere',
    'Animal exploited': 'Ausgenutzte Tiere',
    'but not tested on animals': 'aber nicht an Tieren getestet',
    'Origin of the ingredients': 'Herkunft der Zutaten',
    'Carbon footprint': 'CO2-Fußabdruck',
    'Allergens': 'Allergene',
    'Photo': 'Foto',
    'Product data provided by': 'Produktdaten bereitgestellt von',
    'If you find an error, please contribute to Open Food Facts, it will help thousands of consumers.': 'Wenn Sie einen Fehler finden, tragen Sie bitte zu Open Food Facts bei, es wird Tausenden von Verbrauchern helfen.',
    'Data source:': 'Datenquelle:',
    'This list of allergens may not be exhaustive. Please double check on the product package if you have known allergies.': 'Diese Liste der Allergene ist möglicherweise nicht vollständig. Bitte überprüfen Sie die Produktverpackung, wenn Sie bekannte Allergien haben.',
    'Search for a product': 'Suche nach einem Produkt',
    'Product not found': 'Produkt nicht gefunden',
    'None known': 'Keine bekannt',
    'May contain:': 'Kann enthalten:',
    'Scan': 'Scannen',
    'No permission to use the camera': 'Keine Berechtigung zur Verwendung der Kamera',
    'Barcode': 'Barcode',
    'Unknown ingredients': 'Unbekannte Zutaten',
    'No palm oil': 'Kein Palmöl',
  },
  'nl': {
    'Search': 'Zoeken',
    'Unknown': 'Onbekend',
    'Animal exploitation': 'Dierenexploitatie',
    'Additives': 'Additieven',
    'Palm oil': 'Palmolie',
    'Vegan': 'Veganistisch',
    'Vegetarian': 'Vegetarisch',
    'Bad Nutriscore': 'Slechte Nutriscore',
    'Unknown Nutriscore': 'Onbekende Nutriscore',
    'Bad Ecoscore': 'Slechte Ecoscore',
    'Unknown Ecoscore': 'Onbekende Ecoscore',
    'Unknown ingredients origin': 'Onbekende herkomst van de ingrediënten',
    'Organic': 'Biologisch',
    'Fair trade': 'Eerlijke handel',
    'Good Nutriscore': 'Goede Nutriscore',
    'Good Ecoscore': 'Goede Ecoscore',
    'Yes': 'Ja',
    'No': 'Nee',
    'None found': 'Geen gevonden',
    'May contain Palm oil': 'Palmolie',
    'Not Explicitly': 'Niet expliciet',
    'Animal respect': 'Dierenrespect',
    'Animal killed': 'Gedode dieren',
    'Animal exploited': 'Uitgebuite dieren',
    'but not tested on animals': 'maar niet getest op dieren',
    'Origin of the ingredients': 'Herkomst van de ingrediënten',
    'Carbon footprint': 'Koolstofvoetafdruk',
    'Allergens': 'Allergenen',
    'Photo': 'Foto',
    'Product data provided by': 'Productgegevens verstrekt door',
    'If you find an error, please contribute to Open Food Facts, it will help thousands of consumers.': 'Als u een fout vindt, draag dan bij aan Open Food Facts, het zal duizenden consumenten helpen.',
    'Data source:': 'Bron van gegevens:',
    'This list of allergens may not be exhaustive. Please double check on the product package if you have known allergies.': 'Deze lijst met allergenen is mogelijk niet volledig. Controleer de productverpakking als u bekende allergieën heeft.',
    'Search for a product': 'Zoek naar een product',
    'Product not found': 'Product niet gevonden',
    'None known': 'Geen bekend',
    'May contain:': 'Kan bevatten:',
    'Scan': 'Scan',
    'No permission to use the camera': 'Geen toestemming om de camera te gebruiken',
    'Barcode': 'Barcode',
    'Unknown ingredients': 'Onbekende ingrediënten',
    'No palm oil': 'Geen palmolie',
  },
  'it': {
    'Search': 'Ricerca',
    'Unknown': 'Sconosciuto',
    'Animal exploitation': 'Sfruttamento animale',
    'Additives': 'Additivi',
    'Palm oil': 'Olio di palma',
    'Vegan': 'Vegano',
    'Vegetarian': 'Vegetariano',
    'Bad Nutriscore': 'Nutriscore cattivo',
    'Unknown Nutriscore': 'Nutriscore sconosciuto',
    'Bad Ecoscore': 'Ecoscore cattivo',
    'Unknown Ecoscore': 'Ecoscore sconosciuto',
    'Unknown ingredients origin': 'Origine degli ingredienti sconosciuta',
    'Organic': 'Biologico',
    'Fair trade': 'Commercio equo e solidale',
    'Good Nutriscore': 'Nutriscore buono',
    'Good Ecoscore': 'Ecoscore buono',
    'Yes': 'Sì',
    'No': 'No',
    'None found': 'Nessuno trovato',
    'May contain Palm oil': 'Olio di palma',
    'Not Explicitly': 'Non esplicitamente',
    'Animal respect': 'Rispetto degli animali',
    'Animal killed': 'Animali uccisi',
    'Animal exploited': 'Animali sfruttati',
    'but not tested on animals': 'ma non testato sugli animali',
    'Origin of the ingredients': 'Origine degli ingredienti',
    'Carbon footprint': 'Impronta di carbonio',
    'Allergens': 'Allergeni',
    'Photo': 'Foto',
    'Product data provided by': 'Dati del prodotto forniti da',
    'If you find an error, please contribute to Open Food Facts, it will help thousands of consumers.': 'Se trovi un errore, contribuisci a Open Food Facts, aiuterà migliaia di consumatori.',
    'Data source:': 'Fonte dati:',
    'This list of allergens may not be exhaustive. Please double check on the product package if you have known allergies.': 'Questo elenco di allergeni potrebbe non essere esaustivo. Controlla nuovamente l\'etichetta del prodotto se hai allergie note.',
    'Search for a product': 'Cerca un prodotto',
    'Product not found': 'Prodotto non trovato',
    'None known': 'Nessuno conosciuto',
    'May contain:': 'Può contenere:',
    'Scan': 'Scansione',
    'No permission to use the camera': 'Nessun permesso per utilizzare la fotocamera',
    'Barcode': 'Codice a barre',
    'Unknown ingredients': 'Ingredienti sconosciuti',
    'No palm oil': 'Nessun olio di palma',
  }
};

const i18n = createI18n({
  'locale': 'en',
  'fallbackLocale': 'en',
  messages,
});

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(i18n);

Device.getLanguageCode().then((lang) => {
  switch (lang.value) {
    case 'fr':
      i18n.global.locale = 'fr';
      break;
    case 'es':
      i18n.global.locale = 'es';
      break;
    case 'de':
      i18n.global.locale = 'de';
      break;
    case 'nl':
      i18n.global.locale = 'nl';
      break;
    case 'it':
      i18n.global.locale = 'it';
      break;
    default:
      i18n.global.locale = 'en';
  }
});
  
router.isReady().then(() => {
  app.mount('#app');
});
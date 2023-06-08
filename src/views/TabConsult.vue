<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ productTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ productTitle }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <form @submit.prevent="getProduct(barcode)">
        <ion-list>
          <ion-item>
            <ion-input v-model="barcode" placeholder="Barcode"></ion-input>
            <ion-button @click="getProduct(barcode)" expand="block">Search</ion-button>
          </ion-item>
        </ion-list>
      </form>  
      <ion-grid v-if="currentItem && currentItem.product_name && currentItem.product_name !== ''">
        <ion-row>
          <ion-col v-if="hasAdditives || containsPalmOil || currentItem.nutriscore_grade.toLowerCase() >= 'd' || currentItem.ecoscore_grade.toLowerCase() >= 'd' || ingredientsOrigin === 'Unknown'" style="text-align: center;">
            <img src="@/assets/1F47F.svg" style="max-width: 100px;" />
              <ion-note v-if="notVegetarian || notVegan" color="danger" style="display: block;"><ion-icon :icon="closeOutline"></ion-icon> Animal exploitation </ion-note>
              <ion-note v-if="hasAdditives" color="danger" style="display: block;"><ion-icon :icon="closeOutline"></ion-icon> Additives</ion-note>
              <ion-note v-if="containsPalmOil" color="danger" style="display: block;"><ion-icon :icon="closeOutline"></ion-icon> Palm oil</ion-note>
              <ion-note v-if="currentItem.nutriscore_grade.toLowerCase() == 'd' || currentItem.nutriscore_grade.toLowerCase() == 'e'" color="danger" style="display: block;"><ion-icon :icon="closeOutline"></ion-icon> Bad Nutriscore</ion-note>
              <ion-note v-if="currentItem.nutriscore_grade.toLowerCase() === 'unknown'" color="danger" style="display: block;"><ion-icon :icon="closeOutline"></ion-icon> Unknown Nutriscore</ion-note>
              <ion-note v-if="currentItem.ecoscore_grade.toLowerCase() == 'd' || currentItem.ecoscore_grade.toLowerCase() == 'e'" color="danger" style="display: block;"><ion-icon :icon="closeOutline"></ion-icon> Bad Ecoscore</ion-note>
              <ion-note v-if="currentItem.ecoscore_grade.toLowerCase() === 'unknown'" color="danger" style="display: block;"><ion-icon :icon="closeOutline"></ion-icon> Unknown Ecoscore</ion-note>
              <ion-note v-if="ingredientsOrigin === 'Unknown'" color="danger" style="display: block;"><ion-icon :icon="closeOutline"></ion-icon> Unknown ingredients origin</ion-note>
          </ion-col>
          <ion-col v-if="isOrganic || vegan || vegetarian || fairTrade || currentItem.nutriscore_grade.toLowerCase() <= 'b' || currentItem.ecoscore_grade.toLowerCase() <= 'b'" style="text-align: center;">
            <img src="@/assets/1F607.svg" style="max-width: 100px;" />
            <ion-note v-if="isOrganic" color="success" style="display: block;"><ion-icon :icon="checkmarkOutline"></ion-icon> Organic</ion-note>
            <ion-note v-if="vegan || vegetarian" color="success" style="display: block;"><ion-icon :icon="checkmarkOutline"></ion-icon> {{ vegan ? 'Vegan' : 'Vegetarian' }}</ion-note>
            <ion-note v-if="fairTrade" color="success" style="display: block;"><ion-icon :icon="checkmarkOutline"></ion-icon> Fair trade</ion-note>
            <ion-note v-if="currentItem.nutriscore_grade.toLowerCase() <= 'b'" color="success" style="display: block;"><ion-icon :icon="checkmarkOutline"></ion-icon> Good Nutriscore</ion-note>
            <ion-note v-if="currentItem.ecoscore_grade.toLowerCase() <= 'b'" color="success" style="display: block;"><ion-icon :icon="checkmarkOutline"></ion-icon> Good Ecoscore</ion-note>
              
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col style="text-align: center;">
            <img v-if="currentItem.nutriscore_grade" :src="'./src/assets/nutriscore-' + currentItem.nutriscore_grade.toLowerCase() + '.svg'" style="max-width: 30vw;" />
            <img v-else src="@/assets/nutriscore-unknown.svg" style="max-width: 30vw;" />
          </ion-col>
          <ion-col style="text-align: center;">
            <img v-if="currentItem.ecoscore_grade" :src="'./src/assets/ecoscore-' + currentItem.ecoscore_grade.toLowerCase() + '.svg'" style="max-width: 30vw;" />
            <img v-else src="@/assets/ecoscore-unknown.svg" style="max-width: 30vw;" />
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-list v-if="currentItem && currentItem.product_name && currentItem.product_name !== ''">
        <ion-item>
          <ion-label>Organic</ion-label>
          <ion-note slot="end" v-if="isOrganic" color="success"><ion-icon :icon="checkmarkOutline"></ion-icon> Yes</ion-note>
          <ion-note slot="end" v-else color="danger"><ion-icon :icon="closeOutline"></ion-icon> No</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>Additives</ion-label>
          <ion-note slot="end" v-if="hasAdditives" color="danger"><ion-icon :icon="closeOutline"></ion-icon> {{ additivesList }}</ion-note>
          <ion-note slot="end" v-else color="success"><ion-icon :icon="checkmarkOutline"></ion-icon> None found</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>May contain Palm oil</ion-label>
          <ion-note slot="end" v-if="containsPalmOil" color="danger"><ion-icon :icon="closeOutline"></ion-icon> Yes</ion-note>
          <ion-note slot="end" v-else>Not Explicitly</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>Animal respect</ion-label>
          <ion-note slot="end" v-if="vegan" color="success"><ion-icon :icon="checkmarkOutline"></ion-icon> Vegan</ion-note>
          <ion-note slot="end" v-else-if="vegetarian" color="success"><ion-icon :icon="checkmarkOutline"></ion-icon>Vegetarian</ion-note>
          <ion-note slot="end" v-else-if="notVegetarian" color="danger"><ion-icon :icon="closeOutline"></ion-icon> <img src="@/assets/1F480.svg" style="height: 1.5em" /> Animal killed</ion-note>
          <ion-note slot="end" v-else-if="notVegan" color="danger"><ion-icon :icon="closeOutline"></ion-icon> Animal exploited</ion-note>
          <ion-note slot="end" v-else>Unknown<span v-if="notTestedOnAnimals">, but not tested on animals</span></ion-note>
        </ion-item>
        <ion-item v-if="currentItem.ingredients && currentItem.ingredients.length > 0">
          <ion-label>Origin of the ingredients</ion-label>
          <ion-note slot="end">{{ ingredientsOrigin }}</ion-note>
        </ion-item>
        <ion-item v-if="currentItem.ecoscore_data && currentItem.ecoscore_data.agribalyse && currentItem.ecoscore_data.agribalyse.co2_total && !isNaN(currentItem.ecoscore_data.agribalyse.co2_total) && currentItem.ecoscore_data.agribalyse.co2_total > 0">
          <ion-label>Carbon footprint</ion-label>
          <ion-note slot="end">{{ Math.round(currentItem.ecoscore_data.agribalyse.co2_total * 100) }} g CO2 / 100g</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>Allergens</ion-label>
          <ion-note slot="end">{{ allergens }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>Photo</ion-label>
          <ion-note slot="end" v-if="currentItem.image_url"><img :src="currentItem.image_thumb_url" style="max-width: 30vw;" /></ion-note>
        </ion-item>
        <ion-item>
          <ion-note class="footer">
            <p>Product data provided by <a :href="'https://world.openfoodfacts.org/product/' + barcode" target="_blank" rel="noopener noreferrer">Open Food Facts</a></p>
            <p>If you find an error, please contribute to Open Food Facts, it will help thousands of consumers.</p>
            <p>Data source: {{ currentItem.data_sources }}</p>
            <p><strong>This list of allergens may not be exhaustive. Please double check on the product package if you have known allergies.</strong></p>
          </ion-note>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonButton, IonLabel, IonNote, IonGrid, IonRow, IonCol, IonImg, IonIcon} from '@ionic/vue';
import { checkmarkOutline, closeOutline } from 'ionicons/icons';
import { useRoute } from 'vue-router';

export default defineComponent ({
  name: 'TabConsult',
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonButton, IonLabel, IonNote, IonGrid, IonRow, IonCol, IonImg, IonIcon },
  setup() {
    const route = useRoute();
    return { route, checkmarkOutline, closeOutline };
  },
  data() {
    return {
      productTitle: 'Search for a product',
      barcode: '',
      emptyProduct: null as any,
      currentItem: null as any,
    };
  },
  methods: {
    getProduct(barcode: string) {
      barcode = barcode.trim();
      const purgedBarcode = barcode.replace(/[^0-9]+/g, '');
      const url = 'https://world.openfoodfacts.org/api/v0/product/' + purgedBarcode + '.json';
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 1) {
            this.productTitle = data.product.product_name;
            if (this.productTitle) {
              this.currentItem = data.product;
            } else {
              this.currentItem = this.emptyProduct;
              this.productTitle = 'Product not found';
            }
          } else {
            this.currentItem = this.emptyProduct;
            this.productTitle = 'Product not found';
          }
        });
    }
  },
  computed: {
    isOrganic(): boolean {
      return this.currentItem.labels_tags && (this.currentItem.labels_tags.includes('en:organic') || this.currentItem.labels_tags.includes('en:eu-organic') || this.currentItem.labels_tags.includes('en:fr-bio-01') || this.currentItem.labels_tags.includes('fr:ab-agriculture-biologique')) ;
    },
    hasAdditives(): boolean {
      return this.currentItem.additives_tags && this.currentItem.additives_tags.length > 0;
    },
    additivesList(): string {
      const additives: string[] = [];
      if (this.currentItem.additives_tags && this.currentItem.additives_tags.length > 0) {
        this.currentItem.additives_tags.forEach((additive: string) => {
          if (additive.includes('en:e') || additive.includes('fr:e')) {
            additives.push(additive.replace(/en:e/g, 'E').replace(/fr:e/g, 'E'));
          }
        });
      }
      return additives.join(', ');
    },
    ingredientsOrigin() {
      const origins: string[] = [];
      let hasUnknown = false;
      if (this.currentItem.ingredients && this.currentItem.ingredients.length > 0) {
      this.currentItem.ingredients.forEach((ingredient: any) => {
        if (ingredient.origins && ingredient.origins !== '' && !origins.includes(ingredient.origins)) {
          origins.push(ingredient.origins.replace(/en:/g, '').replace(/fr:/g, ''));
        } else if (!ingredient.origins || ingredient.origins === '') {
          hasUnknown = true;
        }
      });
      } else {
        hasUnknown = true;
      }
      if (hasUnknown) {
        origins.push('Unknown');
      }
      // first letter in uppercase
      origins.forEach((origin: string, index: number) => {
        origins[index] = origin.charAt(0).toUpperCase() + origin.slice(1);
      });
      return origins.join(', ');
    },
    allergens() {
      const allergens: string[] = [];
      const traces: string[] = [];
      let result: string = '';
      if (this.currentItem.allergens && this.currentItem.allergens !== '') {
        this.currentItem.allergens.split(',').forEach((allergen: string) => {
          const allergenTrimmed = allergen.trim().replace(/en:/g, '').replace(/fr:/g, '');
          if (!allergens.includes(allergenTrimmed)) {
            allergens.push(allergenTrimmed);
          }
        });
      }
      if (allergens.length === 0) {
        allergens.push('None known');
      }
      if (this.currentItem.traces && this.currentItem.traces !== '') {
        this.currentItem.traces.split(',').forEach((trace: string) => {
          const traceTrimmed = trace.trim().replace(/en:/g, '').replace(/fr:/g, '');
          if (!traces.includes(traceTrimmed)) {
            traces.push(traceTrimmed);
          }
        });
      }
      result = allergens.join(', ');
      if (traces.length > 0) {
        result += '. May contain: ' + traces.join(', ');
      }
      // First letter in maj
      result = result.charAt(0).toUpperCase() + result.slice(1);
      return result;
    },
    vegan(): boolean {
      return this.currentItem.ingredients_analysis_tags && this.currentItem.ingredients_analysis_tags.includes('en:vegan');
    },
    notVegan(): boolean {
      return this.currentItem.ingredients_analysis_tags && this.currentItem.ingredients_analysis_tags.includes('en:non-vegan');
    },
    vegetarian(): boolean {
      return this.currentItem.ingredients_analysis_tags && this.currentItem.ingredients_analysis_tags.includes('en:vegetarian');
    },
    notVegetarian(): boolean {
      return this.currentItem.ingredients_analysis_tags && this.currentItem.ingredients_analysis_tags.includes('en:non-vegetarian');
    },
    notTestedOnAnimals(): boolean {
      return this.currentItem.ingredients_analysis_tags && this.currentItem.ingredients_analysis_tags.includes('en:not-tested-on-animals');
    },
    fairTrade(): boolean {
      return this.currentItem.ingredients_analysis_tags && this.currentItem.ingredients_analysis_tags.includes('en:fair-trade');
    },
    scoreNumberToLetter(score: number): string {
      switch (score) {
        case 0:
          return 'a';
        case 1:
          return 'b';
        case 2:
          return 'c';
        case 3:
          return 'd';
        case 4:
          return 'e';
        default:
          return 'f';
      }
    },
    letterScoreToNumber(letter: string): number {
      switch (letter.toLowerCase()) {
        case 'a':
          return 0;
        case 'b':
          return 1;
        case 'c':
          return 2;
        case 'd':
          return 3;
        case 'e':
          return 4;
        default:
          return 5;
      }
    },
    containsPalmOil() {
      return this.currentItem.ingredients_from_or_that_may_be_from_palm_oil_n > 0 || 
        this.currentItem.ingredients_text.toLowerCase().indexOf('palm oil') > -1 ||
        this.currentItem.ingredients_text.toLowerCase().indexOf('de palme') > -1 || 
        this.currentItem.ingredients_text.toLowerCase().indexOf('palmist') > -1 || 
        this.currentItem.ingredients_text.toLowerCase().indexOf('di palma') > -1 || 
        this.currentItem.ingredients_text.toLowerCase().indexOf('palmöl') > -1 || 
        this.currentItem.ingredients_text.toLowerCase().indexOf('e304') > -1 || 
        this.currentItem.ingredients_text.toLowerCase().indexOf('e 304') > -1 || 
        this.currentItem.ingredients_text.toLowerCase().indexOf('e 434') > -1 || 
        this.currentItem.ingredients_text.toLowerCase().indexOf('e434') > -1 || 
        this.currentItem.ingredients_text.toLowerCase().indexOf('e495') > -1 || 
        this.currentItem.ingredients_text.toLowerCase().indexOf('e 495') > -1 || 
        this.currentItem.ingredients_text.toLowerCase().indexOf('palmitique') > -1 || 
        this.currentItem.ingredients_text.toLowerCase().indexOf('palmityl') > -1 || 
        this.currentItem.ingredients_text.toLowerCase().indexOf('behenyl') > -1 || 
        this.currentItem.ingredients_text.toLowerCase().indexOf('palmitate') > -1 || 
        this.currentItem.ingredients_text.toLowerCase().indexOf('cetylique') > -1 || 
        this.currentItem.ingredients_text.toLowerCase().indexOf('tegomuls') > -1 || 
        this.currentItem.ingredients_text.toLowerCase().indexOf('emulsan') > -1 || 
        this.currentItem.ingredients_text.toLowerCase().indexOf('btms') > -1 || 
        this.currentItem.ingredients_original_tags.includes('en:palm-oil') || 
        this.currentItem.ingredients_original_tags.includes('fr:palm-oil');
    }
  },
  mounted() {
    if (!this.route.params.id) {
      this.productTitle = 'Search for a product';
    } else {
      this.barcode = this.route.params.id.toString();
      this.getProduct(this.barcode);
    }
  },
});
</script>

<style scoped>
ion-label {
  min-width: 100px;
}
ion-item ion-note:not(.footer) {
  max-width: calc(100vw - 110px);
}
</style>

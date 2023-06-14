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
          <ion-title size="large" v-if="!loading">{{ productTitle }}</ion-title>
          <ion-skeleton-text v-else style="width: 50vw"></ion-skeleton-text>
        </ion-toolbar>
      </ion-header>
      <form @submit.prevent="getProduct(barcode)">
        <ion-list>
          <ion-item>
            <ion-input type="tel" v-model="barcode" :placeholder="$t('Barcode')"></ion-input>
            <ion-button @click="getProduct(barcode)" expand="block">{{ $t('Search') }}</ion-button>
          </ion-item>
        </ion-list>
      </form>
      <ion-grid v-if="loading">
        <ion-row>
          <ion-col>
            <ion-skeleton-text style="width: 100px; height: 100px;"></ion-skeleton-text>
          </ion-col>
          <ion-col>
            <ion-skeleton-text style="width: 100px; height: 100px;"></ion-skeleton-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col style="text-align: center;">
            <ion-spinner name="crescent" style="width: 100px;height: 100px;"></ion-spinner>
          </ion-col>
        </ion-row>
      </ion-grid>
      <div v-if="!loading && !currentItem && productTitle === $t('Search for a product')" style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; font-family: 'RubikGlitch';">
        <!-- home screen with logo and instructions -->
        <div style="text-align: center; padding: 1rem;">
          <img src="@/assets/logo.png" style="max-width: 100px;" />
          <p>
            <span style="font-size: 1.5rem;">{{ $t('Scan a barcode') }}</span>
            <br>
            <span v-html="$t('to check how<br>EVIL<br>is your food !')"></span>
          </p>
        </div>
      </div>
      <div v-else-if="!loading && !currentItem && productTitle" style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; font-family: 'RubikGlitch';">
        <!-- no product found -->
        <div style="text-align: center; font-size: 1.5rem; padding: 1rem;">
          <img src="@/assets/death.png" style="max-width: 100px;" />
          <p>{{ productTitle }}</p>
        </div>
      </div>
      <ion-grid v-if="!loading && currentItem && currentItem.product_name && currentItem.product_name !== ''">
        <ion-row>
          <ion-col v-if="unknownIngredients|| hasAdditives || containsPalmOil || nutriscoreUnknown || ecoscoreUnknown || nutriscoreDE || ecoscoreDE" style="text-align: center;">
            <img src="@/assets/death.png" style="max-width: 100px;" />
              <ion-note v-if="unknownIngredients" color="danger" style="display: block;"><ion-icon :icon="closeOutline"></ion-icon> {{ $t('Unknown ingredients') }}</ion-note>
              <ion-note v-if="notVegetarian || notVegan" color="danger" style="display: block;"><ion-icon :icon="closeOutline"></ion-icon> {{ $t('Animal exploitation') }}</ion-note>
              <ion-note v-if="hasAdditives" color="danger" style="display: block;"><ion-icon :icon="closeOutline"></ion-icon> {{ $t('Additives') }} </ion-note>
              <ion-note v-if="containsPalmOil" color="danger" style="display: block;"><ion-icon :icon="closeOutline"></ion-icon> {{ $t('Palm oil') }}</ion-note>
              <ion-note v-if="nutriscoreUnknown" color="danger" style="display: block;"><ion-icon :icon="closeOutline"></ion-icon> {{ $t('Unknown Nutriscore') }}</ion-note>
              <ion-note v-else-if="nutriscoreDE" color="danger" style="display: block;"><ion-icon :icon="closeOutline"></ion-icon>{{ $t('Bad Nutriscore') }}</ion-note>
              <ion-note v-if="ecoscoreUnknown" color="danger" style="display: block;"><ion-icon :icon="closeOutline"></ion-icon> {{ $t('Unknown Ecoscore') }}</ion-note>
              <ion-note v-else-if="ecoscoreDE" color="danger" style="display: block;"><ion-icon :icon="closeOutline"></ion-icon> {{ $t('Bad Ecoscore') }}</ion-note>
              <!-- Maybe some day… <ion-note v-if="ingredientsOrigin === $t('Unknown')" color="danger" style="display: block;"><ion-icon :icon="closeOutline"></ion-icon> {{ $t('Unknown ingredients origin') }}</ion-note> -->
          </ion-col>
          <ion-col v-if="isOrganic || vegan || vegetarian || fairTrade || nutriscoreAB || ecoscoreAB || containsPalmOil === false" style="text-align: center;">
            <img src="@/assets/angel.png" style="max-width: 100px;" />
            <ion-note v-if="isOrganic" color="success" style="display: block;"><ion-icon :icon="checkmarkOutline"></ion-icon> {{ $t('Organic') }}</ion-note>
            <ion-note v-if="vegan || vegetarian" color="success" style="display: block;"><ion-icon :icon="checkmarkOutline"></ion-icon> {{ vegan ? $t('Vegan') : $t('Vegetarian') }}</ion-note>
            <ion-note v-if="fairTrade" color="success" style="display: block;"><ion-icon :icon="checkmarkOutline"></ion-icon> {{ $t('Fair trade') }}</ion-note>
            <ion-note v-if="nutriscoreAB" color="success" style="display: block;"><ion-icon :icon="checkmarkOutline"></ion-icon> {{ $t('Good Nutriscore') }}</ion-note>
            <ion-note v-if="ecoscoreAB" color="success" style="display: block;"><ion-icon :icon="checkmarkOutline"></ion-icon> {{ $t('Good Ecoscore') }}</ion-note>
            <ion-note v-if="containsPalmOil === false" color="success" style="display: block;"><ion-icon :icon="checkmarkOutline"></ion-icon> {{ $t('No palm oil') }}</ion-note>
          </ion-col>
        </ion-row>
        <ion-row style="margin-top: 1em;">
          <ion-col style="text-align: center;">
            <img v-if="currentItem.nutriscore_grade && currentItem.nutriscore_grade.toLowerCase() === 'a'" src="@/assets/nutriscore-a.svg" style="max-width: 30vw;" />
            <img v-else-if="currentItem.nutriscore_grade && currentItem.nutriscore_grade.toLowerCase() === 'b'" src="@/assets/nutriscore-b.svg" style="max-width: 30vw;" />
            <img v-else-if="currentItem.nutriscore_grade && currentItem.nutriscore_grade.toLowerCase() === 'c'" src="@/assets/nutriscore-c.svg" style="max-width: 30vw;" />
            <img v-else-if="currentItem.nutriscore_grade && currentItem.nutriscore_grade.toLowerCase() === 'd'" src="@/assets/nutriscore-d.svg" style="max-width: 30vw;" />
            <img v-else-if="currentItem.nutriscore_grade && currentItem.nutriscore_grade.toLowerCase() === 'e'" src="@/assets/nutriscore-e.svg" style="max-width: 30vw;" />
            <img v-else src="@/assets/nutriscore-unknown.svg" style="max-width: 30vw;" />
          </ion-col>
          <ion-col style="text-align: center;">
            <img v-if="currentItem.ecoscore_grade && currentItem.ecoscore_grade.toLowerCase() === 'a'" src="@/assets/ecoscore-a.svg" style="max-width: 30vw;" />
            <img v-else-if="currentItem.ecoscore_grade && currentItem.ecoscore_grade.toLowerCase() === 'b'" src="@/assets/ecoscore-b.svg" style="max-width: 30vw;" />
            <img v-else-if="currentItem.ecoscore_grade && currentItem.ecoscore_grade.toLowerCase() === 'c'" src="@/assets/ecoscore-c.svg" style="max-width: 30vw;" />
            <img v-else-if="currentItem.ecoscore_grade && currentItem.ecoscore_grade.toLowerCase() === 'd'" src="@/assets/ecoscore-d.svg" style="max-width: 30vw;" />
            <img v-else-if="currentItem.ecoscore_grade && currentItem.ecoscore_grade.toLowerCase() === 'e'" src="@/assets/ecoscore-e.svg" style="max-width: 30vw;" />
            <img v-else src="@/assets/ecoscore-unknown.svg" style="max-width: 30vw;" />
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-list v-if="!loading && currentItem && currentItem.product_name && currentItem.product_name !== ''">
        <ion-item>
          <ion-label>{{ $t('Organic') }}</ion-label>
          <ion-note slot="end" v-if="isOrganic" color="success"><ion-icon :icon="checkmarkOutline"></ion-icon> {{ $t('Yes') }}</ion-note>
          <ion-note slot="end" v-else color="danger"><ion-icon :icon="closeOutline"></ion-icon> {{ $t('No') }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>{{ $t('Additives') }}</ion-label>
          <ion-note slot="end" v-if="hasAdditives" color="danger"><ion-icon :icon="closeOutline"></ion-icon> {{ additivesList }}</ion-note>
          <ion-note slot="end" v-else color="success"><ion-icon :icon="checkmarkOutline"></ion-icon> {{ $t('None found') }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>{{ $t('May contain Palm oil') }}</ion-label>
          <ion-note slot="end" v-if="containsPalmOil === true" color="danger"><ion-icon :icon="closeOutline"></ion-icon> {{ $t('Yes') }}</ion-note>
          <ion-note slot="end" v-else-if="containsPalmOil === null">{{ $t('Not Explicitly') }}</ion-note>
          <ion-note slot="end" v-else color="success"><ion-icon :icon="checkmarkOutline"></ion-icon> {{ $t('No') }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>{{ $t('Animal respect') }}</ion-label>
          <ion-note slot="end" v-if="vegan" color="success"><ion-icon :icon="checkmarkOutline"></ion-icon> {{ $t('Vegan') }}</ion-note>
          <ion-note slot="end" v-else-if="vegetarian" color="success"><ion-icon :icon="checkmarkOutline"></ion-icon>{{ $t('Vegetarian') }}</ion-note>
          <ion-note slot="end" v-else-if="notVegetarian" color="danger"><ion-icon :icon="closeOutline"></ion-icon> <img src="@/assets/1F480.svg" style="height: 1.5em" /> {{ $t('Animal killed') }}</ion-note>
          <ion-note slot="end" v-else-if="notVegan" color="danger"><ion-icon :icon="closeOutline"></ion-icon> {{ $t('Animal exploited') }}</ion-note>
          <ion-note slot="end" v-else>{{ $t('Unknown') }}<span v-if="notTestedOnAnimals">, {{ $t('but not tested on animals') }}</span></ion-note>
        </ion-item>
        <ion-item v-if="currentItem.ingredients && currentItem.ingredients.length > 0">
          <ion-label>{{ $t('Origin of the ingredients') }}</ion-label>
          <ion-note slot="end">{{ ingredientsOrigin }}</ion-note>
        </ion-item>
        <ion-item v-if="currentItem.ecoscore_data && currentItem.ecoscore_data.agribalyse && currentItem.ecoscore_data.agribalyse.co2_total && !isNaN(currentItem.ecoscore_data.agribalyse.co2_total) && currentItem.ecoscore_data.agribalyse.co2_total > 0">
          <ion-label>{{ $t('Carbon footprint') }}</ion-label>
          <ion-note slot="end">{{ Math.round(currentItem.ecoscore_data.agribalyse.co2_total * 100) }} g CO<sup>2</sup> / 100g</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>{{ $t('Allergens') }}</ion-label>
          <ion-note slot="end">{{ allergens }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>{{ $t('Photo') }}</ion-label>
          <ion-note slot="end" v-if="currentItem.image_url"><img :src="currentItem.image_thumb_url" style="max-width: 30vw;" /></ion-note>
        </ion-item>
        <ion-item>
          <ion-note class="footer">
            <p>{{ $t('Product data provided by') }} <a :href="'https://world.openfoodfacts.org/product/' + barcode" target="_blank" rel="noopener noreferrer">Open Food Facts</a></p>
            <p>{{ $t('If you find an error, please contribute to Open Food Facts, it will help thousands of consumers.') }}</p>
            <p>{{ $t('Data source:') }} {{ currentItem.data_sources }}</p>
            <p><strong>{{ $t('This list of allergens may not be exhaustive. Please double check on the product package if you have known allergies.') }}</strong></p>
          </ion-note>
        </ion-item>
        <ion-item>
          <ion-note class="footer">
            <p><a href="https://onlinecreation.pro" target="_blank">{{ $t('This application was developed by OnlineCreation') }}</a></p>
          </ion-note>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonButton, IonLabel, IonNote, IonGrid, IonRow, IonCol, IonImg, IonIcon, IonSkeletonText, IonSpinner} from '@ionic/vue';
import { checkmarkOutline, closeOutline } from 'ionicons/icons';
import { useRoute } from 'vue-router';

export default defineComponent ({
  name: 'TabConsult',
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonButton, IonLabel, IonNote, IonGrid, IonRow, IonCol, IonImg, IonIcon, IonSkeletonText, IonSpinner },
  setup() {
    const route = useRoute();
    return { route, checkmarkOutline, closeOutline };
  },
  data() {
    return {
      productTitle: this.$t('Search for a product'),
      barcode: '',
      emptyProduct: null as any,
      currentItem: null as any,
      loading: false
    };
  },
  methods: {
    getProduct(barcode: string) {
      barcode = barcode.trim();
      const purgedBarcode = barcode.replace(/[^0-9]+/g, '');
      const url = 'https://world.openfoodfacts.org/api/v0/product/' + purgedBarcode + '.json';
      this.loading = true;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.loading = false;
          if (data.status === 1) {
            this.productTitle = data.product.product_name;
            if (this.productTitle && typeof this.productTitle === 'string' && this.productTitle.length > 0) {
              this.currentItem = data.product;
            } else {
              this.currentItem = this.emptyProduct;
              this.productTitle = this.$t('Product not found');
            }
          } else {
            this.currentItem = this.emptyProduct;
            this.productTitle = this.$t('Product not found');
          }
        });
    }
  },
  computed: {
    nutriscoreAB(): boolean {
      return this.currentItem.nutriscore_grade === 'a' || this.currentItem.nutriscore_grade === 'b';
    },
    ecoscoreAB(): boolean {
      return this.currentItem.ecoscore_grade === 'a' || this.currentItem.ecoscore_grade === 'b';
    },
    nutriscoreDE(): boolean {
      return this.currentItem.nutriscore_grade === 'd' || this.currentItem.nutriscore_grade === 'e';
    },
    ecoscoreDE(): boolean {
      return this.currentItem.ecoscore_grade === 'd' || this.currentItem.ecoscore_grade === 'e';
    },
    nutriscoreUnknown(): boolean {
      return !this.currentItem.nutriscore_grade || this.currentItem.nutriscore_grade === 'unknown';
    },
    ecoscoreUnknown(): boolean {
      return !this.currentItem.ecoscore_grade || this.currentItem.ecoscore_grade === 'unknown';
    },
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
        origins.push(this.$t('Unknown'));
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
        allergens.push(this.$t('None known'));
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
        result += '. ' + this.$t('May contain:') + ' ' + traces.join(', ');
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
    unknownIngredients(): boolean {
      return !this.currentItem.ingredients_text;
    },
    containsPalmOil() {
      const contains = (this.currentItem.ingredients_text && this.currentItem.ingredients_text.toLowerCase().indexOf('palm oil') > -1) || 
        (this.currentItem.ingredients_text && this.currentItem.ingredients_text.toLowerCase().indexOf('de palme') > -1) || 
        (this.currentItem.ingredients_text && this.currentItem.ingredients_text.toLowerCase().indexOf('palmist') > -1) || 
        (this.currentItem.ingredients_text && this.currentItem.ingredients_text.toLowerCase().indexOf('di palma') > -1) || 
        (this.currentItem.ingredients_text && this.currentItem.ingredients_text.toLowerCase().indexOf('palmöl') > -1) || 
        (this.currentItem.ingredients_text && this.currentItem.ingredients_text.toLowerCase().indexOf('e304') > -1) || 
        (this.currentItem.ingredients_text && this.currentItem.ingredients_text.toLowerCase().indexOf('e 304') > -1) || 
        (this.currentItem.ingredients_text && this.currentItem.ingredients_text.toLowerCase().indexOf('e 434') > -1) || 
        (this.currentItem.ingredients_text && this.currentItem.ingredients_text.toLowerCase().indexOf('e434') > -1) || 
        (this.currentItem.ingredients_text && this.currentItem.ingredients_text.toLowerCase().indexOf('e495') > -1) || 
        (this.currentItem.ingredients_text && this.currentItem.ingredients_text.toLowerCase().indexOf('e 495') > -1) || 
        (this.currentItem.ingredients_text && this.currentItem.ingredients_text.toLowerCase().indexOf('palmitique') > -1) || 
        (this.currentItem.ingredients_text && this.currentItem.ingredients_text.toLowerCase().indexOf('palmityl') > -1) || 
        (this.currentItem.ingredients_text && this.currentItem.ingredients_text.toLowerCase().indexOf('behenyl') > -1) || 
        (this.currentItem.ingredients_text && this.currentItem.ingredients_text.toLowerCase().indexOf('palmitate') > -1) || 
        (this.currentItem.ingredients_text && this.currentItem.ingredients_text.toLowerCase().indexOf('cetylique') > -1) || 
        (this.currentItem.ingredients_text && this.currentItem.ingredients_text.toLowerCase().indexOf('tegomuls') > -1) || 
        (this.currentItem.ingredients_text && this.currentItem.ingredients_text.toLowerCase().indexOf('emulsan') > -1) || 
        (this.currentItem.ingredients_text && this.currentItem.ingredients_text.toLowerCase().indexOf('btms') > -1) || 
        (this.currentItem.ingredients_original_tags && this.currentItem.ingredients_original_tags.includes('en:palm-oil')) || 
        (this.currentItem.ingredients_original_tags && this.currentItem.ingredients_original_tags.includes('fr:palm-oil'));
      const doesNotContain = (this.currentItem.labels_tags && this.currentItem.labels_tags.includes('en:palm-oil-free')) || 
        (this.currentItem.labels_tags && this.currentItem.labels_tags.includes('fr:sans-huile-de-palme')) || 
        (this.currentItem.labels_tags && this.currentItem.labels_tags.includes('en:no-palm-oil'));
      const mayContain = this.currentItem.ingredients_from_or_that_may_be_from_palm_oil_n > 0;
      if (contains) {
        return true;
      } else if (doesNotContain) {
        return false;
      } else if (mayContain) {
        return true;
      } else {
        return null;
      }
    }
  },
  mounted() {
    if (!this.route.params.id) {
      this.productTitle = this.$t('Search for a product');
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

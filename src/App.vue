<template>
  <ion-app>
    <ion-fab id="cancel-scan">
      <ion-fab-button @click="cancelScan" color="light">
        <ion-icon aria-hidden="true" :icon="closeOutline" />
      </ion-fab-button>
    </ion-fab>
    <ion-router-outlet  />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { closeOutline } from 'ionicons/icons';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

const cancelScan = async () => {
  BarcodeScanner.showBackground();
  const myBody = document.querySelector('body');
  if (myBody) {
    myBody.classList.remove('scanner-active');
  }
  BarcodeScanner.stopScan();
};
</script>
<style>
@font-face {
  font-family: 'RubikGlitch';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(@/assets/RubikGlitch-Regular.ttf) format('truetype');
  src: url(@/assets/RubikGlitch-Regular.svg) format('svg');
  src: url(@/assets/RubikGlitch-Regular.woff) format('woff');
  src: url(@/assets/RubikGlitch-Regular.woff2) format('woff2');
}
</style>

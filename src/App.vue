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

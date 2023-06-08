<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">

        <ion-tab-button tab="tab1" @click="startScan">
          <ion-icon aria-hidden="true" :icon="barcodeOutline" />
          <ion-label>{{ $t('Scan') }}</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { barcodeOutline } from 'ionicons/icons';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { useRouter } from 'vue-router';

const router = useRouter();

const startScan = async () => {
  // Check camera permission
  // This is just a simple example, check out the better checks below
  const perm = await BarcodeScanner.checkPermission({ force: true });
    router.push({ path: '/tabs/consult/' } );

  if (perm.granted) {
    BarcodeScanner.hideBackground();
    const myBody = document.querySelector('body');
    if (myBody) {
      myBody.classList.add('scanner-active');
    }
    const result = await BarcodeScanner.startScan({
      targetedFormats: [SupportedFormat.EAN_13]
    });
    
    if (result.hasContent) {
      BarcodeScanner.showBackground();
      if (myBody) {
        myBody.classList.remove('scanner-active');
      }
      router.push({ path: '/tabs/consult/' + result.content } );
    }
    BarcodeScanner.showBackground();
    if (myBody) {
      myBody.classList.remove('scanner-active');
    }
  } else {
    alert(this.$t('No permission to use the camera'));
  }

};

</script>

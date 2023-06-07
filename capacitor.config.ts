import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fr.onlinecreation.evilcheck',
  appName: 'EvilCheck',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

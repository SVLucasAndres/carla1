import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.carla.app',
  appName: 'carla',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;

import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'my.edu.upsi.unistaff',
  appName: 'UniStaff UPSI',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

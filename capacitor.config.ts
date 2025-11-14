import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'my.upsi.unistaff',
  appName: 'UPSI UniStaff',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

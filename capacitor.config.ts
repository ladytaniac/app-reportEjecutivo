import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'reservas',
  webDir: 'www',
  bundledWebRuntime: false,
  cordova: {
    preferences: {
      'android:usesCleartextTraffic': 'true',
      ScrollEnabled: 'false',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      FadeSplashScreenDuration: '300',
      SplashShowOnlyFirstTime: 'false',
      SplashScreen: 'screen',
      SplashScreenDelay: '3000',
      AndroidPersistentFileLocation: 'Compatibility'
    }
  }
};

export default config;

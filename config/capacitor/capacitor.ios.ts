import type { CapacitorConfig } from '@capacitor/cli';
import 'dotenv/config';

const config: CapacitorConfig = {
  appId: 'za.co.mamamoney.assessments.frontend',
  appName: 'Mama Money Frontend Technical Assessment',
  webDir: 'www',
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  },
  cordova: {
    preferences: {
      // Braze iOS
      'com.braze.api_key': process.env['BRAZE_IOS_KEY'] ?? '',
      'com.braze.ios_api_endpoint': process.env['BRAZE_ENDPOINT'] ?? '',
      'com.braze.ios_disable_automatic_push_registration': 'YES',
      'com.braze.ios_disable_automatic_push_handling': 'NO',
      'com.braze.ios_enable_idfa_automatic_collection': 'YES',
      'com.braze.enable_location_collection': 'NO',
      'com.braze.geofences_enabled': 'NO',
      'com.braze.sdk_authentication_enabled': 'NO',
      'com.braze.display_foreground_push_notifications': 'YES',
      'com.braze.ios_use_automatic_request_policy': 'YES',
      'com.braze.ios_disable_un_authorization_option_provisional': 'NO',
      'com.braze.ios_log_level': '4' // 2 for Verbose, 4 for Minimal logging
    }
  }
};

export default config;

App.accessRule('*', { type: 'network' });
// Set PhoneGap/Cordova preferences.
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('AutoHideSplashScreen', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
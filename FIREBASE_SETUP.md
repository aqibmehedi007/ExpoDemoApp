# Firebase Remote Notifications Setup Guide

This guide will help you set up remote push notifications using Firebase Cloud Messaging (FCM).

## Prerequisites

- Firebase account
- Apple Developer account (for iOS)
- Google Play Console account (for Android)

## Step 1: Firebase Project Setup

### 1.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name: `character-collection-app`
4. Enable Google Analytics (optional)
5. Create project

### 1.2 Add Android App
1. In Firebase console, click "Add app" → Android
2. **Package name**: `com.charactercollection.app`
3. **App nickname**: Character Collection App
4. Download `google-services.json`
5. Place it in `android/app/google-services.json`

### 1.3 Add iOS App
1. Click "Add app" → iOS
2. **Bundle ID**: `com.charactercollection.app`
3. **App nickname**: Character Collection App
4. Download `GoogleService-Info.plist`
5. Place it in `ios/GoogleService-Info.plist`

## Step 2: Firebase Service Account

### 2.1 Generate Service Account Key
1. In Firebase console, go to Project Settings
2. Click "Service accounts" tab
3. Click "Generate new private key"
4. Download the JSON file
5. Save as `server/serviceAccountKey.json`

### 2.2 Update Server Configuration
1. Open `server/server.js`
2. Uncomment the Firebase Admin initialization:
```javascript
admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json')),
});
```

## Step 3: iOS Push Notifications (APNs)

### 3.1 Apple Developer Account Setup
1. Go to [Apple Developer](https://developer.apple.com/)
2. Certificates, Identifiers & Profiles
3. Create new App ID: `com.charactercollection.app`
4. Enable Push Notifications capability

### 3.2 Generate APNs Certificate
1. Create new certificate for APNs
2. Download and install the certificate
3. Export as `.p12` file with password
4. Convert to Firebase format using Firebase console

## Step 4: Testing Remote Notifications

### 4.1 Start the Server
```bash
cd server
npm install
npm start
```

### 4.2 Register Device Token
When the app starts, it will automatically register the FCM token with the server.

### 4.3 Send Test Notification
```bash
curl -X POST http://localhost:3000/send-notification \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Remote Notification Test",
    "body": "This is a remote notification from Firebase!",
    "data": {
      "type": "test",
      "screen": "home"
    }
  }'
```

## Step 5: Production Deployment

### 5.1 Deploy Server
1. Deploy the server to a cloud platform (Heroku, AWS, etc.)
2. Update the server URL in your app
3. Set up environment variables for Firebase credentials

### 5.2 Update App Configuration
1. Update `app.json` with production Firebase config
2. Test on physical devices (not simulators)
3. Verify notifications work in all app states

## Troubleshooting

### Common Issues

1. **"Firebase not initialized"**
   - Check if `google-services.json` is in the correct location
   - Verify Firebase dependencies are installed

2. **"Permission denied"**
   - Check notification permissions in device settings
   - Verify APNs certificate for iOS

3. **"Token not received"**
   - Check Firebase console for registration errors
   - Verify network connectivity

4. **"Notifications not showing"**
   - Check app notification settings
   - Verify background app refresh is enabled

### Debug Steps

1. Check console logs for FCM token
2. Verify token is registered with server
3. Test with Firebase console directly
4. Check device notification settings

## Security Considerations

1. **Never commit service account keys** to version control
2. **Use environment variables** for sensitive data
3. **Implement proper authentication** for your server
4. **Validate notification payloads** before sending
5. **Rate limit** notification sending

## Next Steps

1. Implement user-specific notifications
2. Add notification categories and actions
3. Set up notification analytics
4. Implement notification preferences
5. Add rich notifications with images

## Resources

- [Firebase Documentation](https://firebase.google.com/docs/cloud-messaging)
- [React Native Firebase](https://rnfirebase.io/messaging/usage)
- [Apple Push Notifications](https://developer.apple.com/documentation/usernotifications)
- [Google Cloud Messaging](https://developers.google.com/cloud-messaging) 
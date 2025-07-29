# Character Collection App - React Native Assessment

A modern React Native app built with Expo that demonstrates full-stack mobile development skills including state management, navigation, animations, and push notifications.

## 🚀 Features

- **REST API Integration** - Fetches character data from Rick & Morty API
- **State Management** - Uses Zustand for global state management
- **Navigation** - React Navigation with bottom tabs and stack navigation
- **Professional UI** - App header with notification bell and profile avatar
- **Forms** - React Hook Form with validation
- **Animations** - Reanimated animations throughout the app
- **Push Notifications** - Expo notifications with permission handling
- **Modern UI/UX** - Dark theme with responsive design
- **Privacy Policy** - Built-in privacy policy screen

## 📱 Screens & Navigation

### Bottom Tab Navigation
1. **Characters Tab** - Displays character list with animations and test notification button
2. **Add Character Tab** - Form to add new characters with validation
3. **Privacy Policy Tab** - App privacy information

### Stack Navigation
- **Details Screen** - Shows character details with image (accessible from Characters tab)

### App Header
- **Professional Header** - App title, notification bell icon, and profile avatar
- **Consistent Design** - Dark theme with smooth animations

## 🛠️ Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform and tools
- **TypeScript** - Type safety
- **Zustand** - State management
- **React Navigation** - Bottom tabs and stack navigation
- **React Hook Form** - Form handling
- **Reanimated** - Animations
- **Expo Notifications** - Push notifications
- **Ionicons** - Professional icons for UI elements

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd character-collection-app
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start the Development Server
```bash
npx expo start
```

### 4. Run on Device/Emulator
- **Android**: Press `a` in terminal or scan QR code with Expo Go
- **iOS**: Press `i` in terminal or scan QR code with Camera app
- **Web**: Press `w` in terminal

## 🏗️ Build Instructions

### Development Build
```bash
npx expo run:android
# or
npx expo run:ios
```

### Production Build

#### Using EAS Build (Recommended)
1. Install EAS CLI:
```bash
npm install -g @expo/eas-cli
```

2. Login to Expo:
```bash
eas login
```

3. Configure EAS:
```bash
eas build:configure
```

4. Build for Android:
```bash
eas build --platform android
```

5. Build for iOS:
```bash
eas build --platform ios
```

#### Using Expo Classic Build
```bash
expo build:android
# or
expo build:ios
```

## 📦 App Store Submission

### Google Play Store

1. **Prepare Assets**:
   - App icon (512x512 PNG)
   - Feature graphic (1024x500 PNG)
   - Screenshots (minimum 2)
   - Privacy policy URL

2. **Build APK/AAB**:
```bash
eas build --platform android --profile production
```

3. **Upload to Google Play Console**:
   - Create new app
   - Upload AAB file
   - Fill in store listing
   - Submit for review

### Apple App Store

1. **Prepare Assets**:
   - App icon (1024x1024 PNG)
   - Screenshots for different devices
   - Privacy policy URL

2. **Build IPA**:
```bash
eas build --platform ios --profile production
```

3. **Upload to App Store Connect**:
   - Create new app
   - Upload IPA file
   - Fill in app information
   - Submit for review

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
EXPO_PROJECT_ID=your-project-id
API_BASE_URL=https://rickandmortyapi.com/api
```

### App Configuration
Update `app.json` with your specific details:
- Bundle identifier
- App name
- Version numbers
- Permissions

## 🧪 Testing

### Manual Testing
1. **Navigation** - Test bottom tab navigation and stack navigation
2. **App Header** - Verify header displays correctly on all screens
3. **API Integration** - Verify data loading from Rick & Morty API
4. **Forms** - Test form validation and submission
5. **Animations** - Check all animations work smoothly
6. **Notifications** - Test permission and notification sending
7. **UI Elements** - Test notification bell and profile avatar interactions

### Automated Testing
```bash
npm test
```

## 📱 App Store Requirements Met

- ✅ **App Icons** - Custom icons for all platforms
- ✅ **Metadata** - Complete app information
- ✅ **Privacy Policy** - Built-in privacy policy screen
- ✅ **Push Notifications** - Proper permission handling
- ✅ **Modern UI/UX** - Professional header and bottom navigation
- ✅ **Navigation** - Bottom tabs and stack navigation
- ✅ **Build Configuration** - Ready for app store submission

## 🚨 Troubleshooting

### Common Issues

1. **Metro bundler issues**:
```bash
npx expo start --clear
```

2. **Dependency conflicts**:
```bash
rm -rf node_modules
npm install
```

3. **Build failures**:
```bash
eas build:configure
```

4. **Notification issues**:
   - Check device notification settings
   - Verify permission is granted
   - Test on physical device

## 📄 License

This project is created for assessment purposes.

## 👨‍💻 Developer

Created as part of a React Native + Expo developer assessment demonstrating:
- Modern React Native development with TypeScript
- State management with Zustand
- Professional navigation with bottom tabs and stack navigation
- Smooth animations with Reanimated
- Push notification implementation
- Professional UI/UX with app header
- App store preparation
- Comprehensive documentation

## 🔄 Version History

- **v1.1.0** - Professional UI Update
  - Added professional app header with notification bell and profile avatar
  - Implemented bottom tab navigation
  - Enhanced navigation structure with stack navigation
  - Improved UI/UX with consistent dark theme
  - Added Ionicons for professional icons

- **v1.0.0** - Initial release with all core features
  - REST API integration
  - State management
  - Navigation
  - Forms
  - Animations
  - Push notifications
  - App store preparation 
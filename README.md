# Huhaho

This is a React Native application that runs on both iOS and Android platforms.

## Prerequisites

- Node.js
- Ruby (for iOS development)
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Deepak061996/huhaho.git
cd huhaho
```

2. Install Node.js dependencies:
```bash
npm install --legacy-peer-deps
```

3. Install iOS dependencies:
```bash
# Install Ruby dependencies
gem install bundler
bundle install

# Install iOS pods
cd ios
rm -rf Pods
bundle exec pod install
cd ..
```

## Running the Application

### iOS

To run the app on iOS simulator:
```bash
npm run ios
```

### Android

To run the app on Android emulator or device:
```bash
npm run android
```

### Start Metro Server

To start the Metro development server:
```bash
npm start
```

## Troubleshooting

If you encounter any issues:

1. Clear Metro bundler cache:
```bash
npm start -- --reset-cache
```

2. For iOS, try cleaning the build:
```bash
cd ios
rm -rf Pods        # Remove pods directory
pod deintegrate    # Remove pod integration
bundle install     # Ensure Ruby dependencies are up to date
bundle exec pod install
cd ..
```

3. For Android, try cleaning the build:
```bash
cd android
./gradlew clean
cd ..

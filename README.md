# BADR Mobile - React Native

## Deployment dependencies

Before performing a Deployment, it is assumed that the following have been set up:

- Xcode 11.3+
- OS X 10.14.5 or above
- node 10+
- npm 6.12.1+
- React Native 0.62
- Android 8+
- iOS 11+
- pod https://cocoapods.org/

Make sure you can follow below steps run demo app succcessful

```
npx react-native init AwesomeProject
cd AwesomeProject
npx react-native run-ios
npx react-native run-android
```


## 3rd party Libraries

- react, react native
- react-navigation/native, react-navigation/bottom-tabs, react-navigation/stack
- react-native-device-info
- react-native-x-carousel
- react-native-orientation-locker"

## Data
The json files containing the data for each screens could be found as the following :

- /data/02A_intro.json : the data of the intro screen
- /data/02A_innovation_center.json : the innovation center data of the discovery screen
- /data/02A_latest_news.json : the latest news of the discovery screen
- /data/03_innovation_center_detail.json : the innovation center detail screen
- /data/04_innovation_center_virtual_tour.json : the virtual tour screen

## Build And Run
### iOS

Please follow below commands to build and run on iOS :

```
npm install 
cd ios && pod install && cd .. 
npx react-native run-ios
```

Or you can run it from Xcode by opening `./ios/InnovationCenter.xcworkspace`

## Android

Please follow below commands to build and run on Android :

```
npm install 
npx react-native run-android
```

Or you can use android studio import *./android* run app
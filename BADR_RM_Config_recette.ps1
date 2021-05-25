react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

echo "Prepare for linking..."
uri-scheme add badrio --android

echo "Cleaning and assembling..."
cd .\android; ./gradlew clean ;


if($env:Mode -eq 'assembleDebug'){
echo "======>assembleDebug..."
 ./gradlew $env:Mode
}

if($env:Mode -eq 'assembleRelease'){
echo "======>assembleRelease..."
echo "delete res..."
rm -r -fo .\app\src\main\res\drawable-*
rm -r -fo .\app\src\main\res\raw

echo "assembling..."
 ./gradlew $env:Mode
}

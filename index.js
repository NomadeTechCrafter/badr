/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

//appdynamics
import { Instrumentation } from '@appdynamics/react-native-agent';
 
 Instrumentation.start({
     appKey: "EUM-AAB-AUN",
     collectorURL: "http://badr.douane.gov.ma/appdEum/"
});
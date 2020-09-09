import AsyncStorage from '@react-native-community/async-storage';

export const save = async (key, value) => {
  return AsyncStorage.setItem(key, value);
};

export const saveStringified = async (key, value) => {
  return AsyncStorage.setItem(key, JSON.stringify(value));
};

export const load = async (key, toParse) => {
  const value = await AsyncStorage.getItem(key);
  if (value !== null) {
    return toParse ? JSON.parse(value) : value;
  }
  return '';
};

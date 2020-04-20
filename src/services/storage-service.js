import AsyncStorage from '@react-native-community/async-storage';

export const save = async (key, value) => {
  return AsyncStorage.setItem(key, value);
};

export const load = async key => {
  const value = await AsyncStorage.getItem(key);
  if (value !== null) {
    return value;
  }
  return '';
};

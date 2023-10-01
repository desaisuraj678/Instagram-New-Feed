import AsyncStorage from '@react-native-async-storage/async-storage';

export const localStorageKeys = {
    IS_LOGGED_IN : 'IS_LOGGED_IN'
}

export const storeDataLocally = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    const jsonKey = JSON.stringify(key)
    await AsyncStorage.setItem(jsonKey, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getDataFromLocalStorage = async (key:string) => {
    try {
      const jsonKey = JSON.stringify(key)
      const jsonValue = await AsyncStorage.getItem(jsonKey);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
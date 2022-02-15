import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store'

export const saveData = async (key, value) => {
  if (key === '@tokens') {
    return await saveSecureData(key, value)
  } else {
    if (key && value) {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.log(error)
      }
    }
  }
  
};

export const saveObject = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (error) {
    console.log(error);
  }
}

export const getObject = async (key) => {
  
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (key) => {
  if (key === '@tokens') {
    return await getSecureData(key)
  } else {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.log(`${key} not found`);
    }
  }
  
};


export const removeData = async (key) => {
  if (key === '@tokens') {
    return await deleteSecureData(key)
  } else {
    try {
      await AsyncStorage.removeItem(key);
      console.log('User data cleared');
    } catch (e) {
      console.log(e);
    }
  }
  
}

export const saveSecureData = async (key, value) => {
  var is_available = await SecureStore.isAvailableAsync()

  if (is_available) {
    try{
      await SecureStore.setItemAsync(key, value)
    } catch (error) {
      console.log(error)
    }
  }  
}

export const saveSecureObject = async (key, value) => {
  var is_available = await SecureStore.isAvailableAsync()
  if (is_available){
    try {
      const jsonValue = JSON.stringify(value)
      await SecureStore.setItemAsync(key, jsonValue)
    } catch (error) {
      console.log(error);
    }
  }
  
}

export const deleteSecureData = async (key) => {
  var is_available = await SecureStore.isAvailableAsync()

  if (is_available) {      
    try {
      await SecureStore.deleteItemAsync(key)
    } catch(error) {
      console.log(error)
    }
    
  }
}

export const getSecureData = async (key) => {
  var is_available = await SecureStore.isAvailableAsync()
  

  if (is_available) {      
    try {
      var value = await SecureStore.getItemAsync(key)
      if (value !== null) {
        return value;
      }
    } catch(error) {
      console.log(error)
    }
    
  }
}

export const getSecureObject = async (key) => {
  var is_available = await SecureStore.isAvailableAsync()

  if (is_available) {
    try {
      const jsonValue = await SecureStore.getItemAsync(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  }
  
};


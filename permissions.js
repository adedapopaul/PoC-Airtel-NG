import {PermissionsAndroid} from 'react-native';

export const requestSmsPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(
      [PermissionsAndroid.PERMISSIONS.SEND_SMS, PermissionsAndroid.PERMISSIONS.READ_SMS],
      {
        title: 'ERC-Airtel SMS Permission',
        message:
          'ERC-Airtel require your permission to send and read sms. ' +
          'This enables the app to communicate with Airtel ERC.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED
    
  } catch (err) {
    console.warn(err);
  }
}


export const requestCallPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      {
        title: 'ERC-Airtel Call Permission',
        message: 'ERC-Airtel require your permission to make call. ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED
    
  } catch (err) {
    console.warn(err);
  }
}


export const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(
      [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE],
      {
        title: 'ERC-Airtel Storage Permission',
        message:
          'ERC-Airtel require your permission to read and write to storage. ' +
          'This enables the app optimazation.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED
    
  } catch (err) {
    console.warn(err);
  }
}


export const requestContactPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(
      [PermissionsAndroid.PERMISSIONS.READ_CONTACTS, PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS],
      {
        title: 'ERC-Airtel Contact Permission',
        message:
          'ERC-Airtel require your permission to read contact. ' +
          'This enables the app optimazation.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED
    
  } catch (err) {
    console.warn(err);
  }
}
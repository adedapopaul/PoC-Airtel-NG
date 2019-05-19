import {PermissionsAndroid} from 'react-native';


export const requestSmsPermission= async function () {
      try {
        const granted = await PermissionsAndroid.requestMultiple(
      [PermissionsAndroid.PERMISSIONS.READ_SMS,PermissionsAndroid.PERMISSIONS.SEND_SMS, PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS, PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS],{
            'title': 'ERC-Airtel Permission',
            'message': 'ERC-Airtel require these permissions to work.'
          }
        )
        if (PermissionsAndroid.RESULTS.GRANTED=== 'granted') {
          //To Check, If Permission is granted
          console.log("You can use the sms");
        } else {
          alert('App might not perform well because permission is denied.');
        }
      } catch (err) {
        // alert("err",err);
        console.warn(err)
      }
  }

export const requestSmsPermission2= async function () {
      try {
        const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS,{
            'title': 'ERC-Airtel Permission',
            'message': 'ERC-Airtel require permission to make send sms messages from the app'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          console.log("You can use the sms");
        } else {
          alert("App might not perform well because permission is denied.");
        }
      } catch (err) {
        // alert("err",err);
        console.warn(err)
      }
  }

export const requestCallPermission= async function () {
      try {
        const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,{
            'title': 'ERC-Airtel Permission',
            'message': 'ERC-Airtel require permission to make calls from the app'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          console.log("You can use the call");
        } else {
          alert("App might not perform well because permission is denied.");
        }
      } catch (err) {
        // alert("err",err);
        console.warn(err)
      }
  }


export const requestStoragePermission= async function () {
      try {
        const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,{
            'title': 'ERC-Airtel Permission',
            'message': 'ERC-Airtel require permission to read your storage media'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          console.log("You can use the storage");
        } else {
          alert("App might not perform well because permission is denied.");
        }
      } catch (err) {
        // alert("err",err);
        console.warn(err)
      }
  }

 export const requestStoragePermission2= async function () {
      try {
        const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,{
            'title': 'ERC-Airtel Permission',
            'message': 'ERC-Airtel require permission to read your storage media'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          console.log("You can use the storage");
        } else {
          alert("App might not perform well because permission is denied.");
        }
      } catch (err) {
        // alert("err",err);
        console.warn(err)
      }
  }

  export const requestContactPermission= async function () {
      try {
        const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,{
            title: 'ERC-Airtel Contact Permission',
            message:
              'ERC-Airtel require your permission to read contact. ' +
              'This enables the app optimazation.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          console.log("You can read contact");
        } else {
          alert("App might not perform well because permission is denied.");
        }
      } catch (err) {
        // alert("err",err);
        console.warn(err)
      }
  }


   export const requestContactPermission2= async function () {
      try {
        const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,{
            title: 'ERC-Airtel Contact Permission',
            message:
              'ERC-Airtel require your permission to read contact. ' +
              'This enables the app optimazation.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          console.log("You can read contact");
        } else {
          alert("App might not perform well because permission is denied.");
        }
      } catch (err) {
        // alert("err",err);
        console.warn(err)
      }
  }


import SmsListener from 'react-native-android-sms-listener'
import SmsAndroid  from 'react-native-get-sms-android'

export const sendSMSNow = (sent, num, count)=>{
        if(sent === false ){
          let hold = this.state
          let message= `EP ${hold.phoneNumber} ${hold.amount} 1 ${hold.password}`
          let senderId = '433'
          // let count =1 
          if( count <= num ){
            openProgress() 
            SmsAndroid.autoSend(senderId, message, (fail) => {
                alert("Failed with this error: " + fail)
            }, (success)=> console.log(success))
            // count++
            listenSMSNow(true, num, count)
          }else{
            alert("Finished")
          }
          
         // return sent = true
        }
       
      }

const listenSMSNow= ( sent, num, count) =>{
        // alert("welcome")
        if(sent === true){
          // alert( 'welcome 2')
          // let count = count
          sendSMSNow( true, num, count)
          // setTimeout(()=>{
              let subscription = SmsListener.addListener(message => {
              let verificationCodeRegex = /Msg\:ERC PIN\(s\)\:(\d{16})/
              let transactionIdRegex = /Msg\:Txn Id M\d+\.\d+\.\d+/

                if (transactionIdRegex.test(message.body)) {
                    sendSMSNow(true, num, count) 
                    // delete the message
                    
                }
                if (verificationCodeRegex.test(message.body)) {
                    // alert(verificationCodeRegex)
                    subscription.remove();
                    count++
                    sendSMSNow(false, num, count) 
                }
                else{
                  alert("Error:  " + message.body)
                  sendSMSNow(true, num, count)

                }
              }) 
          // }, 5*60*1000)
        }
        
      }


  export const getSMS = ()=> {
     SmsAndroid.list(JSON.stringify(filter), (fail) => {
        alert("Failed with this error: " + fail)
    },
    (count, smsList) => {
        // alert('Count: ', count);
        // alert('List: ', smsList);
        var arr = JSON.parse(smsList);
 
        arr.forEach(function(object){
            // alert( object);
            alert(object.body);
            // console.log("-->" + object.body);
        })
    })
}

import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Icon, Picker, Toast, Right, Left, Body, ListItem, Text,  } from 'native-base';
import { View, StatusBar, Button,} from 'react-native'
import SmsListener from 'react-native-android-sms-listener'
import SmsAndroid  from 'react-native-get-sms-android';
import KeepAwake from 'react-native-keep-awake';
import RNSimData from 'react-native-sim-data'
import {accountAction} from '../redux/accountAction'
import {vending} from '../redux/vendaction'
import {licence,cpLicence, subCpLicence, retailerLicence} from '../redux/action'
import {connect} from 'react-redux'
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import { ProgressDialog, Dialog } from 'react-native-simple-dialogs';

var extractedPin=[]
var extractedPin20Page=[]
var d= new Date()
var date= `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
var brief = 'Dial:*126*(15 digit numbers)# Press Yes/Ok<br/>The customer care number is 111.';
var random = function() {return Math.floor(Math.random() * (1470068782340978 - 10068000040008 + 1) ) + 50068000040008}
var htmlTableTag = `<style type="text/css">

                      body{
                        font-size:11px;
                      }
                      
                      div{
                        width:800px;
                        padding:10px;
                        margin-left:auto;
                        margin-right:auto;
                        font-size:11px;
                        /*letter-spacing:1px;*/
                        line-height:5px;
                        /*background-color:rgb(153,255,0);*/
                      }
                      b{
                        font-size:14px;
                      }
                      div.page{
                        width:2480px;
                        height:3508px;
                        padding:0px;
                      }
                      table{
                        alignment-adjust:central;
                        margin-left:auto;
                        margin-right:auto;
                      }
                      td.l{
                        margin-right:10px;
                        padding-right:10px;
                        font-size:9px;
                      }
                      td.r{
                        margin-left:10px;
                        padding-left:10px;
                        font-size:9px;
                      }
                      .pb{
                        page-break-after:always;
                      }
                      @page{
                        size:A4;
                        margin-top:10px;
                      }
                      img{
                        height:18px;
                        width:25px;
                        margin-bottom:-8px;
                      }
                      .right{
                        float:right;
                      }
                      .left{
                        float:left;
                      }
                      .padleft{
                        padding-left:10px;
                      }
                      del{
                        text-decoration:none;
                        position:relative;
                      }
                      
                      i{
                        font-size:9px;
                      }
                      td table tr td{
                        line-height:14px;
                        float:left;
                        font-size:11px;
                      }
                      td table{
                        margin-top:6px;
                        margin-bottom:7px;
                      }
                      table table{
                        /*background-image:url(RCGM500.jpg);
                        background-size:100% 100%;*/
                      }
                    </style>
                    
                    <div>
                    <table>
                    <tr>`
                    

var htmlTableTag20perPage = `<style type="text/css">
                              body{
                                font-size:13px;
                              }
                              
                              div{
                                width:800px;
                                padding:10px;
                                margin-left:auto;
                                margin-right:auto;
                                letter-spacing:0px;
                                background-repeat:repeat;
                                overflow:auto;
                                position:relative;
                              }
                              b{
                                font-size:14px;
                              }
                              table{
                                alignment-adjust:central;
                                margin-left:auto;
                                margin-right:auto;
                              }
                              td.l{
                                margin-right:70px;
                                padding-right:70px;
                              }
                              td.r{
                                margin-left:70px;
                                padding-left:70px;
                              }
                              td.l, td.r{
                                line-height:0px;
                                font-size:13px;
                              }
                              td table tr td{
                                line-height:14px;
                                font-size:12px;
                              }
                              td table{
                                margin-top:12px;
                                margin-bottom:13px;
                              }
                              table table{
                                padding:4px;
                                /*margin-bottom:5px;*/
                                margin-top:3px;
                                background-size:100% 100%;
                              }
                              .right{
                                float:right;
                              }
                              .left{
                                float:left;
                              }
                              .padleft{
                                padding-left:50px;
                                margin-left:50px;
                              }
                              del{
                                text-decoration:none;
                                position:relative;
                              }
                              img{
                                height:15px;
                                width:35px;
                                padding-right:40px;
                              }
                            </style>
                            <div>
                            <table class="onerc" >
                            `

var count = 1
var count20 = 1
var companyName

var filter = {
    box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
    address: 'AirtelERC', // sender's phone number
    indexFrom: 0, // start from index 0
};

export  class PrintScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      extractedPin: [],
      disable: true,
      errorText: '',
      fileName: '',
      pageSize:undefined,
    };

  }

  componentDidMount(){
    if(this.props.account){
      this.setState({
        msidn: this.props.variable.phone,
        amount: this.props.variable.amount,
        quantity: this.props.variable.quantity,
        pin: this.props.account.pin,

      })
      companyName=this.props.account.companyName
    }
  }



//function to extract pin from obj extractedPin and parse into html format
extractPin = (value) =>{
    if (count % 2 == 1){
       var html= `<td class="l">
                    <table  >
                      <tr>
                        <td ><span></span></td>
                        <td ><b><del >N</del>${value.value}</b></span><span class="padleft" ></span></td>
                      </tr>
                      <tr>
                        <td >Ref:</td>
                        <td >${random()}</td>
                      </tr>
                      <tr>
                        <td >S/N:</td>
                        <td >${random()}</td>
                      </tr>
                      <tr>
                        <td>Pin:</td>
                        <td><b> ${value.pin.substr( 0, 4)}-${value.pin.substr( 4, 4)}-${value.pin.substr( 8, 4)}-${value.pin.substr( 12, 4)}</b></td>
                      </tr>
                      <tr>
                        <td>Date:</td>
                        <td >${date}</td>
                      </tr>
                    </table>
                  </td>`
          htmlTableTag += html
      }
      else{
          if(count % 4 === 0){
              var html= `<td class="r" >
                          <table >
                            <tr>
                              <td ><span></span></td>
                              <td ><b ><del>N</del>${value.value}</b></span><span class="padleft"></span></td>
                            </tr>
                            <tr>
                              <td >Ref:</td>
                              <td>${random()}</td>
                            </tr>
                            <tr>
                              <td >S/N:</td>
                              <td>${random()}</td>
                            </tr>
                            <tr>
                              <td>Pin:</td>
                              <td><b> ${value.pin.substr( 0, 4)}-${value.pin.substr( 4, 4)}-${value.pin.substr( 8, 4)}-${value.pin.substr( 12, 4)}</b></td>
                            </tr>
                            <tr>
                              <td>Date:</td>
                              <td>${date}</td>
                            </tr>
                          </table>
                        </td> </tr><tr>`
              htmlTableTag += html
            }
      else{
          var html = `
            <td class="r">
              <table>
                <tr>
                  <td><span></span></td>
                  <td><span class="right" ><b><del>N</del>${value.value}</b></span><span class="padleft" ></span></td>
                </tr>
                <tr>
                  <td>Ref:</td>
                  <td>${random()}</td>
                </tr>
                <tr>
                  <td>S/N:</td>
                  <td>${random()}</td>
                </tr>
                <tr>
                  <td>Pin:</td>
                  <td><b>${value.pin.substr( 0, 4)}-${value.pin.substr( 4, 4)}-${value.pin.substr( 8, 4)}-${value.pin.substr( 12, 4)}</b></td>
                </tr>
                <tr>
                  <td>Date:</td>
                  <td>${date}</td>
                </tr>
              </table>
            </td>`
          htmlTableTag += html
        }
      }

      count++
}


extractPin20PerPage = (value) => {
  if (count20 % 2 === 1){
    var html20 =`<tr>
                  <td class="l">
                    <table>
                      <tr>
                        <td><span></span></td>
                        <td><span class="right"><b><del>N</del>${value.value}</b></span><span class="padleft"></span></td>
                      </tr>
                      <tr>
                        <td>Ref. No:</td>
                        <td>${random()}</td>
                      </tr>
                      <tr>
                        <td>Serial No:</td>
                        <td>${random()}</td>
                      </tr>
                      <tr>
                        <td>Pin:</td>
                        <td><b>${value.pin.substr( 0, 4)}-${value.pin.substr( 4, 4)}-${value.pin.substr( 8, 4)}-${value.pin.substr( 12, 4)}</b></td>
                      </tr>
                      <tr>
                        <td>Date/Time:</td>
                        <td>${date}</td>
                      </tr>
                    </table>
                  </td>
                 `
    htmlTableTag20perPage += html20
  }
  else{
    var html20 =`<td class="r">
                    <table>
                      <tr>
                        <td><span></span></td>
                        <td><span class="right"><b><del>N</del>${value.value}</b></span><span class="padleft"></span></td>
                      </tr>
                      <tr>
                        <td>Ref. No:</td>
                        <td>${random()}</td>
                      </tr>
                      <tr>
                        <td>Serial No:</td>
                        <td>${random()}</td>
                      </tr>
                      <tr>
                        <td>Pin:</td>
                        <td><b>${value.pin.substr( 0, 4)}-${value.pin.substr( 4, 4)}-${value.pin.substr( 8, 4)}-${value.pin.substr( 12, 4)}</b></td>
                      </tr>
                      <tr>
                        <td>Date/Time:</td>
                        <td>${date}</td>
                      </tr>
                    </table>
                  </td>
              </tr>
               `
    htmlTableTag20perPage += html20
  }
  count20++
}


async createPDF() {

    if(+this.state.pageSize === 20){
      let options20perPage= {
        html: htmlTableTag20perPage,
        fileName: this.state.fileName,
        directory: 'Documents',
      }
      let file = await RNHTMLtoPDF.convert(options20perPage)
      if(file.filePath){
        this.setState({ showProgress: false })
        alert("Finished. \nDocument at:   " + file.filePath);
       }
    }
    else{
      let options40perPage = {
        html: htmlTableTag,
        fileName: this.state.fileName,
        directory: 'Documents',
      };

      let file = await RNHTMLtoPDF.convert(options40perPage)
      if(file.filePath){
        this.setState({ showProgress: false })
        alert("Finished. \nDocument at:   " + file.filePath);
      }
    }
}

  _activate = async () => {
    if(+this.state.pageSize){
      var pageNum = +this.state.pageSize
      this.setState({ showProgress: true })
      SmsAndroid.list(JSON.stringify(filter), (fail) => {
          console.log("Failed with this error: " + fail)
      },
      async (count, smsList) => {
          var arr = JSON.parse(smsList);
          arr.forEach(function(object){
              let verificationCodeRegex = /Msg\:ERC PIN\(s\)\:(\d{16})/
              let transactionIdRegex = /Msg\:Txn Id M\d+\.\d+\.\d+/
              if (verificationCodeRegex.test(object.body)) {
                var pin = object.body.substr(15, 16)
                var value =  object.body.substr(39, 4)
                if(pageNum === 20){
                  extractedPin20Page.push({pin: pin, value: value})
                  extractedPin20Page.push({pin: pin, value: value})
                  extractedPin20Page.push({pin: pin, value: value})
                  extractedPin20Page.push({pin: pin, value: value})
                  extractedPin20Page.push({pin: pin, value: value})
                  extractedPin20Page.push({pin: pin, value: value})
                  extractedPin20Page.push({pin: pin, value: value})
                  extractedPin20Page.push({pin: pin, value: value})
                  extractedPin20Page.push({pin: pin, value: value})
                  extractedPin20Page.push({pin: pin, value: value})
                  extractedPin20Page.push({pin: pin, value: value})
                  extractedPin20Page.push({pin: pin, value: value})
                  extractedPin20Page.push({pin: pin, value: value})
                  extractedPin20Page.push({pin: pin, value: value})
                  extractedPin20Page.push({pin: pin, value: value})
                  extractedPin20Page.push({pin: pin, value: value})
                  extractedPin20Page.push({pin: pin, value: value})
                  extractedPin20Page.push({pin: pin, value: value})
                  extractedPin20Page.push({pin: pin, value: value})
                  extractedPin20Page.push({pin: pin, value: value})
                }
                else{
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})
                  extractedPin.push({pin: pin, value: value})

                }
              }

          })

          if(pageNum === 20){
            await extractedPin20Page.forEach(this.extractPin20PerPage)
            htmlTableTag20perPage += '</table></div>'
            this.createPDF()
          }
          else {
             await extractedPin.forEach(this.extractPin)
              htmlTableTag += '</tr></table></div></div>'
                this.createPDF()
            }
      });
    }
    else{
      Toast.show({
        text: "Select appropriate page size ",
        duration: 2000,
        type: 'warning'
      })
    }
  }


validateForm = () =>{
  if(this.state.fileName ){
      this.setState({ disable: false})
  }else{
    this.setState({ disable: true})
  }
}


_handleFileName =old=>{
  if (old.length>=0 && old.length <= 30 ){
    this.setState({
      fileName: old,
      errorText : ""
      }, this.validateForm)
  }else{
    this.setState({
      errorText : "Please input valid Name"
    })
  }
}

onValueChange2(value: string) {
    this.setState({
      pageSize: value
    });
}

  
  render() {
    return (
      <Container>
        <Content style={{ padding : 10}}>
        <Text style={{color: 'red'}}>{this.state.errorText}</Text>

          <Item>
            <Icon active name='md-folder' />
            <Input placeholder='File Name'
              onChangeText={this._handleFileName}
              value={this.state.fileName}
            />
          </Item>

          <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select Quantity per Page"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.pageSize}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Select Quantity per Page" value="Select Quantity per Page" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="40" value="40" />
              </Picker>
            </Item>

          <View style={{ paddingTop : 20, color: 'blue' }}>
            <Button
              onPress={this._activate}
              title="Print"
              color="#4169E1"
              accessibilityLabel="Print"
              disabled= {this.state.disable}
            />
          </View>

          <ProgressDialog
              title="Processing..."
              activityIndicatorColor="blue"
              activityIndicatorSize="large"
              animationType="slide"
              message="Please, wait..."
              visible={ this.state.showProgress }
          />

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.licence.token,
  account: state.account.account,
  variable: state.vending.vending,
  cpToken: state.cpLicence.token,
  subCpToken: state.subCpLicence.token,
  retailerToken: state.retailerLicence.token
})

export default connect(mapStateToProps, {accountAction, vending, licence,  cpLicence, subCpLicence, retailerLicence})(PrintScreen)
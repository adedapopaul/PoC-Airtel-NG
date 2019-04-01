export const validateForm = () =>{
  if(this.state.phoneNumber && this.state.password && this.state.amount && this.state.quantity ){
    this.setState({ disable: false})
  }else{
    this.setState({ disable: true})
  }
}

export const _handlePhoneNumber =phoneNumber=>{
  if (+phoneNumber>=0 && phoneNumber.length <= 15 ){
    this.setState({
      phoneNumber,
      errorText : ""
      }, this.validateForm)
  }else{
    this.setState({
      errorText : "Phone Number can't be empty or more than 15 digits"
    })
  }
}


export const _handlePassword =password=>{
  if (+password>=0 && password.length <= 8){
    this.setState({
      password,
      errorText : ""
    }, this.validateForm)
  }else{
    this.setState({
      errorText : "Password can't be empty or more than 8 digits"
    })
  }
}

export const _handleAmount =amount=>{
  if (+amount>=0  && amount.length <= 5 ){
    this.setState({
      amount,
      errorText : ""
    }, this.validateForm)
  }else{
  this.setState({
      errorText : "Amount can't be empty or more than 5 digits"
    })
  }
}


export const _handleQuantity =quantity=>{
  if (+quantity >=0  && quantity.length<= 10){
    this.setState({
      quantity,
      errorText : ""
      }, this.validateForm)
  }else{
    this.setState({
      errorText : "Quantity can't be empty or more than 10 digits"
    })
  }
}
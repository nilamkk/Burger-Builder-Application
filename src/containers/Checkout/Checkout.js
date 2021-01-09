import React,{Component} from 'react'
import {Route} from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckSummary/CheckoutSummary'
import ContactData from '../Checkout/ContactData/ContactData'

class Checkout extends Component{
    state={
        ingredients:null,
        totalPrice:0
    }

    componentWillMount(){
        const query= new URLSearchParams(this.props.location.search)
        const ingredients={}
        let price
        for(let param of query.entries()){
            if(param[0]==='price'){
                price=param[1]
            }else{
                ingredients[param[0]]=+param[1]
            }

        }
        this.setState({
            ingredients:ingredients,
            totalPrice:price})
    }

    continueCheckout=()=>{
        // console.log("HHHHHHOOOLA")
        // console.log(this.props)
        this.props.history.replace("/checkout/contact-data")
    }
    cancelCheckout=()=>{
        // console.log("HHHHHHOO/OLA")
        // console.log(this.props)
        this.props.history.goBack()
    }

    render(){
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    totalPrice={this.state.totalPrice}
                    confirmCheckout={this.continueCheckout}
                    cancelCheckout={this.cancelCheckout}/>
                <Route 
                    path={this.props.match.path+'/contact-data'}
                    render={(props)=><ContactData 
                                            ingredients={this.state.ingredients} 
                                            {...props}
                                            totalPrice={this.state.totalPrice}/>}/>
                    {/* using render function here restricts us from using ptops.history 
                    in the rendered object here: ContactData. 
                    So we are passing props*/}
            </div>
        )
    }

}

export default Checkout;
import React,{Component} from 'react'
import {Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckSummary/CheckoutSummary'
import ContactData from '../Checkout/ContactData/ContactData'

class Checkout extends Component{
    continueCheckout=()=>{
        this.props.history.replace("/checkout/contact-data")
    }
    cancelCheckout=()=>{
        this.props.history.goBack()
    }

    render(){
        let summary=<Redirect to="/" />
        if(this.props.ings){
            const purchasedRedirected=this.props.purchased?<Redirect to="/"/> :null
            summary=(
                <div>
                    {/* so that if purchasing is done, we can be redirected to the original page */}
                    {purchasedRedirected}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        totalPrice={this.props.price}
                        confirmCheckout={this.continueCheckout}
                        cancelCheckout={this.cancelCheckout}/>
                    <Route 
                        path={this.props.match.path+'/contact-data'}
                        component={ContactData}/>
                </div>
            )
        }
        return summary
    }

}

const mapStateToProps= state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        purchased:state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);
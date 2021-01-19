import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import {connect} from 'react-redux'
import * as actionCreators from '../../store/actions/index'


class BurgerBuilder extends Component{
    state={
        purchasing:false
    }
    componentDidMount(){
       this.props.onIngredientInit() 
    }
    updatePurchasable=(ingredients)=>{
        const sum=Object.keys(ingredients)
                .map((ing)=>{
                    return ingredients[ing]
                })
                .reduce((acc,ele)=>{
                    return acc+ele
                },0)
            
        return sum>0
            
    }
    // updateTotalCost=(ingredients)=>{        // self written
    //     const totalPrice=Object.keys(ingredients)
    //             .map((ing)=>{
    //                 return ingredients[ing]*prices[ing]
    //             })
    //             .reduce((acc,ele)=>{
    //                 return acc+ele
    //             })
    //     this.setState({totalPrice:totalPrice+2})
    // }
    purchaseHandler=()=>{
        if(this.props.isAuthenticated){
            this.setState({purchasing:true})   
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('./auth')
        }
    }
    cancelPurchaseHandler=()=>{
        this.setState({purchasing:false})   
    }
    finalPurchase= ()=>{
        this.props.onInitPurchase()
        this.props.history.push("/checkout")        
    }
    render(){
        const disabledInfo={
            ...this.props.ings
        }

        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key]<=0
        }

        let burger=this.props.error?<p>The ingredients cant be loaded</p>:<Spinner/>
        let orderSummary=null

        if(this.props.ings){
            burger=(
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        addIngredients={this.props.onIngredientAdded}
                        removeIngredients={this.props.onIngredientRemoved} 
                        disabled={disabledInfo}
                        totalPrice={this.props.price}
                        purchasable={this.updatePurchasable(this.props.ings)}
                        isAuth={this.props.isAuthenticated}
                        purchaseHandler={this.purchaseHandler}/>
                </Aux>
            )
            orderSummary=(
                <OrderSummary 
                    ingredients={this.props.ings}
                    totalPrice={this.props.price}
                    cancelOrder={this.cancelPurchaseHandler}
                    finalOrder={this.finalPurchase}/>               
            )
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modelRemoved={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                { burger }
            </Aux>
        );
    }
}

const mapStateToProps= state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token!==null
    }
}
const mapDispatchToProps= dispatch=>{
    return{
        onIngredientAdded: (ingName)=>dispatch(actionCreators.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=>dispatch(actionCreators.removeIngredient(ingName)),
        onIngredientInit: ()=> dispatch(actionCreators.initIngredient() ),
        onInitPurchase: ()=> dispatch(actionCreators.purchaseInit()),
        onSetAuthRedirectPath:(path)=> dispatch(actionCreators.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios))

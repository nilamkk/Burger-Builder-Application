import React, {Component} from 'react'

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const prices={
    meat:10,
    salad:3,
    cheese:7,
    bacon:5
}


class BurgerBuilder extends Component{
    state={
        ingredients:{
            meat:0,
            salad:0,
            cheese:0,
            bacon:0
        },
        totalPrice:2,
        purchasable:false,
        purchasing:false
    }

    addIngredientHandler=(type)=>{
        const oldQuantity=this.state.ingredients[type]
        const newQuantity=oldQuantity+1;

        const newIngredients={...this.state.ingredients}
        newIngredients[type]=newQuantity

        const oldPrice=this.state.totalPrice
        const newPrice=oldPrice+prices[type]
        this.setState({
            ingredients:newIngredients,
            totalPrice:newPrice
        })
        this.updatePurchasable(newIngredients)
    }
    removeIngredientHandler=(type)=>{
        const oldQuantity=this.state.ingredients[type]
        const newQuantity=oldQuantity-1;

        const newIngredients={...this.state.ingredients}
        newIngredients[type]=newQuantity

        const oldPrice=this.state.totalPrice
        const newPrice=oldPrice-prices[type]
        this.setState({
            ingredients:newIngredients,
            totalPrice:newPrice
        })
        this.updatePurchasable(newIngredients)
    }
    updatePurchasable=(ingredients)=>{
        const sum=Object.keys(ingredients)
                .map((ing)=>{
                    return ingredients[ing]
                })
                .reduce((acc,ele)=>{
                    return acc+ele
                },0)
            
            this.setState({purchasable: sum>0 })
            
    }
    purchaseHandler=()=>{
        this.setState({purchasing:true})   
    }
    cancelPurchaseHandler=()=>{
        this.setState({purchasing:false})   
    }
    finalPurchase=()=>{
        alert('You continued!!')
    }



    render(){
        const disabledInfo={
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key]<=0
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modelRemoved={this.cancelPurchaseHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        totalPrice={this.state.totalPrice}
                        cancelOrder={this.cancelPurchaseHandler}
                        finalOrder={this.finalPurchase}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    addIngredients={this.addIngredientHandler}
                    removeIngredients={this.removeIngredientHandler} 
                    disabled={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchaseHandler={this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;
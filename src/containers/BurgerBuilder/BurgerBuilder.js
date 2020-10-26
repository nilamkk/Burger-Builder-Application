import React, {Component} from 'react'

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

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
        totalPrice:0
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
    }


    render(){
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls addIngredients={this.addIngredientHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;
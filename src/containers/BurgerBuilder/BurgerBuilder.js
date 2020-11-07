import React, {Component} from 'react'

import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

const prices={
    meat:10,
    salad:3,
    cheese:7,
    bacon:5
}


class BurgerBuilder extends Component{
    state={
        ingredients:null,
        totalPrice:2,
        purchasable:false,
        purchasing:false,
        loading:false,
        error: false
    }
     componentDidMount(){
        // const res=await axios.get('/ingredients')
        // this.setState({ingredients:res.data})
        axios.get('https://react-burger-builder-ca1c0.firebaseio.com/ingredients.json').then(res=>{
            // prices  ingredients
            this.updateTotalCost(res.data)
            this.updatePurchasable(res.data)
            this.setState({ingredients:res.data})
        }).catch(e=>{
            this.setState({error:true})
        })
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
    updateTotalCost=(ingredients)=>{        // self written
        const totalPrice=Object.keys(ingredients)
                .map((ing)=>{
                    return ingredients[ing]*prices[ing]
                })
                .reduce((acc,ele)=>{
                    return acc+ele
                })
        this.setState({totalPrice:totalPrice+2})
    }
    purchaseHandler=()=>{
        this.setState({purchasing:true})   
    }
    cancelPurchaseHandler=()=>{
        this.setState({purchasing:false})   
    }
     finalPurchase=async ()=>{
        this.setState({loading:true})
        const orders={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name:'NKK',
                address:{
                    street:'Poly Road',
                    country:'India'
                },
                email:'nkk@gmail.com'
            },
            deliveryMethod:'fast'
        }

        try{
            this.setState({loading:false,purchasing:false})
            const response=await axios.post('/orders.json',orders)                // json required for only FIREBASE
            console.log(response)

        }catch(e){
            this.setState({loading:false,purchasing:false})
            console.log(e)
        }
    }



    render(){
        const disabledInfo={
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key]<=0
        }

        let burger=this.state.error?<p>The ingredients cant be loaded</p>:<Spinner/>
        let orderSummary=null

        if(this.state.ingredients){
            burger=(
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                    addIngredients={this.addIngredientHandler}
                    removeIngredients={this.removeIngredientHandler} 
                    disabled={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchaseHandler={this.purchaseHandler}/>
                </Aux>
            )
            orderSummary=(
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    totalPrice={this.state.totalPrice}
                    cancelOrder={this.cancelPurchaseHandler}
                    finalOrder={this.finalPurchase}/>
            )
        }

        if(this.state.loading){
            orderSummary=<Spinner/>
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

export default withErrorHandler(BurgerBuilder,axios);
import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility'

const initialState= {
    ingredients:null,
    totalPrice:0,
    error:false,
    building:false
}

const prices={
    meat:10,
    salad:3,
    cheese:7,
    bacon:5
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                totalPrice:state.totalPrice+prices[action.ingredientName],
                building:true
            }
            
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice-prices[action.ingredientName],
                building:true
            }

        case actionTypes.SET_INGREDIENT:
            const updatedIngState=updateObject(state,{
                ingredients:action.ingredients,
                building:false
            })     //assuming:    action.ingredients==ingredients
            let tPrice=0
            for(let i in prices ){
                tPrice=tPrice+prices[i]*updatedIngState.ingredients[i]
            }
            updatedIngState.totalPrice=tPrice
            updatedIngState.error=false
            return updatedIngState

        case actionTypes.FETCH_INGREDIENT_FAILED:
            return updateObject(state,{error:true})

        default: return state;
    }
}

export default reducer;
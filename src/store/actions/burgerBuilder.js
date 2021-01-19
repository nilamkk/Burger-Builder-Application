import * as actionTypes from '../actions/actionTypes'
import axios from '../../axios-orders'

export const addIngredient=(name)=>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    }
}

export const removeIngredient=(name)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
}

export const fetchIngredientFailed=()=>{
    return{
        type:actionTypes.FETCH_INGREDIENT_FAILED
    }
}

export const setIngredient=(ingr)=>{
    return{
        type:actionTypes.SET_INGREDIENT,
        ingredients:ingr
    }
}

export const initIngredient=()=>{
    return dispatch=>{
        axios.get('https://react-burger-builder-ca1c0.firebaseio.com/ingredients.json').then(res=>{
            dispatch(setIngredient(res.data))
        }).catch(e=>{
            dispatch(fetchIngredientFailed())
        })
    }
}
import React from 'react'

import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'


const orderSummary=props=>{

    const ingredientSummary=Object.keys(props.ingredients)
                            .map((ele)=>{
                            return <li key={ele}>
                                        <span style={{textTransform:'capitalize'}}>{ele}</span>: {props.ingredients[ele]}
                                    </li>
                            }) 

    return(
        <Aux>
            <h3>Your Order</h3>
            <p>Your order includes:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {props.totalPrice} </strong></p>
            <Button clicked={props.finalOrder} btnType="Success" >Continue</Button>
            <Button clicked={props.cancelOrder} btnType="Danger" >Cancel</Button>
            
        </Aux>
    );
}

export default orderSummary;
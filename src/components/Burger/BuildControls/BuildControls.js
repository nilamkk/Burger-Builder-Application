import React from 'react';

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'


const buildControls=props=>{

    const bCs=[
        {label:"Meat",type:"meat"},
        {label:"Salad",type:"salad"},
        {label:"Bacon",type:"bacon"},
        {label:"Cheese",type:"cheese"}
    ];

    return (
        <div className={classes.BuildControls}>
            <p>Total price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            {bCs.map(cntrl=>{
                return <BuildControl 
                            key={cntrl.label} label={cntrl.label} 
                            added={()=>props.addIngredients(cntrl.type)} 
                            removed={()=>{props.removeIngredients(cntrl.type)}}
                            disabled={props.disabled[cntrl.type]}/>
            })}
            <button 
                className={classes.OrderButton}
                disabled={ !props.purchasable}
                onClick={props.purchaseHandler}>{props.isAuth?'ORDER NOW':'Signup to order'}</button>
        </div>
    );
}

export default buildControls;
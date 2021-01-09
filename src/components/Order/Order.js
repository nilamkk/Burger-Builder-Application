import React from 'react'

import classes from './Order.css'


const Order=(props)=>{

    const ingredientsObj={
        ...props.ingredients
    }
    const ingredientsArray= Object.keys(ingredientsObj)
                            .map((ing)=>{
                            return <span key={ing}
                                    style={
                                        {
                                            textTransform:'capitalize',
                                            display:'inline-block',
                                            margin:'0 8px',
                                            border:'1px solid #ccc',
                                            padding:'5px'
                                        }
                                    }
                                    > {ing}({ingredientsObj[ing]})</span>
                            })

    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsArray} </p>
        
            <p>Price: <strong>{props.price}</strong></p>
        </div>
    )
    
}


export default Order;
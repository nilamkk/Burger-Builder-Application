import React from 'react';

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'


const burger=props=>{

    let transformedIngredients=Object.keys(props.ingredients)     // Map e kaam kora mojja concept palu yaat
    .map(keyName=>{
        return [...Array(props.ingredients[keyName])].map((_,i)=>{
            return <BurgerIngredient key={keyName+i} type= {keyName} />
        });
    })
    .reduce((accu,ele)=>{
        return accu.concat(ele)
    },[]);
    if(transformedIngredients.length===0){
        transformedIngredients=<p>Please insert ingredients!!!</p>
    }
        

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
}


export default burger;

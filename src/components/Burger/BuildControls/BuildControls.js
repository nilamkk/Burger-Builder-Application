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
            {bCs.map(cntrl=>{
                return <BuildControl key={cntrl.label} label={cntrl.label} added={()=>props.addIngredients(cntrl.type)} />
            })}
        </div>
    );
}

export default buildControls;
import React from 'react';

import classes from './Button.css'

const button=props=>{
    let bttnClass=[classes.Button, classes[props.btnType] ]

    if(props.disabled){
        bttnClass.push(classes.Disabled)
    }
    
    return(
    <button 
        className={bttnClass.join(' ')}      ////  IMPPPPPPPPP join :(
        onClick={props.clicked}
        disabled={props.disabled}>
       {props.children} 
    </button>

    );
}

export default button;
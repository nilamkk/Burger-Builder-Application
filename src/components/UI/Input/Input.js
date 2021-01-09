import React from 'react'

import classes from './Input.css'

const input=props=>{

    let inputElement=null

    let inputClasses=[classes.InputElement]

    if(props.shouldValidate && props.touched &&  !props.valid  ){
        inputClasses.push(classes.Invalid)
    }

    switch(props.elementType){
        case('input'):
            inputElement=<input 
                            {...props.elementConfig}
                            onChange={props.changed}
                            value={props.value} 
                            className={inputClasses.join(' ')}/>
            break
        case('textarea'):
            inputElement=<textarea 
                            {...props.elementConfig}
                            onChange={props.changed} 
                            className={inputClasses.join(' ')}/>
            break
        case('select'):
            inputElement=(
                <select 
                    className={inputClasses.join(' ')}
                    onChange={props.changed}>
                    {props.elementConfig.options.map((option)=>{
                        return <option
                                    key={option.value} 
                                    value={option.value}>{option.displayValue}</option>
                    })}
                </select>
            )
            break;
        default:
            inputElement=<input 
                            {...props.elementConfig} 
                            onChange={props.changed}
                            value={props.value} 
                            className={inputClasses.join(' ')}/> 
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )

}

export default input
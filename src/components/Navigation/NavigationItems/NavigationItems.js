import React from 'react'

import classes from './NavigationItems.css'
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'

const navigationItems=(props)=>{
    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/"  >Burger builder</NavigationItem>
            {props.isAuthenticated?<NavigationItem link="/orders">Orders</NavigationItem>:null}            
            {props.isAuthenticated
                ?(<NavigationItem link="/logout">Logout</NavigationItem>)
                :(<NavigationItem link="/auth">Sign up</NavigationItem>)
            }
            
        </ul>
    ); 
}



export default navigationItems;
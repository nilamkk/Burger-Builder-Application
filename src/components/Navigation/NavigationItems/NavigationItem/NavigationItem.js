import React from 'react'

import {NavLink} from 'react-router-dom'

import classes from './NavigationItem.css'

const navigationItem=(props)=>(
    <li className={classes.NavigationItem}>
        <NavLink 
            to={props.link} exact
            activeClassName={classes.active}>       
            {props.children}
        </NavLink>
        
    </li>
);

export default navigationItem;

// Active link is decided by comparing current link to the link of the NavLink.
// Even if the current link is present as a prefix in the NavLink it will be active link.
// So is the requirement of "exact".

// active class is written as a.active   WHY??
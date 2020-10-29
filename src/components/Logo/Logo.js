import React from 'react'

import classes from './Logo.css'
import imageSrc from '../../assets/images/burger-logo.png'

const logo=props=>(
    <div className={classes.Logo}>
        <img src={imageSrc} alt="My Burger"/>
    </div>
);

export default logo;

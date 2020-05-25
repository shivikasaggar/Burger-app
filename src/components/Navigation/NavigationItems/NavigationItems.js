import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from '../Navigationitem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact >Burger Builder </NavigationItem>
        <NavigationItem link="/order">Order </NavigationItem>
        <NavigationItem link="/auth">SIGNIN </NavigationItem>
    </ul>
    );
export default navigationItems;
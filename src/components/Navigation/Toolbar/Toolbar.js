import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Layout/Logo/Logo'; 
import NavigationItems from '../NavigationItems/NavigationItems';
import Toggler from '../SideDrawer/Toggler/Toggler';
const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Toggler clicked={props.drawerTogglerClicked}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
    );
export default toolbar;

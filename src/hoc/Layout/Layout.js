import React,{Component} from 'react'
 
import Aux from '../Auxiliary/Auxiliary'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/ToolBar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component{
    state={
        showSideDrawer:false
    }

    showSideDrawerHandler=()=>{
        this.setState({
            showSideDrawer:false
        })
    }

    sideDrawerToggle=()=>{
        this.setState(prev=>{
            return {showSideDrawer:!prev.showSideDrawer}
        })
    }

    
    
    
    render(){
        return(
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggle}/>
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.showSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}
        



export default Layout;
 

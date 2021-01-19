import React,{Component} from 'react'
import {connect} from 'react-redux'
 
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
                <Toolbar 
                    drawerToggleClicked={this.sideDrawerToggle}
                    isAuthenticated={this.props.isAuthenticated}/>
                <SideDrawer 
                    isAuthenticated={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} 
                    closed={this.showSideDrawerHandler}/>       {/* Skipped for the time being */}
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}
        

const mapStateToProps= state=>{
    return{
        isAuthenticated: state.auth.token!==null
    }
}

export default connect(mapStateToProps)(Layout);
 

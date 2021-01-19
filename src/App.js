import React ,{Component}from 'react';
import {Redirect, Route,Switch,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Orders from './containers/Orders/Orders'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'
import asyncComponent from './hoc/asyncComponent/asynchronousImporter'

const AsyncComponentAuth=asyncComponent(()=>{
    return import('./containers/Auth/Auth')
})
const AsyncComponentCheckout=asyncComponent(()=>{
    return import('./containers/Checkout/Checkout')
})

class App extends Component{

    componentDidMount(){
        this.props.onTryAutoSignup()
    }

    render(){
        let routes=(
            <Switch>
                <Route path="/auth"  component={AsyncComponentAuth}/>
                <Route path="/"  component={BurgerBuilder}/>
                <Redirect to='/'/>
            </Switch>
        )
        if(this.props.isAuthenticated){
            routes=(
                <Switch>
                    <Route path="/orders" component={Orders}/>
                    <Route path="/checkout" component={AsyncComponentCheckout}/>
                    <Route path="/auth"  component={AsyncComponentAuth}/>
                    <Route path="/logout"  component={Logout}/>
                    <Route path="/"  component={BurgerBuilder}/>
                    <Redirect to='/'/>
                </Switch>
            )
        }

        return(
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps= state=>{
    return{
        isAuthenticated: state.auth.token!==null
    }
}

const mapDispatchToProps= dispatch=>{
    return {
        onTryAutoSignup:()=> dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));







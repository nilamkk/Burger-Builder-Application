import React,{Component} from 'react'
import {connect} from 'react-redux'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'

class Orders extends Component{
    componentDidMount(){
        this.props.onFetchOrders(this.props.token,this.props.userId)
    }
    
    render(){
        let orders=<p style={{textAlign:'center'}} >LOADING...</p>
        if(!this.props.loading){
            orders=this.props.orders.map((order,index)=>{
                return <Order 
                            key={order.id+index}
                            ingredients={order.ingredients}
                            price={order.price}/>
            })
            if(this.props.orders.length===0){
                orders=<p style={{color:'#999',textAlign:'center',marginTop:'40%'}}> No order found </p>
            }
        }
        return(
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps=state=>{
    return{
        orders:state.order.orders,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onFetchOrders:(token,userId)=>dispatch(actions.fetchOrder(token,userId))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios)) ;
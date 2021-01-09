import React,{Component} from 'react'

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component{

    state={
        orders:[],
        loading:true
    }

    async componentDidMount(){
        try{
            const response=await axios.get('/orders.json')
            // console.log(response)
            const fetchData=[]

            for(let key in response.data ){
                fetchData.push({
                    ...response.data[key],
                    id:key
                })
            }
            this.setState({
                orders:fetchData,
                loading:false
            })

        }catch(e){
            this.setState({loading:false})
            console.log(e)
        }        
    }

    render(){
        let orders=<p style={{'text-align':'center'}} >LOADING...</p>

        if(!this.state.loading){
            orders=this.state.orders.map((order)=>{
                return <Order 
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}/>
            })
        }
        return(
            <div>
                {orders}
            </div>
        );
    }
}


export default withErrorHandler(Orders,axios) ;
import React,{Component} from 'react'
import {connect} from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
import {checkValidity} from '../../../shared/utility'

class ContactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid: false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid: false,
                touched:false
            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP CODE'
                },
                value:'',
                validation:{
                    required:true,
                    length:6
                },
                valid: false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid: false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your mail'
                },
                value:'',
                validation:{
                    required:true
                },
                valid: false,
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value: 'fastest',displayValue:'Fastest'},
                        {value: 'cheapest',displayValue:'Cheapest'}
                    ]
                },
                value:'fastest',
                validation:{},
                valid:true
            }
        },
        isFormValid:false
    }
    orderHandler= (e)=>{
        e.preventDefault()

        const formData={}

        for(let key in this.state.orderForm){
            formData[key]=this.state.orderForm[key].value
        }

        const orders={
            ingredients:this.props.ings,
            price:this.props.price,    
            orderData:formData,
            userId:this.props.userId
        }
        this.props.onOrderBurger(orders,this.props.token)
    }
    inputChangedHandler=(event,inputIdentifier)=>{
        const updatedElement={
            ...this.state.orderForm[inputIdentifier]
        }
        updatedElement.value=event.target.value
        updatedElement.touched=true
        updatedElement.valid=checkValidity(updatedElement.value,updatedElement.validation)
        const updatedOrderForm={
            ...this.state.orderForm
        }
        let isFormValid=true
        updatedOrderForm[inputIdentifier]=updatedElement
        
        for(let ele in updatedOrderForm){
            isFormValid=isFormValid && updatedOrderForm[ele].valid
        }
        this.setState({
                        orderForm:updatedOrderForm,
                        isFormValid:isFormValid
                    })
    }
    
    render(){

        const formElementsArray=[]

        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }


        let form=(
            <form onSubmit={this.orderHandler}>                
                {formElementsArray.map((formElement)=>{
                    return <Input 
                                key={formElement.id}
                                changed={(event)=> this.inputChangedHandler(event,formElement.id)}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                valid={formElement.config.valid}
                                touched={formElement.config.touched}
                                shouldValidate={formElement.id!=='deliveryMethod'}
                                />
                })}
                <Button 
                    btnType="Success"
                    disabled={!this.state.isFormValid}
                    >ORDER</Button>      {/* instead of clicked handler for button we will use onSubmit */}
            </form>
        )
        if(this.props.loading){
            form=<Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4> Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps= state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onOrderBurger:(orderData,token)=> dispatch(actions.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
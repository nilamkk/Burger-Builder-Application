import React,{Component} from 'react'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

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
                value:'',
                validation:{},
                valid:true
            }
        },
        loading:false,
        isFormValid:false
    }

    orderHandler= async (e)=>{
        e.preventDefault()
        this.setState({loading:true})

        const formData={}

        for(let key in this.state.orderForm){
            formData[key]=this.state.orderForm[key].value
        }

        const orders={
            ingredients:this.props.ingredients,
            price:this.props.totalPrice,    
            orderData:formData
        }

        try{
            const response=await axios.post('/orders.json',orders)                // json required for only FIREBASE
            this.setState({loading:false})
            this.props.history.push('/')
        }catch(e){
            this.setState({loading:false})
            console.log(e)
        }
    }

    inputChangedHandler=(event,inputIdentifier)=>{
        const updatedElement={
            ...this.state.orderForm[inputIdentifier]
        }
        updatedElement.value=event.target.value
        updatedElement.touched=true
        updatedElement.valid=this.checkValidity(updatedElement.value,updatedElement.validation)
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
    checkValidity=(value,rules)=>{
        let validity=true

        if(rules.required){
            validity= value.trim()!=="" && validity
        }
        if(rules.length){
            validity=validity && value.length===rules.length
        }

        return validity
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
        if(this.state.loading){
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

export default ContactData;
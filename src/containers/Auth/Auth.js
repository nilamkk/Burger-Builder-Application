import React,{Component} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.css'
import * as actions from '../../store/actions/index'
import {checkValidity} from '../../shared/utility'

class Auth extends Component{
    state={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'email'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid: false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'password'
                },
                value:'',
                validation:{
                    required:true,
                    minlength:6
                },
                valid: false,
                touched:false
            }
        },
        isInSignup:true
    }
    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath!==null ){
            this.props.onSetAuthRedirectPath()
        }
    }

    inputChangedHandler=(event,controlName)=>{
        const updatedControls={
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        }
        this.setState({controls:updatedControls})
    }
    submitHandler=(event)=>{
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isInSignup)
    }
    switchAuthMode=()=>{
        this.setState(prevState=>{
            return{
                isInSignup: !prevState.isInSignup
            }
        })
    }

    render(){
        
        let formArray=[]

        for(let i in this.state.controls){
            formArray.push({
                id:i,
                config:this.state.controls[i]
            })
        }

        let form=formArray.map((formElement)=>{
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
        })
        let errorMessage=null
        if(this.props.error){
            errorMessage=<p>{this.props.error.message}</p>
        }
        let authForm=<Spinner/>
        if(!this.props.loading){
            authForm=(
            <div className={classes.authContainer}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button 
                        btnType="Success">{this.state.isInSignup?'Sign up':'Sign in'}</Button>
                </form>
                    <Button
                        clicked={this.switchAuthMode} 
                        btnType="Success">Switch to {this.state.isInSignup?'Sign in':'Sign up'}</Button>
            </div>)
        }
        if(this.props.isAuthenticated){
            authForm=<Redirect to={this.props.authRedirectPath} />
        }
        return authForm
    }
}

const mapStateToProps=state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token!==null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password,isInSignup)=>dispatch(actions.auth(email,password,isInSignup)),
        onSetAuthRedirectPath:()=> dispatch(actions.setAuthRedirectPath('/'))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Auth)
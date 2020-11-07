import React, {Component} from 'react'

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxiliary/Auxiliary'

//////////////////////////////////////////start from here

const withErrorHandler=(WrappedComponent,axios)=>{


    return class extends Component{
        
        state={
            error:null
        }
        componentWillMount(){
            this.requestInterceptors=axios.interceptors.request.use(req=>{       // need to study more about interceptors
                this.setState({error:null});
                return req
            })
            this.responseInterceptors=axios.interceptors.response.use(req=>req,error=>{
                this.setState({error:error})
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptors)
            axios.interceptors.request.eject(this.responseInterceptors)
        }

        errorConfirmedHandler=()=>{
            this.setState({error:null})
        }

        render(){
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modelRemoved={this.errorConfirmedHandler}>
                            {this.state.error?this.state.error.message:null}
                    </Modal>

                    <WrappedComponent {...this.props}/>     

                </Aux>
            );
        }



    }

}

export default withErrorHandler;
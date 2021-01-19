import axios from 'axios'
import * as actionTypes from './actionTypes'

export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess=(token,id)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:id
    }
}

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout=(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout())
        },expirationTime)
    }
}

export const auth=(email,password,isInSignup)=>{
    return dispatch=>{
        dispatch(authStart())
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKACleLzI8La8lXXEpApPh_lozRg9OuHE'
        if(!isInSignup){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKACleLzI8La8lXXEpApPh_lozRg9OuHE'
        }
        axios.post(url,authData )
            .then(res=>{
                const expirationDate= (new Date().getTime()) + res.data.expiresIn*1000

                localStorage.setItem('token',res.data.idToken)
                localStorage.setItem('expirationDate',expirationDate)
                localStorage.setItem('userId',res.data.localId)
                dispatch(authSuccess(res.data.idToken,res.data.localId))
                dispatch(checkAuthTimeout(res.data.expiresIn*1000))
            })
            .catch(err=>{
                dispatch(authFail(err.response.data.error))
            })
    }
}

export const setAuthRedirectPath=(path)=>{
    return{
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState=()=>{
    return dispatch=>{
        const token=localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }else{
            const expirationDate=+localStorage.getItem('expirationDate')// in mili seconds
            if(expirationDate>new Date().getTime()){
                const userId=localStorage.getItem('userId')
                dispatch(authSuccess(token,userId))
                dispatch(checkAuthTimeout(expirationDate-new Date().getTime()))
            }else{
                dispatch(logout())
            }
        }
    }
}
import axios from 'axios'
import {AUTH_SUCCESS, AUTH_LOGOUT} from './actionTypes'

const FIREBASE_API_KEY = 'AIzaSyBxcXdCDeiwzcQbOe99Ul5KlVDrnXQ2jQY'
const FIREBASE_SINEUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
const FIREBASE_SINEIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='

export function auth(email, password, isLogin) {
  return async (dispatch) => {
    const authConfig = {
      email,
      password,
      returnSecureToken: true
    }

    let url = `${FIREBASE_SINEUP_URL}${FIREBASE_API_KEY}`
  
    if (isLogin) {
      url = `${FIREBASE_SINEIN_URL}${FIREBASE_API_KEY}`
    }

    const response = await axios.post(url, authConfig)
    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)

    localStorage.setItem('token', response.data.idToken)
    localStorage.setItem('userId', response.data.localId)
    localStorage.setItem('expirationDate', expirationDate)

    dispatch(authSuccess(response.data.idToken))
    dispatch(autoLogout(response.data.expiresIn))
  }
}

function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem('token')
  
    if(!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))

      if(expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}

function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}
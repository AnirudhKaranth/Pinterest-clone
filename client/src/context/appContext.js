import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from 'axios';
import {
    CLEAR_ALERT,
    SHOW_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER,
    GET_PINS_BEGIN,
    GET_PINS_SUCCESS,
    GET_PINS_ERROR,
    SUCCESS,
    ERROR,
    BEGIN,
    UPDATE_USER_SUCCESS,
    GET_SINGLE_PIN_SUCCESS,
    ADD_COMMENT__SUCCESS,
    SAVE_PIN_SUCCESS,
    PIN_CREATOR_SUCCESS

} from "./actions";

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const user_id = localStorage.getItem('user_id')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertMsg: "",
    alertColor: "",
    user: user ? JSON.parse(user) : null,
    token: token,
    user_id: user_id,
    currentPerson:{},
    pinCreator:{},
    pins: [],
    pin: {},
    comments:[]
}
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const authFetch = axios.create({
        baseURL: 'http://localhost:5000',

    })

    const displayAlert = (msg, stCode) => {
        dispatch({
            type: SHOW_ALERT,
            payload: { msg, stCode }
        })
        clearAlert()
    }

    const clearAlert = () => {
        
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 2000);
    }

    const addUserToLocalStorage = ({ user, token, user_id }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('user_id', user_id)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('location')
    }
    //===================REGISTER USER===============================//

    const signUp = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const response = await authFetch.post('/auth/signup', currentUser);

            const { User, token } = response.data;
            const user = User.name
            const user_id = User._id
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: { user, token, user_id }
            })
            addUserToLocalStorage({ user, token, user_id })
            displayAlert("Signed up successfully!", "success")
        } catch (error) {
            displayAlert(error.response.data, "danger")
            dispatch({
                type: REGISTER_USER_ERROR,
            })
        }
        clearAlert();
    }

    //===================LOGIN USER===============================//

    const login = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
      
            const response = await authFetch.post('/auth/login', currentUser)
       
            const { User, token } = response?.data;
            const user = User.name
            const user_id = User._id

            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { user, token, user_id }
            })
            addUserToLocalStorage({ user, token, user_id })
            displayAlert("Logged in successfully!", "success")
            
        } catch (error) {
            displayAlert(error.response.data, "danger")
            dispatch({
                type: LOGIN_USER_ERROR,

            })
        }
        clearAlert()
    }


    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserFromLocalStorage()
    }
    //====================================================================================//

    const updateUser =async (updatedUser)=>{
        dispatch({type: BEGIN})
        try {
            const response = await authFetch.patch('/auth/updateuser', updatedUser, {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            })
            const {User} = response.data
           
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: {User}
            })
            displayAlert("Updated successfully", "success")
        } catch (error) {
            dispatch({type: ERROR})
        }
    }
    
    const getCurrentUser = async()=>{
        dispatch({type: BEGIN})
        try {
            const response = await authFetch.get('/auth/getuser', {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            })
            const {User} = response.data
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: {User}
            })
            
        } catch (error) {
            dispatch({type: ERROR})
            
        }
    }

    const getPinCreator = async(id)=>{
        dispatch({type: BEGIN})
        try {
            const response = await authFetch.get(`/auth/getpinCreator/${id}`)
            const {User} = response.data
            dispatch({
                type: PIN_CREATOR_SUCCESS,
                payload: {User}
            })
            
        } catch (error) {
            dispatch({type: ERROR})
            
        }
    }

    const createPin = async (Pin) => {
        dispatch({ type: BEGIN })
        try {
            const response = await authFetch.post('/pin/createPin', Pin, {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            })
            dispatch({ type: SUCCESS })
            displayAlert("Pin created successfully", "success")
            return true
        } catch (error) {
            dispatch({ type: ERROR })
            displayAlert(error.response.data, "danger")
            return false
        }
    }

    const getAllPins = async (search) => {
        dispatch({ type: GET_PINS_BEGIN })
        try {
            if (search) {
                const response = await authFetch.get(`/pin/getAllPins?search=${search}`)
                const { Pins } = response.data
                dispatch({
                    type: GET_PINS_SUCCESS,
                    payload: { Pins }
                })
            }
            else {
                const response = await authFetch.get('/pin/getAllPins?search=all')
                const { Pins } = response.data
                
                dispatch({
                    type: GET_PINS_SUCCESS,
                    payload: { Pins }
                })
            }
        } catch (error) {
            dispatch({ type: GET_PINS_ERROR })
        }
    }

    const getPinDetails = async(id) =>{
        dispatch({type: BEGIN})
        try {
            const response = await authFetch.get(`/pin/getPinDetails/${id}`,{
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            });
            const { Pin} = response.data
            dispatch({
                type:GET_SINGLE_PIN_SUCCESS,
                payload: {Pin}
            })            
        } catch (error) {
            dispatch({type: ERROR})
        }
    }

    const saveThePin = async (id) => {
   
        try {
            const response = await authFetch.patch('/pin/savePin', id, {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            })
            const { savedPin, Pins } = response.data
            dispatch({
                type: SAVE_PIN_SUCCESS,
                payload: {savedPin, Pins}

            })
        } catch (error) {
           
            dispatch({ type: ERROR })
        }
    }

    const DeletePin = async (id) => {
        dispatch({ type: BEGIN })
        try {
            const response = await authFetch.delete(`/pin/deletePin/${id}`, {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            })
            const { Pins } = response.data
                dispatch({
                    type: GET_PINS_SUCCESS,
                    payload: { Pins }
                })
            displayAlert("Pin deleted successfully", "success")
        } catch (error) {
           
            dispatch({ type: ERROR })
        }
    }

    const AddComment = async (comment, id) => {
        try {
            const response = await authFetch.patch(`/pin/comment/${id}`, comment, {
                headers:{
                    'Authorization': `Bearer ${state.token}`
                }
            })
            const {commentedPin} = response.data
            
            dispatch({
                type: ADD_COMMENT__SUCCESS,
                payload: {commentedPin}
            })
        } catch (error) {
            
            dispatch({type:ERROR})
        }
    }

    const DeleteComment = async (id, cId)=>{
        try {
            const response = await authFetch.delete(`/pin/deleteComment/${id}?cId=${cId}`, {
                headers:{
                    'Authorization': `Bearer ${state.token}`
                }
            })
            const {commentedPin} = response.data
            dispatch({
                type: ADD_COMMENT__SUCCESS,
                payload: {commentedPin}
            })
        } catch (error) {
            dispatch({type: ERROR})
        }
    }

    const deleteUser = async(password)=>{
        try {
            const response = await authFetch.delete(`/auth//deleteuser/${password}`,{
                headers:{
                    'Authorization': `Bearer ${state.token}`
                }
            })
            const {message} = response.data
            displayAlert(message, "success")
            dispatch({ type: LOGOUT_USER })
            removeUserFromLocalStorage()
        } catch (error) {
            displayAlert(error.response.data)
        }
    }

    return <AppContext.Provider
        value={{
            ...state,
            signUp,
            login,
            logoutUser,
            updateUser,
            getPinCreator,
            displayAlert,
            saveThePin,
            getAllPins,
            DeletePin,
            createPin,
            getCurrentUser,
            getPinDetails,
            AddComment,
            DeleteComment,
            deleteUser
        }}
    >
        {children}
    </AppContext.Provider>
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
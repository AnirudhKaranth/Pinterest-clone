import {
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER,
    SHOW_ALERT,
    HANDLE_CHANGE,
    GET_PINS_BEGIN,
    GET_PINS_SUCCESS,
    GET_PINS_ERROR,
    BEGIN,
    SUCCESS,
    ERROR,
    UPDATE_USER_SUCCESS,
    GET_SINGLE_PIN_SUCCESS,
    ADD_COMMENT__SUCCESS,
    SAVE_PIN_SUCCESS,
    PIN_CREATOR_SUCCESS,

} from "./actions";

import { initialState } from './appContext'

const reducer = (state, action) => {
    switch (action.type) {
        case REGISTER_USER_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                user_id: action.payload.user_id,
                token: action.payload.token,
                isLoading: false
            };
        case REGISTER_USER_ERROR:
            return {
                ...state,
                isLoading: false
            }
        case LOGIN_USER_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                user_id: action.payload.user_id,
                token: action.payload.token,
                isLoading: false
            };
        case LOGIN_USER_ERROR:
            return {
                ...state,
                isLoading: false
            }
        case LOGOUT_USER:
            return{
                ...initialState,
                user:null,
                user_id:"",
                token:null
            }
        case SHOW_ALERT:
            return {
                ...state,
                showAlert: true,
                alertMsg: action.payload.msg,
                alertColor: action.payload.stCode
            }
        case CLEAR_ALERT:
            return {
                ...state,
                showAlert: false,
                alertMsg: "",
                alertColor: ""
            }
        case UPDATE_USER_SUCCESS:{
            return{
                ...state,
                currentPerson:action.payload.User
            }
        }
        case GET_SINGLE_PIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pin:action.payload.Pin
            }
        case GET_PINS_BEGIN:
            return {
                ...state,
                isLoading: true,
            }
        case GET_PINS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                pins:action.payload.Pins
            }
        case GET_PINS_ERROR:
            return {
                ...state,
                isLoading: false,
            }
        case PIN_CREATOR_SUCCESS:
            return{
                ...state,
                pinCreator: action.payload.User
            }
        case BEGIN:
            return{
                ...state,
                isLoading:true
            }
        case SUCCESS:
            return{
                ...state,
                isLoading:false
            }
        case ERROR:
            return{
                ...state,
                isLoading:false
            }
        case ADD_COMMENT__SUCCESS:
            return{
                ...state,
                pin:action.payload.commentedPin
            }
        case SAVE_PIN_SUCCESS:
            return {
                ...state,
                pin:action.payload.savedPin,
                pins:action.payload.Pins
            }

        default:
            break;
    }
}

export default reducer
import { ORDER_PAYED,ORDER_DELIVERED,GET_ONE_ORDER,GET_USER_ORDERS,ADD_ADDRESS,GET_ADDRESS,DELETE_ADDRESS,UPDATE_ADDRESS,UPDATE_USER,UPDATE_USER_PASS } from "../type";

const inital = {
    addAddress: [],
    allAddress: [],
    deleteAddress:[],
    updateAddress:[],
    updateuser:[],
    updateUserPass:[],
    userOrders:[],
    oneOrder:[],
    orderDeliver:[],
    orderPay:[],
}

const userReducer = (state=inital,action) => {
    switch (action.type) {
        case ADD_ADDRESS:
            return {
                ...state,
                addAddress:action.payload
            }
        case GET_ADDRESS:
            return {
                ...state,
                allAddress:action.payload
            }
        case DELETE_ADDRESS:
            return {
                ...state,
                deleteAddress:action.payload
            }
        case UPDATE_ADDRESS:
            return {
                ...state,
                updateAddress:action.payload
            }
        case UPDATE_USER:
            return {
                ...state,
                updateuser:action.payload
            }
        case UPDATE_USER_PASS:
            return {
                ...state,
                updateUserPass:action.payload
            }
        case GET_USER_ORDERS:
            return {
                ...state,
                userOrders:action.payload
            }
        case GET_ONE_ORDER:
            return {
                ...state,
                oneOrder:action.payload
            }
        case ORDER_DELIVERED:
            return {
                ...state,
                orderDeliver:action.payload
            }
        case ORDER_PAYED:
            return {
                ...state,
                orderPay:action.payload
            }
        default:
            return state;
    }
}

export default userReducer;
import {CREATE_ORDER_CRAD,CREATE_CASH_ORDER,ADD_CART,GET_CART,SET_CART_QTY,DELETE_ALL_CART,DELETE_ONE_CART,ADD_COPON_TO_CART} from '../type'

const intial = {
    cart: [],
    allCart: [],
    cartQty: [],
    deleteAllCart: [],
    deleteOneCart: [],
    addCopon: [],
    createCash: [],
    createOrderCard: [],
}

const cartReducer = (state=intial,action) => {
    switch (action.type) {
        case ADD_CART:
            return {
                cart:action.payload
            }
        case GET_CART:
            return {
                allCart:action.payload
            }
        case SET_CART_QTY:
            return {
                cartQty:action.payload
            }
        case DELETE_ALL_CART:
            return {
                deleteAllCart:action.payload
            }
        case DELETE_ONE_CART:
            return {
                deleteOneCart:action.payload
            }
        case ADD_COPON_TO_CART:
            return {
                addCopon:action.payload
            }
        case CREATE_CASH_ORDER:
            return {
                createCash:action.payload
            }
        case CREATE_ORDER_CRAD:
            return {
                createOrderCard: action.payload,
            }
        default:
            return state;
    }
}

export default cartReducer;
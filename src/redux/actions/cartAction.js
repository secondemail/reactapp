import { useGetDataToken } from '../../hooks/useGetData';
import { useInsertData } from '../../hooks/useInsertData'
import { useInsUpdateData } from '../../hooks/useUpdateData';
import { CREATE_ORDER_CRAD,CREATE_CASH_ORDER,ADD_CART,GET_CART,SET_CART_QTY,DELETE_ALL_CART,DELETE_ONE_CART,ADD_COPON_TO_CART } from '../type'
import useDeleteData from './../../hooks/useDeleteData';

export const addCart = (data) => async (dispatch) => {
    try {
        const res = await useInsertData(`/api/v1/cart`, data);
        dispatch({
            type: ADD_CART,
            payload:res
        })
    } catch (e) {
        dispatch({
            type: ADD_CART,
            payload:e.response
        })
    }
}

export const getCart = () => async (dispatch) => {
    try {
        const res = await useGetDataToken(`/api/v1/cart`);
        dispatch({
            type:GET_CART,
            payload:res
        })
    } catch (e) {
        dispatch({
            type: GET_CART,
            payload:e.response
        })
    }
}

export const setCartQty = (id,data) => async (dispatch) => {
    try {
        const res = await useInsUpdateData(`/api/v1/cart/${id}`,data);
        dispatch({
            type:SET_CART_QTY,
            payload:res
        })
    } catch (e) {
        dispatch({
            type: SET_CART_QTY,
            payload:e.response
        })
    }
}

export const deleteAllCart = () => async (dispatch) => {
    try {
        const res = await useDeleteData(`/api/v1/cart`);
        dispatch({
            type:DELETE_ALL_CART,
            payload:res
        })
    } catch (e) {
        dispatch({
            type: DELETE_ALL_CART,
            payload:e.response
        })
    }
}

export const deleteOneCart = (id) => async (dispatch) => {
    try {
        const res = await useDeleteData(`/api/v1/cart/${id}`);
        dispatch({
            type:DELETE_ONE_CART,
            payload:res
        })
    } catch (e) {
        dispatch({
            type: DELETE_ONE_CART,
            payload:e.response
        })
    }
}

export const addCoponToCart = (data) => async (dispatch) => {
    try {
        const res = await useInsUpdateData(`/api/v1/cart/applyCoupon`,data);
        dispatch({
            type:ADD_COPON_TO_CART,
            payload:res
        })
    } catch (e) {
        dispatch({
            type: ADD_COPON_TO_CART,
            payload:e.response
        })
    }
}

export const createCashOrder = (id,data) => async (dispatch) => {
    try {
        const res = await useInsertData(`/api/v1/orders/${id}`,data);
        dispatch({
            type:CREATE_CASH_ORDER,
            payload:res
        })
    } catch (e) {
        dispatch({
            type: CREATE_CASH_ORDER,
            payload:e.response
        })
    }
}

export const createOrderCARD = (id, body) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/orders/checkout-session/${id}`, body);
        dispatch({
            type: CREATE_ORDER_CRAD,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: CREATE_ORDER_CRAD,
            payload: e.response,
        })
    }
}
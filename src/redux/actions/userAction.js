import { useInsertData } from '../../hooks/useInsertData'
import { useInsUpdateData } from '../../hooks/useUpdateData'
import { useGetDataToken } from '../../hooks/useGetData'
import { ORDER_PAYED,ORDER_DELIVERED,GET_ONE_ORDER,GET_USER_ORDERS,ADD_ADDRESS, GET_ADDRESS, DELETE_ADDRESS, UPDATE_ADDRESS, UPDATE_USER,UPDATE_USER_PASS } from '../type'
import useDeleteData from './../../hooks/useDeleteData';

export const addAddress = (data) => async (dispatch) => {
    try {
        const res = await useInsertData(`/api/v1/addresses`, data);
        dispatch({
            type: ADD_ADDRESS,
            payload: res,
        })

    } catch (e) {
        dispatch({
            type: ADD_ADDRESS,
            payload: e.response
        })
    }
}

export const getAddress = () => async (dispatch) => {
    try {
        const res = await useGetDataToken(`/api/v1/addresses`);
        dispatch({
            type: GET_ADDRESS,
            payload: res,
        })

    } catch (e) {
        dispatch({
            type: GET_ADDRESS,
            payload: e.response
        })
    }
}

export const deleteAddress = (id) => async (dispatch) => {
    try {
        const res = await useDeleteData(`/api/v1/addresses/${id}`);
        dispatch({
            type: DELETE_ADDRESS,
            payload: res,
        })

    } catch (e) {
        dispatch({
            type: GET_ADDRESS,
            payload: e.response
        })
    }
}

export const updateAddress = (id,data) => async (dispatch) => {
    try {
        const res = await useInsUpdateData(`/api/v1/addresses/${id}`, data);
        dispatch({
            type: UPDATE_ADDRESS,
            payload: res,
        })
    } catch (e) {
        dispatch({
            type: UPDATE_ADDRESS,
            payload: e.response
        })
    }
}

export const updateUser = (data) => async (dispatch) => {
    try {
        const res = await useInsUpdateData(`/api/v1/users/updateMe`,data);
        dispatch({
            type: UPDATE_USER,
            payload: res,
        })
    } catch (e) {
        dispatch({
            type: UPDATE_USER,
            payload: e.response
        })
    }
}

export const updateUserPassword = (data) => async (dispatch) => {
    try {
        const res = await useInsUpdateData(`/api/v1/users/changeMyPassword`,data);
        dispatch({
            type: UPDATE_USER_PASS,
            payload: res,
        })
    } catch (e) {
        dispatch({
            type: UPDATE_USER_PASS,
            payload: e.response
        })
    }
}

export const getAllUserOrders = () => async (dispatch) => {
    try {
        const res = await useGetDataToken(`/api/v1/orders`);
        dispatch({
            type: GET_USER_ORDERS,
            payload: res,
        })
    } catch (e) {
        dispatch({
            type: GET_USER_ORDERS,
            payload: e.response
        })
    }
}

export const getOneOrder = (id) => async (dispatch) => {
    try {
        const res = await useGetDataToken(`/api/v1/orders/${id}`);
        dispatch({
            type: GET_ONE_ORDER,
            payload: res,
        })
    } catch (e) {
        dispatch({
            type: GET_ONE_ORDER,
            payload: e.response
        })
    }
}

export const orderDelivered = (id) => async (dispatch) => {
    try {
        const res = await useInsUpdateData(`/api/v1/orders/${id}/deliver`);
        dispatch({
            type: ORDER_DELIVERED,
            payload: res,
        })
    } catch (e) {
        dispatch({
            type: ORDER_DELIVERED,
            payload: e.response
        })
    }
}

export const orderPayed = (id) => async (dispatch) => {
    try {
        const res = await useInsUpdateData(`/api/v1/orders/${id}/pay`);
        dispatch({
            type: ORDER_PAYED,
            payload: res,
        })
    } catch (e) {
        dispatch({
            type: ORDER_PAYED,
            payload: e.response
        })
    }
}
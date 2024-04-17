import {CREATE_COUPON,GET_COUPON,DELETE_COUPON,UPDATE_COUPON} from '../type'
import { useInsertData } from "../../hooks/useInsertData"
import { useGetDataToken } from '../../hooks/useGetData';
import useDeleteData from './../../hooks/useDeleteData';
import { useInsUpdateData } from '../../hooks/useUpdateData';


export const addCopon = (data) => async(dispatch) => {
    try {
        const res = await useInsertData('/api/v1/coupons', data);
        dispatch({
            type: CREATE_COUPON,
            payload: res,
        })
    } catch (e) {
        dispatch({
            type: CREATE_COUPON,
            payload: e.response
        })
    }
}

export const getCopons = () => async(dispatch) => {
    try {
        const res = await useGetDataToken("/api/v1/coupons");
        dispatch({
            type: GET_COUPON,
            payload: res,
        })
    } catch (e) {
        dispatch({
            type: GET_COUPON,
            payload: e.response
        })
    }
}

export const deleteCopon = (id) => async (dispatch) => {
    try {
        const res = await useDeleteData(`/api/v1/coupons/${id}`);
        dispatch({
            type: DELETE_COUPON,
            payload: res,
        })
    } catch (e) {
        dispatch({
            type: DELETE_COUPON,
            payload: e.response
        })
    }
}

export const updateCopon = (id,data) => async (dispatch) => {
    try {
        const res = await useInsUpdateData(`/api/v1/coupons/${id}`, data);
        dispatch({
            type: UPDATE_COUPON,
            payload: res,
        })
    } catch (e) {
        dispatch({
            type: UPDATE_COUPON,
            payload: e.response
        })
    }
}
import { CREATE_COUPON,GET_COUPON,DELETE_COUPON,UPDATE_COUPON } from '../type'

const inital = {
    copon: [],
    allCopon: [],
    deleteCopons: [],
    updateCopons: [],
}

const coponReducer = (state=inital,action) => {
    switch (action.type) {
        case CREATE_COUPON:
            return {
                ...state,
                copon: action.payload
            }
        case GET_COUPON:
            return {
                ...state,
                allCopon: action.payload
            }
        case DELETE_COUPON:
            return {
                ...state,
                deleteCopons: action.payload
            }
        case UPDATE_COUPON:
            return {
                ...state,
                updateCopons: action.payload
            }
        default:
            return state;
    }
}

export default coponReducer
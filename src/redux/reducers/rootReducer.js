import { combineReducers } from 'redux'
import categoryReducer from './categoryReducer'
import brandReducer from './brandReducer'
import subcategoryReducer from './subcategoryReducer'
import productsReducer from './productsReducer'
import authReducer from './authReducer'
import reviewReducer from './reviewReducer'
import addToWishListReducer from './wishListReducer'
import coponReducer from './coponReducer'
import userReducer from './userReducer'
import cartReducer from './cartReducer'
export default combineReducers({
    allCategory: categoryReducer,
    allBrand: brandReducer,
    subCategory: subcategoryReducer,
    allproducts: productsReducer,
    authReducer: authReducer,
    reviewReducer: reviewReducer,
    addToWishListReducer: addToWishListReducer,
    coponReducer: coponReducer,
    userReducer: userReducer,
    cartReducer: cartReducer,
})
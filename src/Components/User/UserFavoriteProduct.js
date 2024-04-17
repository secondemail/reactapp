import React, { useEffect, useState } from 'react'
import { Row, Spinner } from 'react-bootstrap';
import CardProductsContainer from './../Products/CardProductsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getProductWishList } from '../../redux/actions/wishListAction';
const UserFavoriteProduct = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    useEffect(() => {
        const get = async () => {
            setLoading(true)
            await dispatch(getProductWishList())
            setLoading(false)
        }
        get()
    }, [])

    const res = useSelector(state => state.addToWishListReducer.allWishList)
    useEffect(() => {
        if (loading === false) {
            if (res){
                setItems(res.data)
            }
        }
    }, [loading])

    return (
        <div>
            <div className="admin-content-text pb-4">قائمة المفضلة</div>
            <Row className='justify-content-start'>
                {
                    !loading ? items.length <= 0 ? (<h6>لا يوجد منتجات مفضله حاليا</h6>) : <CardProductsContainer products={items} title="" btntitle="" /> :<div style={{display:"flex",justifyContent:"center"}} ><Spinner animation="border" variant="primary" /></div>
                }
            </Row>
        </div>
    )
}

export default UserFavoriteProduct

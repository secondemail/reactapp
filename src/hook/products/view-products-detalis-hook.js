import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getOneProduct, getProductLike, getProductYouLike } from '../../redux/actions/productsAction';
import mobile from '../../images/mobile.png'
import { getOneCategory } from '../../redux/actions/categoryAction';
import { getOneBrand } from '../../redux/actions/brandAction';
const ViewProductsDetalisHook = (prodID) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [item, setItem] = useState([]);
    useEffect(() => {
        try {
            const getDetails = async () => {
                setLoading(true)
                await dispatch(getOneProduct(prodID))
                setLoading(false);
            }
            getDetails();
        } catch (error) {}
    }, [])

    const oneProducts = useSelector((state) => state.allproducts.oneProduct)
    const oneCategory = useSelector((state) => state.allCategory.oneCategory)
    const oneBrand = useSelector((state) => state.allBrand.oneBrand)
    const productLike = useSelector((state) => state.allproducts.productLike)
    //to show products item
    useEffect(() => {
        if (loading === false) {
            if (oneProducts) {
                if (oneProducts.data) {
                    setItem(oneProducts.data)
                }
            }
        }
    }, [loading])
    
/*     let item = [];
    if (oneProducts.data) {
        item = oneProducts.data;
    }
    else {
        item = []
    } */

    useEffect(() => {
        try {
            if (item.category || item.brand) {
                const getd = async () => {
                    setLoading2(true);
                    await    dispatch(getOneCategory(item.category))
                    await    dispatch(getOneBrand(item.brand))
                    setLoading2(false);
                }
                getd();
            }

            if (item.category) {
                dispatch(getProductLike(item.category))
            }
        } catch (error) {}

    }, [item])


    //to view images gallery
    let images = []


    //to show category item
    let cat = [];
    if (oneCategory.data) {
        cat = oneCategory.data;
    }else {
        cat = []
    }

    //to show brand item
    let brand = [];
    if (oneBrand.data) {
        brand = oneBrand.data;
    } else {
        brand = []
    }

    let prod = []
    if (productLike) {
        prod = productLike.data;
    }else {
        prod = []
    }
    return [item, images, cat, brand, prod, loading,loading2]
}

export default ViewProductsDetalisHook
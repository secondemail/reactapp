import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from '../../redux/actions/productsAction';
import { getAllProductsPage } from './../../redux/actions/productsAction';

const ViewProductAdminHook = () => {

    const dispatch = useDispatch();
    const [loading,setLoading]=useState(true)
    useEffect(() => {
        const getProd = async () => {
            setLoading(true)
            await dispatch(getAllProducts(8));
            setLoading(false);
        }
        getProd()
    }, [])


    const onPress = async (page) => {
        setLoading(true)
        await dispatch(getAllProductsPage(page, 8))
        setLoading(false)
    }
    let items = []; let pagination = [];
    const allProducts = useSelector((state) => state.allproducts.allProducts)
    try {
        if (allProducts.data)
            items = allProducts.data;
        else
            items = []

        if (allProducts.paginationResult)
            pagination = allProducts.paginationResult.numberOfPages;
        else
            pagination = []
    } catch (e) { }
    return [items, pagination, onPress,loading]

}

export default ViewProductAdminHook
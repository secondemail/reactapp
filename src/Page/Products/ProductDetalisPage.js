import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import CategoryHeader from '../../Components/Category/CategoryHeader'
import CardProductsContainer from '../../Components/Products/CardProductsContainer'
import ProductDetalis from '../../Components/Products/ProductDetalis'
import RateContainer from '../../Components/Rate/RateContainer'
import ViewHomeProductsHook from './../../hook/products/view-home-products-hook';
import ViewProductsDetalisHook from './../../hook/products/view-products-detalis-hook';
const ProductDetalisPage = () => {
    const { id } = useParams();
    const [item, images, cat, brand, prod] = ViewProductsDetalisHook(id);
    if (prod)
        var items = prod.slice(0, 4)

    if (item) {
        var rateAvg = item.ratingsAverage
        var rateQty = item.ratingsQuantity
    }

    return (
        <Container>
            <ProductDetalis />
            <RateContainer rateAvg={rateAvg} rateQty={rateQty} />
            <CardProductsContainer products={items} title="منتجات قد تعجبك" />
        </Container>
    )
}

export default ProductDetalisPage

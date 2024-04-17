import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CategoryHeader from '../../Components/Category/CategoryHeader'
import CardProductsContainer from '../../Components/Products/CardProductsContainer'
import Pagination from '../../Components/Uitily/Pagination'
import SearchCountResult from '../../Components/Uitily/SearchCountResult'
import SideFilter from '../../Components/Uitily/SideFilter'
import ViewSearchProductsHook from './../../hook/products/view-search-products-hook';

const ShopProductsPage = () => {
    const [items, pagination, onPress, getProduct, results] = ViewSearchProductsHook();
    if (pagination) {
        var pageCount = pagination;
    } else {
        pageCount = 1;
    }
    return (
        <div style={{ minHeight: '670px' }}>
            <Container style={{ minHeight: '670px' }}>
                <SearchCountResult onClick={getProduct} title={`هناك ${results} نتيجة بحث`} />
                <Row className='d-flex flex-row'>
                    <Col lg="2" className='d-flex'>
                        <SideFilter />
                    </Col>
                    <Col lg="10">
                        <CardProductsContainer products={items} title="" btntitle="" />
                        <Pagination pageCount={pageCount} onPress={onPress} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ShopProductsPage

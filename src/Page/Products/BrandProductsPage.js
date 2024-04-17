import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CategoryHeader from '../../Components/Category/CategoryHeader'
import CardProductsContainer from '../../Components/Products/CardProductsContainer'
import Pagination from '../../Components/Uitily/Pagination'
import SearchCountResult from '../../Components/Uitily/SearchCountResult'
import SideFilter from '../../Components/Uitily/SideFilter'
import ViewSearchProductsHook from './../../hook/products/view-search-products-hook';
import { useDispatch, useSelector } from 'react-redux'
import { brandProducts, categoryProducts } from '../../redux/actions/productsAction'
import { useParams } from 'react-router-dom';

const BrandProductsPage = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        const get = async () => {
            setLoading(true);
            await dispatch(brandProducts(id));
            setLoading(false);
        };
        get();
    }, []);
    const res = useSelector(state => state.allproducts.brandProducts);
    return (
        <div style={{ minHeight: '670px' }}>
            <Container>
                <Row className='d-flex flex-row pt-5'>
                    <Col>
                        <CardProductsContainer products={res.data} title={res.data && res.data.length > 0 ? `هناك ${res.data.length} نتيجة بحث `:null} btntitle="" />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default BrandProductsPage

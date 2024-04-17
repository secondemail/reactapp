import React, { useState, useEffect } from 'react'
import { Container, Row, Spinner } from 'react-bootstrap'
import SubTiltle from '../Uitily/SubTiltle'
import ProductCard from './ProductCard'
import { useDispatch, useSelector } from 'react-redux';
import { getProductWishList } from '../../redux/actions/wishListAction';
import CardContainerHook from './../../hook/products/card-container-hook';
import { CircularProgress } from '@mui/material';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { Fade } from 'react-awesome-reveal';

const CardProductsContainer = ({ title, btntitle, pathText, products }) => {

    const [favProd, loading] = CardContainerHook();

    return (
        <Container>
            {loading === false && products ? (<SubTiltle title={title} btntitle={btntitle} pathText={pathText} />) : (<SubTiltle title={title} />)}
            {
                !loading ?
                    (
                        <div style={{overflowX:"scroll",scrollbarWidth:"none",borderLeft:"2.5px solid black",borderRight:"2.5px solid black"}} className='my-1 d-flex flex-row'>
                            {
                                products && products.length > 0 ? (
                                    products.map((item, index) => <Fade  key={index}><ProductCard favProd={favProd} item={item} /></Fade> )
                                ) : <h3>لا يوجد منتجات</h3>
                            }
                        </div>
                    )
                    :
                    (
                        <div style={{width:"100%"}} className='text-center p-3'>
                            <CircularProgress />
                        </div>
                    )
            }
        </Container>
    )
}

export default CardProductsContainer

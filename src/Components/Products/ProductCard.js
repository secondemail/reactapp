import React, { useState, useEffect } from 'react'
import { Card, Col } from 'react-bootstrap'

import rate from "../../images/rate.png";
import { Link } from 'react-router-dom';

import { Flip, ToastContainer } from 'react-toastify';
import ProductCardHook from './../../hook/products/product-card-hook';

const ProductCard = ({ item, favProd }) => {


    const [removeToWishListData, addToWishListData, handelFav, favImg] = ProductCardHook(item, favProd)

    return (
        <div className="m-2">
            <Card
                className="my-2"
                style={{
                    width: "200px",
                    height:"330px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 2px 2px 0 rgba(151,151,151,0.5)",
                }}>
                <Link to={`/products/${item._id}`} style={{ textDecoration: 'none' }}>
                    <Card.Img style={{ height: "175px", width: "100%" }} src={item.imageCover} alt="ldsdjskdjskdjs" />
                </Link>
                <div className="d-flex justify-content-end mx-2">
                    {
                        localStorage.getItem("user") !== null ? 
                            (
                                <img
                                    src={favImg}
                                    alt=""
                                    onClick={handelFav}
                                    className="text-center"
                                    style={{
                                        height: "24px",
                                        width: "26px",
                                        cursor: 'pointer'
                                    }}
                                />
                            ):null
                    }
                </div>
                <Card.Body style={{height: "72px",overflow: "scroll",scrollbarWidth: "none"}}>
                    <div className="card-title">
                        {item.title}
                    </div>
                </Card.Body>
                <Card.Body className='d-flex justify-content-between'>
                    <div className="d-flex">
                        <img
                            className=""
                            src={rate}
                            alt=""
                            height="16px"
                            width="16px"
                        />
                        <div className="card-rate mx-2">{item.ratingsAverage || 0}</div>
                    </div>
                    <div className="d-flex">
                        <div className="card-price">{item.price}</div>
                        <div className="card-currency mx-1">جنيه</div>
                    </div>
                </Card.Body>

            </Card>
        </div>
    )
}

export default ProductCard

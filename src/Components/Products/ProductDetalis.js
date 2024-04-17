import React from 'react'
import { Row, Col,Spinner } from 'react-bootstrap'
import ProductGallery from './ProductGallery'
import ProductText from './ProductText'
import { useParams } from 'react-router-dom';
import ViewProductsDetalisHook from '../../hook/products/view-products-detalis-hook';

const ProductDetalis = () => {
    const { id } = useParams();
    const [item, images, cat, brand, prod,loading,loading2] = ViewProductsDetalisHook(id);
    return (
        <div>
            {
                !loading && !loading2 ?
                    (
                        <Row className='py-3'>
                            <Col>
                                <ProductGallery images={item.imageCover} />
                            </Col>

                            <Col>
                                <ProductText item={item} cat={cat} brand={brand} />
                                
                            </Col>
                        </Row>
                    ):(<div style={{paddingTop:"30vh",paddingBottom:"30px"}} className="d-flex justify-content-center"><Spinner  animation="border" role="status"></Spinner></div>)
            }
        </div>
    )
}

export default ProductDetalis
